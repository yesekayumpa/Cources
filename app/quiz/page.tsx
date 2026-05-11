"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { modules, quizzes } from "@/lib/data/course-data";
import {
  BookOpen,
  Trophy,
  Clock,
  Target,
  Zap,
  Play,
  ArrowRight,
  Code,
  Lightbulb,
  Bug,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuizIndexPage() {
  // Group quizzes by module
  const quizzesByModule = modules.map((module) => {
    const moduleQuizzes = quizzes.filter((quiz) => {
      const chapter = module.chapters.find((ch) => ch.id === quiz.chapterId);
      return !!chapter;
    });

    return {
      module,
      quizzes: moduleQuizzes,
      totalQuizzes: moduleQuizzes.length,
      completedQuizzes: 0, // TODO: Implémenter le suivi de progression
    };
  });

  const totalQuizzes = quizzes.length;
  const completedQuizzes = 0; // TODO: Implémenter le suivi de progression

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Quiz disponibles
              </h1>
              <p className="text-muted-foreground">
                Testez vos connaissances sur React et Tailwind CSS
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                {completedQuizzes}/{totalQuizzes} complétés
              </span>
              <div className="w-px-4 h-4 bg-primary/20 rounded-full ml-4">
                <div
                  className="h-4 bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: `${(completedQuizzes / totalQuizzes) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardEnhanced variant="stat">
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h3 className="text-2xl font-bold">{totalQuizzes}</h3>
              <p className="text-muted-foreground">Quiz totaux</p>
            </div>
          </CardEnhanced>

          <CardEnhanced variant="stat">
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-2xl font-bold">{completedQuizzes}</h3>
              <p className="text-muted-foreground">Quiz complétés</p>
            </div>
          </CardEnhanced>

          <CardEnhanced variant="stat">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h3 className="text-2xl font-bold">
                {totalQuizzes - completedQuizzes}
              </h3>
              <p className="text-muted-foreground">À faire</p>
            </div>
          </CardEnhanced>
        </div>

        {/* Modules and Quizzes */}
        <div className="space-y-8">
          {/* Quiz Traditionnels */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Quiz Traditionnels
            </h2>
            <div className="space-y-8">
              {quizzesByModule.map(
                ({ module, quizzes, totalQuizzes, completedQuizzes }) => (
                  <div key={module.id} className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{module.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold">{module.title}</h2>
                        <p className="text-muted-foreground">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {completedQuizzes}/{totalQuizzes} complétés
                        </span>
                        <div className="w-32">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 transition-all"
                              style={{
                                width: `${(completedQuizzes / totalQuizzes) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {quizzes.map((quiz) => (
                        <CardEnhanced
                          key={quiz.id}
                          variant="lesson"
                          className="hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <Link href={`/quiz/${quiz.id.replace("quiz-", "")}`}>
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold text-foreground mb-1">
                                    {quiz.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {quiz.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {quiz.completedQuizzes &&
                                    quiz.completedQuizzes.length > 0 && (
                                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <ArrowRight className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {quiz.questions.length} questions
                                </span>
                                <span className="text-muted-foreground">
                                  {quiz.timeLimit} min
                                </span>
                              </div>
                            </div>
                          </Link>
                        </CardEnhanced>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Application d'Apprentissage React & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
