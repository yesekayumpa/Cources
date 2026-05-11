"use client";

import React, { useState, useEffect } from "react";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { Button } from "@/components/ui/button";
import { ProgressEnhanced, CircularProgress } from "@/components/ui/progress-enhanced";
import { useAppStore } from "@/lib/store";
import { extendedModules } from "@/lib/data/extended-course-data";
import { badges } from "@/lib/data/extended-course-data";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Target,
  Clock,
  Flame,
  BookOpen,
  Zap,
  Calendar,
  TrendingUp,
  Award,
  Star,
  Users,
  Activity,
  BarChart3,
  PieChart,
  Eye,
  Play,
  CheckCircle2,
  Lock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export const LearnerDashboard: React.FC = () => {
  const { user, userProgress } = useAppStore();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "all">("week");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Calculate statistics
  const calculateStats = () => {
    const totalLessons = extendedModules.reduce((acc, module) => 
      acc + module.chapters.reduce((acc2, chapter) => acc2 + chapter.lessons.length, 0), 0
    , 0);
    
    const completedLessons = userProgress.completedLessons.length;
    const courseProgress = (completedLessons / totalLessons) * 100;
    
    // Calculate study time (mock data for now)
    const studyTimeThisWeek = userProgress.totalTimeSpent || 0; // Would come from actual tracking
    const averageSessionTime = 45; // Mock data
    
    // Calculate XP needed for next level
    const xpForNextLevel = ((user.level + 1) * 100) - user.xp;
    const currentLevelXP = user.xp - (user.level * 100);
    const levelProgress = (currentLevelXP / 100) * 100;

    return {
      totalLessons,
      completedLessons,
      courseProgress,
      studyTimeThisWeek,
      averageSessionTime,
      xpForNextLevel,
      currentLevelXP,
      levelProgress
    };
  };

  const stats = calculateStats();

  // Generate activity data for charts
  const generateActivityData = () => {
    const days = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 90;
    return Array.from({ length: days }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - index - 1));
      
      // Mock data - would come from actual tracking
      const minutes = Math.floor(Math.random() * 120) + 10;
      
      return {
        date: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        minutes,
        xp: Math.floor(minutes / 10),
        lessons: Math.floor(Math.random() * 3)
      };
    });
  };

  const generateModuleProgressData = () => {
    return extendedModules.map(module => {
      const totalLessons = module.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
      const completedLessons = module.chapters.reduce((acc, chapter) => 
        acc + chapter.lessons.filter(lesson => 
          userProgress.completedLessons.includes(lesson.id)
        ).length, 0);
      
      return {
        name: module.title,
        total: totalLessons,
        completed: completedLessons,
        progress: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
      };
    });
  };

  const generateSkillData = () => {
    // Mock skill data based on completed lessons
    const skills = [
      { skill: "React Basics", level: Math.min(5, Math.floor(user.level / 2) + 1) },
      { skill: "JSX", level: Math.min(5, Math.floor(user.level / 3) + 2) },
      { skill: "Components", level: Math.min(5, Math.floor(user.level / 4) + 1) },
      { skill: "State Management", level: Math.min(5, Math.floor(user.level / 5) + 1) },
      { skill: "Hooks", level: Math.min(5, Math.floor(user.level / 3) + 1) },
      { skill: "Performance", level: Math.min(5, Math.floor(user.level / 6) + 1) },
    ];

    return skills.map(skill => ({
      subject: skill.skill,
      A: skill.level,
      fullMark: 5,
    }));
  };

  const activityData = generateActivityData();
  const moduleProgressData = generateModuleProgressData();
  const skillData = generateSkillData();

  // Get user badges
  const userBadges = badges.filter(badge => user.badges.includes(badge.id));

  // Get recent activity
  const getRecentActivity = () => {
    return userProgress.completedLessons.slice(-5).map(lessonId => {
      let lesson = null;
      let module = null;
      
      for (const mod of extendedModules) {
        for (const chapter of mod.chapters) {
          const found = chapter.lessons.find(l => l.id === lessonId);
          if (found) {
            lesson = found;
            module = mod;
            break;
          }
        }
        if (lesson) break;
      }
      
      return { lesson, module };
    }).filter(Boolean);
  };

  const recentActivity = getRecentActivity();

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground">
                Bienvenue, {user.name} ! Voici votre progression.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full">
                <Flame className="w-4 h-4 text-primary" />
                <span className="font-medium text-primary">{user.streak} jours</span>
              </div>
              
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="border rounded-lg px-3 py-2 bg-background"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="all">Tout le temps</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardEnhanced variant="stat">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progression totale</p>
                <p className="text-2xl font-bold">{Math.round(stats.courseProgress)}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <ProgressEnhanced value={stats.courseProgress} className="mt-3" />
          </CardEnhanced>

          <CardEnhanced variant="stat">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leçons terminées</p>
                <p className="text-2xl font-bold">{stats.completedLessons}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              sur {stats.totalLessons} leçons
            </div>
          </CardEnhanced>

          <CardEnhanced variant="stat">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">XP total</p>
                <p className="text-2xl font-bold">{user.xp}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Niveau {user.level}
            </div>
          </CardEnhanced>

          <CardEnhanced variant="stat">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Temps d'étude</p>
                <p className="text-2xl font-bold">{stats.studyTimeThisWeek}min</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              cette semaine
            </div>
          </CardEnhanced>
        </div>

        {/* Level Progress */}
        <CardEnhanced className="mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Progression vers le niveau suivant</h3>
              <div className="text-sm text-muted-foreground">
                Niveau {user.level} → {user.level + 1}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">XP actuel</span>
                  <span className="font-medium">{user.xp}</span>
                </div>
                <ProgressEnhanced value={stats.levelProgress} className="mb-2" />
                <div className="text-sm text-muted-foreground">
                  {stats.currentLevelXP} / 100 XP
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <CircularProgress
                  value={stats.levelProgress}
                  size={120}
                  label={`${Math.round(stats.levelProgress)}%`}
                />
              </div>
            </div>
          </div>
        </CardEnhanced>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Chart */}
          <CardEnhanced>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activité d'apprentissage
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="minutes" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardEnhanced>

          {/* Module Progress */}
          <CardEnhanced>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Progression par module
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={moduleProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardEnhanced>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <CardEnhanced className="lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Activité récente
              </h3>
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.lesson?.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.module?.title}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.location.href = `/learn/${activity.lesson?.id}`}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Commencez votre apprentissage pour voir votre activité ici !
                  </p>
                )}
              </div>
            </div>
          </CardEnhanced>

          {/* Badges */}
          <CardEnhanced>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Badges obtenus
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {userBadges.length > 0 ? (
                  userBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      title={badge.description}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <p className="text-xs font-medium">{badge.title}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-muted-foreground py-8">
                    Pas de badges encore. Continuez d'apprendre !
                  </div>
                )}
              </div>
            </div>
          </CardEnhanced>
        </div>

        {/* Skills Radar */}
        <CardEnhanced className="mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Compétences développées
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar name="Niveau" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardEnhanced>

        {/* Continue Learning */}
        <CardEnhanced>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Continuer votre apprentissage
            </h3>
            <div className="space-y-3">
              {extendedModules.slice(0, 3).map((module) => {
                const moduleProgress = generateModuleProgressData().find(m => m.name === module.title);
                const nextChapter = module.chapters.find(chapter => {
                  const chapterProgress = chapter.lessons.filter(lesson => 
                    userProgress.completedLessons.includes(lesson.id)
                  ).length;
                  return chapterProgress < chapter.lessons.length;
                });
                
                return (
                  <div key={module.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{module.icon}</span>
                      <div>
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {nextChapter ? `Chapitre : ${nextChapter.title}` : 'Module terminé'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        if (nextChapter && nextChapter.lessons.length > 0) {
                          const nextLesson = nextChapter.lessons.find(lesson => 
                            !userProgress.completedLessons.includes(lesson.id)
                          ) || nextChapter.lessons[0];
                          window.location.href = `/learn/${nextLesson?.id}`;
                        }
                      }}
                    >
                      {moduleProgress?.progress === 100 ? 'Réviser' : 'Continuer'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </CardEnhanced>
      </div>
    </div>
  );
};
