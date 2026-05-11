"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle2,
  Home,
  Trophy,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Lesson, Chapter, Module } from "@/lib/data/course-data";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CodeBlock, InlineCode } from "@/components/code-block";
import { AppSidebar } from "@/components/app-sidebar";

interface LessonContentProps {
  lesson: Lesson;
  chapter: Chapter;
  module: Module;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  lessonNumber: number;
  totalLessons: number;
}

export function LessonContent({
  lesson,
  chapter,
  module,
  prevLesson,
  nextLesson,
  lessonNumber,
  totalLessons,
}: LessonContentProps) {
  const { markLessonComplete, isLessonComplete } = useAppStore();
  const completed = isLessonComplete(lesson.id);

  useEffect(() => {
    // Mark lesson as viewed after 30 seconds
    const timer = setTimeout(() => {
      if (!completed) {
        markLessonComplete(lesson.id);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [lesson.id, completed, markLessonComplete]);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);
  };

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <AppSidebar />

      <main className="lg:pl-72 custom-scrollbar">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
              <nav className="hidden sm:flex items-center gap-2 text-sm">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Accueil
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{module.title}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">
                  {chapter.title}
                </span>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {lesson.duration} min
              </div>
              {completed ? (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Terminé</span>
                </div>
              ) : (
                <Button size="sm" onClick={handleMarkComplete}>
                  Marquer comme terminé
                </Button>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <Progress
            value={(lessonNumber / totalLessons) * 100}
            className="h-1 rounded-none"
          />
        </header>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Leçon {lessonNumber} sur {totalLessons}
            </p>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {module.title}
              </span>
              <span>&bull;</span>
              <span>{chapter.title}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lesson.duration} minutes
              </span>
            </div>
          </div>

          {/* Lesson content */}
          <article className="prose prose-invert prose-lg max-w-none mb-12">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-foreground mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-muted-foreground">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return <InlineCode>{children}</InlineCode>;
                  }
                  const language =
                    className?.replace("language-", "") || "text";
                  return (
                    <CodeBlock
                      code={String(children)}
                      language={language}
                      showLineNumbers={false}
                    />
                  );
                },
                pre: ({ children }) => <>{children}</>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-foreground">{children}</em>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </article>

          {/* Code examples */}
          {lesson.codeExamples.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Exemples de code
              </h2>
              <div className="space-y-6">
                {lesson.codeExamples.map((example, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CodeBlock
                        code={example.code}
                        language={example.language}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Quiz prompt if last lesson */}
          {lessonNumber === totalLessons && (
            <Card className="mb-12 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      Chapitre terminé !
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Testez vos connaissances avec le quiz du chapitre
                    </p>
                  </div>
                  <Link href={`/quiz/quiz-1-1`}>
                    <Button className="gap-2">
                      <Trophy className="h-4 w-4" />
                      Passer le quiz
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <nav className="flex items-center justify-between pt-8 border-t border-border">
            {prevLesson ? (
              <Link href={`/learn/${prevLesson.id}`}>
                <Button
                  variant="outline"
                  className="gap-3 p-4 h-auto min-h-[80px]"
                >
                  <ChevronLeft className="h-5 w-5 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Précédent
                    </p>
                    <p className="text-base font-medium line-clamp-2 leading-tight">
                      {prevLesson.title}
                    </p>
                  </div>
                </Button>
              </Link>
            ) : (
              <div className="w-32" />
            )}

            {nextLesson ? (
              <Link href={`/learn/${nextLesson.id}`}>
                <Button className="gap-3 p-4 h-auto min-h-[80px] min-w-[280px]">
                  <div className="text-right flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary-foreground/90 mb-1">
                      Suivant
                    </p>
                    <p className="text-base font-medium line-clamp-2 leading-tight">
                      {nextLesson.title}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 flex-shrink-0" />
                </Button>
              </Link>
            ) : (
              <Link href={`/quiz/quiz-1-1`}>
                <Button className="gap-3 p-4 h-auto min-h-[80px] min-w-[200px]">
                  <Trophy className="h-5 w-5 flex-shrink-0" />
                  <span className="text-base font-semibold">
                    Passer le quiz
                  </span>
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </main>
    </div>
  );
}
