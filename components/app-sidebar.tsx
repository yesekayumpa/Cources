"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Atom,
  Zap,
  Layers,
  Palette,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Trophy,
  BarChart3,
  Menu,
  X,
  CheckCircle2,
  Circle,
  Award,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { modules } from "@/lib/data/course-data";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarScrollIndicator } from "@/components/ui/sidebar-scroll-indicator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap: Record<string, React.ElementType> = {
  Atom,
  Zap,
  Layers,
  Palette,
};

const colorMap: Record<string, string> = {
  cyan: "text-cyan-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
  pink: "text-pink-400",
};

const bgColorMap: Record<string, string> = {
  cyan: "bg-cyan-400/10",
  yellow: "bg-yellow-400/10",
  green: "bg-green-400/10",
  pink: "bg-pink-400/10",
};

export function AppSidebar() {
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState<string[]>([
    "module-1",
  ]);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const {
    user,
    lessonProgress,
    getBestQuizResult,
    sidebarOpen,
    toggleSidebar,
  } = useAppStore();

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId],
    );
  };

  const isLessonComplete = (lessonId: string) => {
    return lessonProgress.some((p) => p.lessonId === lessonId && p.completed);
  };

  const getChapterProgress = (lessons: { id: string }[]) => {
    const completed = lessons.filter((l) => isLessonComplete(l.id)).length;
    return (completed / lessons.length) * 100;
  };

  const getModuleProgress = (
    moduleChapters: (typeof modules)[0]["chapters"],
  ) => {
    const allLessons = moduleChapters.flatMap((c) => c.lessons);
    const completed = allLessons.filter((l) => isLessonComplete(l.id)).length;
    return allLessons.length > 0 ? (completed / allLessons.length) * 100 : 0;
  };

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 border-r border-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col min-h-0">
          {/* Header */}
          <div className="border-b border-border p-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">
                  React & Tailwind
                </h1>
                <p className="text-xs text-muted-foreground">
                  Plateforme d&apos;apprentissage
                </p>
              </div>
            </Link>
          </div>

          {/* User stats */}
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">
                  {user.level}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">{user.xp} XP</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Flame className="h-4 w-4" />
                      <span className="text-sm font-medium">{user.streak}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Série de {user.streak} jours</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Progress value={(user.xp % 500) / 5} className="h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">
              {500 - (user.xp % 500)} XP jusqu&apos;au niveau {user.level + 1}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-2 p-4 border-b border-border">
            <Link href="/quiz" className="flex-1">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Trophy className="h-4 w-4" />
                Quiz
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <BarChart3 className="h-4 w-4" />
                Stats
              </Button>
            </Link>
            <Link href="/certificate" className="flex-1">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Award className="h-4 w-4" />
                Certifs
              </Button>
            </Link>
          </div>

          {/* Course navigation */}
          <ScrollArea className="flex-1 px-3 py-4 min-h-0">
            <nav className="space-y-2 min-h-0">
              {modules.map((module) => {
                const Icon = iconMap[module.icon] || BookOpen;
                const isExpanded = expandedModules.includes(module.id);
                const progress = getModuleProgress(module.chapters);

                return (
                  <div key={module.id} className="space-y-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-secondary",
                        isExpanded && "bg-secondary",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          bgColorMap[module.color],
                        )}
                      >
                        <Icon
                          className={cn("h-4 w-4", colorMap[module.color])}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {module.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={progress} className="h-1 flex-1" />
                          <span className="text-xs text-muted-foreground">
                            {Math.round(progress)}%
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-90",
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="ml-4 space-y-1 border-l border-border pl-4">
                        {module.chapters.map((chapter) => {
                          const isChapterExpanded = expandedChapters.includes(
                            chapter.id,
                          );
                          const chapterProgress = getChapterProgress(
                            chapter.lessons,
                          );
                          const quizResult = getBestQuizResult(chapter.quizId);

                          return (
                            <div key={chapter.id} className="space-y-1">
                              <button
                                onClick={() => toggleChapter(chapter.id)}
                                className={cn(
                                  "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-secondary",
                                  isChapterExpanded && "bg-secondary/50",
                                )}
                              >
                                <ChevronDown
                                  className={cn(
                                    "h-3 w-3 text-muted-foreground transition-transform",
                                    !isChapterExpanded && "-rotate-90",
                                  )}
                                />
                                <span className="flex-1 text-foreground truncate">
                                  {chapter.title}
                                </span>
                                {chapterProgress === 100 && (
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                )}
                              </button>

                              {isChapterExpanded && (
                                <div className="ml-5 space-y-1">
                                  {chapter.lessons.map((lesson, idx) => {
                                    const isComplete = isLessonComplete(
                                      lesson.id,
                                    );
                                    const isActive =
                                      pathname === `/learn/${lesson.id}`;

                                    return (
                                      <Link
                                        key={lesson.id}
                                        href={`/learn/${lesson.id}`}
                                        className={cn(
                                          "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary",
                                          isActive &&
                                            "bg-primary/10 text-primary",
                                          !isActive &&
                                            isComplete &&
                                            "text-muted-foreground",
                                        )}
                                      >
                                        {isComplete ? (
                                          <CheckCircle2 className="h-3 w-3 text-success" />
                                        ) : (
                                          <Circle className="h-3 w-3 text-muted-foreground" />
                                        )}
                                        <span className="truncate">
                                          {idx + 1}. {lesson.title}
                                        </span>
                                      </Link>
                                    );
                                  })}

                                  {/* Quiz link */}
                                  <Link
                                    href={`/quiz/${chapter.quizId}`}
                                    className={cn(
                                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary",
                                      pathname === `/quiz/${chapter.quizId}` &&
                                        "bg-primary/10 text-primary",
                                    )}
                                  >
                                    <Trophy
                                      className={cn(
                                        "h-3 w-3",
                                        quizResult &&
                                          quizResult.percentage >= 70
                                          ? "text-warning"
                                          : "text-muted-foreground",
                                      )}
                                    />
                                    <span>Quiz du chapitre</span>
                                    {quizResult && (
                                      <span className="ml-auto text-xs text-muted-foreground">
                                        {Math.round(quizResult.percentage)}%
                                      </span>
                                    )}
                                  </Link>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </ScrollArea>
          <SidebarScrollIndicator />
        </div>
      </aside>
    </>
  );
}
