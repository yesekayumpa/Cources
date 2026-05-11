"use client";

import { useAppStore } from "@/lib/store";
import { modules } from "@/lib/data/course-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Download,
  Share2,
  Home,
  Lock,
  CheckCircle2,
  Calendar,
  BookOpen,
  Trophy,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MainLayout } from "@/components/layout/main-layout";

export default function CertificatePage() {
  const { userProgress } = useAppStore();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate course completion
  const totalLessons = modules.reduce(
    (acc, mod) =>
      acc + mod.chapters.reduce((acc2, chap) => acc2 + chap.lessons.length, 0),
    0,
  );
  const completedLessons = userProgress.completedLessons.length;
  const courseProgress = (completedLessons / totalLessons) * 100;
  const isEligible = courseProgress >= 80;

  // Calculate stats
  const quizScores = Object.values(userProgress.quizScores);
  const averageScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;

  const currentDate = format(new Date(), "d MMMM yyyy", { locale: fr });

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#0a0a0b",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `certificat-react-tailwind-${format(new Date(), "yyyy-MM-dd")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mon certificat React & Tailwind CSS",
          text: `J'ai complété le cours React & Tailwind CSS avec un score moyen de ${averageScore}% !`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full mb-4">
            <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-700 dark:text-blue-300">
              Certification
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Certificat de complétion
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isEligible
              ? "Félicitations ! Vous avez terminé le cours."
              : `Complétez au moins 80% du cours pour obtenir votre certificat (${Math.round(courseProgress)}% actuellement)`}
          </p>
        </div>

        {isEligible ? (
          <>
            {/* Certificate */}
            <div
              ref={certificateRef}
              className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8 md:p-12 mb-8 overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-tl-full" />
              <div className="absolute top-4 right-4">
                <Sparkles className="h-8 w-8 text-blue-400 dark:text-blue-600" />
              </div>

              {/* Content */}
              <div className="relative text-center space-y-6">
                {/* Logo/Badge */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                    Certificat de complétion
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    React & Tailwind CSS
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Formation complète - De débutant à expert
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-blue-200 dark:bg-blue-800" />
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <div className="h-px w-20 bg-blue-200 dark:bg-blue-800" />
                </div>

                {/* Recipient */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Décerné à
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Apprenant Certifié
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {completedLessons}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Leçons
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {averageScore}%
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Score moyen
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userProgress.totalXP}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      XP gagnés
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Délivré le {currentDate}</span>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Ce certificat atteste de la réussite du cours React &
                    Tailwind CSS
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    ID: CERT-{Date.now().toString(36).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button onClick={handleDownload} size="lg">
                <Download className="mr-2 h-5 w-5" />
                Télécharger le certificat
              </Button>
              {typeof navigator !== "undefined" && navigator.share && (
                <Button variant="outline" onClick={handleShare} size="lg">
                  <Share2 className="mr-2 h-5 w-5" />
                  Partager
                </Button>
              )}
              <Button variant="outline" asChild size="lg">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Retour au cours
                </Link>
              </Button>
            </div>

            {/* Completion details */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Détails de la formation
                </h3>
                <div className="space-y-3">
                  {modules.map((module) => {
                    const moduleLessons = module.chapters.flatMap(
                      (c) => c.lessons,
                    );
                    const moduleCompleted = moduleLessons.filter((l) =>
                      userProgress.completedLessons.includes(l.id),
                    ).length;

                    return (
                      <div
                        key={module.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <CheckCircle2
                          className={cn(
                            "h-5 w-5",
                            moduleCompleted === moduleLessons.length
                              ? "text-green-500"
                              : "text-gray-400 dark:text-gray-500",
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {module.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {moduleCompleted}/{moduleLessons.length} leçons
                            complétées
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Not eligible state */
          <Card className="max-w-lg mx-auto border-gray-200 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mx-auto mb-6 flex items-center justify-center">
                <Lock className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Certificat verrouillé
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Complétez au moins 80% du cours pour débloquer votre certificat
                de complétion.
              </p>

              {/* Progress */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Progression
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {Math.round(courseProgress)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${courseProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {completedLessons}/{totalLessons} leçons complétées
                </p>
              </div>

              <Button asChild>
                <Link href="/">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continuer le cours
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
