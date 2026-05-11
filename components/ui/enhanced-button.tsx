"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 active:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
        primary: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 active:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        success: "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 active:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        warning: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 active:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        danger: "bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white hover:from-red-700 hover:via-red-800 hover:to-red-900 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 active:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        outline: "border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950 dark:hover:to-indigo-950 transform hover:-translate-y-1 active:translate-y-0 active:shadow-md transition-all duration-300",
        ghost: "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:text-gray-900 dark:hover:text-white rounded-xl shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-300",
        glass: "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-white hover:bg-white/20 dark:hover:bg-black/20 hover:border-white/30 dark:hover:border-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 active:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        neon: "bg-gray-900 dark:bg-black text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-400 hover:text-cyan-300 transform hover:-translate-y-1 active:translate-y-0 active:shadow-[0_0_20px_rgba(6,182,212,0.3)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        gradient: "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 active:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      size: {
        xs: "h-7 px-3 py-1 text-xs rounded-lg",
        sm: "h-8 px-4 py-2 text-sm rounded-lg",
        md: "h-10 px-5 py-2.5 text-sm rounded-xl",
        lg: "h-12 px-6 py-3 text-base rounded-xl",
        xl: "h-14 px-8 py-4 text-lg rounded-2xl",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
        "icon-xl": "size-14 rounded-2xl",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "animate-spin",
        ping: "animate-ping",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "none",
    },
  },
);

interface EnhancedButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  glow?: boolean;
}

function EnhancedButton({
  className,
  variant,
  size,
  animation,
  asChild = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  glow = false,
  children,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const Comp = asChild ? Slot : "button";

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <span
        className={cn(
          "flex items-center justify-center transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12",
          loading && "animate-spin",
        )}
      >
        {icon}
      </span>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Chargement...</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && renderIcon()}
        <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:font-semibold">
          {children}
        </span>
        {icon && iconPosition === "right" && renderIcon()}
      </div>
    );
  };

  return (
    <Comp
      className={cn(
        enhancedButtonVariants({ variant, size, animation, className }),
        fullWidth && "w-full",
        loading && "cursor-not-allowed",
        glow && "shadow-2xl ring-4 ring-blue-500/20 dark:ring-blue-400/30",
      )}
      disabled={disabled || loading}
      data-slot="button"
      {...props}
    >
      {/* Effet de brillance */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      
      {/* Contenu */}
      <span className="relative z-20">
        {renderContent()}
      </span>
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-ping" />
        <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-200" />
        <div className="absolute bottom-1 left-2 w-1 h-1 bg-white/50 rounded-full animate-ping animation-delay-400" />
      </div>
    </Comp>
  );
}

export { EnhancedButton, enhancedButtonVariants };
