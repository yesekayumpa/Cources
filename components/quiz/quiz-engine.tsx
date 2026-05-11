"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Trophy,
  AlertCircle,
  Play,
  RotateCcw,
  Home,
  BookOpen,
  Star,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Quiz, Question } from "@/lib/data/course-data";
import { modules, getStarsFromPercentage } from "@/lib/data/course-data";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionRenderer } from "@/components/quiz/question-renderer";
import { AppSidebar } from "@/components/app-sidebar";

interface QuizEngineProps {
  quiz: Quiz;
}

type QuizState = "intro" | "in-progress" | "completed";

interface Answer {
  questionId: string;
  answer: string | string[] | null;
  correct: boolean | null;
}

export function QuizEngine({ quiz }: QuizEngineProps) {
  const router = useRouter();
  const {
    saveQuizResult,
    getQuizAttemptCount,
    canAttemptQuiz,
    getBestQuizResult,
  } = useAppStore();

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit || 0);
  const [startTime, setStartTime] = useState(Date.now());

  // Sauvegarde automatique des réponses
  useEffect(() => {
    if (quizState === "in-progress" && answers.length > 0) {
      const saveTimeout = setTimeout(() => {
        // Sauvegarder les réponses partielles dans localStorage
        const partialSave = {
          quizId: quiz.id,
          currentQuestionIndex,
          answers,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `quiz-progress-${quiz.id}`,
          JSON.stringify(partialSave),
        );
      }, 2000); // Sauvegarder après 2 secondes d'inactivité

      return () => clearTimeout(saveTimeout);
    }
  }, [answers, currentQuestionIndex, quizState, quiz.id]);

  // Restaurer les réponses sauvegardées au chargement
  useEffect(() => {
    if (quizState === "intro") {
      const saved = localStorage.getItem(`quiz-progress-${quiz.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const isRecent = Date.now() - parsed.timestamp < 3600000; // 1 heure

          if (isRecent && parsed.answers.length > 0) {
            setAnswers(parsed.answers);
            setCurrentQuestionIndex(parsed.currentQuestionIndex);
            setQuizState("in-progress");
          }
        } catch (error) {
          console.error("Erreur lors de la restauration du quiz:", error);
        }
      }
    }
  }, [quiz.id, quizState]);

  const attemptCount = getQuizAttemptCount(quiz.id);
  const canAttempt = canAttemptQuiz(quiz.id, quiz.maxAttempts);
  const bestResult = getBestQuizResult(quiz.id);

  // Find chapter and module for this quiz
  const findQuizContext = () => {
    for (const module of modules) {
      for (const chapter of module.chapters) {
        if (chapter.quizId === quiz.id) {
          return { module, chapter };
        }
      }
    }
    return null;
  };

  const quizContext = findQuizContext();

  // Timer
  useEffect(() => {
    if (quizState !== "in-progress" || !quiz.timeLimit) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, quiz.timeLimit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id,
  );

  const handleStartQuiz = () => {
    setQuizState("in-progress");
    setStartTime(Date.now());
    setTimeRemaining(quiz.timeLimit || 0);
    setAnswers(
      quiz.questions.map((q) => ({
        questionId: q.id,
        answer: null,
        correct: null,
      })),
    );
  };

  const handleAnswerChange = (answer: string | string[]) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === currentQuestion.id
          ? { ...a, answer, correct: null }
          : a,
      ),
    );
  };

  const checkAnswer = (
    question: Question,
    answer: string | string[] | null,
  ): boolean => {
    if (answer === null) return false;

    switch (question.type) {
      case "qcm":
      case "true-false":
        return answer === question.correctAnswer;

      case "qcm-multiple": {
        const correctAns = question.correctAnswer as string[];
        const userAns = answer as string[];
        return (
          correctAns.length === userAns.length &&
          correctAns.every((a) => userAns.includes(a))
        );
      }

      case "fill-blank":
        return (
          (answer as string).toLowerCase().trim() ===
          (question.correctAnswer as string).toLowerCase().trim()
        );

      case "code-complete": {
        const correctBlanks = question.correctAnswer as string[];
        const userBlanks = answer as string[];
        return correctBlanks.every(
          (correct, idx) =>
            userBlanks[idx]?.toLowerCase().trim() ===
            correct.toLowerCase().trim(),
        );
      }

      case "code-fix":
        // Simplified check - accept if they mention key terms
        const keywords = (question.correctAnswer as string)
          .toLowerCase()
          .split(/\s+/);
        const userAnswer = (answer as string).toLowerCase();
        return keywords.some((keyword) => userAnswer.includes(keyword));

      case "order": {
        const correctOrder = question.correctAnswer as number[];
        const userOrder = answer as string[];
        const originalItems = question.orderItems || [];
        return correctOrder.every(
          (idx, pos) => originalItems[idx] === userOrder[pos],
        );
      }

      default:
        return false;
    }
  };

  const handleVerifyAnswer = () => {
    const isCorrect = checkAnswer(
      currentQuestion,
      currentAnswer?.answer ?? null,
    );
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === currentQuestion.id ? { ...a, correct: isCorrect } : a,
      ),
    );
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    setShowResult(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinishQuiz = useCallback(() => {
    const endTime = Date.now();
    const timeSpent = startTime ? Math.floor((endTime - startTime) / 1000) : 0;

    // Calculate final answers if not all verified
    const finalAnswers = answers.map((a) => {
      const question = quiz.questions.find((q) => q.id === a.questionId)!;
      const isCorrect =
        a.correct !== null ? a.correct : checkAnswer(question, a.answer);
      return { ...a, correct: isCorrect };
    });

    const correctCount = finalAnswers.filter((a) => a.correct).length;
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = finalAnswers.reduce((sum, a, idx) => {
      return sum + (a.correct ? quiz.questions[idx].points : 0);
    }, 0);
    const percentage = Math.round((earnedPoints / totalPoints) * 100);

    setAnswers(finalAnswers);
    setQuizState("completed");

    // Nettoyer la sauvegarde partielle
    localStorage.removeItem(`quiz-progress-${quiz.id}`);

    // Save result
    saveQuizResult({
      moduleId: "",
      userId: "user-1",
      quizId: quiz.id,
      score: earnedPoints,
      maxScore: totalPoints,
      percentage,
      timeSpent,
      answers: finalAnswers.map((a) => ({
        questionId: a.questionId,
        answer: a.answer as string | string[],
        correct: a.correct || false,
      })),
      completedAt: new Date(),
    });
  }, [answers, quiz, saveQuizResult, startTime]);

  const calculateResults = () => {
    const correctCount = answers.filter((a) => a.correct).length;
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = answers.reduce((sum, a, idx) => {
      return sum + (a.correct ? quiz.questions[idx].points : 0);
    }, 0);
    const percentage = Math.round((earnedPoints / totalPoints) * 100);
    const stars = getStarsFromPercentage(percentage);

    return { correctCount, totalPoints, earnedPoints, percentage, stars };
  };

  // Intro screen
  if (quizState === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <main className="lg:pl-72">
          <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
            >
              <ChevronLeft className="h-4 w-4" />
              Retour à l&apos;accueil
            </Link>

            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {quiz.title}
                </h1>
                <p className="text-muted-foreground">{quiz.description}</p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Quiz info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-foreground">
                      {quiz.questions.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-foreground">
                      {quiz.timeLimit ? formatTime(quiz.timeLimit) : "Illimité"}
                    </p>
                    <p className="text-sm text-muted-foreground">Temps</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-foreground">
                      {quiz.passingScore}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Score requis
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold text-foreground">
                      {attemptCount}/{quiz.maxAttempts}
                    </p>
                    <p className="text-sm text-muted-foreground">Tentatives</p>
                  </div>
                </div>

                {/* Best score */}
                {bestResult && (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          Meilleur score
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Tentative {bestResult.attempt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-5 w-5",
                              star <= bestResult.stars
                                ? "text-warning fill-warning"
                                : "text-muted-foreground",
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-foreground">
                        {bestResult.percentage}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Warning if max attempts reached */}
                {!canAttempt && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">
                        Nombre maximum de tentatives atteint
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Révisez la leçon pour débloquer de nouvelles tentatives
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {quizContext && (
                    <Link
                      href={`/learn/${quizContext.chapter.lessons[0].id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <BookOpen className="h-4 w-4" />
                        Revoir le chapitre
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={handleStartQuiz}
                    disabled={!canAttempt}
                    className="flex-1 gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {attemptCount > 0
                      ? "Réessayer le quiz"
                      : "Commencer le quiz"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Completed screen
  if (quizState === "completed") {
    const results = calculateResults();

    return (
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <main className="lg:pl-72">
          <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
            <Card className="overflow-hidden">
              <div
                className={cn(
                  "p-8 text-center",
                  results.percentage >= quiz.passingScore
                    ? "bg-gradient-to-r from-success/20 via-success/10 to-accent/20"
                    : "bg-gradient-to-r from-destructive/20 via-destructive/10 to-muted/20",
                )}
              >
                <div className="flex justify-center mb-4">
                  <div className="flex gap-2">
                    {[1, 2, 3].map((star, idx) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-12 w-12 star-pop",
                          star <= results.stars
                            ? "text-warning fill-warning"
                            : "text-muted-foreground",
                        )}
                        style={{ animationDelay: `${idx * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {results.percentage >= quiz.passingScore
                    ? "Félicitations !"
                    : "Quiz terminé"}
                </h1>
                <p className="text-muted-foreground">
                  {results.percentage >= quiz.passingScore
                    ? "Vous avez réussi ce quiz avec succès"
                    : "Continuez à vous entraîner"}
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Score display */}
                <div className="text-center">
                  <p className="text-6xl font-bold text-foreground mb-2">
                    {results.percentage}%
                  </p>
                  <p className="text-muted-foreground">
                    {results.correctCount} / {quiz.questions.length} questions
                    correctes
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {results.earnedPoints} / {results.totalPoints} points
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <Progress
                    value={results.percentage}
                    className={cn(
                      "h-4",
                      results.percentage >= quiz.passingScore
                        ? "[&>div]:bg-success"
                        : "[&>div]:bg-destructive",
                    )}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0%</span>
                    <span className="flex items-center gap-1">
                      <span>Score requis: {quiz.passingScore}%</span>
                    </span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href={`/results/${quiz.id.replace("quiz-", "")}`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      Voir les détails
                    </Button>
                  </Link>
                  {canAttempt && (
                    <Button
                      onClick={() => {
                        setQuizState("intro");
                        setCurrentQuestionIndex(0);
                        setAnswers([]);
                        setShowResult(false);
                      }}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Réessayer
                    </Button>
                  )}
                  <Link href="/" className="flex-1">
                    <Button className="w-full gap-2">
                      <Home className="h-4 w-4" />
                      Accueil
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // In-progress screen
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                Question {currentQuestionIndex + 1}/{quiz.questions.length}
              </span>
              <span className="text-xs text-muted-foreground">
                {currentQuestion.points} pts
              </span>
            </div>

            {quiz.timeLimit && (
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full",
                  timeRemaining < 60
                    ? "bg-destructive/10 text-destructive"
                    : "bg-secondary text-foreground",
                )}
              >
                <Clock className="h-4 w-4" />
                <span className="font-mono font-medium">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>

          <Progress
            value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
            className="h-1 rounded-none"
          />
        </header>

        {/* Question */}
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <QuestionRenderer
                question={currentQuestion}
                selectedAnswer={currentAnswer?.answer ?? null}
                onAnswerChange={handleAnswerChange}
                showResult={showResult}
                isCorrect={currentAnswer?.correct ?? null}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>

            <div className="flex gap-2">
              {/* Question dots */}
              {quiz.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!showResult) {
                      setCurrentQuestionIndex(idx);
                    }
                  }}
                  disabled={showResult}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all",
                    idx === currentQuestionIndex
                      ? "bg-primary scale-125"
                      : answers[idx]?.answer !== null
                        ? answers[idx]?.correct === true
                          ? "bg-success"
                          : answers[idx]?.correct === false
                            ? "bg-destructive"
                            : "bg-primary/50"
                        : "bg-muted",
                  )}
                />
              ))}
            </div>

            {!showResult ? (
              <Button
                onClick={handleVerifyAnswer}
                disabled={!currentAnswer?.answer}
              >
                Vérifier
              </Button>
            ) : currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button onClick={handleNextQuestion} className="gap-2">
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleFinishQuiz} className="gap-2">
                Terminer
                <Trophy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
