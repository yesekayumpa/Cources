// Données de cours étendues pour l'application complète d'apprentissage React & Tailwind CSS

import { Module, Quiz, Question, Badge } from "@/types";

// Badges disponibles dans l'application
export const badges: Badge[] = [
  // Badges d'apprentissage
  {
    id: "badge-first-lesson",
    title: "Premiers Pas",
    description: "Compléter votre première leçon",
    icon: " ",
    condition: "complete_first_lesson",
    category: "learning",
    rarity: "common",
    xpReward: 10
  },
  {
    id: "badge-module-complete",
    title: "Module Maîtrisé",
    description: "Compléter un module entier",
    icon: " ",
    condition: "complete_module",
    category: "learning",
    rarity: "rare",
    xpReward: 100
  },
  {
    id: "badge-perfect-quiz",
    title: "Quiz Parfait",
    description: "Obtenir 100% à un quiz",
    icon: " ",
    condition: "perfect_quiz",
    category: "precision",
    rarity: "rare",
    xpReward: 50
  },
  {
    id: "badge-streak-7",
    title: "Semaine Consacrée",
    description: "7 jours d'étude consécutifs",
    icon: " ",
    condition: "streak_7_days",
    category: "streak",
    rarity: "epic",
    xpReward: 200
  },
  {
    id: "badge-speed-demon",
    title: "Démon de la Vitesse",
    description: "Compléter un quiz en moins de la moitié du temps",
    icon: " ",
    condition: "speed_quiz",
    category: "speed",
    rarity: "epic",
    xpReward: 75
  },
  {
    id: "badge-problem-solver",
    title: "Solutionneur",
    description: "Trouver et corriger 10 bugs dans les exercices",
    icon: " ",
    condition: "find_10_bugs",
    category: "special",
    rarity: "legendary",
    xpReward: 500
  },
  {
    id: "badge-code-master",
    title: "Maître du Code",
    description: "Compléter tous les projets",
    icon: " ",
    condition: "complete_all_projects",
    category: "learning",
    rarity: "legendary",
    xpReward: 1000
  }
];

