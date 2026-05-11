"use client";

import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

export function SidebarScrollIndicator() {
  const scrollToBottom = () => {
    const sidebarContent = document.querySelector('[data-sidebar="content"]');
    if (sidebarContent) {
      sidebarContent.scrollTo({
        top: sidebarContent.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    const sidebarContent = document.querySelector('[data-sidebar="content"]');
    if (sidebarContent) {
      sidebarContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 border-t border-border bg-muted/30 backdrop-blur-sm">
      <button
        onClick={scrollToTop}
        className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 hover:border-primary/50 transition-all duration-200 group shadow-sm hover:shadow-md"
        title="Haut du menu"
      >
        <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
        <span className="text-sm font-semibold">Haut</span>
      </button>
      <button
        onClick={scrollToBottom}
        className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 hover:border-primary/50 transition-all duration-200 group shadow-sm hover:shadow-md"
        title="Bas du menu"
      >
        <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
        <span className="text-sm font-semibold">Bas</span>
      </button>
    </div>
  );
}
