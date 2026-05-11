"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
      variant: {
        default: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      color: "primary",
    },
  }
);

const progressColorMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export interface ProgressEnhancedProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  animated?: boolean;
  striped?: boolean;
  indeterminate?: boolean;
  label?: string;
  formatLabel?: (value: number, max: number, percentage: number) => string;
}

const ProgressEnhanced = React.forwardRef<HTMLDivElement, ProgressEnhancedProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    size, 
    variant, 
    color,
    showLabel = false,
    animated = false,
    striped = false,
    indeterminate = false,
    label,
    formatLabel,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const displayLabel = label || formatLabel?.(value, max, percentage) || `${Math.round(percentage)}%`;

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {showLabel && (
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>{displayLabel}</span>
            <span className="font-medium">{Math.round(percentage)}%</span>
          </div>
        )}
        
        <div
          className={cn(
            progressVariants({ size, variant, color }),
            indeterminate && "overflow-visible"
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              progressColorMap[color as keyof typeof progressColorMap] || progressColorMap.primary,
              animated && "animate-pulse",
              striped && "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]",
              indeterminate && "animate-slide"
            )}
            style={{
              width: indeterminate ? "100%" : `${percentage}%`,
              backgroundSize: striped ? "1rem 1rem" : undefined,
              animation: indeterminate ? "slide 2s infinite linear" : undefined,
            }}
          />
        </div>

        {/* Indeterminate animation keyframes */}
        <style jsx>{`
          @keyframes slide {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    );
  }
);
ProgressEnhanced.displayName = "ProgressEnhanced";

// Progress circulaire
export interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  label,
  color = "rgb(59, 130, 246)",
  backgroundColor = "rgb(229, 231, 235)",
  className
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Cercle de fond */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Cercle de progression */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
          {label && (
            <span className="text-xs text-muted-foreground mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Progress Steps
export interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
  icon?: React.ReactNode;
}

export interface ProgressStepsProps {
  steps: ProgressStep[];
  currentStep?: number;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep = 0,
  orientation = "horizontal",
  size = "md",
  className
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base"
  };

  const isVertical = orientation === "vertical";

  return (
    <div className={cn(
      "flex",
      isVertical ? "flex-col space-y-4" : "flex-row space-x-4",
      className
    )}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center",
              isVertical ? "flex-start" : "flex-col items-center"
            )}
          >
            {/* Step circle */}
            <div
              className={cn(
                "relative flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200",
                sizeClasses[size],
                isCompleted && "bg-primary text-primary-foreground border-primary",
                isActive && "bg-primary text-primary-foreground border-primary ring-4 ring-primary/20",
                isUpcoming && "bg-muted text-muted-foreground border-muted-foreground"
              )}
            >
              {step.icon || (
                <span>
                  {isCompleted ? "✓" : index + 1}
                </span>
              )}
            </div>

            {/* Step content */}
            <div className={cn(
              "mt-2",
              !isVertical && "flex-1 ml-4",
              isVertical && "ml-4"
            )}>
              <h3 className={cn(
                "font-medium",
                isCompleted && "text-foreground",
                isActive && "text-foreground",
                isUpcoming && "text-muted-foreground"
              )}>
                {step.title}
              </h3>
              {step.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
              )}
            </div>

            {/* Connector line */}
            {!isVertical && index < steps.length - 1 && (
              <div className={cn(
                "absolute top-1/2 left-1/2 w-full h-0.5 -translate-y-1/2",
                isCompleted ? "bg-primary" : "bg-muted-foreground/20"
              )}
                style={{ width: "2rem" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Skill Progress Bar
export interface SkillProgressProps {
  skill: string;
  level: number;
  maxLevel?: number;
  color?: string;
  showLevel?: boolean;
  className?: string;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({
  skill,
  level,
  maxLevel = 5,
  color = "rgb(59, 130, 246)",
  showLevel = true,
  className
}) => {
  const percentage = (level / maxLevel) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skill}</span>
        {showLevel && (
          <span className="text-sm text-muted-foreground">
            Niveau {level}/{maxLevel}
          </span>
        )}
      </div>
      <div className="flex space-x-1">
        {Array.from({ length: maxLevel }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              index < level ? "opacity-100" : "opacity-20"
            )}
            style={{
              backgroundColor: index < level ? color : "rgb(229, 231, 235)"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { ProgressEnhanced, progressVariants };
