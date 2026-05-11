// Types globaux pour l'application d'apprentissage React & Tailwind

export type QuestionType =
  | "qcm"
  | "qcm-multiple"
  | "true-false"
  | "fill-blank"
  | "code-complete"
  | "drag-drop"
  | "code-fix"
  | "order"
  | "open"
  | "spot-bug"
  | "pair-programming";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | string[] | number[];
  explanation: string;
  points: number;
  blanks?: string[];
  orderItems?: string[];
  bugs?: { line: number; issue: string; fix: string }[];
  hints?: string[];
  timeLimit?: number;
}

export interface Quiz {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // in seconds
  passingScore: number;
  maxAttempts: number;
  xpReward: number;
  difficulty: "easy" | "medium" | "hard";
  tags?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  codeExamples: { title: string; code: string; language: string }[];
  duration: number; // in minutes
  order: number;
  prerequisites?: string[];
  objectives?: string[];
  resources?: { title: string; url: string; type: "video" | "article" | "documentation" }[];
}

export interface Chapter {
  id: string;
  title: string;
  moduleId: string;
  order: number;
  lessons: Lesson[];
  quizId: string;
  projectTitle?: string;
  projectDescription?: string;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  chapters: Chapter[];
  color: string;
  order: number;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites?: string[];
  learningObjectives?: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  category: "learning" | "speed" | "precision" | "streak" | "special" | "competition";
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  level: number;
  badges: string[];
  streak: number;
  joinedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "dark" | "light" | "system" | "custom";
  fontSize: "sm" | "md" | "lg";
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  language: "fr" | "en";
  dailyGoal: number; // minutes
  autoplayVideos: boolean;
  showHints: boolean;
}

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: QuizResult[];
  currentModule: string | null;
  currentChapter: string | null;
  currentLesson: string | null;
  totalTimeSpent: number; // in minutes
  lastActiveAt: Date;
  notes: LessonNote[];
  bookmarks: string[];
}

export interface LessonNote {
  lessonId: string;
  content: string;
  timestamp: number;
  isPublic: boolean;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpent: number;
  answers: { questionId: string; answer: string | string[]; correct: boolean; timeSpent: number }[];
  attempt: number;
  completedAt: Date;
  stars: number;
  xpEarned: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  tags: string[];
  instructions: ProjectStep[];
  starterCode?: { [language: string]: string };
  solution?: { [language: string]: string };
  resources?: { title: string; url: string }[];
  xpReward: number;
  prerequisites?: string[];
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  instructions: string;
  hints?: string[];
  validation?: { type: string; expected: any }[];
  order: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar: string;
  xp: number;
  level: number;
  rank: number;
  weeklyChange: number;
  badges: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "quiz" | "project" | "streak" | "speed";
  requirements: { type: string; value: any }[];
  xpReward: number;
  badgeReward?: string;
  endDate: Date;
  participants: string[];
}

export interface CodePlayground {
  id: string;
  name: string;
  code: string;
  language: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  userId: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    accent: string;
  };
  isCustom: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: "achievement" | "reminder" | "challenge" | "social";
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: string[];
  estimatedDuration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  isRecommended: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  categoryId: string;
  tags: string[];
  replies: ForumReply[];
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  lessonId?: string;
  quizId?: string;
  projectId?: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  activities: StudyActivity[];
}

export interface StudyActivity {
  type: "lesson_start" | "lesson_complete" | "quiz_start" | "quiz_question" | "quiz_complete" | "project_start" | "project_step";
  timestamp: Date;
  data?: any;
}

export interface Analytics {
  userId: string;
  totalStudyTime: number;
  averageSessionTime: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  projectsCompleted: number;
  averageQuizScore: number;
  streakHistory: number[];
  xpHistory: { date: Date; xp: number }[];
  activityByDay: { date: Date; minutes: number }[];
  skillProgress: { skill: string; level: number }[];
}

// UI Component Props
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  rounded?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface CardProps {
  variant?: "default" | "lesson" | "quiz" | "project" | "stat" | "achievement";
  size?: "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export interface ToastProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "bar" | "circle" | "semi-circle";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  module?: string;
  difficulty?: string;
  type?: "lesson" | "quiz" | "project";
  tags?: string[];
  duration?: string;
}

export interface SearchResult {
  id: string;
  type: "lesson" | "quiz" | "project" | "module";
  title: string;
  description: string;
  module: string;
  chapter?: string;
  difficulty: string;
  duration?: string;
  relevanceScore: number;
}
