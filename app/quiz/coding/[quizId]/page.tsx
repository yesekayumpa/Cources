"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { CodingQuiz } from "@/components/quiz/coding-quiz";
import { codingExercises } from "@/lib/data/coding-exercises";
import { useAppStore } from "@/lib/store";
import {
  Clock,
  Trophy,
  Target,
  Code,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BookOpen,
  RotateCcw,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CodingQuizData {
  id: string;
  title: string;
  description: string;
  exercises: string[];
  totalTime: number;
  passingScore: number;
  maxAttempts: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  xpReward: number;
  tags: string[];
}

// Données des quiz de codage
const codingQuizzes: CodingQuizData[] = [
  {
    id: "react-basics-001",
    title: "Quiz Pratique : React Basics",
    description:
      "Testez vos connaissances fondamentales de React avec des exercices pratiques",
    exercises: ["hello-world-001", "button-001", "counter-001"],
    totalTime: 15,
    passingScore: 70,
    maxAttempts: 3,
    difficulty: "beginner",
    xpReward: 150,
    tags: ["React", "useState", "Components"],
  },
  {
    id: "react-intermediate-001",
    title: "Quiz Pratique : React Intermediary",
    description:
      "Approfondissez vos compétences React avec des exercices plus complexes",
    exercises: ["todo-list-001", "form-001"],
    totalTime: 25,
    passingScore: 75,
    maxAttempts: 3,
    difficulty: "intermediate",
    xpReward: 250,
    tags: ["React", "Forms", "State Management"],
  },
  {
    id: "react-advanced-001",
    title: "Quiz Pratique : React Advanced",
    description: "Défiez-vous avec des exercices avancés et patterns complexes",
    exercises: ["dashboard-001", "theme-toggle-001"],
    totalTime: 35,
    passingScore: 80,
    maxAttempts: 2,
    difficulty: "advanced",
    xpReward: 400,
    tags: ["React", "Advanced", "Patterns"],
  },
  {
    id: "react-expert-001",
    title: "Quiz Pratique : React Expert",
    description:
      "Testez votre maîtrise de React avec des exercices de niveau expert",
    exercises: ["infinite-scroll-001"],
    totalTime: 30,
    passingScore: 85,
    maxAttempts: 2,
    difficulty: "expert",
    xpReward: 600,
    tags: ["React", "Expert", "Performance"],
  },
];

function CodingQuizContent() {
  const params = useParams();
  const router = useRouter();
  const { user, saveQuizResult, getQuizAttemptCount } = useAppStore();

  const [quizData, setQuizData] = useState<CodingQuizData | null>(null);
  const [exercises, setExercises] = useState(codingExercises);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [quizState, setQuizState] = useState<
    "intro" | "in-progress" | "completed"
  >("intro");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [exerciseScores, setExerciseScores] = useState<number[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const quizId = params.quizId as string;
    const quiz = codingQuizzes.find((q) => q.id === quizId);

    if (quiz) {
      setQuizData(quiz);
      const quizExercises = codingExercises.filter((ex) =>
        quiz.exercises.includes(ex.id),
      );
      setExercises(quizExercises);
      setTimeRemaining(quiz.totalTime * 60);
      setAttemptCount(getQuizAttemptCount(quizId));
    }
  }, [params.quizId, getQuizAttemptCount]);

  const startQuiz = () => {
    setQuizState("in-progress");
    setCurrentExerciseIndex(0);
    setOverallScore(0);
    setExerciseScores([]);
  };

  const handleExerciseComplete = (score: number, results: any[]) => {
    const newScores = [...exerciseScores];
    newScores[currentExerciseIndex] = score;
    setExerciseScores(newScores);

    // Calculer le score global
    const totalScore =
      newScores.reduce((sum, s) => sum + s, 0) / (currentExerciseIndex + 1);
    setOverallScore(totalScore);

    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Quiz terminé
      setQuizState("completed");
      setShowResults(true);

      // Sauvegarder le résultat
      if (quizData) {
        saveQuizResult({
          moduleId: "",
          userId: "user-1",
          quizId: quizData.id,
          score: Math.round(totalScore),
          maxScore: 100,
          percentage: Math.round(totalScore),
          timeSpent: quizData.totalTime * 60 - timeRemaining,
          answers: results.map((r) => ({
            questionId: r.test.id,
            answer: r.passed ? "correct" : "incorrect",
            correct: r.passed,
          })),
          completedAt: new Date(),
        });
      }
    }
  };

  const handleExerciseProgress = (exerciseId: string, progress: number) => {
    // Logique pour suivre la progression
    console.log(`Exercise ${exerciseId} progress: ${progress}%`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-orange-100 text-orange-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "🌿";
      case "advanced":
        return "🌳";
      case "expert":
        return "🏆";
      default:
        return "📚";
    }
  };

  if (!quizData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-bold mb-2">Quiz non trouvé</h1>
          <p className="text-muted-foreground mb-4">
            Le quiz de codage demandé n'existe pas.
          </p>
          <Button onClick={() => router.push("/quiz")}>Retour aux quiz</Button>
        </div>
      </div>
    );
  }

  if (quizState === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/quiz")}
              className="mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Retour aux quiz
            </Button>

            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Code className="w-8 h-8 text-primary" />
                {quizData.title}
              </h1>
              <Badge
                variant="outline"
                className={getDifficultyColor(quizData.difficulty)}
              >
                {getDifficultyIcon(quizData.difficulty)} {quizData.difficulty}
              </Badge>
            </div>

            <p className="text-muted-foreground">{quizData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 place-items-center">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  {quizData.totalTime} min
                </div>
                <div className="text-sm text-muted-foreground">Temps total</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  {quizData.exercises.length}
                </div>
                <div className="text-sm text-muted-foreground">Exercices</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{quizData.xpReward}</div>
                <div className="text-sm text-muted-foreground">
                  XP récompense
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 text-center">
            <CardHeader className="text-center">
              <CardTitle>Exercices du quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-4 border rounded-lg text-center md:text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{exercise.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exercise.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(exercise.difficulty)}
                      >
                        {exercise.difficulty}
                      </Badge>
                      <Badge variant="outline">{exercise.points} pts</Badge>
                      <Badge variant="outline">{exercise.timeLimit} min</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                Tentative {attemptCount + 1}/{quizData.maxAttempts}
              </Badge>
              <Badge variant="outline">
                Score requis: {quizData.passingScore}%
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/quiz")}>
                Annuler
              </Button>
              <Button onClick={startQuiz} size="lg">
                <Code className="w-4 h-4 mr-2" />
                Commencer le quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === "in-progress") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">{quizData.title}</h1>
              <Badge variant="outline">
                Exercice {currentExerciseIndex + 1}/{exercises.length}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline">
                <Clock className="w-3 h-3" />
                {formatTime(timeRemaining)}
              </Badge>
              <Badge
                variant={
                  overallScore >= quizData.passingScore
                    ? "default"
                    : "secondary"
                }
              >
                <Trophy className="w-3 h-3" />
                {Math.round(overallScore)}%
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress
              value={(currentExerciseIndex / exercises.length) * 100}
              className="h-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Progression du quiz</span>
              <span>
                {currentExerciseIndex + 1}/{exercises.length}
              </span>
            </div>
          </div>

          {/* Exercise */}
          <CodingQuiz
            exercises={[exercises[currentExerciseIndex]]}
            totalTime={exercises[currentExerciseIndex].timeLimit}
            passingScore={70}
            maxAttempts={1}
            mode="quiz"
            onComplete={handleExerciseComplete}
            onProgress={handleExerciseProgress}
          />
        </div>
      </div>
    );
  }

  if (quizState === "completed" && showResults) {
    const passed = overallScore >= quizData.passingScore;
    const xpGained = passed
      ? Math.round(quizData.xpReward * (overallScore / 100))
      : 0;

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div
              className={cn(
                "w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center",
                passed ? "bg-success/20" : "bg-destructive/20",
              )}
            >
              {passed ? (
                <Trophy className="w-10 h-10 text-success" />
              ) : (
                <AlertCircle className="w-10 h-10 text-destructive" />
              )}
            </div>

            <h1
              className={cn(
                "text-3xl font-bold mb-2",
                passed ? "text-success" : "text-destructive",
              )}
            >
              {passed ? "🎉 Félicitations !" : "Quiz terminé"}
            </h1>

            <p className="text-muted-foreground">
              {passed
                ? "Vous avez réussi ce quiz de codage avec succès !"
                : "Continuez à vous entraîner pour améliorer votre score."}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Résultats du quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Score Global */}
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {Math.round(overallScore)}%
                  </div>
                  <Progress value={overallScore} className="h-3 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Score obtenu</span>
                    <span>Requis: {quizData.passingScore}%</span>
                  </div>
                </div>

                {/* Résultats par exercice */}
                <div className="space-y-3">
                  <h3 className="font-medium">Détail par exercice</h3>
                  {exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {exercise.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {exercise.difficulty}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            exerciseScores[index] >= 70
                              ? "default"
                              : "secondary"
                          }
                        >
                          {exerciseScores[index] || 0}%
                        </Badge>
                        {exerciseScores[index] >= 70 ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Récompenses */}
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-warning" />
                    <span className="font-medium">Récompenses</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold">{xpGained}</div>
                      <div className="text-muted-foreground">XP gagnés</div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {exerciseScores.filter((s) => s >= 70).length}
                      </div>
                      <div className="text-muted-foreground">
                        Exercices réussis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 text-center">
            <Button variant="outline" onClick={() => router.push("/quiz")}>
              <Home className="w-4 h-4 mr-2" />
              Retour aux quiz
            </Button>
            {attemptCount < quizData.maxAttempts - 1 && !passed && (
              <Button onClick={() => setQuizState("intro")}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Réessayer
              </Button>
            )}
            {passed && (
              <Button onClick={() => router.push("/dashboard")}>
                <Trophy className="w-4 h-4 mr-2" />
                Voir le tableau de bord
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function CodingQuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Code className="w-8 h-8 mx-auto mb-4 text-muted-foreground animate-spin" />
            <p className="text-muted-foreground">
              Chargement du quiz de codage...
            </p>
          </div>
        </div>
      }
    >
      <CodingQuizContent />
    </Suspense>
  );
}