// Questions pour les quiz
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
        points: 10,
        hints: ["Pensez à ce que React permet de créer", "React est lié au JavaScript"]
      },
      {
        id: "q1-1-2",
        type: "true-false",
        question: "Le DOM virtuel est une représentation légère du DOM réel en mémoire.",
        correctAnswer: true,
        explanation: "Le DOM virtuel est effectivement une représentation légère du DOM réel qui permet à React d'optimiser les mises à jour.",
        points: 5
      },
      {
        id: "q1-1-3",
        type: "code-complete",
        question: "Complétez ce code pour créer un composant React simple :",
        code: `function Welcome() {
  return (
    <h1>_____</h1>
  );
}`,
        correctAnswer: "Bonjour, React !",
        explanation: "Les composants React retournent du JSX qui définit ce qui doit être affiché.",
        points: 15,
        blanks: ["Bonjour, React !"]
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
      },
      {
        id: "q1-2-2",
        type: "drag-drop",
        question: "Ordonnez les étapes pour créer un composant React :",
        orderItems: [
          "Importer React",
          "Déclarer la fonction du composant",
          "Retourner du JSX",
          "Exporter le composant"
        ],
        correctAnswer: ["Importer React", "Déclarer la fonction du composant", "Retourner du JSX", "Exporter le composant"],
        explanation: "Ces étapes suivent l'ordre logique de création d'un composant React.",
        points: 15
      }
    ],
    "chapter-1-3": [
      {
        id: "q1-3-1",
        type: "qcm-multiple",
        question: "Quelles sont les caractéristiques des props en React ? (Sélectionnez toutes les réponses correctes)",
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

  return questionBank[chapterId] || [];
};

// Modules complets avec tous les chapitres et leçons
export const extendedModules: Module[] = [
  {
    id: "module-1",
    title: "Fondamentaux de React",
    description: "Découvrez les bases de React, JSX et les composants. Apprenez le DOM virtuel, la création de composants et les patterns fondamentaux.",
    icon: " ",
    color: "cyan",
    order: 1,
    estimatedTime: "4h",
    difficulty: "beginner",
    prerequisites: [],
    learningObjectives: [
      "Comprendre ce qu'est React et son écosystème",
      "Maîtriser la syntaxe JSX",
      "Créer des composants réutilisables",
      "Gérer les props et la composition"
    ],
    chapters: [
      {
        id: "chapter-1-1",
        title: "Introduction à React",
        moduleId: "module-1",
        order: 1,
        estimatedTime: "1h30",
        difficulty: "beginner",
        lessons: [
          {
            id: "react-foundation-1-1",
            title: "Qu'est-ce que React et le DOM virtuel",
            duration: 15,
            order: 1,
            content: `# Qu'est-ce que React ?

React est une bibliothèque JavaScript développée par Facebook (Meta) pour construire des interfaces utilisateur. Elle permet de créer des applications web interactives de manière efficace et déclarative.

## Le DOM Virtuel

Le DOM virtuel est une représentation légère du DOM réel en mémoire. Quand l'état de votre application change :

1. React crée un nouveau DOM virtuel
2. Il compare ce nouveau DOM avec l'ancien (processus appelé "diffing")
3. Seules les parties qui ont changé sont mises à jour dans le vrai DOM

Cette approche rend React très performant car les manipulations du DOM réel sont coûteuses.

## Pourquoi utiliser React ?

- **Composants réutilisables** : Créez des éléments d'interface modulaires
- **Performance** : Le DOM virtuel optimise les mises à jour
- **Écosystème riche** : Large communauté et nombreuses bibliothèques
- **Développement déclaratif** : Décrivez ce que vous voulez, pas comment le faire

## Installation et configuration

### Avec Vite (recommandé)
\`\`\`bash
npm create vite@latest mon-app -- --template react
cd mon-app
npm install
npm run dev
\`\`\`

### Structure d'un projet React
\`\`\`
mon-app/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
\`\`\``,
            videoUrl: "https://example.com/react-intro-video",
            codeExamples: [
              {
                title: "Premier composant React",
                language: "jsx",
                code: `function Welcome() {
  return <h1>Bonjour, React !</h1>;
}

export default Welcome;`
              },
              {
                title: "Exemple de DOM virtuel",
                language: "jsx",
                code: `// React compare automatiquement les changements
function Counter({ count }) {
  return (
    <div>
      <p>Compteur: {count}</p>
    </div>
  );
}`
              }
            ],
            objectives: [
              "Comprendre la philosophie de React",
              "Maîtriser le concept du DOM virtuel",
              "Savoir installer et configurer un projet React"
            ],
            resources: [
              { title: "Documentation officielle React", url: "https://react.dev", type: "documentation" },
              { title: "React DevTools", url: "https://react.dev/learn/react-developer-tools", type: "documentation" }
            ]
          },
          {
            id: "react-foundation-1-2",
            title: "Écosystème React et outils",
            duration: 20,
            order: 2,
            content: `# Écosystème React

React s'accompagne d'un riche écosystème d'outils et de bibliothèques qui facilitent le développement.

## Outils essentiels

### React DevTools
Extension de navigateur indispensable pour :
- Inspecter les composants
- Visualiser les props et l'état
- Analyser les performances

### Create React App vs Vite
- **Vite** : Ultra-rapide, moderne, recommandé
- **CRA** : Historique, plus lent, moins flexible

### Package Manager
- **npm** : Node Package Manager (par défaut)
- **yarn** : Plus rapide, gestion des dépendances améliorée
- **pnpm** : Très rapide, économise de l'espace disque

## Bibliothèques populaires

### Routing
- **React Router** : Le standard pour le routing
- **Next.js** : Framework full-stack avec routing intégré

### State Management
- **Zustand** : Simple et léger
- **Redux Toolkit** : Pour les applications complexes
- **Context API** : Natif à React

### UI Components
- **Material-UI** : Design system Google
- **Ant Design** : Design system entreprise
- **Chakra UI** : Simple et accessible

### Styling
- **Tailwind CSS** : Utility-first CSS
- **Styled Components** : CSS-in-JS
- **Emotion** : CSS-in-JS performant`,
            videoUrl: "https://example.com/react-ecosystem-video",
            codeExamples: [
              {
                title: "Installation avec Vite",
                language: "bash",
                code: `npm create vite@latest mon-app -- --template react
cd mon-app
npm install
npm run dev`
              }
            ],
            objectives: [
              "Connaître les outils de l'écosystème React",
              "Choisir les bonnes bibliothèques",
              "Configurer un environnement de développement"
            ]
          },
          {
            id: "react-foundation-1-3",
            title: "Structure d'un projet React",
            duration: 15,
            order: 3,
            content: `# Structure d'un projet React

Une bonne structure de projet est essentielle pour la maintenabilité et la collaboration.

## Dossiers principaux

### src/
Contient tout le code source de l'application
- **components/** : Composants réutilisables
- **pages/** ou **views/** : Pages principales
- **hooks/** : Hooks personnalisés
- **utils/** : Fonctions utilitaires
- **styles/** : Fichiers CSS/styled-components
- **assets/** : Images, icônes, fonts

### public/
Fichiers statiques servis directement
- **index.html** : Template HTML principal
- **favicon.ico** : Icône du site
- **manifest.json** : Configuration PWA

## Fichiers de configuration

### package.json
Définit les dépendances et scripts
\`\`\`json
{
  "name": "mon-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
\`\`\`

### vite.config.js
Configuration du build tool
\`\`\`js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
\`\`\``,
            codeExamples: [
              {
                title: "Structure typique",
                language: "text",
                code: `mon-app/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js`
              }
            ],
            objectives: [
              "Organiser un projet React",
              "Comprendre les fichiers de configuration",
              "Suivre les meilleures pratiques"
            ]
          }
        ],
        quizId: "quiz-1-1"
      },
      {
        id: "chapter-1-2",
        title: "JSX en profondeur",
        moduleId: "module-1",
        order: 2,
        estimatedTime: "1h30",
        difficulty: "beginner",
        lessons: [
          {
            id: "lesson-1-2-1",
            title: "Syntaxe JSX et expressions JavaScript",
            duration: 20,
            order: 1,
            content: `# Syntaxe JSX

JSX est une extension de syntaxe pour JavaScript qui ressemble à du HTML. C'est la façon recommandée d'écrire des interfaces en React.

## Expressions JavaScript dans JSX

Vous pouvez intégrer n'importe quelle expression JavaScript valide dans du JSX en l'entourant d'accolades \`{}\`.

\`\`\`jsx
function Greeting() {
  const name = "Marie";
  const age = 25;
  
  return (
    <div>
      <h1>Bonjour, {name} !</h1>
      <p>Tu as {age} ans.</p>
      <p>Dans 5 ans, tu auras {age + 5} ans.</p>
    </div>
  );
}
\`\`\`

## Règles importantes du JSX

### 1. Un seul élément parent
Chaque composant doit retourner un seul élément parent ou un Fragment.

\`\`\`jsx
// ❌ Incorrect
function App() {
  return (
    <h1>Titre</h1>
    <p>Paragraphe</p>
  );
}

// ✅ Correct avec Fragment
function App() {
  return (
    <>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </>
  );
}
\`\`\`

### 2. Attributs en camelCase
Les attributs HTML utilisent camelCase en JSX.

\`\`\`jsx
// HTML : class, for, readonly
// JSX : className, htmlFor, readOnly

<input className="input-field" readOnly={true} />
\`\`\`

### 3. Balises auto-fermantes
Toutes les balises doivent être fermées.

\`\`\`jsx
<img src="logo.png" alt="Logo" />
<br />
<hr />
\`\`\``,
            codeExamples: [
              {
                title: "Expressions dans JSX",
                language: "jsx",
                code: `function UserCard({ user }) {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>Âge: {user.age}</p>
      <p>Email: {user.email}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  );
}`
              }
            ],
            objectives: [
              "Maîtriser la syntaxe JSX",
              "Intégrer des expressions JavaScript",
              "Comprendre les règles du JSX"
            ]
          },
          {
            id: "lesson-1-2-2",
            title: "Attributs et événements en JSX",
            duration: 15,
            order: 2,
            content: `# Attributs en JSX

Les attributs JSX sont similaires aux attributs HTML, mais avec quelques différences importantes.

## Différences clés

### className au lieu de class
\`\`\`jsx
// HTML
<div class="container">

// JSX
<div className="container">
\`\`\`

### htmlFor au lieu de for
\`\`\`jsx
// HTML
<label for="email">

// JSX
<label htmlFor="email">
\`\`\`

### Style inline comme objet
\`\`\`jsx
const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px'
};

<button style={buttonStyle}>Cliquez-moi</button>
\`\`\`

## Gestion des événements

Les événements utilisent le camelCase et des fonctions comme gestionnaires.

\`\`\`jsx
function Button() {
  const handleClick = () => {
    alert('Bouton cliqué !');
  };

  const handleChange = (e) => {
    console.log('Valeur:', e.target.value);
  };

  return (
    <div>
      <button onClick={handleClick}>
        Cliquez-moi
      </button>
      <input onChange={handleChange} placeholder="Tapez ici" />
    </div>
  );
}
\`\`\`

### Types d'événements courants
- \`onClick\` : Clic sur un élément
- \`onChange\` : Changement de valeur (input, select, textarea)
- \`onSubmit\` : Soumission d'un formulaire
- \`onMouseOver\` : Souris passe sur l'élément
- \`onKeyDown\` : Touche du clavier pressée`,
            codeExamples: [
              {
                title: "Gestionnaires d'événements",
                language: "jsx",
                code: `function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Nom"
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}`
              }
            ],
            objectives: [
              "Utiliser les attributs JSX correctement",
              "Gérer les événements utilisateur",
              "Appliquer des styles en JSX"
            ]
          }
        ],
        quizId: "quiz-1-2"
      },
      {
        id: "chapter-1-3",
        title: "Composants React",
        moduleId: "module-1",
        order: 3,
        estimatedTime: "1h",
        difficulty: "beginner",
        lessons: [
          {
            id: "lesson-1-3-1",
            title: "Composants fonctionnels",
            duration: 15,
            order: 1,
            content: `# Composants fonctionnels React

Les composants fonctionnels sont la manière moderne et recommandée de créer des composants React.

## Avantages des composants fonctionnels

- Plus simples à lire et à écrire
- Moins de code boilerplate
- Meilleure performance avec React.memo
- Compatible avec les Hooks
- Plus faciles à tester

## Structure d'un composant fonctionnel

\`\`\`jsx
import React from 'react';

// Composant fonctionnel simple
function Welcome(props) {
  return <h1>Bonjour, {props.name} !</h1>;
}

// Avec déstructuration des props
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Bonjour, {name} !</h1>
      <p>Âge: {age}</p>
    </div>
  );
}

// Arrow function (équivalent)
const Welcome = ({ name, age }) => {
  return (
    <div>
      <h1>Bonjour, {name} !</h1>
      <p>Âge: {age}</p>
    </div>
  );
};
\`\`\`

## Export des composants

\`\`\`jsx
// Export par défaut
export default Welcome;

// Export nommé
export function Welcome() {
  return <h1>Bonjour !</h1>;
}

// Multiple exports
export function Header() { /* ... */ }
export function Footer() { /* ... */ }
export default function App() { /* ... */ }
\`\`\`

## Convention de nommage

- **Composants** : PascalCase (Welcome, UserProfile, Button)
- **Props** : camelCase (userName, onClick, isActive)
- **Fichiers** : PascalCase ou kebab-case (Welcome.jsx, user-profile.jsx)`,
            codeExamples: [
              {
                title: "Composant complet",
                language: "jsx",
                code: `import React from 'react';

function Card({ title, description, imageUrl, children }) {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
}

export default Card;`
              }
            ],
            objectives: [
              "Créer des composants fonctionnels",
              "Utiliser les props correctement",
              "Exporter et importer des composants"
            ]
          }
        ],
        quizId: "quiz-1-3",
        projectTitle: "Créer une carte de profil utilisateur",
        projectDescription: "Créez un composant de carte de profil avec avatar, nom, bio et liens sociaux. Utilisez les props pour rendre le composant réutilisable."
      }
    ]
  },
  {
    id: "module-2",
    title: "États et Interactions",
    description: "Maîtrisez la gestion des événements et l'état avec useState. Apprenez à créer des applications interactives et dynamiques.",
    icon: "⚡",
    color: "yellow",
    order: 2,
    estimatedTime: "5h",
    difficulty: "beginner",
    prerequisites: ["module-1"],
    learningObjectives: [
      "Comprendre le Hook useState",
      "Gérer les événements utilisateur",
      "Créer des formulaires contrôlés",
      "Utiliser useEffect pour les effets de bord"
    ],
    chapters: [
      {
        id: "chapter-2-1",
        title: "Le Hook useState",
        moduleId: "module-2",
        order: 1,
        estimatedTime: "2h",
        difficulty: "beginner",
        lessons: [
          {
            id: "lesson-2-1-1",
            title: "Introduction aux Hooks React",
            duration: 20,
            order: 1,
            content: `# Les Hooks React

Les Hooks sont des fonctions spéciales qui permettent d'utiliser l'état et d'autres fonctionnalités React dans les composants fonctionnels.

## Pourquoi les Hooks ?

Avant les Hooks, seuls les composants de classe pouvaient utiliser l'état et les autres fonctionnalités React. Les Hooks permettent aux composants fonctionnels d'avoir les mêmes capacités.

## Règles des Hooks

### 1. Utiliser uniquement au niveau supérieur
Ne jamais appeler des Hooks à l'intérieur de boucles, conditions ou fonctions imbriquées.

\`\`\`jsx
// ❌ Incorrect
function MyComponent() {
  if (condition) {
    const [state, setState] = useState(); // Ne pas faire ça
  }
}

// ✅ Correct
function MyComponent() {
  const [state, setState] = useState();
  if (condition) {
    // Utiliser l'état ici
  }
}
\`\`\`

### 2. Utiliser uniquement dans les fonctions React
Ne jamais appeler des Hooks dans des fonctions JavaScript régulières.

\`\`\`jsx
// ❌ Incorrect
function handleClick() {
  const [state, setState] = useState(); // Ne pas faire ça
}

// ✅ Correct
function MyComponent() {
  const [state, setState] = useState();
  
  const handleClick = () => {
    setState(newValue); // Utiliser l'état ici
  };
}
\`\`\`

## Hook useState

useState est le Hook le plus fondamental. Il permet d'ajouter un état local aux composants fonctionnels.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // Déclaration d'une variable d'état "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}
\`\`\`

### Syntaxe de useState
\`\`\`jsx
const [stateVariable, setStateFunction] = useState(initialValue);
\`\`\`

- \`stateVariable\` : La valeur actuelle de l'état
- \`setStateFunction\` : Fonction pour mettre à jour l'état
- \`initialValue\` : Valeur initiale de l'état`,
            codeExamples: [
              {
                title: "Premier Hook",
                language: "jsx",
                code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`
              }
            ],
            objectives: [
              "Comprendre ce qu'est un Hook",
              "Maîtriser les règles des Hooks",
              "Utiliser useState correctement"
            ]
          }
        ],
        quizId: "quiz-2-1"
      }
    ]
  }
];

// Générer les quiz pour tous les chapitres
export const generateQuizzes = (): Quiz[] => {
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
        tags: [module.title, chapter.title]
      });
    });
  });

  return quizzes;
};

export const allQuizzes = generateQuizzes();
