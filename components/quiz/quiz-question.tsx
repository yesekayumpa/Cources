"use client";

import React, { useState, useEffect } from "react";
import { Question, QuestionType } from "@/types";
import { Button } from "@/components/ui/button";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Lightbulb, RotateCcw } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
  onHint?: () => void;
  showHint?: boolean;
  disabled?: boolean;
  timeRemaining?: number;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  onHint,
  showHint = false,
  disabled = false,
  timeRemaining
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [userCode, setUserCode] = useState("");
  const [blanks, setBlanks] = useState<string[]>([]);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [spottedBugs, setSpottedBugs] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setUserCode(question.code || "");
    setBlanks(new Array(question.blanks?.length || 0).fill(""));
    setOrderedItems(question.orderItems || []);
    setSpottedBugs([]);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [question.id]);

  const handleSubmit = () => {
    let answer: any;
    let correct = false;

    switch (question.type) {
      case "qcm":
      case "true-false":
        answer = selectedAnswer;
        correct = answer === question.correctAnswer;
        break;

      case "qcm-multiple":
        answer = selectedAnswer;
        correct = Array.isArray(question.correctAnswer) && 
          Array.isArray(selectedAnswer) &&
          question.correctAnswer.length === selectedAnswer.length &&
          question.correctAnswer.every((val: any) => selectedAnswer.includes(val));
        break;

      case "fill-blank":
        answer = blanks;
        correct = Array.isArray(question.correctAnswer) &&
          blanks.every((blank, index) => blank === question.correctAnswer[index]);
        break;

      case "code-complete":
        answer = userCode;
        correct = userCode.trim() === question.correctAnswer;
        break;

      case "drag-drop":
        answer = orderedItems;
        correct = Array.isArray(question.correctAnswer) &&
          JSON.stringify(orderedItems) === JSON.stringify(question.correctAnswer);
        break;

      case "spot-bug":
        answer = spottedBugs;
        correct = Array.isArray(question.correctAnswer) &&
          spottedBugs.length === question.correctAnswer.length &&
          spottedBugs.every(bug => question.correctAnswer.includes(bug));
        break;

      default:
        answer = selectedAnswer;
        correct = answer === question.correctAnswer;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswer(answer);
  };

  const renderQuestion = () => {
    switch (question.type) {
      case "qcm":
      case "true-false":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                  selectedAnswer === option
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={disabled}
                  className="mr-3"
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        );

      case "qcm-multiple":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                  Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={Array.isArray(selectedAnswer) && selectedAnswer.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAnswer([...(selectedAnswer || []), option]);
                    } else {
                      setSelectedAnswer((selectedAnswer || []).filter(a => a !== option));
                    }
                  }}
                  disabled={disabled}
                  className="mr-3"
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
        );

      case "fill-blank":
        return (
          <div className="space-y-4">
            {question.code && (
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                {question.code.split("__________").map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < (question.blanks?.length || 0) && (
                      <input
                        type="text"
                        value={blanks[index] || ""}
                        onChange={(e) => {
                          const newBlanks = [...blanks];
                          newBlanks[index] = e.target.value;
                          setBlanks(newBlanks);
                        }}
                        disabled={disabled}
                        className="mx-2 px-2 py-1 border-b-2 border-primary bg-background text-foreground font-medium"
                        placeholder="_____"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        );

      case "code-complete":
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>{question.code?.replace("__________", userCode)}</code>
              </pre>
            </div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              disabled={disabled}
              className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-background"
              placeholder="Complétez le code..."
            />
          </div>
        );

      case "drag-drop":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {question.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 border-2 rounded-lg cursor-move transition-all",
                    "border-dashed border-muted-foreground/30 bg-muted/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item}</span>
                    <span className="text-muted-foreground">→ {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Glissez-déposez les éléments pour les réorganiser dans le bon ordre
            </p>
          </div>
        );

      case "spot-bug":
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                <code>
                  {question.code?.split('\n').map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className={cn(
                        "cursor-pointer transition-all hover:bg-red-50 px-2 py-1 -mx-2 rounded",
                        spottedBugs.includes(lineIndex) && "bg-red-100 border-l-4 border-red-500"
                      )}
                      onClick={() => {
                        if (spottedBugs.includes(lineIndex)) {
                          setSpottedBugs(spottedBugs.filter(b => b !== lineIndex));
                        } else {
                          setSpottedBugs([...spottedBugs, lineIndex]);
                        }
                      }}
                    >
                      <span className="select-none">{lineIndex + 1}. </span>
                      {line}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              Cliquez sur les lignes qui contiennent des erreurs
            </p>
          </div>
        );

      default:
        return <div>Type de question non supporté</div>;
    }
  };

  return (
    <CardEnhanced variant="default" className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              {question.question}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Points: {question.points}</span>
              {timeRemaining && (
                <span className={cn(
                  "font-medium",
                  timeRemaining < 60 && "text-red-500"
                )}>
                  ⏱️ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>
          </div>
          
          {showHint && question.hints && question.hints.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Lightbulb className="w-4 h-4" />}
              onClick={onHint}
              disabled={disabled}
            >
              Indice
            </Button>
          )}
        </div>

        {/* Question content */}
        <div className="min-h-[200px]">
          {renderQuestion()}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={cn(
            "p-4 rounded-lg border-2 flex items-center gap-3",
            isCorrect 
              ? "bg-green-50 border-green-200 text-green-800" 
              : "bg-red-50 border-red-200 text-red-800"
          )}>
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <div>
              <p className="font-medium">
                {isCorrect ? "Correct !" : "Incorrect"}
              </p>
              <p className="text-sm mt-1">
                {question.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={() => {
                setSelectedAnswer(null);
                setUserCode(question.code || "");
                setBlanks(new Array(question.blanks?.length || 0).fill(""));
                setSpottedBugs([]);
                setShowFeedback(false);
              }}
              disabled={disabled}
            >
              Réinitialiser
            </Button>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={disabled || showFeedback}
            loading={disabled}
          >
            Valider
          </Button>
        </div>
      </div>
    </CardEnhanced>
  );
};
