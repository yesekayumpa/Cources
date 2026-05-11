"use client";

import { useParams, useRouter } from "next/navigation";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { modules, quizzes } from "@/lib/data/course-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;

  // Trouver le quiz directement par l'ID
  let quiz = null;
  let lesson = null;
  let chapter = null;
  let module = null;

  // Si c'est un ID de quiz (format "1-1"), chercher le quiz correspondant
  // puis trouver la leçon associée via le chapterId du quiz
  if (lessonId.match(/^\d+-\d+$/)) {
    // Format "1-1", chercher le quiz correspondant
    const quizId = `quiz-${lessonId}`;
    quiz = quizzes.find((q) => q.id === quizId);

    if (quiz) {
      // Chercher le chapitre correspondant au quiz
      for (const mod of modules) {
        const foundChapter = mod.chapters.find(
          (ch) => ch.id === quiz.chapterId,
        );
        if (foundChapter) {
          chapter = foundChapter;
          module = mod;
          // Créer une leçon virtuelle pour l'affichage
          lesson = {
            id: lessonId,
            title: quiz.title,
            description: quiz.description,
          };
          break;
        }
      }
    }
  } else {
    // Recherche traditionnelle par ID de leçon
    for (const mod of modules) {
      for (const chap of mod.chapters) {
        const foundLesson = chap.lessons.find((l) => l.id === lessonId);
        if (foundLesson) {
          lesson = foundLesson;
          chapter = chap;
          module = mod;
          break;
        }
      }
      if (lesson) break;
    }
  }

  if (!quiz || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Quiz non trouvé
          </h1>
          <p className="text-muted-foreground">
            Ce quiz n&apos;existe pas ou n&apos;est pas disponible.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au cours
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (
    score: number,
    totalPoints: number,
    xpEarned: number,
  ) => {
    // Navigate to results page with quiz data
    router.push(
      `/results/${lessonId.replace("quiz-", "")}?score=${score}&total=${totalPoints}&xp=${xpEarned}`,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/learn/${lessonId}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la leçon
                </Link>
              </Button>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{module?.title}</span>
                <span>/</span>
                <span>{chapter?.title}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <QuizEngine
          quiz={quiz}
          lessonTitle={lesson?.title || "Quiz"}
          onComplete={handleQuizComplete}
        />
      </main>
    </div>
  );
}
