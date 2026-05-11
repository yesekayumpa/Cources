"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Quiz, Question, QuizResult } from "@/types";
import { QuizQuestion } from "./quiz-question";
import { Button } from "@/components/ui/button";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { ProgressEnhanced } from "@/components/ui/progress-enhanced";
import { ModalEnhanced } from "@/components/ui/modal-enhanced";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Clock, Trophy, Target, Zap, Play, RotateCcw, Home } from "lucide-react";

interface QuizEngineProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onExit?: () => void;
  mode?: "practice" | "exam";
  showTimer?: boolean;
  maxHints?: number;
}

export const QuizEngineNew: React.FC<QuizEngineProps> = ({
  quiz,
  onComplete,
  onExit,
  mode = "practice",
  showTimer = true,
  maxHints = 3
}) => {
  const { user, addXP, addBadge } = useAppStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit || 0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (!isStarted || isCompleted || !showTimer || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isCompleted, showTimer]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(new Date());
    setTimeRemaining(quiz.timeLimit || 0);
  };

  const handleAnswer = useCallback((answer: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: currentQuestion.id,
      answer,
      timeSpent: (quiz.timeLimit || 0) - timeRemaining,
      correct: checkAnswer(currentQuestion, answer)
    };
    setAnswers(newAnswers);
  }, [currentQuestion, answers, timeRemaining]);

  const checkAnswer = (question: Question, answer: any): boolean => {
    switch (question.type) {
      case "qcm":
      case "true-false":
      case "code-complete":
        return answer === question.correctAnswer;
      
      case "qcm-multiple":
        return Array.isArray(question.correctAnswer) &&
          Array.isArray(answer) &&
          question.correctAnswer.length === answer.length &&
          question.correctAnswer.every(val => answer.includes(val));
      
      case "fill-blank":
        return Array.isArray(question.correctAnswer) &&
          Array.isArray(answer) &&
          question.correctAnswer.length === answer.length &&
          question.correctAnswer.every((val, index) => answer[index] === val);
      
      case "drag-drop":
        return Array.isArray(question.correctAnswer) &&
          Array.isArray(answer) &&
          JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
      
      case "spot-bug":
        return Array.isArray(question.correctAnswer) &&
          Array.isArray(answer) &&
          answer.length === question.correctAnswer.length &&
          answer.every(bug => question.correctAnswer.includes(bug));
      
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (isCompleted) return;
    
    setIsCompleted(true);
    
    // Calculate results
    const correctAnswers = answers.filter(a => a?.correct).length;
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
    const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
    const xpEarned = calculateXP(score, mode === "exam");
    
    const result: QuizResult = {
      id: `result-${Date.now()}`,
      userId: user.id,
      quizId: quiz.id,
      score: correctAnswers,
      maxScore: totalQuestions,
      percentage: score,
      timeSpent,
      answers: answers.filter(Boolean),
      attempt: 1, // This should come from store
      completedAt: new Date(),
      stars,
      xpEarned
    };

    // Update store
    addXP(xpEarned);
    
    // Check for badges
    if (score === 100) {
      addBadge("badge-perfect-quiz");
    }
    if (mode === "exam" && stars === 3) {
      addBadge("badge-speed-demon");
    }

    onComplete(result);
  };

  const calculateXP = (score: number, isExam: boolean): number => {
    const baseXP = quiz.xpReward || 100;
    const scoreMultiplier = score / 100;
    const examMultiplier = isExam ? 1.5 : 1;
    return Math.round(baseXP * scoreMultiplier * examMultiplier);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <CardEnhanced variant="default" className="max-w-2xl w-full mx-4">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
              <p className="text-muted-foreground mb-4">{quiz.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Target className="w-4 h-4" />
                    Questions
                  </div>
                  <p className="font-semibold">{quiz.questions.length}</p>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    Temps
                  </div>
                  <p className="font-semibold">
                    {quiz.timeLimit ? formatTime(quiz.timeLimit) : "Illimité"}
                  </p>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Zap className="w-4 h-4" />
                    Récompense
                  </div>
                  <p className="font-semibold">+{quiz.xpReward} XP</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                icon={<Home className="w-4 h-4" />}
                onClick={onExit}
              >
                Quitter
              </Button>
              <Button
                icon={<Play className="w-4 h-4" />}
                onClick={handleStart}
                className="min-w-[120px]"
              >
                Commencer
              </Button>
            </div>
          </div>
        </CardEnhanced>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <CardEnhanced variant="achievement" className="max-w-2xl w-full mx-4">
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">
              {answers.filter(a => a?.correct).length >= quiz.questions.length * 0.7 ? "🎉" : "💪"}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              {answers.filter(a => a?.correct).length >= quiz.questions.length * 0.7 ? "Félicitations !" : "Terminé !"}
            </h1>
            
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                {Array.from({ length: 3 }).map((_, i) => {
                  const correctAnswers = answers.filter(a => a?.correct).length;
                  const score = Math.round((correctAnswers / quiz.questions.length) * 100);
                  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
                  return (
                    <span key={i} className={cn(i < stars ? "text-yellow-400" : "text-gray-300")}>
                      ⭐
                    </span>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-2xl font-bold">
                    {answers.filter(a => a?.correct).length}/{quiz.questions.length}
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Pourcentage</p>
                  <p className="text-2xl font-bold">
                    {Math.round((answers.filter(a => a?.correct).length / quiz.questions.length) * 100)}%
                  </p>
                </div>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">XP Gagnés</p>
                <p className="text-2xl font-bold text-primary">
                  +{calculateXP(Math.round((answers.filter(a => a?.correct).length / quiz.questions.length) * 100), mode === "exam")}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                icon={<RotateCcw className="w-4 h-4" />}
                onClick={() => window.location.reload()}
              >
                Recommencer
              </Button>
              <Button
                icon={<Home className="w-4 h-4" />}
                onClick={onExit}
              >
                Continuer
              </Button>
            </div>
          </div>
        </CardEnhanced>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<Home className="w-4 h-4" />}
                onClick={() => setShowExitModal(true)}
              >
                Quitter
              </Button>
              <div>
                <h2 className="font-semibold">{quiz.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} sur {quiz.questions.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {showTimer && (
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                  timeRemaining < 60 && "bg-red-100 text-red-700",
                  timeRemaining < 300 && "bg-yellow-100 text-yellow-700",
                  "bg-muted"
                )}>
                  <Clock className="w-4 h-4" />
                  {formatTime(timeRemaining)}
                </div>
              )}
              
              <div className="text-sm text-muted-foreground">
                {currentQuestionIndex + 1}/{quiz.questions.length}
              </div>
            </div>
          </div>
          
          <ProgressEnhanced value={progress} className="mt-2" />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          onHint={() => setHintsUsed(prev => prev + 1)}
          showHint={hintsUsed < maxHints}
          disabled={answers[currentQuestionIndex] !== undefined}
          timeRemaining={timeRemaining}
        />
      </div>

      {/* Navigation */}
      <div className="border-t bg-background/95 backdrop-blur-sm sticky bottom-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Précédent
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: quiz.questions.length }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-8 h-8 rounded-full text-xs font-medium transition-all",
                    index === currentQuestionIndex
                      ? "bg-primary text-primary-foreground"
                      : answers[index] !== undefined
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <Button
              onClick={currentQuestionIndex === quiz.questions.length - 1 ? handleSubmit : handleNext}
              disabled={answers[currentQuestionIndex] === undefined}
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      <ModalEnhanced
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Quitter le quiz"
        size="sm"
      >
        <p className="mb-4">
          Êtes-vous sûr de vouloir quitter le quiz ? Votre progression ne sera pas sauvegardée.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => setShowExitModal(false)}
          >
            Annuler
          </Button>
          <Button onClick={onExit}>
            Quitter
          </Button>
        </div>
      </ModalEnhanced>
    </div>
  );
};
