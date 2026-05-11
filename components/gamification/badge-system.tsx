"use client";

import React, { useState, useEffect } from "react";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { Button } from "@/components/ui/button";
import { ModalEnhanced } from "@/components/ui/modal-enhanced";
import { ProgressEnhanced } from "@/components/ui/progress-enhanced";
import { useAppStore } from "@/lib/store";
import { badges } from "@/lib/data/extended-course-data";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Star,
  Lock,
  Unlock,
  Zap,
  Flame,
  Target,
  Award,
  Crown,
  Sparkles,
  CheckCircle2,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface BadgeSystemProps {
  showUnlocked?: boolean;
  compact?: boolean;
}

export const BadgeSystem: React.FC<BadgeSystemProps> = ({
  showUnlocked = true,
  compact = false
}) => {
  const { user, userProgress } = useAppStore();
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  // Calculate user badges and achievements
  const userBadges = badges.filter(badge => user.badges.includes(badge.id));
  const lockedBadges = badges.filter(badge => !user.badges.includes(badge.id));
  
  const filteredBadges = filter === "all" ? badges :
                        filter === "unlocked" ? userBadges :
                        lockedBadges;

  // Calculate achievements
  const calculateAchievements = () => {
    const totalLessons = 50; // Would come from course data
    const completedLessons = userProgress.completedLessons.length;
    const courseProgress = (completedLessons / totalLessons) * 100;
    
    return [
      {
        id: "first-steps",
        title: "Premiers Pas",
        description: "Compléter votre première leçon",
        icon: "🎯",
        progress: completedLessons > 0 ? 100 : 0,
        unlocked: completedLessons > 0,
        category: "learning"
      },
      {
        id: "week-warrior",
        title: "Guerrier de la Semaine",
        description: "7 jours d'étude consécutifs",
        icon: "🔥",
        progress: Math.min((user.streak / 7) * 100, 100),
        unlocked: user.streak >= 7,
        category: "streak"
      },
      {
        id: "quiz-master",
        title: "Maître du Quiz",
        description: "Obtenir 100% à 5 quiz différents",
        icon: "🏆",
        progress: Math.min((userBadges.filter(b => b.id.includes("perfect")).length / 5) * 100, 100),
        unlocked: userBadges.filter(b => b.id.includes("perfect")).length >= 5,
        category: "precision"
      },
      {
        id: "speed-demon",
        title: "Démon de la Vitesse",
        description: "Compléter un quiz en moins de la moitié du temps",
        icon: "⚡",
        progress: userBadges.some(b => b.id === "badge-speed-demon") ? 100 : 0,
        unlocked: user.badges.includes("badge-speed-demon"),
        category: "speed"
      },
      {
        id: "knowledge-seeker",
        title: "Chercheur de Savoir",
        description: "Compléter 50% du cours",
        icon: "📚",
        progress: Math.min(courseProgress, 100),
        unlocked: courseProgress >= 50,
        category: "learning"
      },
      {
        id: "course-master",
        title: "Maître du Cours",
        description: "Compléter 100% du cours",
        icon: "👑",
        progress: Math.min(courseProgress, 100),
        unlocked: courseProgress >= 100,
        category: "learning"
      }
    ];
  };

  const achievements = calculateAchievements();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "border-gray-300 bg-gray-50";
      case "rare": return "border-blue-300 bg-blue-50";
      case "epic": return "border-purple-300 bg-purple-50";
      case "legendary": return "border-yellow-300 bg-yellow-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-600";
      case "rare": return "text-blue-600";
      case "epic": return "text-purple-600";
      case "legendary": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "learning": return <BookOpen className="w-4 h-4" />;
      case "speed": return <Zap className="w-4 h-4" />;
      case "precision": return <Target className="w-4 h-4" />;
      case "streak": return <Flame className="w-4 h-4" />;
      case "special": return <Star className="w-4 h-4" />;
      case "competition": return <Trophy className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const renderBadgeCard = (badge: any) => {
    const isUnlocked = user.badges.includes(badge.id);
    
    if (compact) {
      return (
        <div
          key={badge.id}
          className={cn(
            "relative group cursor-pointer transition-all duration-200 hover:scale-105",
            !isUnlocked && "opacity-50"
          )}
          onClick={() => setSelectedBadge(badge)}
        >
          <div className={cn(
            "w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl",
            getRarityColor(badge.rarity),
            isUnlocked && "ring-2 ring-offset-2 " + (
              badge.rarity === "legendary" ? "ring-yellow-400" :
              badge.rarity === "epic" ? "ring-purple-400" :
              badge.rarity === "rare" ? "ring-blue-400" :
              "ring-gray-400"
            )
          )}>
            {isUnlocked ? badge.icon : <Lock className="w-6 h-6" />}
          </div>
          
          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            <div className="bg-gray-900 text-white p-2 rounded-lg text-xs whitespace-nowrap">
              <div className="font-medium">{badge.title}</div>
              <div className="text-gray-300">{badge.description}</div>
              <div className="text-yellow-400">+{badge.xpReward} XP</div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      );
    }

    return (
      <CardEnhanced
        key={badge.id}
        variant="default"
        interactive
        className={cn(
          "cursor-pointer transition-all duration-200 hover:scale-105",
          !isUnlocked && "opacity-60"
        )}
        onClick={() => setSelectedBadge(badge)}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-20 h-20 rounded-full border-2 flex items-center justify-center text-3xl flex-shrink-0",
            getRarityColor(badge.rarity),
            isUnlocked && "ring-2 ring-offset-2 " + (
              badge.rarity === "legendary" ? "ring-yellow-400" :
              badge.rarity === "epic" ? "ring-purple-400" :
              badge.rarity === "rare" ? "ring-blue-400" :
              "ring-gray-400"
            )
          )}>
            {isUnlocked ? (
              <div className="relative">
                {badge.icon}
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400" />
              </div>
            ) : (
              <Lock className="w-8 h-8" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{badge.title}</h3>
              <div className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getRarityColor(badge.rarity),
                getRarityTextColor(badge.rarity)
              )}>
                {badge.rarity === "common" ? "Commun" :
                 badge.rarity === "rare" ? "Rare" :
                 badge.rarity === "epic" ? "Épique" :
                 badge.rarity === "legendary" ? "Légendaire" : "Commun"}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {badge.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                {getCategoryIcon(badge.category)}
                <span className="capitalize">{badge.category}</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                <Zap className="w-4 h-4" />
                +{badge.xpReward} XP
              </div>
            </div>
          </div>
        </div>
      </CardEnhanced>
    );
  };

  const renderAchievementCard = (achievement: any) => {
    return (
      <CardEnhanced
        key={achievement.id}
        variant={achievement.unlocked ? "achievement" : "default"}
        className="mb-4"
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-2xl",
            achievement.unlocked ? "bg-yellow-100" : "bg-muted"
          )}>
            {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6" />}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{achievement.title}</h3>
              {achievement.unlocked && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {achievement.description}
            </p>
            
            <ProgressEnhanced
              value={achievement.progress}
              size="sm"
              className="mb-2"
            />
            
            <div className="text-xs text-muted-foreground">
              {achievement.progress}% complété
            </div>
          </div>
        </div>
      </CardEnhanced>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Badges et Achievements
          </h2>
          <p className="text-muted-foreground">
            Collectionnez des badges et débloquez des achievements en apprenant
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{userBadges.length} / {badges.length} badges</span>
          <span>•</span>
          <span>{achievements.filter(a => a.unlocked).length} / {achievements.length} achievements</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "all", label: "Tous", count: badges.length },
          { id: "unlocked", label: "Débloqués", count: userBadges.length },
          { id: "locked", label: "Verrouillés", count: lockedBadges.length }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={filter === tab.id ? "secondary" : "outline"}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label} ({tab.count})
          </Button>
        ))}
      </div>

      {/* Achievements Progress */}
      <CardEnhanced className="mb-8">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Objectifs de progression
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(renderAchievementCard)}
          </div>
        </div>
      </CardEnhanced>

      {/* Badges Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Collection de badges
        </h3>
        
        {compact ? (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filteredBadges.map(renderBadgeCard)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBadges.map(renderBadgeCard)}
          </div>
        )}
      </div>

      {/* Badge Detail Modal */}
      <ModalEnhanced
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
        title={selectedBadge?.title}
        size="md"
      >
        {selectedBadge && (
          <div className="space-y-4">
            <div className="text-center">
              <div className={cn(
                "w-24 h-24 rounded-full border-2 flex items-center justify-center text-5xl mx-auto",
                getRarityColor(selectedBadge.rarity),
                user.badges.includes(selectedBadge.id) && "ring-4 ring-offset-2 " + (
                  selectedBadge.rarity === "legendary" ? "ring-yellow-400" :
                  selectedBadge.rarity === "epic" ? "ring-purple-400" :
                  selectedBadge.rarity === "rare" ? "ring-blue-400" :
                  "ring-gray-400"
                )
              )}>
                {user.badges.includes(selectedBadge.id) ? (
                  <div className="relative">
                    {selectedBadge.icon}
                    <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-yellow-400" />
                  </div>
                ) : (
                  <Lock className="w-12 h-12" />
                )}
              </div>
              
              <h3 className="text-xl font-bold mt-4">{selectedBadge.title}</h3>
              <div className={cn(
                "inline-block px-3 py-1 rounded-full text-sm font-medium mt-2",
                getRarityColor(selectedBadge.rarity),
                getRarityTextColor(selectedBadge.rarity)
              )}>
                {selectedBadge.rarity === "common" ? "Commun" :
                 selectedBadge.rarity === "rare" ? "Rare" :
                 selectedBadge.rarity === "epic" ? "Épique" :
                 selectedBadge.rarity === "legendary" ? "Légendaire" : "Commun"}
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-muted-foreground">{selectedBadge.description}</p>
              
              <div className="flex items-center gap-2">
                {getCategoryIcon(selectedBadge.category)}
                <span className="capitalize">{selectedBadge.category}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Zap className="w-4 h-4" />
                +{selectedBadge.xpReward} XP
              </div>
            </div>
            
            {!user.badges.includes(selectedBadge.id) && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Continuez d'apprendre pour débloquer ce badge !
                </p>
              </div>
            )}
          </div>
        )}
      </ModalEnhanced>
    </div>
  );
};
