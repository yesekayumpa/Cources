"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Star,
  Target,
  Flame,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Medal,
  Crown,
  Gem,
  Shield,
  Zap,
  Heart,
  Brain,
  Rocket,
  Code,
  Palette,
  Users,
  BarChart3,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { useAppStore } from "@/lib/store";
import { extendedModules } from "@/lib/data/extended-course-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Star,
  Target,
  Flame,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Medal,
  Crown,
  Gem,
  Shield,
  Zap,
  Heart,
  Brain,
  Rocket,
  Code,
  Palette,
  Users,
  BarChart3,
  Activity,
};

const rarityColors: Record<string, string> = {
  common: "bg-gray-100 text-gray-800 border-gray-200",
  rare: "bg-blue-100 text-blue-800 border-blue-200",
  epic: "bg-purple-100 text-purple-800 border-purple-200",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export default function DashboardPage() {
  const { user, userProgress, quizResults, lessonProgress } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calculer les statistiques
  const completedLessons = lessonProgress.filter((p) => p.completed).length;
  const totalLessons = extendedModules.reduce(
    (sum, module) =>
      sum + module.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0),
    0,
  );
  const completedQuizzes = quizResults.length;
  const totalXP = user.xp;
  const currentLevel = Math.floor(totalXP / 100) + 1;
  const xpForNextLevel = currentLevel * 100;
  const xpProgress = ((totalXP % 100) / 100) * 100;

  // Badges disponibles
  const allBadges = extendedModules.flatMap((module) =>
    module.chapters.flatMap((chapter) => chapter.badges || []),
  );

  // Badges obtenus
  const earnedBadges = allBadges.filter((badge) =>
    user.badges.includes(badge.id),
  );

  // Filtrer les badges par catégorie
  const filteredBadges = selectedCategory
    ? allBadges.filter((badge) => badge.category === selectedCategory)
    : allBadges;

  const categories = Array.from(
    new Set(allBadges.map((badge) => badge.category)),
  );

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Suivez votre progression et vos accomplissements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {completedLessons}/{totalLessons}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Leçons complétées
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-full">
                  <Trophy className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {completedQuizzes}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quiz complétés
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-warning/10 rounded-full">
                  <Star className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {totalXP}
                  </p>
                  <p className="text-sm text-muted-foreground">Points XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-info/10 rounded-full">
                  <Flame className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {user.streak}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Jours consécutifs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-warning" />
              Niveau {currentLevel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Progression vers le niveau {currentLevel + 1}</span>
                <span>{totalXP % 100} / 100 XP</span>
              </div>
              <Progress value={xpProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Badges</h2>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === null ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Tous
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "secondary" : "ghost"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map((badge) => {
              const isEarned = user.badges.includes(badge.id);
              const IconComponent = iconMap[badge.icon] || Trophy;

              return (
                <Card
                  key={badge.id}
                  className={cn(
                    "transition-all hover:shadow-md",
                    isEarned
                      ? "border-primary/50 bg-primary/5"
                      : "opacity-60 grayscale",
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "p-3 rounded-full",
                          isEarned
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">
                            {badge.title}
                          </h3>
                          <span
                            className={cn(
                              "px-2 py-1 text-xs rounded-full border",
                              rarityColors[badge.rarity],
                            )}
                          >
                            {badge.rarity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {badge.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            +{badge.xpReward} XP
                          </span>
                          {isEarned && (
                            <div className="flex items-center gap-1 text-success">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs">Obtenu</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizResults
                .slice(-5)
                .reverse()
                .map((result, index) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Trophy className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Quiz complété
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {result.percentage}% de réussite
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        +{Math.round(result.percentage * 0.5)} XP
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
}
