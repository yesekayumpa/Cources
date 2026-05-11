"use client";

import Link from "next/link";
import {
  Atom,
  Zap,
  Layers,
  Palette,
  BookOpen,
  Trophy,
  BarChart3,
  Award,
  ChevronRight,
  Play,
  Star,
  Clock,
  Users,
  Code,
  Rocket,
  Eye,
  Terminal,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { modules, badges } from "@/lib/data/course-data";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MainLayout } from "@/components/layout/main-layout";

const iconMap: Record<string, React.ElementType> = {
  Atom,
  Zap,
  Layers,
  Palette,
  Trophy,
  Target: Trophy,
  Flame: Zap,
  Star,
  GraduationCap: Award,
};

const colorMap: Record<string, string> = {
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
  yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20",
  green: "from-green-500/20 to-green-500/5 border-green-500/20",
  pink: "from-pink-500/20 to-pink-500/5 border-pink-500/20",
};

const textColorMap: Record<string, string> = {
  cyan: "text-cyan-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
  pink: "text-pink-400",
};

export default function HomePage() {
  const { user, lessonProgress } = useAppStore();

  const getTotalLessons = () => {
    return modules.reduce(
      (acc, module) =>
        acc +
        module.chapters.reduce((chAcc, ch) => chAcc + ch.lessons.length, 0),
      0,
    );
  };

  const getCompletedLessons = () => {
    return lessonProgress.filter((p) => p.completed).length;
  };

  const getModuleProgress = (
    moduleChapters: (typeof modules)[0]["chapters"],
  ) => {
    const allLessons = moduleChapters.flatMap((c) => c.lessons);
    const completed = allLessons.filter((l) =>
      lessonProgress.some((p) => p.lessonId === l.id && p.completed),
    ).length;
    return allLessons.length > 0 ? (completed / allLessons.length) * 100 : 0;
  };

  const getNextLesson = () => {
    for (const module of modules) {
      for (const chapter of module.chapters) {
        for (const lesson of chapter.lessons) {
          const isComplete = lessonProgress.some(
            (p) => p.lessonId === lesson.id && p.completed,
          );
          if (!isComplete) {
            return { lesson, chapter, module };
          }
        }
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();
  const totalLessons = getTotalLessons();
  const completedLessons = getCompletedLessons();
  const overallProgress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/80 to-purple-50/80 dark:from-blue-950/80 dark:via-background/80 dark:to-purple-950/80" />

          {/* Background image with parallax effect */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg"
              alt="Background with programming"
              className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20 scale-110"
              style={{ transform: "scale(1.1)" }}
            />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900 px-4 py-1.5 text-sm text-blue-700 dark:text-blue-300 mb-6">
              <BookOpen className="h-4 w-4" />
              Plateforme d&apos;apprentissage interactive
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl text-balance">
              Maîtrisez{" "}
              <span className="text-blue-600 dark:text-blue-400">React</span> et{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Tailwind CSS
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 text-pretty">
              Des cours interactifs, des quiz gamifiés et des projets pratiques
              pour devenir un développeur front-end accompli.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {nextLesson ? (
                <Link href={`/learn/${nextLesson.lesson.id}`}>
                  <Button size="lg" className="gap-2">
                    <Play className="h-4 w-4" />
                    Continuer l&apos;apprentissage
                  </Button>
                </Link>
              ) : (
                <Link href={`/learn/${modules[0].chapters[0].lessons[0].id}`}>
                  <EnhancedButton
                    variant="default"
                    size="lg"
                    animation="bounce"
                    glow
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Commencer maintenant
                  </EnhancedButton>
                </Link>
              )}
              <Link href="/quiz">
                <EnhancedButton
                  variant="outline"
                  size="lg"
                  animation="pulse"
                  className="gap-2 border-gray-300 dark:border-gray-600"
                >
                  <Trophy className="h-4 w-4" />
                  Voir les quiz
                </EnhancedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 place-items-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {modules.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modules
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {modules.reduce((acc, m) => acc + m.chapters.length, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chapitres
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalLessons}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Leçons</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {modules.reduce((acc, m) => acc + m.chapters.length, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Quiz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      {completedLessons > 0 && (
        <section className="border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Votre progression
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {completedLessons} leçons sur {totalLessons} complétées
                    </p>
                    <div className="mt-4">
                      <Progress value={overallProgress} className="h-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {user.xp}
                      </p>
                      <p className="text-xs text-muted-foreground">XP Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {user.level}
                      </p>
                      <p className="text-xs text-muted-foreground">Niveau</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {user.badges.length}
                      </p>
                      <p className="text-xs text-muted-foreground">Badges</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Code Lab */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Code Lab Interactif
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-medium leading-relaxed">
                Pratiquez le codage en temps réel avec notre environnement de
                développement intégré. Écrivez du code, exécutez-le
                instantanément et voyez les résultats directement dans votre
                navigateur.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                    <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Éditeur de code avec coloration syntaxique
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Support JavaScript, TypeScript, JSX avec coloration
                      automatique
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Exécution en temps réel
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Résultats instantanés avec console intégrée
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center shadow-lg">
                    <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Aperçu instantané
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Visualisation en direct du code exécuté
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center shadow-lg">
                    <Terminal className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Console intégrée
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Debuggage et messages d'erreur en temps réel
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/code-lab">
                <EnhancedButton
                  size="lg"
                  animation="bounce"
                  glow
                  className="gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Accéder au Code Lab
                </EnhancedButton>
              </Link>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-mono text-blue-600 dark:text-blue-400">
                      <Terminal className="w-4 h-4" />
                      App.jsx
                    </div>
                    <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm">
                      <div className="text-gray-400">
                        {'import { useState } from "react";'}
                      </div>
                      <div className="text-gray-400">
                        {"export default function App() {"}
                      </div>
                      <div className="text-gray-400">
                        {"  const [count, setCount] = useState(0);"}
                      </div>
                      <div className="text-foreground">{"  return ("}</div>
                      <div className="text-foreground">
                        {'    <div className="p-8">'}
                      </div>
                      <div className="text-foreground">
                        {"      <h1>Compteur: {count}</h1>"}
                      </div>
                      <div className="text-foreground">
                        {"      <button onClick={() => setCount(count + 1)}>"}
                      </div>
                      <div className="text-foreground">
                        {"        Incrémenter"}
                      </div>
                      <div className="text-foreground">{"      </button>"}</div>
                      <div className="text-foreground">{"    </div>"}</div>
                      <div className="text-muted-foreground">{"  );"}</div>
                      <div className="text-muted-foreground">{"}"}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-1">
                        <Play className="w-3 h-3" />
                        Exécuter
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      {nextLesson && (
        <section className="border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Continuer votre parcours
            </h2>
            <Card className="overflow-hidden border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row">
                <div
                  className={cn(
                    "w-full md:w-64 bg-gradient-to-br p-6 flex items-center justify-center",
                    colorMap[nextLesson.module.color],
                  )}
                >
                  {(() => {
                    const Icon = iconMap[nextLesson.module.icon] || BookOpen;
                    return (
                      <Icon
                        className={cn(
                          "h-16 w-16",
                          textColorMap[nextLesson.module.color],
                        )}
                      />
                    );
                  })()}
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {nextLesson.module.title} &bull;{" "}
                        {nextLesson.chapter.title}
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                        {nextLesson.lesson.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {nextLesson.lesson.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {nextLesson.lesson.codeExamples.length} exemples
                        </span>
                      </div>
                    </div>
                    <Link href={`/learn/${nextLesson.lesson.id}`}>
                      <Button className="gap-2">
                        <Play className="h-4 w-4" />
                        Continuer
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Modules Grid */}
      <section className="bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Parcours de formation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                4 modules pour maîtriser React et Tailwind CSS
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((module) => {
              const Icon = iconMap[module.icon] || BookOpen;
              const progress = getModuleProgress(module.chapters);
              const totalLessonsInModule = module.chapters.reduce(
                (acc, ch) => acc + ch.lessons.length,
                0,
              );

              return (
                <Card
                  key={module.id}
                  className={cn(
                    "overflow-hidden border bg-gradient-to-br transition-all hover:shadow-lg",
                    colorMap[module.color],
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-gray-900/80",
                        )}
                      >
                        <Icon
                          className={cn("h-6 w-6", textColorMap[module.color])}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {module.title}
                        </CardTitle>
                        <CardDescription className="mt-1 text-gray-600 dark:text-gray-400">
                          {module.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>{module.chapters.length} chapitres</span>
                      <span>&bull;</span>
                      <span>{totalLessonsInModule} leçons</span>
                      <span>&bull;</span>
                      <span>{module.chapters.length} quiz</span>
                    </div>

                    <div className="space-y-3">
                      {module.chapters.map((chapter, idx) => (
                        <Link
                          key={chapter.id}
                          href={`/learn/${chapter.lessons[0].id}`}
                          className="flex items-center gap-3 rounded-lg bg-background/50 p-3 transition-colors hover:bg-background/80"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                            {idx + 1}
                          </span>
                          <span className="flex-1 text-sm font-medium text-foreground">
                            {chapter.title}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Progression
                        </span>
                        <span className="font-medium text-foreground">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 place-items-center">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 mb-4 mx-auto">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Cours interactifs
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Leçons structurées avec exemples pratiques et exercices
                  guidés.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900 mb-4 mx-auto">
                  <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Quiz gamifiés
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  8 types de questions différents, système de points, badges et
                  classements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 mb-4 mx-auto">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Suivi de progression
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tableau de bord complet avec statistiques, graphiques et
                  recommandations personnalisées.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="border-b-2 border-border bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Badges à débloquer
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 font-medium">
                Complétez des défis pour débloquer des récompenses et badges
                exclusifs
              </p>
            </div>
            <Link href="/dashboard">
              <EnhancedButton
                variant="outline"
                animation="pulse"
                className="gap-2 border-gray-300 dark:border-gray-600"
              >
                Voir tous les badges
                <ChevronRight className="h-4 w-4" />
              </EnhancedButton>
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            {badges.slice(0, 8).map((badge) => {
              const Icon = iconMap[badge.icon] || Star;
              const isUnlocked = user.badges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
                    isUnlocked
                      ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 badge-glow"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-50",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full",
                      isUnlocked
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-gray-100 dark:bg-gray-700",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        isUnlocked
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500",
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{badge.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
