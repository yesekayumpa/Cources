"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      // Hide indicator when near bottom (within 100px)
      if (currentScroll >= scrollHeight - 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Always show scroll indicator with enhanced visibility

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="scroll-indicator bg-primary text-primary-foreground p-4 rounded-full shadow-xl hover:bg-primary/90 transition-all duration-300 hover:scale-110 border-2 border-primary/20 hover:border-primary/40 group"
        title="Retour en haut"
      >
        <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
      </button>

      {/* Scroll to bottom */}
      <button
        onClick={scrollToBottom}
        className="scroll-indicator bg-primary text-primary-foreground p-4 rounded-full shadow-xl hover:bg-primary/90 transition-all duration-300 hover:scale-110 border-2 border-primary/20 hover:border-primary/40 group"
        title="Aller en bas"
      >
        <ArrowDown className="w-6 h-6 transition-transform group-hover:translate-y-1" />
      </button>
    </div>
  );
}
