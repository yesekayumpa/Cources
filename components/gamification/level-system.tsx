"use client";

import React, { useState, useEffect } from "react";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { ProgressEnhanced, CircularProgress } from "@/components/ui/progress-enhanced";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Star,
  Zap,
  Crown,
  Target,
  Flame,
  Sparkles,
  TrendingUp,
  Award,
  Gift,
  Lock,
  Unlock,
} from "lucide-react";

interface LevelSystemProps {
  showDetails?: boolean;
  compact?: boolean;
}

export const LevelSystem: React.FC<LevelSystemProps> = ({
  showDetails = true,
  compact = false
}) => {
  const { user, userProgress } = useAppStore();
  const [animatedXP, setAnimatedXP] = useState(user.xp);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Level thresholds
  const levelThresholds = [
    { level: 1, xp: 0, title: "Débutant", icon: "🥚", color: "gray" },
    { level: 2, xp: 100, title: "Apprenti", icon: "🐣", color: "green" },
    { level: 3, xp: 250, title: "Initié", icon: "🌱", color: "green" },
    { level: 4, xp: 500, title: "Pratiquant", icon: "🦊", color: "blue" },
    { level: 5, xp: 800, title: "Compétent", icon: "🦉", color: "blue" },
    { level: 6, xp: 1200, title: "Avancé", icon: "🦅", color: "purple" },
    { level: 7, xp: 1700, title: "Expert", icon: "🐉", color: "purple" },
    { level: 8, xp: 2300, title: "Maître", icon: "👑", color: "orange" },
    { level: 9, xp: 3000, title: "Grand Maître", icon: "⭐", color: "yellow" },
    { level: 10, xp: 4000, title: "Légende", icon: "🌟", color: "yellow" },
  ];

  // Calculate current and next level
  const getCurrentLevel = () => {
    return levelThresholds.reduce((current, threshold) => {
      return user.xp >= threshold.xp ? threshold : current;
    }, levelThresholds[0]);
  };

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const currentIndex = levelThresholds.findIndex(l => l.level === currentLevel.level);
    return currentIndex < levelThresholds.length - 1 ? levelThresholds[currentIndex + 1] : null;
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const xpForNextLevel = nextLevel ? nextLevel.xp - user.xp : 0;
  const xpInCurrentLevel = user.xp - currentLevel.xp;
  const xpNeededForCurrentLevel = nextLevel ? nextLevel.xp - currentLevel.xp : 0;
  const levelProgress = xpNeededForCurrentLevel > 0 ? (xpInCurrentLevel / xpNeededForCurrentLevel) * 100 : 100;

  // Animate XP changes
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedXP(prev => {
        const diff = user.xp - prev;
        if (Math.abs(diff) <= 1) {
          clearInterval(timer);
          return user.xp;
        }
        return prev + Math.sign(diff) * Math.min(Math.abs(diff), 10);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [user.xp]);

  // Check for level up
  useEffect(() => {
    const previousLevel = levelThresholds.reduce((current, threshold) => {
      return animatedXP >= threshold.xp ? threshold : current;
    }, levelThresholds[0]);

    if (previousLevel.level < currentLevel.level) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [animatedXP, currentLevel.level]);

  const getLevelColor = (level: number) => {
    const threshold = levelThresholds.find(t => t.level === level);
    return threshold?.color || "gray";
  };

  const renderCompactView = () => (
    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="text-center">
        <div className="text-3xl mb-1">{currentLevel.icon}</div>
        <div className="text-sm font-medium">Niveau {currentLevel.level}</div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">XP</span>
          <span className="font-bold text-lg">{animatedXP}</span>
        </div>
        <ProgressEnhanced value={levelProgress} size="sm" />
        <div className="text-xs text-muted-foreground mt-1">
          {xpForNextLevel > 0 ? `${xpForNextLevel} XP pour le niveau suivant` : "Niveau maximum"}
        </div>
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-6">
      {/* Current Level Card */}
      <CardEnhanced variant="achievement" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-transparent rounded-bl-full"></div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Niveau {currentLevel.level}</h3>
              <p className="text-lg text-muted-foreground">{currentLevel.title}</p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-2 animate-bounce">{currentLevel.icon}</div>
              <div className="text-sm text-muted-foreground">Niveau actuel</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">XP actuel</span>
                <span className="font-bold text-xl">{animatedXP}</span>
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">
                XP dans ce niveau: {xpInCurrentLevel} / {xpNeededForCurrentLevel}
              </div>
              
              <ProgressEnhanced value={levelProgress} className="mb-2" />
              
              {xpForNextLevel > 0 && (
                <div className="text-sm font-medium text-primary">
                  +{xpForNextLevel} XP pour le niveau suivant
                </div>
              )}
            </div>
            
            <div className="text-center">
              <CircularProgress
                value={levelProgress}
                size={120}
                label={`${Math.round(levelProgress)}%`}
              />
            </div>
          </div>
        </div>
      </CardEnhanced>

      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2 text-primary">Niveau Supérieur !</h2>
            <p className="text-xl mb-4">Vous êtes maintenant niveau {currentLevel.level}</p>
            <div className="text-4xl mb-4">{currentLevel.icon}</div>
            <p className="text-lg text-muted-foreground">{currentLevel.title}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-primary">
              <Sparkles className="w-4 h-4" />
              Nouveaux déblocages disponibles !
            </div>
          </div>
        </div>
      )}

      {/* Next Level Preview */}
      {nextLevel && (
        <CardEnhanced variant="default">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Prochain niveau</h3>
              <div className="text-center">
                <div className="text-3xl mb-1 opacity-50">{nextLevel.icon}</div>
                <div className="text-sm text-muted-foreground">Niveau {nextLevel.level}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Titre</span>
                <span className="font-medium">{nextLevel.title}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">XP requis</span>
                <span className="font-medium">{nextLevel.xp}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">XP restants</span>
                <span className="font-medium text-primary">{xpForNextLevel}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                Atteignez {nextLevel.xp} XP pour débloquer ce niveau
              </div>
            </div>
          </div>
        </CardEnhanced>
      )}

      {/* Level Path */}
      <CardEnhanced variant="default">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Parcours de niveaux
          </h3>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {levelThresholds.map((threshold, index) => {
              const isCompleted = user.xp >= threshold.xp;
              const isCurrent = threshold.level === currentLevel.level;
              const isLocked = !isCompleted && !isCurrent;
              
              return (
                <div key={threshold.level} className="flex-shrink-0">
                  <div className={cn(
                    "relative flex flex-col items-center",
                    isLocked && "opacity-50"
                  )}>
                    <div className={cn(
                      "w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl mb-2",
                      isCompleted ? "bg-green-100 border-green-300" :
                      isCurrent ? "bg-primary border-primary ring-2 ring-primary/50" :
                      "bg-muted border-muted-foreground/30"
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <div className="text-lg font-bold">{threshold.level}</div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <div className={cn(
                        "text-2xl mb-1",
                        isLocked && "grayscale"
                      )}>
                        {threshold.icon}
                      </div>
                      <div className="text-xs font-medium">
                        {threshold.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {threshold.xp} XP
                      </div>
                    </div>
                    
                    {/* Connector */}
                    {index < levelThresholds.length - 1 && (
                      <div className={cn(
                        "absolute top-8 left-full w-8 h-0.5 -ml-4",
                        isCompleted ? "bg-green-400" : "bg-muted-foreground/30"
                      )}></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardEnhanced>

      {/* XP History */}
      <CardEnhanced variant="default">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Statistiques XP
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{user.xp}</div>
              <div className="text-sm text-muted-foreground">XP Total</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{xpInCurrentLevel}</div>
              <div className="text-sm text-muted-foreground">XP ce niveau</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">{xpForNextLevel}</div>
              <div className="text-sm text-muted-foreground">XP restants</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gain moyen par session</span>
              <span className="font-medium text-primary">+25 XP</span>
            </div>
          </div>
        </div>
      </CardEnhanced>
    </div>
  );

  return (
    <div className="space-y-6">
      {compact ? renderCompactView() : renderDetailedView()}
    </div>
  );
};
