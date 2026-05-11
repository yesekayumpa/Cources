// Données de quiz simplifiées et corrigées

import { Quiz, Question } from "@/types";
import { quizzes } from "./course-data";

// Questions pour chaque chapitre
const quizQuestions: { [key: string]: Question[] } = {
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
  "chapter-2-1": [
    {
      id: "q2-1-1",
      type: "qcm",
      question: "Quelle est la principale différence entre une fonction composant et une fonction classique ?",
      options: [
        "Les composants peuvent avoir un état local",
        "Les fonctions composants retournent du JSX",
        "Les fonctions classiques ont un constructeur",
        "Toutes ces réponses"
      ],
      correctAnswer: "Les fonctions composants retournent du JSX",
      explanation: "La principale différence est que les composants React retournent des éléments JSX et peuvent avoir un état local, tandis que les fonctions classiques JavaScript retournent des valeurs.",
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

// Quiz pour chaque chapitre - utilisation des quiz complets depuis course-data.ts
export const quizData: Quiz[] = quizzes;

// Mapping direct des leçons vers les quiz
const lessonToQuizMap: { [key: string]: string } = {
  // Module 1 - Fondamentaux de React
  "react-foundation-1-1": "quiz-1-1",
  "react-foundation-1-2": "quiz-1-1",
  "react-foundation-1-3": "quiz-1-1",

  // Module 1 - JSX en profondeur
  "lesson-1-2-1": "quiz-1-2",
  "lesson-1-2-2": "quiz-1-2",
  "lesson-1-2-3": "quiz-1-2",

  // Module 1 - Composants React
  "lesson-1-3-1": "quiz-1-3",
  "lesson-1-3-2": "quiz-1-3",
  "lesson-1-3-3": "quiz-1-3",

  // Module 2 - Gestion des événements
  "lesson-2-1-1": "quiz-2-1",
  "lesson-2-1-2": "quiz-2-1",
  "lesson-2-1-3": "quiz-2-1",

  // Module 2 - Le Hook useState
  "lesson-2-2-1": "quiz-2-2",
  "lesson-2-2-2": "quiz-2-2",
  "lesson-2-2-3": "quiz-2-2",

  // Module 2 - Formulaires contrôlés
  "lesson-2-3-1": "quiz-2-3",
  "lesson-2-3-2": "quiz-2-3",
  "lesson-2-3-3": "quiz-2-3",

  // Module 3 - useEffect et cycle de vie
  "lesson-3-1-1": "quiz-3-1",
  "lesson-3-1-2": "quiz-3-1",
  "lesson-3-1-3": "quiz-3-1",

  // Module 3 - useContext et Context API
  "lesson-3-2-1": "quiz-3-2",
  "lesson-3-2-2": "quiz-3-2",
  "lesson-3-2-3": "quiz-3-2",

  // Module 3 - Hooks personnalisés
  "lesson-3-3-1": "quiz-3-3",
  "lesson-3-3-2": "quiz-3-3",
  "lesson-3-3-3": "quiz-3-3",

  // Module 4 - Découverte de Tailwind
  "lesson-4-1-1": "quiz-4-1",
  "lesson-4-1-2": "quiz-4-1",
  "lesson-4-1-3": "quiz-4-1",

  // Module 4 - Layout et Flexbox/Grid
  "lesson-4-2-1": "quiz-4-2",
  "lesson-4-2-2": "quiz-4-2",
  "lesson-4-2-3": "quiz-4-2",

  // Module 4 - Composants réutilisables
  "lesson-4-3-1": "quiz-4-3",
  "lesson-4-3-2": "quiz-4-3",
  "lesson-4-3-3": "quiz-4-3",
};

// Fonction pour trouver un quiz par ID de leçon (plus direct)
export const getQuizByLessonId = (lessonId: string): Quiz | undefined => {
  // Si l'ID commence par "quiz-", chercher directement
  if (lessonId.startsWith('quiz-')) {
    return quizData.find(quiz => quiz.id === lessonId);
  }

  // Si l'ID correspond au format "X-Y" (ex: "1-3"), essayer de reconstruire l'ID de quiz
  if (lessonId.match(/^\d+-\d+$/)) {
    const quizId = `quiz-${lessonId}`;
    const quiz = quizData.find(quiz => quiz.id === quizId);
    if (quiz) {
      return quiz;
    }
  }

  // Sinon, utiliser le mapping des leçons
  const quizId = lessonToQuizMap[lessonId];
  if (!quizId) {
    console.warn(`No quiz found for lesson ID: ${lessonId}`);
    return undefined;
  }

  const quiz = quizData.find(quiz => quiz.id === quizId);
  if (!quiz) {
    console.warn(`Quiz not found for ID: ${quizId}`);
    return undefined;
  }

  return quiz;
};
