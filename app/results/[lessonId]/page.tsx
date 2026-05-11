"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { modules, quizzes } from "@/lib/data/course-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  ArrowRight,
  RotateCcw,
  Home,
  Zap,
  CheckCircle2,
  XCircle,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Confetti from "react-confetti";

export default function ResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.lessonId as string;
  const { completeLesson, addXP, setQuizScore, userProgress } = useAppStore();

  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "100");
  const xpEarned = parseInt(searchParams.get("xp") || "0");

  const percentage = Math.round((score / total) * 100);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Find the lesson and corresponding quiz/module/chapter info
  let lesson = null;
  let nextLesson = null;
  let chapter = null;
  let module = null;

  // If it's a quiz ID format (like "1-3"), find the corresponding quiz first
  if (lessonId.match(/^\d+-\d+$/)) {
    const quizId = `quiz-${lessonId}`;
    const quiz = quizzes.find((q) => q.id === quizId);

    if (quiz) {
      // Find the chapter and module for this quiz
      let found = false;
      for (const mod of modules) {
        if (found) break;
        const foundChapter = mod.chapters.find(
          (ch) => ch.id === quiz.chapterId,
        );
        if (foundChapter) {
          chapter = foundChapter;
          module = mod;
          // Create a virtual lesson for display
          lesson = {
            id: lessonId,
            title: quiz.title,
            description: quiz.description,
          };
          found = true;
        }
      }
    }
  } else {
    // Traditional lesson search
    let foundCurrent = false;
    for (const mod of modules) {
      if (foundCurrent && nextLesson) break;

      for (const chap of mod.chapters) {
        if (foundCurrent && nextLesson) break;

        for (let i = 0; i < chap.lessons.length; i++) {
          if (foundCurrent && !nextLesson) {
            nextLesson = chap.lessons[i];
            break;
          }
          if (chap.lessons[i].id === lessonId) {
            lesson = chap.lessons[i];
            chapter = chap;
            module = mod;
            foundCurrent = true;
            if (i < chap.lessons.length - 1) {
              nextLesson = chap.lessons[i + 1];
            }
          }
        }

        if (foundCurrent && !nextLesson) {
          // Check next chapter
          const chapIndex = mod.chapters.indexOf(chap);
          if (chapIndex < mod.chapters.length - 1) {
            nextLesson = mod.chapters[chapIndex + 1].lessons[0];
          }
        }
      }

      if (foundCurrent && !nextLesson) {
        // Check next module
        const modIndex = modules.indexOf(mod);
        if (modIndex < modules.length - 1) {
          nextLesson = modules[modIndex + 1].chapters[0].lessons[0];
        }
      }
    }
  }

  useEffect(() => {
    // Set window size for confetti
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Update progress
    if (lessonId && percentage >= 60) {
      completeLesson(lessonId);
      addXP(xpEarned);
      setQuizScore(lessonId, percentage);
    }

    // Show confetti for good scores
    if (percentage >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    // Animate percentage
    const duration = 1500;
    const steps = 60;
    const increment = percentage / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setAnimatedPercentage(percentage);
        clearInterval(timer);
      } else {
        setAnimatedPercentage(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [lessonId, percentage, xpEarned, completeLesson, addXP, setQuizScore]);

  const getResultMessage = () => {
    if (percentage >= 90)
      return {
        title: "Excellent !",
        subtitle: "Vous maîtrisez parfaitement ce sujet !",
        icon: Trophy,
        color: "text-yellow-500",
      };
    if (percentage >= 80)
      return {
        title: "Très bien !",
        subtitle: "Vous avez une très bonne compréhension !",
        icon: Star,
        color: "text-green-500",
      };
    if (percentage >= 60)
      return {
        title: "Bien joué !",
        subtitle: "Vous avez réussi ce quiz !",
        icon: CheckCircle2,
        color: "text-blue-500",
      };
    return {
      title: "Continuez !",
      subtitle: "Révisez la leçon et réessayez !",
      icon: TrendingUp,
      color: "text-orange-500",
    };
  };

  const result = getResultMessage();
  const ResultIcon = result.icon;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Résultat non trouvé
          </h1>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Retour au cours
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.1}
        />
      )}

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Result Card */}
        <Card className="mb-8 overflow-hidden">
          <div
            className={cn(
              "h-2",
              percentage >= 80
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : percentage >= 60
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                  : "bg-gradient-to-r from-orange-500 to-amber-500",
            )}
          />
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div
              className={cn(
                "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center",
                percentage >= 80
                  ? "bg-green-500/10"
                  : percentage >= 60
                    ? "bg-blue-500/10"
                    : "bg-orange-500/10",
              )}
            >
              <ResultIcon className={cn("h-10 w-10", result.color)} />
            </div>

            {/* Title */}
            <h1 className={cn("text-3xl font-bold mb-2", result.color)}>
              {result.title}
            </h1>
            <p className="text-muted-foreground mb-8">{result.subtitle}</p>

            {/* Score Circle */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * animatedPercentage) / 100}
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-1000",
                    percentage >= 80
                      ? "text-green-500"
                      : percentage >= 60
                        ? "text-blue-500"
                        : "text-orange-500",
                  )}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={cn(
                    "text-4xl font-bold",
                    percentage >= 80
                      ? "text-green-500"
                      : percentage >= 60
                        ? "text-blue-500"
                        : "text-orange-500",
                  )}
                >
                  {animatedPercentage}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {score}/{total} pts
                </span>
              </div>
            </div>

            {/* XP Earned */}
            {percentage >= 60 && (
              <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-8">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold text-primary">
                  +{xpEarned} XP gagnés !
                </span>
              </div>
            )}

            {/* Lesson Info */}
            <div className="bg-muted/50 rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground">Quiz complété</p>
              <p className="font-semibold text-foreground">{lesson.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {module?.title} - {chapter?.title}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {userProgress.completedLessons.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  Leçons complétées
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {userProgress.totalXP}
                </p>
                <p className="text-xs text-muted-foreground">XP Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">
                  {userProgress.streak}
                </p>
                <p className="text-xs text-muted-foreground">Jours de série</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {percentage < 60 ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href={`/learn/${lessonId}`}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Revoir la leçon
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/quiz/${lessonId}`}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Réessayer le quiz
                    </Link>
                  </Button>
                </>
              ) : nextLesson ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Accueil
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/learn/${nextLesson.id}`}>
                      Leçon suivante
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/progress">
                      <Award className="mr-2 h-4 w-4" />
                      Voir ma progression
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/certificate">
                      <Trophy className="mr-2 h-4 w-4" />
                      Obtenir mon certificat
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips for improvement */}
        {percentage < 80 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Conseils pour améliorer
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Relisez attentivement les sections de la leçon
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Pratiquez les exemples de code dans votre éditeur
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Prenez des notes sur les concepts clés
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
