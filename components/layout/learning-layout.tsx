"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ProgressEnhanced,
  ProgressSteps,
} from "@/components/ui/progress-enhanced";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { useAppStore } from "@/lib/store";
import { extendedModules } from "@/lib/data/extended-course-data";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Target,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Home,
  Trophy,
  Settings,
  User,
  ChevronRight,
  Play,
  Lock,
  Zap,
} from "lucide-react";

interface LearningLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const LearningLayout: React.FC<LearningLayoutProps> = ({
  children,
  showSidebar = true,
}) => {
  const params = useParams();
  const router = useRouter();
  const { userProgress, user } = useAppStore();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const lessonId = params.lessonId as string;

  // Find current lesson and its context
  const findLessonContext = () => {
    for (const module of extendedModules) {
      for (const chapter of module.chapters) {
        const lesson = chapter.lessons.find((l) => l.id === lessonId);
        if (lesson) {
          return { module, chapter, lesson };
        }
      }
    }
    return null;
  };

  const context = findLessonContext();

  // Calculate progress
  const calculateModuleProgress = (module: any) => {
    const totalLessons = module.chapters.reduce(
      (acc: number, chapter: any) => acc + chapter.lessons.length,
      0,
    );
    const completedLessons = module.chapters.reduce(
      (acc: number, chapter: any) => {
        return (
          acc +
          chapter.lessons.filter((lesson: any) =>
            userProgress.completedLessons.includes(lesson.id),
          ).length
        );
      },
      0,
    );
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  const calculateChapterProgress = (chapter: any) => {
    const totalLessons = chapter.lessons.length;
    const completedLessons = chapter.lessons.filter((lesson: any) =>
      userProgress.completedLessons.includes(lesson.id),
    ).length;
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  const isLessonCompleted = (lessonId: string) => {
    return userProgress.completedLessons.includes(lessonId);
  };

  const isLessonAccessible = (lesson: any) => {
    // Check if lesson is completed or if previous lesson is completed
    if (isLessonCompleted(lesson.id)) return true;

    // Find previous lesson in the same chapter
    const chapter = context?.chapter;
    if (!chapter) return false;

    const lessonIndex = chapter.lessons.findIndex(
      (l: any) => l.id === lesson.id,
    );
    if (lessonIndex === 0) return true; // First lesson is always accessible

    const previousLesson = chapter.lessons[lessonIndex - 1];
    return isLessonCompleted(previousLesson.id);
  };

  const renderSidebar = () => {
    if (!showSidebar) return null;

    return (
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-background border-r border-border z-40 transition-all duration-300",
          sidebarOpen ? "w-80" : "w-16",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "flex items-center gap-3",
                !sidebarOpen && "justify-center",
              )}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              {sidebarOpen && (
                <div>
                  <h2 className="font-semibold">React Learning</h2>
                  <p className="text-xs text-muted-foreground">
                    Niveau {user.level}
                  </p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* User Stats */}
        {sidebarOpen && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.xp} XP</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted p-2 rounded text-center">
                <p className="text-muted-foreground text-xs">Leçons</p>
                <p className="font-semibold">
                  {userProgress.completedLessons.length}
                </p>
              </div>
              <div className="bg-muted p-2 rounded text-center">
                <p className="text-muted-foreground text-xs">Streak</p>
                <p className="font-semibold">{user.streak} jours</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          {/* Quick Navigation */}
          <div className="p-4 border-b border-border">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className={cn("w-full justify-start", !sidebarOpen && "px-2")}
                onClick={() => router.push("/")}
              >
                <Home className="w-4 h-4" />
                {sidebarOpen && <span>Accueil</span>}
              </Button>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", !sidebarOpen && "px-2")}
                onClick={() => router.push("/progress")}
              >
                <Trophy className="w-4 h-4" />
                {sidebarOpen && <span>Progression</span>}
              </Button>
            </div>
          </div>

          {/* Modules */}
          <div className="p-4">
            {sidebarOpen && <h3 className="font-semibold mb-4">Modules</h3>}
            <div className="space-y-2">
              {extendedModules.map((module) => {
                const progress = calculateModuleProgress(module);
                const isActive = activeModule === module.id;
                const isAccessible = true; // Could implement prerequisites here

                return (
                  <div key={module.id}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        !sidebarOpen && "px-2",
                        !isAccessible && "opacity-50 cursor-not-allowed",
                      )}
                      onClick={() => {
                        if (isAccessible) {
                          setActiveModule(isActive ? null : module.id);
                        }
                      }}
                    >
                      <span className="text-lg">{module.icon}</span>
                      {sidebarOpen && (
                        <div className="flex-1 text-left">
                          <div className="font-medium">{module.title}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {module.estimatedTime}
                            <span>•</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                        </div>
                      )}
                    </Button>

                    {/* Chapters (shown when module is active) */}
                    {sidebarOpen && isActive && (
                      <div className="ml-4 mt-2 space-y-1">
                        {module.chapters.map((chapter) => {
                          const chapterProgress =
                            calculateChapterProgress(chapter);
                          const isChapterCompleted = chapterProgress === 100;

                          return (
                            <div key={chapter.id} className="space-y-1">
                              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer">
                                {isChapterCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">
                                    {chapter.title}
                                  </p>
                                  <ProgressEnhanced
                                    value={chapterProgress}
                                    size="sm"
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              {/* Lessons */}
                              <div className="ml-4 space-y-1">
                                {chapter.lessons.map((lesson) => {
                                  const isCompleted = isLessonCompleted(
                                    lesson.id,
                                  );
                                  const isAccessible =
                                    isLessonAccessible(lesson);
                                  const isCurrent = lesson.id === lessonId;

                                  return (
                                    <Button
                                      key={lesson.id}
                                      variant={
                                        isCurrent ? "secondary" : "ghost"
                                      }
                                      size="sm"
                                      className={cn(
                                        "w-full justify-start",
                                        !isAccessible &&
                                          "opacity-50 cursor-not-allowed",
                                      )}
                                      onClick={() => {
                                        if (isAccessible) {
                                          router.push(`/learn/${lesson.id}`);
                                        }
                                      }}
                                    >
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                                      ) : isCurrent ? (
                                        <Play className="w-3 h-3 text-primary" />
                                      ) : !isAccessible ? (
                                        <Lock className="w-3 h-3" />
                                      ) : (
                                        <div className="w-3 h-3 border border-muted-foreground rounded-full" />
                                      )}
                                      <span className="ml-2 text-xs">
                                        {lesson.title}
                                      </span>
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="justify-center"
                onClick={() => router.push("/certificate")}
              >
                <Trophy className="w-4 h-4" />
                <span className="text-xs">Certificat</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-center"
                onClick={() => router.push("/settings")}
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs">Paramètres</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderHeader = () => {
    if (!context) return null;

    return (
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div>
                <h1 className="font-semibold text-lg">
                  {context.lesson.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {context.module.title} • {context.chapter.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {context.lesson.duration} min
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/quiz/quiz-1-1`)}
              >
                Quiz du chapitre
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2">
            <ProgressSteps
              steps={context.chapter.lessons.map(
                (lesson: any, index: number) => ({
                  id: lesson.id,
                  title: lesson.title,
                  status: isLessonCompleted(lesson.id)
                    ? "completed"
                    : lesson.id === lessonId
                      ? "current"
                      : "upcoming",
                }),
              )}
              currentStep={context.chapter.lessons.findIndex(
                (l: any) => l.id === lessonId,
              )}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {renderSidebar()}

      <div
        className={cn(
          "transition-all duration-300",
          showSidebar && sidebarOpen ? "ml-80" : showSidebar ? "ml-16" : "ml-0",
        )}
      >
        {renderHeader()}

        <main className="max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};
