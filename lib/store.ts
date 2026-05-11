import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizResult, User } from "./data/course-data";
import { calculateXP, getLevelFromXP, getStarsFromPercentage } from "./data/course-data";

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
}

interface QuizAttempt {
  quizId: string;
  attempt: number;
  lastAttemptAt: string;
}

interface AppState {
  // User data
  user: User;

  // Progress tracking
  lessonProgress: LessonProgress[];
  quizResults: QuizResult[];
  quizAttempts: QuizAttempt[];

  // UI state
  currentModule: string | null;
  currentChapter: string | null;
  currentLesson: string | null;
  sidebarOpen: boolean;

  // Computed progress
  get userProgress(): {
    completedLessons: string[];
    totalXP: number;
    streak: number;
    badges: string[];
    quizScores: Record<string, number>;
  };

  // Actions
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentChapter: (chapterId: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  toggleSidebar: () => void;

  // Progress actions
  markLessonComplete: (lessonId: string) => void;
  completeLesson: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;

  // Quiz actions
  saveQuizResult: (result: Omit<QuizResult, "id" | "stars" | "attempt">) => void;
  setQuizScore: (lessonId: string, score: number) => void;
  getQuizResults: (quizId: string) => QuizResult[];
  getBestQuizResult: (quizId: string) => QuizResult | null;
  getQuizAttemptCount: (quizId: string) => number;
  canAttemptQuiz: (quizId: string, maxAttempts: number) => boolean;

  // XP and leveling
  addXP: (amount: number) => void;

  // Badges
  addBadge: (badgeId: string) => void;
  hasBadge: (badgeId: string) => boolean;

  // Streak
  updateStreak: () => void;

  // Reset
  resetProgress: () => void;
}

const defaultUser: User = {
  id: "user-1",
  name: "Apprenant",
  avatar: "",
  xp: 0,
  level: 1,
  badges: [],
  streak: 0,
  joinedAt: new Date(),
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: defaultUser,
      lessonProgress: [],
      quizResults: [],
      quizAttempts: [],
      currentModule: null,
      currentChapter: null,
      currentLesson: null,
      sidebarOpen: true,

      // Navigation actions
      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Lesson progress
      markLessonComplete: (lessonId) => {
        const existing = get().lessonProgress.find((p) => p.lessonId === lessonId);
        if (existing?.completed) return;

        set((state) => ({
          lessonProgress: [
            ...state.lessonProgress.filter((p) => p.lessonId !== lessonId),
            { lessonId, completed: true, completedAt: new Date().toISOString() },
          ],
        }));

        // Add XP for completing a lesson
        get().addXP(10);
      },

      isLessonComplete: (lessonId) => {
        return get().lessonProgress.some((p) => p.lessonId === lessonId && p.completed);
      },

      completeLesson: (lessonId) => {
        get().markLessonComplete(lessonId);
      },

      // Computed userProgress getter
      get userProgress() {
        const state = get();
        const completedLessons = state.lessonProgress
          .filter(p => p.completed)
          .map(p => p.lessonId);

        const quizScores: Record<string, number> = {};
        state.quizResults.forEach(result => {
          const existingScore = quizScores[result.quizId] || 0;
          if (result.percentage > existingScore) {
            quizScores[result.quizId] = result.percentage;
          }
        });

        return {
          completedLessons,
          totalXP: state.user.xp,
          streak: state.user.streak,
          badges: state.user.badges,
          quizScores
        };
      },

      // Quiz actions
      saveQuizResult: (result) => {
        const attemptCount = get().getQuizAttemptCount(result.quizId) + 1;
        const stars = getStarsFromPercentage(result.percentage);
        const isFirstAttempt = attemptCount === 1;

        const fullResult: QuizResult = {
          ...result,
          id: `result-${Date.now()}`,
          stars,
          attempt: attemptCount,
          completedAt: new Date(),
        };

        set((state) => ({
          quizResults: [...state.quizResults, fullResult],
          quizAttempts: [
            ...state.quizAttempts.filter((a) => a.quizId !== result.quizId),
            { quizId: result.quizId, attempt: attemptCount, lastAttemptAt: new Date().toISOString() },
          ],
        }));

        // Add XP based on score
        const xpGained = calculateXP(result.percentage, isFirstAttempt);
        get().addXP(xpGained);

        // Check for badges
        if (result.percentage === 100 && isFirstAttempt) {
          get().addBadge("badge-perfect");
        }

        if (get().quizResults.length === 0) {
          get().addBadge("badge-first-quiz");
        }

        if (get().quizResults.filter((r) => r.percentage >= 50).length >= 10) {
          get().addBadge("badge-persistent");
        }
      },

      getQuizResults: (quizId) => {
        return get().quizResults.filter((r) => r.quizId === quizId);
      },

      getBestQuizResult: (quizId) => {
        const results = get().getQuizResults(quizId);
        if (results.length === 0) return null;
        return results.reduce((best, current) =>
          current.percentage > best.percentage ? current : best
        );
      },

      getQuizAttemptCount: (quizId) => {
        const attempt = get().quizAttempts.find((a) => a.quizId === quizId);
        return attempt?.attempt ?? 0;
      },

      canAttemptQuiz: (quizId, maxAttempts) => {
        return get().getQuizAttemptCount(quizId) < maxAttempts;
      },

      setQuizScore: (lessonId, score) => {
        // Create a quiz result entry for the score
        const result = {
          quizId: lessonId,
          percentage: score,
          timeSpent: 0,
          answers: []
        };
        get().saveQuizResult(result);
      },

      // XP and leveling
      addXP: (amount) => {
        set((state) => {
          const newXP = state.user.xp + amount;
          const newLevel = getLevelFromXP(newXP);
          return {
            user: {
              ...state.user,
              xp: newXP,
              level: newLevel,
            },
          };
        });
      },

      // Badges
      addBadge: (badgeId) => {
        if (get().hasBadge(badgeId)) return;
        set((state) => ({
          user: {
            ...state.user,
            badges: [...state.user.badges, badgeId],
          },
        }));
      },

      hasBadge: (badgeId) => {
        return get().user.badges.includes(badgeId);
      },

      // Streak
      updateStreak: () => {
        // Simple streak logic - could be enhanced
        set((state) => ({
          user: {
            ...state.user,
            streak: state.user.streak + 1,
          },
        }));

        if (get().user.streak >= 7) {
          get().addBadge("badge-streak-7");
        }
      },

      // Reset
      resetProgress: () => {
        set({
          user: defaultUser,
          lessonProgress: [],
          quizResults: [],
          quizAttempts: [],
        });
      },
    }),
    {
      name: "react-tailwind-learning-storage",
    }
  )
);
