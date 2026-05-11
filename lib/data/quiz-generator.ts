// Générateur de quiz pour s'assurer que tous les quiz sont disponibles

import { Quiz, Question } from "@/types";
import { extendedModules } from "./extended-course-data";

// Questions de base pour chaque chapitre
const createQuizQuestions = (chapterId: string): Question[] => {
  const questionBank: { [key: string]: Question[] } = {
    "chapter-1-1": [
      {
        id: "q1-1-1",
        type: "qcm",
        question: "Qu'est-ce que React ?",
        options: [
          "Une base de données",
          "Une bibliothèque JavaScript pour créer des interfaces utilisateur",
          "Un système d'exploitation",
          "Un langage de programmation"
        ],
        correctAnswer: "Une bibliothèque JavaScript pour créer des interfaces utilisateur",
        explanation: "React est une bibliothèque JavaScript développée par Facebook pour construire des interfaces utilisateur interactives.",
        points: 10
      },
      {
        id: "q1-1-2",
        type: "true-false",
        question: "Le DOM virtuel est une représentation légère du DOM réel en mémoire.",
        correctAnswer: true,
        explanation: "Le DOM virtuel est effectivement une représentation légère du DOM réel qui permet à React d'optimiser les mises à jour.",
        points: 5
      }
    ],
    "chapter-1-2": [
      {
        id: "q1-2-1",
        type: "qcm",
        question: "Quelle syntaxe est utilisée pour intégrer une variable JavaScript dans JSX ?",
        options: [
          "{{ variable }}",
          "${variable}",
          "{variable}",
          "<?= $variable ?>"
        ],
        correctAnswer: "{variable}",
        explanation: "En JSX, on utilise des accolades {} pour intégrer des expressions JavaScript.",
        points: 10
      }
    ],
    "chapter-1-3": [
      {
        id: "q1-3-1",
        type: "qcm-multiple",
        question: "Quelles sont les caractéristiques des props en React ?",
        options: [
          "Elles sont immuables",
          "Elles permettent de passer des données du parent vers l'enfant",
          "Elles peuvent être modifiées directement dans le composant enfant",
          "Elles sont des objets JavaScript"
        ],
        correctAnswer: ["Elles sont immuables", "Elles permettent de passer des données du parent vers l'enfant", "Elles sont des objets JavaScript"],
        explanation: "Les props sont immuables, passées du parent à l'enfant, et sont des objets JavaScript. On ne doit jamais les modifier directement.",
        points: 20
      }
    ]
  };

  return questionBank[chapterId] || [
    {
      id: "default-1",
      type: "qcm",
      question: "Quelle est la principale caractéristique de React ?",
      options: [
        "Performance",
        "Simplicité",
        "Réutilisabilité",
        "Toutes ces réponses"
      ],
      correctAnswer: "Toutes ces réponses",
      explanation: "React combine performance, simplicité et réutilisabilité pour créer des interfaces utilisateur efficaces.",
      points: 10
    }
  ];
};

export const generateAllQuizzes = (): Quiz[] => {
  const quizzes: Quiz[] = [];

  extendedModules.forEach(module => {
    module.chapters.forEach(chapter => {
      const questions = createQuizQuestions(chapter.id);

      quizzes.push({
        id: chapter.quizId,
        chapterId: chapter.id,
        title: `Quiz : ${chapter.title}`,
        description: `Testez vos connaissances sur ${chapter.title}`,
        questions,
        timeLimit: 600, // 10 minutes par défaut
        passingScore: 70,
        maxAttempts: 3,
        xpReward: 100,
        difficulty: chapter.difficulty === "beginner" ? "easy" :
          chapter.difficulty === "intermediate" ? "medium" : "hard",
        tags: [module.title, chapter.title],
        completedQuizzes: [] // Initialisé à vide, sera mis à jour lors de la complétion
      });
    });
  });

  return quizzes;
};

export const allQuizzes = generateAllQuizzes();