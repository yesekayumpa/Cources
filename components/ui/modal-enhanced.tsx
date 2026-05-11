"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const modalVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        full: "max-w-screen-lg h-[90vh]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ModalEnhancedProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  preventClose?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const ModalEnhanced: React.FC<ModalEnhancedProps> = ({
  isOpen,
  onClose,
  title,
  description,
  showCloseButton = true,
  closeOnOverlayClick = true,
  preventClose = false,
  footer,
  header,
  size,
  className,
  children,
  ...props
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !preventClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, preventClose]);

  if (!isMounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          !closeOnOverlayClick && "pointer-events-none"
        )}
        onClick={() => {
          if (closeOnOverlayClick && !preventClose) {
            onClose();
          }
        }}
        data-state={isOpen ? "open" : "closed"}
      />

      {/* Modal */}
      <div
        className={cn(
          modalVariants({ size, className }),
          "data-[state=open]:animate-in data-[state=closed]:animate-out"
        )}
        data-state={isOpen ? "open" : "closed"}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        {...props}
      >
        {/* Header */}
        {(header || title || showCloseButton) && (
          <div className="flex items-center justify-between pb-4 border-b">
            {header ? (
              header
            ) : (
              <div className="flex-1">
                {title && (
                  <h2 id="modal-title" className="text-lg font-semibold leading-none tracking-tight">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
            )}
            {showCloseButton && !preventClose && (
              <button
                onClick={onClose}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

// Composants spécialisés
export const ConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir continuer ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "danger",
  loading = false
}) => {
  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  const footer = (
    <>
      <button
        onClick={onClose}
        disabled={loading}
        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {cancelText}
      </button>
      <button
        onClick={handleConfirm}
        disabled={loading}
        className={cn(
          "px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "danger" && "bg-red-600 hover:bg-red-700",
          variant === "warning" && "bg-yellow-600 hover:bg-yellow-700",
          variant === "info" && "bg-blue-600 hover:bg-blue-700"
        )}
      >
        {loading ? "Chargement..." : confirmText}
      </button>
    </>
  );

  return (
    <ModalEnhanced
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      preventClose={loading}
    >
      <p className="text-center">{message}</p>
    </ModalEnhanced>
  );
};

export const AlertModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  actionText?: string;
  onAction?: () => void;
}> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  actionText,
  onAction
}) => {
  const getIcon = () => {
    switch (type) {
      case "success": return "✅";
      case "error": return "❌";
      case "warning": return "⚠️";
      default: return "ℹ️";
    }
  };

  const header = (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{getIcon()}</span>
      <div>
        <h3 className="font-semibold">{title || (type === "success" ? "Succès" : type === "error" ? "Erreur" : type === "warning" ? "Attention" : "Information")}</h3>
      </div>
    </div>
  );

  const footer = actionText && onAction ? (
    <button
      onClick={() => {
        onAction();
        onClose();
      }}
      className={cn(
        "px-4 py-2 text-sm font-medium text-white rounded-md transition-colors",
        type === "success" && "bg-green-600 hover:bg-green-700",
        type === "error" && "bg-red-600 hover:bg-red-700",
        type === "warning" && "bg-yellow-600 hover:bg-yellow-700",
        type === "info" && "bg-blue-600 hover:bg-blue-700"
      )}
    >
      {actionText}
    </button>
  ) : (
    <button
      onClick={onClose}
      className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
    >
      OK
    </button>
  );

  return (
    <ModalEnhanced
      isOpen={isOpen}
      onClose={onClose}
      header={header}
      size="sm"
      footer={footer}
    >
      <p>{message}</p>
    </ModalEnhanced>
  );
};

export { ModalEnhanced, modalVariants };
