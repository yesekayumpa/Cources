"use client";

import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Star,
  Flame,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Zap,
  Medal,
  Crown,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { modules } from "@/lib/data/course-data";
import { cn } from "@/lib/utils";

const levelThresholds = [
  { level: 1, xp: 0, title: "Débutant" },
  { level: 2, xp: 100, title: "Apprenti" },
  { level: 3, xp: 250, title: "Initié" },
  { level: 4, xp: 500, title: "Pratiquant" },
  { level: 5, xp: 800, title: "Compétent" },
  { level: 6, xp: 1200, title: "Avancé" },
  { level: 7, xp: 1700, title: "Expert" },
  { level: 8, xp: 2300, title: "Maître" },
  { level: 9, xp: 3000, title: "Grand Maître" },
  { level: 10, xp: 4000, title: "Légende" },
];

const allBadges = [
  {
    id: "first-lesson",
    name: "Premier Pas",
    description: "Compléter votre première leçon",
    icon: BookOpen,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    id: "first-quiz",
    name: "Première Évaluation",
    description: "Réussir votre premier quiz",
    icon: Target,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    id: "perfect-score",
    name: "Perfection",
    description: "Obtenir 100% à un quiz",
    icon: Star,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    id: "streak-3",
    name: "En Série",
    description: "3 jours consécutifs d'apprentissage",
    icon: Flame,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    id: "streak-7",
    name: "Semaine Parfaite",
    description: "7 jours consécutifs d'apprentissage",
    icon: Flame,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    id: "module-complete",
    name: "Module Maîtrisé",
    description: "Compléter un module entier",
    icon: Trophy,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: "xp-500",
    name: "Collectionneur XP",
    description: "Accumuler 500 XP",
    icon: Zap,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    id: "xp-1000",
    name: "Maître XP",
    description: "Accumuler 1000 XP",
    icon: Crown,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    id: "course-complete",
    name: "Diplômé",
    description: "Compléter le cours entier",
    icon: Medal,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

export default function ProgressPage() {
  const { userProgress } = useAppStore();

  // Calculate current level
  const currentLevelData =
    levelThresholds
      .slice()
      .reverse()
      .find((l) => userProgress.totalXP >= l.xp) || levelThresholds[0];
  const nextLevelData = levelThresholds[currentLevelData.level] || null;
  const xpForNextLevel = nextLevelData
    ? nextLevelData.xp - userProgress.totalXP
    : 0;
  const levelProgress = nextLevelData
    ? ((userProgress.totalXP - currentLevelData.xp) /
        (nextLevelData.xp - currentLevelData.xp)) *
      100
    : 100;

  // Calculate course progress
  const totalLessons = modules.reduce(
    (acc, mod) =>
      acc + mod.chapters.reduce((acc2, chap) => acc2 + chap.lessons.length, 0),
    0,
  );
  const completedLessons = userProgress.completedLessons.length;
  const courseProgress = (completedLessons / totalLessons) * 100;

  // Calculate quiz stats
  const quizScores = Object.values(userProgress.quizScores);
  const averageScore =
    quizScores.length > 0
      ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length
      : 0;
  const perfectQuizzes = quizScores.filter((s) => s === 100).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour au cours
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-foreground">
                Ma Progression
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">
                  {userProgress.totalXP} XP
                </span>
              </div>
              <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-full">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-semibold text-orange-500">
                  {userProgress.streak} jours
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Level Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary/20 via-card to-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {currentLevelData.level}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1">
                  <Crown className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground">
                  {currentLevelData.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  Niveau {currentLevelData.level}
                </p>
                {nextLevelData && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Progression vers niveau {nextLevelData.level}
                      </span>
                      <span className="text-foreground font-medium">
                        {xpForNextLevel} XP restants
                      </span>
                    </div>
                    <Progress value={levelProgress} className="h-3" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-card/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-foreground">
                    {userProgress.totalXP}
                  </p>
                  <p className="text-xs text-muted-foreground">XP Total</p>
                </div>
                <div className="bg-card/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-foreground">
                    {userProgress.streak}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Série actuelle
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-foreground">
                    {completedLessons}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Leçons complétées
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-400" />
                  <p className="text-2xl font-bold text-foreground">
                    {quizScores.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Quiz réussis</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(averageScore)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Score moyen</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-2xl font-bold text-foreground">
                    {perfectQuizzes}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Scores parfaits
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Progression du cours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progression globale
                    </span>
                    <span className="text-foreground font-medium">
                      {completedLessons}/{totalLessons} leçons
                    </span>
                  </div>
                  <Progress value={courseProgress} className="h-3" />
                </div>

                {/* Module Progress */}
                <div className="space-y-4">
                  {modules.map((module) => {
                    const moduleLessons = module.chapters.flatMap(
                      (c) => c.lessons,
                    );
                    const moduleCompleted = moduleLessons.filter((l) =>
                      userProgress.completedLessons.includes(l.id),
                    ).length;
                    const moduleProgress =
                      (moduleCompleted / moduleLessons.length) * 100;

                    return (
                      <div key={module.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">
                            {module.title}
                          </span>
                          <span className="text-muted-foreground">
                            {moduleCompleted}/{moduleLessons.length}
                          </span>
                        </div>
                        <Progress value={moduleProgress} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProgress.completedLessons.length > 0 ? (
                  <div className="space-y-3">
                    {userProgress.completedLessons.slice(-5).map((lessonId) => {
                      let lesson = null;
                      for (const mod of modules) {
                        for (const chap of mod.chapters) {
                          const found = chap.lessons.find(
                            (l) => l.id === lessonId,
                          );
                          if (found) {
                            lesson = found;
                            break;
                          }
                        }
                        if (lesson) break;
                      }
                      if (!lesson) return null;

                      return (
                        <div
                          key={lessonId}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Leçon complétée
                            </p>
                          </div>
                          {userProgress.quizScores[lessonId] && (
                            <Badge variant="secondary">
                              {userProgress.quizScores[lessonId]}%
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune activité récente. Commencez à apprendre !
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Collection de badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allBadges.map((badge) => {
                    const isUnlocked = userProgress.badges.includes(badge.id);
                    const Icon = badge.icon;

                    return (
                      <div
                        key={badge.id}
                        className={cn(
                          "relative p-4 rounded-xl border transition-all",
                          isUnlocked
                            ? "bg-card border-border"
                            : "bg-muted/30 border-border/50 opacity-60",
                        )}
                      >
                        {!isUnlocked && (
                          <div className="absolute top-2 right-2">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                            isUnlocked ? badge.bgColor : "bg-muted",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-6 w-6",
                              isUnlocked
                                ? badge.color
                                : "text-muted-foreground",
                            )}
                          />
                        </div>
                        <h3
                          className={cn(
                            "font-semibold mb-1",
                            isUnlocked
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {badge.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {badge.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Historique des quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(userProgress.quizScores).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(userProgress.quizScores).map(
                      ([lessonId, score]) => {
                        let lesson = null;
                        for (const mod of modules) {
                          for (const chap of mod.chapters) {
                            const found = chap.lessons.find(
                              (l) => l.id === lessonId,
                            );
                            if (found) {
                              lesson = found;
                              break;
                            }
                          }
                          if (lesson) break;
                        }
                        if (!lesson) return null;

                        return (
                          <div
                            key={lessonId}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                score >= 80
                                  ? "bg-green-500/10 text-green-500"
                                  : score >= 60
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : "bg-red-500/10 text-red-500",
                              )}
                            >
                              <Target className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Quiz complété
                              </p>
                            </div>
                            <div className="text-right">
                              <p
                                className={cn(
                                  "text-lg font-bold",
                                  score >= 80
                                    ? "text-green-500"
                                    : score >= 60
                                      ? "text-yellow-500"
                                      : "text-red-500",
                                )}
                              >
                                {score}%
                              </p>
                              {score === 100 && (
                                <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                  Parfait !
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Aucun quiz complété. Commencez à vous évaluer !
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
