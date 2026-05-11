import { Module, Lesson, Quiz } from "./types";

// Modules Data
export const modules: Module[] = [
  {
    id: "integration-projects",
    title: "Projets d'Intégration Complète",
    description: "Appliquez toutes vos compétences dans des projets réels",
    icon: "Award",
    color: "purple",
    chapters: [
      {
        id: "projects-1",
        title: "Portfolio Moderne",
        description: "Créez un portfolio professionnel avec React, Tailwind et animations",
        order: 1,
        lessons: [
          {
            id: "projects-1-1",
            title: "Structure du Projet",
            content: `# Portfolio Moderne - Architecture

## Structure du Projet

\`\`\`
portfolio/
├── src/
│   ├── components/       # Composants réutilisables
│   ├── data/           # Données statiques
│   ├── styles/          # Styles globaux
│   └── pages/           # Pages Next.js
├── public/               # Fichiers statiques
└── package.json          # Dépendances
\`\`\`

## Composants Principaux

### Header Component

\`\`\`tsx
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-900">Portfolio</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </a>
            <a href="#projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Projects
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
\`\`\`

Ce portfolio démontre :
- **Architecture moderne** avec séparation claire des responsabilités
- **Design responsive** avec Tailwind CSS
- **Code de qualité** avec TypeScript et bonnes pratiques`,
            codeExamples: [
              {
                title: "Header Component",
                code: `const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-900">Portfolio</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;`,
                language: "tsx"
              }
            ],
            duration: 60
          }
        ]
      }
    ]
  }
];

// Quiz Data
export const quizzes: Quiz[] = [
  {
    id: "quiz-projects-1",
    chapterId: "projects-1",
    title: "Quiz : Portfolio Moderne",
    description: "Testez vos connaissances sur la création d'un portfolio professionnel",
    timeLimit: 600,
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q-projects-1-1",
        type: "qcm",
        question: "Quel est le principal avantage d'utiliser Tailwind CSS ?",
        options: [
          "Classes CSS personnalisées",
          "Design system intégré",
          "Utility-first approach",
          "Framework JavaScript"
        ],
        correctAnswer: "Utility-first approach",
        explanation: "Tailwind CSS utilise une approche utility-first qui permet de construire des designs directement dans le HTML avec des classes utilitaires.",
        points: 10
      },
      {
        id: "q-projects-1-2",
        type: "true-false",
        question: "Un portfolio doit inclure une section contact",
        correctAnswer: true,
        explanation: "Une section contact est essentielle dans un portfolio professionnel pour permettre aux recruteurs de vous contacter.",
        points: 10
      }
    ]
  }
];
