"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border",
        lesson: "border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-md hover:border-primary/40",
        quiz: "border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-md hover:border-orange-300",
        project: "border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-md hover:border-purple-300",
        stat: "border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50",
        achievement: "border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100 hover:shadow-lg hover:border-yellow-400",
        warning: "border-red-200 bg-red-50",
        success: "border-green-200 bg-green-50",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-lg transform hover:scale-[1.02] transition-transform",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
);

export interface CardEnhancedProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  badge?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const CardEnhanced = React.forwardRef<HTMLDivElement, CardEnhancedProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive,
    header,
    footer,
    icon,
    title,
    description,
    badge,
    loading = false,
    onClick,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, interactive, className }),
          loading && "opacity-50 pointer-events-none"
        )}
        onClick={onClick}
        {...props}
      >
        {(header || icon || title || badge) && (
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className="font-semibold text-lg leading-tight truncate">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {badge && (
              <div className="flex-shrink-0 ml-2">
                {badge}
              </div>
            )}
          </div>
        )}

        {header && !icon && !title && !badge && (
          <div className="mb-4">
            {header}
          </div>
        )}

        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            children
          )}
        </div>

        {footer && (
          <div className="mt-4 pt-4 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    );
  }
);
CardEnhanced.displayName = "CardEnhanced";

// Card Components spécialisés
export const LessonCard: React.FC<{
  lesson: any;
  progress?: number;
  onStart?: () => void;
  className?: string;
}> = ({ lesson, progress = 0, onStart, className }) => {
  const isCompleted = progress >= 100;
  const isStarted = progress > 0;

  return (
    <CardEnhanced
      variant="lesson"
      interactive
      onClick={onStart}
      className={className}
      badge={
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          isCompleted ? "bg-green-100 text-green-700" :
          isStarted ? "bg-blue-100 text-blue-700" :
          "bg-gray-100 text-gray-700"
        )}>
          {isCompleted ? "Terminé" : isStarted ? "En cours" : "Non commencé"}
        </div>
      }
      icon={<span className="text-lg">📚</span>}
      title={lesson.title}
      description={`${lesson.duration} min • ${lesson.objectives?.length || 0} objectifs`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progression</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {lesson.objectives && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Objectifs:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {lesson.objectives.slice(0, 2).map((objective: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  {objective}
                </li>
              ))}
              {lesson.objectives.length > 2 && (
                <li className="text-primary">+{lesson.objectives.length - 2} autres...</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </CardEnhanced>
  );
};

export const QuizCard: React.FC<{
  quiz: any;
  bestScore?: number;
  attempts?: number;
  onStart?: () => void;
  className?: string;
}> = ({ quiz, bestScore = 0, attempts = 0, onStart, className }) => {
  const canAttempt = attempts < (quiz.maxAttempts || 3);
  const stars = bestScore >= 90 ? 3 : bestScore >= 70 ? 2 : bestScore >= 50 ? 1 : 0;

  return (
    <CardEnhanced
      variant="quiz"
      interactive={canAttempt}
      onClick={canAttempt ? onStart : undefined}
      className={cn(!canAttempt && "opacity-75", className)}
      badge={
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
          !canAttempt ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
        )}>
          {!canAttempt ? (
            <>
              <span>🔒</span>
              <span>Épuisé</span>
            </>
          ) : (
            <>
              <span>⏱️</span>
              <span>{quiz.timeLimit ? `${Math.floor(quiz.timeLimit / 60)}min` : "Illimité"}</span>
            </>
          )}
        </div>
      }
      icon={<span className="text-lg">🧪</span>}
      title={quiz.title}
      description={`${quiz.questions?.length || 0} questions • ${quiz.difficulty === "easy" ? "Facile" : quiz.difficulty === "medium" ? "Moyen" : "Difficile"}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Meilleur score</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={cn(i < stars ? "text-yellow-400" : "text-gray-300")}>
                ⭐
              </span>
            ))}
            <span className="ml-1 font-medium">{bestScore}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tentatives</span>
          <span className="font-medium">{attempts}/{quiz.maxAttempts || 3}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">XP gagnés</span>
          <span className="font-medium text-primary">+{quiz.xpReward || 100}</span>
        </div>
      </div>
    </CardEnhanced>
  );
};

export const ProjectCard: React.FC<{
  project: any;
  progress?: number;
  onStart?: () => void;
  className?: string;
}> = ({ project, progress = 0, onStart, className }) => {
  const isCompleted = progress >= 100;
  const difficulty = project.difficulty === "beginner" ? "Débutant" : 
                   project.difficulty === "intermediate" ? "Intermédiaire" : "Avancé";

  return (
    <CardEnhanced
      variant="project"
      interactive
      onClick={onStart}
      className={className}
      badge={
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          isCompleted ? "bg-green-100 text-green-700" :
          project.difficulty === "beginner" ? "bg-green-100 text-green-700" :
          project.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-700" :
          "bg-red-100 text-red-700"
        )}>
          {isCompleted ? "Terminé" : difficulty}
        </div>
      }
      icon={<span className="text-lg">🚀</span>}
      title={project.title}
      description={`${project.estimatedTime} • ${project.tags?.slice(0, 2).join(", ") || ""}`}
    >
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progression</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Récompense</span>
          <span className="font-medium text-purple-600">+{project.xpReward || 200} XP</span>
        </div>
      </div>
    </CardEnhanced>
  );
};

export { CardEnhanced, cardVariants };
