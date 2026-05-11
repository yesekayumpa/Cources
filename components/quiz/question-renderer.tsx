"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/data/course-data";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/code-block";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  GripVertical,
} from "lucide-react";

interface QuestionRendererProps {
  question: Question;
  selectedAnswer: string | string[] | null;
  onAnswerChange: (answer: string | string[]) => void;
  showResult: boolean;
  isCorrect: boolean | null;
}

export function QuestionRenderer({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
  isCorrect,
}: QuestionRendererProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case "qcm":
        return (
          <QCMQuestion
            question={question}
            selectedAnswer={selectedAnswer as string}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      case "qcm-multiple":
        return (
          <QCMMultipleQuestion
            question={question}
            selectedAnswer={(selectedAnswer as string[]) || []}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      case "true-false":
        return (
          <TrueFalseQuestion
            question={question}
            selectedAnswer={selectedAnswer as string}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      case "fill-blank":
        return (
          <FillBlankQuestion
            question={question}
            selectedAnswer={selectedAnswer as string}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      case "code-complete":
        return (
          <CodeCompleteQuestion
            question={question}
            selectedAnswer={(selectedAnswer as string[]) || []}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      case "code-fix":
        return (
          <CodeFixQuestion
            question={question}
            selectedAnswer={selectedAnswer as string}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      case "order":
        return (
          <OrderQuestion
            question={question}
            selectedAnswer={(selectedAnswer as string[]) || question.orderItems || []}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      case "drag-drop":
        return (
          <DragDropQuestion
            question={question}
            selectedAnswer={(selectedAnswer as string[]) || []}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );

      default:
        return (
          <OpenQuestion
            question={question}
            selectedAnswer={selectedAnswer as string}
            onAnswerChange={(val) => onAnswerChange(val)}
            showResult={showResult}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Question text */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          {question.question}
        </h3>
        {question.code && (
          <CodeBlock code={question.code} language="jsx" title="Code à analyser" />
        )}
      </div>

      {/* Answer options */}
      <div className="space-y-4">{renderQuestion()}</div>

      {/* Result feedback */}
      {showResult && (
        <Card
          className={cn(
            "border-2",
            isCorrect ? "border-success bg-success/5" : "border-destructive bg-destructive/5"
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive mt-0.5" />
              )}
              <div>
                <p className={cn("font-medium", isCorrect ? "text-success" : "text-destructive")}>
                  {isCorrect ? "Correct !" : "Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {question.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// QCM (Single Choice) Question
function QCMQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string | null;
  onAnswerChange: (val: string) => void;
  showResult: boolean;
}) {
  return (
    <RadioGroup
      value={selectedAnswer || ""}
      onValueChange={onAnswerChange}
      disabled={showResult}
      className="space-y-3"
    >
      {question.options?.map((option, idx) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === question.correctAnswer;
        const showCorrect = showResult && isCorrect;
        const showIncorrect = showResult && isSelected && !isCorrect;

        return (
          <label
            key={idx}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all",
              !showResult && "hover:bg-secondary/50",
              isSelected && !showResult && "border-primary bg-primary/5",
              showCorrect && "border-success bg-success/5",
              showIncorrect && "border-destructive bg-destructive/5"
            )}
          >
            <RadioGroupItem value={option} />
            <span className="flex-1 text-foreground">{option}</span>
            {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
            {showIncorrect && <XCircle className="h-5 w-5 text-destructive" />}
          </label>
        );
      })}
    </RadioGroup>
  );
}

// QCM Multiple (Multiple Choice) Question
function QCMMultipleQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string[];
  onAnswerChange: (val: string[]) => void;
  showResult: boolean;
}) {
  const handleToggle = (option: string) => {
    if (showResult) return;
    const newAnswer = selectedAnswer.includes(option)
      ? selectedAnswer.filter((a) => a !== option)
      : [...selectedAnswer, option];
    onAnswerChange(newAnswer);
  };

  const correctAnswers = question.correctAnswer as string[];

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <HelpCircle className="h-4 w-4" />
        Plusieurs réponses possibles
      </p>
      {question.options?.map((option, idx) => {
        const isSelected = selectedAnswer.includes(option);
        const isCorrect = correctAnswers.includes(option);
        const showCorrect = showResult && isCorrect;
        const showIncorrect = showResult && isSelected && !isCorrect;

        return (
          <label
            key={idx}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all",
              !showResult && "hover:bg-secondary/50",
              isSelected && !showResult && "border-primary bg-primary/5",
              showCorrect && "border-success bg-success/5",
              showIncorrect && "border-destructive bg-destructive/5"
            )}
          >
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => handleToggle(option)}
              disabled={showResult}
            />
            <span className="flex-1 text-foreground">{option}</span>
            {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
            {showIncorrect && <XCircle className="h-5 w-5 text-destructive" />}
          </label>
        );
      })}
    </div>
  );
}

// True/False Question
function TrueFalseQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string | null;
  onAnswerChange: (val: string) => void;
  showResult: boolean;
}) {
  const options = question.options || ["Vrai", "Faux"];

  return (
    <RadioGroup
      value={selectedAnswer || ""}
      onValueChange={onAnswerChange}
      disabled={showResult}
      className="flex gap-4"
    >
      {options.map((option) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === question.correctAnswer;
        const showCorrect = showResult && isCorrect;
        const showIncorrect = showResult && isSelected && !isCorrect;

        return (
          <label
            key={option}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-lg border p-6 cursor-pointer transition-all text-lg font-medium",
              !showResult && "hover:bg-secondary/50",
              isSelected && !showResult && "border-primary bg-primary/5",
              showCorrect && "border-success bg-success/5",
              showIncorrect && "border-destructive bg-destructive/5"
            )}
          >
            <RadioGroupItem value={option} className="sr-only" />
            <span className={cn(
              isSelected && !showResult && "text-primary",
              showCorrect && "text-success",
              showIncorrect && "text-destructive"
            )}>
              {option}
            </span>
          </label>
        );
      })}
    </RadioGroup>
  );
}

// Fill in the Blank Question
function FillBlankQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string | null;
  onAnswerChange: (val: string) => void;
  showResult: boolean;
}) {
  const isCorrect =
    selectedAnswer?.toLowerCase().trim() ===
    (question.correctAnswer as string).toLowerCase().trim();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="fill-blank" className="text-muted-foreground">
          Votre réponse :
        </Label>
        <Input
          id="fill-blank"
          value={selectedAnswer || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={showResult}
          className={cn(
            "max-w-xs font-mono",
            showResult && isCorrect && "border-success bg-success/5",
            showResult && !isCorrect && "border-destructive bg-destructive/5"
          )}
          placeholder="Tapez votre réponse..."
        />
      </div>
      {showResult && !isCorrect && (
        <p className="text-sm text-muted-foreground">
          Réponse attendue :{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono">
            {question.correctAnswer as string}
          </code>
        </p>
      )}
    </div>
  );
}

// Code Complete Question
function CodeCompleteQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string[];
  onAnswerChange: (val: string[]) => void;
  showResult: boolean;
}) {
  const blanks = question.blanks || [];
  const correctAnswers = question.correctAnswer as string[];

  const handleBlankChange = (index: number, value: string) => {
    const newAnswers = [...selectedAnswer];
    newAnswers[index] = value;
    onAnswerChange(newAnswers);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Complétez les zones vides (marquées par ___) :
      </p>
      <div className="flex flex-wrap gap-4">
        {blanks.map((_, idx) => {
          const isCorrect =
            selectedAnswer[idx]?.toLowerCase().trim() ===
            correctAnswers[idx]?.toLowerCase().trim();

          return (
            <div key={idx} className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Blanc {idx + 1}
              </Label>
              <Input
                value={selectedAnswer[idx] || ""}
                onChange={(e) => handleBlankChange(idx, e.target.value)}
                disabled={showResult}
                className={cn(
                  "w-40 font-mono",
                  showResult && isCorrect && "border-success bg-success/5",
                  showResult && !isCorrect && "border-destructive bg-destructive/5"
                )}
                placeholder="..."
              />
              {showResult && !isCorrect && (
                <p className="text-xs text-muted-foreground">
                  Attendu : <code className="font-mono">{correctAnswers[idx]}</code>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Code Fix Question
function CodeFixQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string | null;
  onAnswerChange: (val: string) => void;
  showResult: boolean;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Décrivez brièvement l&apos;erreur et sa correction :
      </p>
      <Input
        value={selectedAnswer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        disabled={showResult}
        className={cn(
          "font-mono",
          showResult && "border-primary bg-primary/5"
        )}
        placeholder="Ex: Ajouter un Fragment, changer class en className..."
      />
    </div>
  );
}

// Order Question (Drag and Drop ordering)
function OrderQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string[];
  onAnswerChange: (val: string[]) => void;
  showResult: boolean;
}) {
  const [items, setItems] = useState(selectedAnswer);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (items.length === 0 && question.orderItems) {
      // Shuffle initially
      const shuffled = [...question.orderItems].sort(() => Math.random() - 0.5);
      setItems(shuffled);
      onAnswerChange(shuffled);
    }
  }, [question.orderItems, items.length, onAnswerChange]);

  const handleDragStart = (index: number) => {
    if (showResult) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || showResult) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDraggedIndex(index);
    onAnswerChange(newItems);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const correctOrder = question.orderItems || [];
  const correctIndices = question.correctAnswer as number[];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <GripVertical className="h-4 w-4" />
        Glissez-déposez pour réorganiser
      </p>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const correctPosition = correctIndices
            ? correctOrder[correctIndices[idx]]
            : correctOrder[idx];
          const isCorrect = showResult && item === correctPosition;
          const isIncorrect = showResult && item !== correctPosition;

          return (
            <div
              key={`${item}-${idx}`}
              draggable={!showResult}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 transition-all",
                !showResult && "cursor-grab hover:bg-secondary/50",
                draggedIndex === idx && "opacity-50 scale-105",
                isCorrect && "border-success bg-success/5",
                isIncorrect && "border-destructive bg-destructive/5"
              )}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {idx + 1}
              </span>
              <span className="flex-1 text-foreground">{item}</span>
              {isCorrect && <CheckCircle2 className="h-4 w-4 text-success" />}
              {isIncorrect && <XCircle className="h-4 w-4 text-destructive" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Drag and Drop (Matching) Question
function DragDropQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string[];
  onAnswerChange: (val: string[]) => void;
  showResult: boolean;
}) {
  // Simplified: same as order for now
  return (
    <OrderQuestion
      question={question}
      selectedAnswer={selectedAnswer}
      onAnswerChange={onAnswerChange}
      showResult={showResult}
    />
  );
}

// Open Question
function OpenQuestion({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult,
}: {
  question: Question;
  selectedAnswer: string | null;
  onAnswerChange: (val: string) => void;
  showResult: boolean;
}) {
  return (
    <div className="space-y-4">
      <Input
        value={selectedAnswer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        disabled={showResult}
        className="font-mono"
        placeholder="Votre réponse..."
      />
    </div>
  );
}
