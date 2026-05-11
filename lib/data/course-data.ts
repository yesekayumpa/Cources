// Course Data Types and Content

export type QuestionType =
  | "qcm"
  | "qcm-multiple"
  | "true-false"
  | "fill-blank"
  | "code-complete"
  | "drag-drop"
  | "code-fix"
  | "order"
  | "open";

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
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: { title: string; code: string; language: string }[];
  duration: number; // in minutes
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  completedQuizzes: string[];
  currentModule: string;
  currentChapter: string;
  currentLesson: string;
  quizScores: { [quizId: string]: number[] };
  xp: number;
  level: number;
  badges: string[];
  streak: number;
  joinedAt: Date;
}

export interface QuizResult {
  id: string;
  quizId: string;
  moduleId: string;
  chapterId: string;
  score: number;
  percentage: number;
  completedAt: Date;
  timeSpent: number;
  attempt: number;
  stars: number;
  xp: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
  badges: string[];
  streak: number;
  joinedAt: Date;
  lastLoginAt?: Date;
}

// Course Content - Modules Enrichis
export const modules: Module[] = [
  {
    id: "react-foundation",
    title: "React.js - La Foundation",
    description: "Maîtrisez les fondamentaux de React.js pour construire des interfaces modernes",
    icon: "Atom",
    color: "cyan",
    chapters: [
      {
        id: "react-foundation-1",
        title: "Fondamentaux de React",
        description: "Les concepts essentiels pour commencer avec React",
        order: 1,
        lessons: [
          {
            id: "react-foundation-1-1",
            title: "Qu'est-ce que React et pourquoi l'utiliser ?",
            content: `
# Introduction à React

## Qu'est-ce que React ?

React est une **bibliothèque JavaScript** créée par Facebook pour construire des **interfaces utilisateur** (UI) interactives. Contrairement aux frameworks complets comme Angular ou Vue, React se concentre uniquement sur la **couche vue**.

## Pourquoi React est-il si populaire ?

###  Performance Exceptionnelle
- **Virtual DOM** : React utilise un DOM virtuel pour optimiser les mises à jour
- **Reconciliation** : Seules les parties modifiées sont mises à jour dans le vrai DOM
- **Batching** : Les mises à jour sont groupées pour optimiser les performances

### Composants Réutilisables
- **Encapsulation** : Logique et UI regroupées dans des unités autonomes
- **Composition** : Assembler des composants complexes à partir de composants simples
- **Maintenabilité** : Code plus facile à déboguer et à faire évoluer

###  Écosystème Immense
- **Community** : L'une des plus grandes communautés de développeurs
- **Bibliothèques** : Des milliers de composants et outils disponibles
- **Emploi** : Très demandé sur le marché du travail

## Applications React dans le Monde Réel

- **Facebook** : Interface utilisateur principale
- **Instagram** : Stories et timeline
- **Netflix** : Lecteur vidéo et interface de navigation
- **WhatsApp** : Application de messagerie
- **Spotify** : Lecteur de musique

## Installation et Premier Projet

\`\`\`bash
# Avec Vite (recommandé)
npm create vite@latest my-react-app --template react
cd my-react-app
npm install

# Avec Create React App
npx create-react-app my-app
cd my-app
\`\`\`

React transforme votre code JavaScript en éléments interactifs qui peuvent changer et s'adapter aux interactions de l'utilisateur.
            `,
            codeExamples: [
              {
                title: "Premier composant React",
                code: `function Welcome() {
  return <h1>Bonjour React!</h1>;
}

export default function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}`,
                language: "jsx"
              }
            ],
            duration: 45
          },
          {
            id: "react-foundation-1-2",
            title: "Le DOM Virtuel expliqué simplement",
            content: `
# Le DOM Virtuel React

## Le Problème du DOM Réel

Le **DOM (Document Object Model)** est une représentation en arbre de votre page web. Chaque modification du DOM déclenche un **re-flow** complet de la page, ce qui peut être très coûteux en performances.

## Solution de React : Le Virtual DOM

###  Qu'est-ce que le Virtual DOM ?

Le Virtual DOM est une **copie légère** du DOM réel en mémoire JavaScript. React travaille sur cette copie avant de synchroniser les changements.

### Le Processus de Reconciliation

1. **Render** : React crée/met à jour le Virtual DOM
2. **Diff** : Compare l'ancien et le nouveau Virtual DOM
3. **Patch** : Calcule les changements minimaux
4. **Update** : Applique uniquement les modifications au DOM réel

React optimise automatiquement les performances en ne mettant à jour que ce qui a vraiment changé.
            `,
            codeExamples: [
              {
                title: "Virtual DOM Demo",
                code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`,
                language: "jsx"
              }
            ],
            duration: 40
          },
          {
            id: "react-foundation-1-3",
            title: "Créer son premier projet React avec Vite",
            content: `
# Premier Projet React avec Vite

##  Pourquoi Vite ?

**Vite** est un **outil de build moderne** créé par Evan You qui offre :
- **Démarrage ultra-rapide** : Serveur de développement en millisecondes
- **Hot Module Replacement** : Mise à jour instantanée sans recharger
- **Build optimisé** : Bundle production ultra-rapide
- **Support TypeScript** : Configuration native

## Création du Projet

\`\`\`bash
npm create vite@latest my-react-app --template react
cd my-react-app
npm install
npm run dev
\`\`\`

## Structure du Projet

\`\`\`
my-app/
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
\`\`\`

Vite est l'outil moderne pour démarrer rapidement avec React !
            `,
            codeExamples: [
              {
                title: "Todo App Complet",
                code: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  return (
    <div className="todo-app">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Ajouter une tâche..."
      />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
                language: "jsx"
              }
            ],
            duration: 50
          },
          {
            id: "react-foundation-1-4",
            title: "Structure d'un projet et configuration",
            content: `
# Architecture React Moderne

##  Structure de Projet Scalable

Une bonne structure React est essentielle pour la maintenabilité :

\`\`\`
my-app/
├── src/
│   ├── components/       # Composants réutilisables
│   ├── hooks/           # Hooks personnalisés
│   ├── services/        # Appels API
│   ├── utils/           # Fonctions utilitaires
│   └── App.jsx          # Composant racine
├── package.json
└── README.md
\`\`\`

## Bonnes Pratiques

### 1. Props Destructuring
\`\`\`jsx
// Préférer
function UserCard({ name, email }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
}
\`\`\`

### 2. Conditional Rendering
\`\`\`jsx
// Préférer
function Loading({ isLoading }) {
  return (
    <div>
      {isLoading ? <div>Chargement...</div> : <div>Contenu chargé</div>}
    </div>
  );
}
\`\`\`

### 3. Keys dans les Listes
\`\`\`jsx
// Sécurisé : key unique
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

Cette structure vous prépare pour des projets React de toute taille !
            `,
            codeExamples: [
              {
                title: "Structure de Projet",
                code: `// src/components/ui/Button.jsx
export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  
  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
}`,
                language: "jsx"
              }
            ],
            duration: 35
          }
        ]
      }
    ]
  },
  {
    id: "tailwind-css",
    title: "Tailwind CSS + DaisyUI",
    description: "Maîtrisez le design utility-first avec DaisyUI pour créer des interfaces magnifiques rapidement",
    icon: "Palette",
    color: "pink",
    chapters: [
      {
        id: "tailwind-1",
        title: "Tailwind CSS Fondamentaux",
        description: "Les bases du framework CSS utility-first",
        order: 1,
        lessons: [
          {
            id: "tailwind-1-1",
            title: "Découverte de Tailwind",
            content: `
# Introduction à Tailwind CSS

## Qu'est-ce que Tailwind CSS ?

**Tailwind CSS** est un **framework CSS utility-first** qui vous permet de construire des designs personnalisés directement dans votre markup, sans écrire une seule ligne de CSS.

## Philosophie Utility-First

###  Approche Traditionnelle
\`\`\`css
/* CSS traditionnel */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}
\`\`\`

###  Approche Tailwind
\`\`\`html
<button class="bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
  Click me
</button>
\`\`\`

##  Avantages Concrets

### 1. Classes Prédéfinies
- **Spacing** : \`p-4\`, \`m-2\`, \`gap-6\`
- **Typography** : \`text-sm\`, \`font-bold\`, \`leading-relaxed\`
- **Colors** : \`bg-blue-500\`, \`text-gray-900\`
- **Layout** : \`flex\`, \`grid\`, \`block\`

### 2. Modificateurs Responsives
- **Breakpoints** : \`sm:\`, \`md:\`, \`lg:\`, \`xl:\`
- **Exemples** : \`w-full md:w-1/2\`, \`p-4 md:p-8\`

### 3. Pseudo-classes
- **States** : \`hover:\`, \`focus:\`, \`active:\`
- **Dark mode** : \`dark:\` prefix

##  DaisyUI : Composants Préfabriqués

### Installation de DaisyUI

\`\`\`bash
npm install daisyui
\`\`\`

### Composants Principaux

#### 1. Boutons
\`\`\`html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
\`\`\`

#### 2. Cards
\`\`\`html
<div class="card card-compact">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p class="text-base-content">Card content here</p>
  </div>
</div>
\`\`\`

Tailwind CSS + DaisyUI vous permet de **prototyper 10x plus vite** !
            `,
            codeExamples: [
              {
                title: "Installation Tailwind",
                code: `npm install -D tailwindcss postcss autoprefixer`,
                language: "bash"
              },
              {
                title: "Configuration Tailwind",
                code: `// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6'
      }
    }
  }
}`,
                language: "javascript"
              }
            ],
            duration: 60
          }
        ]
      }
    ]
  },
  {
    id: "react-native",
    title: "React Native - Développement Mobile",
    description: "Créez des applications mobiles natives pour iOS et Android avec React",
    icon: "Layers",
    color: "green",
    chapters: [
      {
        id: "react-native-1",
        title: "Introduction à React Native",
        description: "Découverte du développement mobile avec React Native",
        order: 1,
        lessons: [
          {
            id: "react-native-1-1",
            title: "Qu'est-ce que React Native ?",
            content: `
# React Native : Applications Mobiles Natives

##  Qu'est-ce que React Native ?

**React Native** est un **framework créé par Facebook** qui permet de construire des **applications mobiles natives** pour iOS et Android en utilisant **React et JavaScript**.

##  Avantages de React Native

### 1. Performance Native
- **Vitesse native** : Pas de WebView, performances optimales
- **Accès matériel** : Caméra, GPS, capteurs natifs
- **Animations fluides** : APIs d'animation natives (60 FPS)

### 2. Développement Web Réutilisé
- **Écosystème React** : Utilisez les hooks et composants React
- **JavaScript moderne** : ES6+, async/await
- **Outils matures** : VSCode, Chrome DevTools

### 3. Time-to-Market Réduit
- **Code partagé** : ~90% du code entre iOS et Android
- **Déploiement simultané** : App Store et Google Play

##  Installation et Premier Projet

### Installation avec Expo

\`\`\`bash
# Installation d'Expo CLI
npm install -g @expo/cli

# Création d'un projet
npx create-expo-app my-mobile-app
cd my-mobile-app
\`\`\`

##  Composants de Base

### View et Text

\`\`\`jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
\`\`\`

React Native vous ouvre le monde du développement mobile ! 📱
            `,
            codeExamples: [
              {
                title: "Premier composant React Native",
                code: `import React from 'react';
import { View, Text } from 'react-native';

function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello React Native!</Text>
    </View>
  );
}`,
                language: "jsx"
              }
            ],
            duration: 45
          }
        ]
      }
    ]
  },
  {
    id: "nextjs-fullstack",
    title: "Next.js - Full-Stack Development",
    description: "Maîtrisez le framework React le plus avancé pour des applications web modernes",
    icon: "Zap",
    color: "blue",
    chapters: [
      {
        id: "nextjs-1",
        title: "Fondamentaux de Next.js",
        description: "Les bases du framework React avec rendu serveur",
        order: 1,
        lessons: [
          {
            id: "nextjs-1-1",
            title: "Découverte de Next.js",
            content: `
# Next.js : Le Framework React Évolué

## Qu'est-ce que Next.js ?

**Next.js** est un **framework React** construit par Vercel qui offre :

###  Features Essentielles

- **Rendu côté serveur (SSR)** : HTML pré-généré
- **Static Site Generation (SSG)** : Pages statiques ultra-rapides
- **API Routes** : Créer des API REST complètes
- **Middleware** : Logique partagée entre requêtes
- **Optimisations automatiques** : Code splitting, caching, etc.

##  Architecture Hybride

### Server Components vs Client Components

\`\`\`jsx
// Server Component (rendu côté serveur)
export default function ServerPage() {
  return (
    <div>
      <h1>Server Component</h1>
      <p>Ce composant est rendu côté serveur</p>
    </div>
  );
}

// Client Component (rendu côté client)
'use client';
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Client Component</h1>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(c + 1)}>Incrémenter</button>
    </div>
  );
}
\`\`\`

##  Installation et Configuration

### Installation

\`\`\`bash
npx create-next-app@latest my-next-app
cd my-next-app
npm install
\`\`\`

Next.js combine le meilleur des React et du web moderne !
            `,
            codeExamples: [
              {
                title: "Server vs Client Component",
                code: `// Server Component
export default function ServerPage() {
  return <h1>Server Component</h1>;
}

// Client Component
'use client';
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Client Component</h1>
      <button onClick={() => setCount(c + 1)}>Incrémenter</button>
    </div>
  );
}`,
                language: "jsx"
              }
            ],
            duration: 60
          }
        ]
      }
    ]
  },
  {
    id: "dev-tools",
    title: "Outils et Bonnes Pratiques",
    description: "Les outils essentiels pour un développement professionnel",
    icon: "Terminal",
    color: "yellow",
    chapters: [
      {
        id: "tools-1",
        title: "TypeScript avec React",
        description: "Typage strict et patterns modernes en React",
        order: 1,
        lessons: [
          {
            id: "tools-1-1",
            title: "TypeScript Fondamentaux pour React",
            content: `
# TypeScript avec React

##  Pourquoi TypeScript ?

**TypeScript** ajoute un **système de typage statique** à JavaScript, permettant de :
- **Détecter les erreurs** à la compilation
- **Améliorer l'autocomplétion** dans l'éditeur
- **Documenter les interfaces** et les props
- **Refactorer en toute sécurité** avec le support du typage

##  Installation et Configuration

### Installation

\`\`\`bash
npm install -D typescript @types/react @types/node
\`\`\`

##  Types de Base

### Interfaces

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}
\`\`\`

### Composants Typés

\`\`\`tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
\`\`\`

TypeScript transforme votre développement React en une expérience plus sûre et productive !
            `,
            codeExamples: [
              {
                title: "Interface TypeScript",
                code: `interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}`,
                language: "typescript"
              }
            ],
            duration: 60
          }
        ]
      }
    ]
  },
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
            content: `
# Portfolio Moderne - Architecture

##  Structure du Projet

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

##  Composants Principaux

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
\`\`\`

Ce portfolio démontre :
- **Architecture moderne** avec séparation claire des responsabilités
- **Design responsive** avec Tailwind CSS
- **Code de qualité** avec TypeScript et bonnes pratiques
            `,
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
};`,
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
    id: "quiz-1-1",
    chapterId: "react-foundation-1",
    title: "Quiz : Introduction à React",
    description: "Testez vos connaissances sur les fondamentaux de React et le DOM virtuel",
    timeLimit: 600,
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q1-1-1",
        type: "qcm",
        question: "Qu'est-ce que React ?",
        options: [
          "Un framework JavaScript complet",
          "Une bibliothèque JavaScript pour construire des interfaces utilisateur",
          "Un langage de programmation",
          "Un système de gestion de base de données"
        ],
        correctAnswer: "Une bibliothèque JavaScript pour construire des interfaces utilisateur",
        explanation: "React est une bibliothèque JavaScript créée par Facebook pour construire des interfaces utilisateur, pas un framework complet.",
        points: 10
      },
      {
        id: "q1-1-2",
        type: "qcm",
        question: "Quel est l'avantage principal du DOM virtuel ?",
        options: [
          "Il rend le site plus rapide automatiquement",
          "Il optimise les mises à jour en ne modifiant que ce qui a changé",
          "Il remplace complètement le DOM réel",
          "Il fonctionne sans JavaScript"
        ],
        correctAnswer: "Il optimise les mises à jour en ne modifiant que ce qui a changé",
        explanation: "Le DOM virtuel compare les anciennes et nouvelles versions et n'applique que les modifications nécessaires au DOM réel.",
        points: 15
      },
      {
        id: "q1-1-3",
        type: "true-false",
        question: "React peut être utilisé pour construire des applications mobiles natives.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        explanation: "Avec React Native, on peut utiliser React pour construire des applications mobiles natives pour iOS et Android.",
        points: 10
      },
      {
        id: "q1-1-4",
        type: "qcm",
        question: "Quelle entreprise a créé React ?",
        options: [
          "Google",
          "Microsoft",
          "Facebook (Meta)",
          "Amazon"
        ],
        correctAnswer: "Facebook (Meta)",
        explanation: "React a été créé par Facebook (maintenant Meta) et est utilisé dans leurs produits comme Facebook et Instagram.",
        points: 10
      },
      {
        id: "q1-1-5",
        type: "fill-blank",
        question: "React utilise un _____ virtuel pour optimiser les performances.",
        blanks: ["DOM"],
        correctAnswer: ["DOM"],
        explanation: "React utilise un DOM virtuel pour optimiser les mises à jour du DOM réel.",
        points: 15
      },
      {
        id: "q1-1-6",
        type: "qcm",
        question: "Qu'est-ce que JSX ?",
        options: [
          "Un langage de programmation séparé",
          "Une extension JavaScript qui permet d'écrire du HTML-like dans le code",
          "Un framework CSS",
          "Un outil de build"
        ],
        correctAnswer: "Une extension JavaScript qui permet d'écrire du HTML-like dans le code",
        explanation: "JSX est une extension de syntaxe JavaScript qui permet d'écrire des structures similaires à HTML directement dans le code JavaScript.",
        points: 15
      },
      {
        id: "q1-1-7",
        type: "qcm",
        question: "Quel outil est recommandé pour démarrer un nouveau projet React ?",
        options: [
          "Create React App",
          "Vite",
          "Webpack",
          "Les deux premiers sont recommandés"
        ],
        correctAnswer: "Les deux premiers sont recommandés",
        explanation: "Vite est l'outil moderne recommandé pour sa rapidité, mais Create React App reste une option viable.",
        points: 10
      },
      {
        id: "q1-1-8",
        type: "true-false",
        question: "Les composants React doivent obligatoirement avoir une classe.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Faux",
        explanation: "React supporte à la fois les composants de classe et les composants fonctionnels (hooks), ces derniers étant maintenant préférés.",
        points: 10
      },
      {
        id: "q1-1-9",
        type: "qcm-multiple",
        question: "Quels sont les avantages de React ? (Sélectionnez toutes les réponses correctes)",
        options: [
          "Performance optimisée avec le DOM virtuel",
          "Composants réutilisables",
          "Grand écosystème et communauté",
          "Obligatoire pour tous les projets web"
        ],
        correctAnswer: ["Performance optimisée avec le DOM virtuel", "Composants réutilisables", "Grand écosystème et communauté"],
        explanation: "React offre de nombreux avantages mais n'est pas obligatoire pour tous les projets web.",
        points: 20
      },
      {
        id: "q1-1-10",
        type: "code-complete",
        question: "Complétez ce composant React fonctionnel :",
        code: `function Welcome() {
  return <h1>_____ React!</h1>;
}

export default function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}`,
        correctAnswer: "Bonjour",
        explanation: "Le composant Welcome retourne un élément h1 avec le texte 'Bonjour React!'.",
        points: 15
      }
    ],
  },
  {
    id: "quiz-2-1",
    chapterId: "tailwind-1",
    title: "Quiz : Tailwind CSS Fondamentaux",
    description: "Testez vos connaissances sur Tailwind CSS et DaisyUI",
    timeLimit: 600,
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q2-1-1",
        type: "qcm",
        question: "Qu'est-ce que Tailwind CSS ?",
        options: [
          "Un framework CSS avec des composants prédéfinis",
          "Un framework CSS utility-first",
          "Un préprocesseur CSS comme SASS",
          "Une bibliothèque JavaScript"
        ],
        correctAnswer: "Un framework CSS utility-first",
        explanation: "Tailwind CSS est un framework utility-first qui fournit des classes utilitaires pour construire des designs personnalisés.",
        points: 10
      },
      {
        id: "q2-1-2",
        type: "qcm",
        question: "Que signifie 'utility-first' ?",
        options: [
          "Utiliser seulement des utilitaires JavaScript",
          "Construire des designs avec des classes utilitaires directement dans le HTML",
          "Créer des composants utilitaires d'abord",
          "Utiliser des utilitaires CSS avant tout le reste"
        ],
        correctAnswer: "Construire des designs avec des classes utilitaires directement dans le HTML",
        explanation: "L'approche utility-first consiste à utiliser des classes utilitaires directement dans le markup pour construire des designs.",
        points: 15
      },
      {
        id: "q2-1-3",
        type: "true-false",
        question: "Tailwind CSS nécessite d'écrire du CSS personnalisé.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Faux",
        explanation: "Avec Tailwind, vous pouvez construire des designs complets sans écrire une seule ligne de CSS personnalisé.",
        points: 10
      },
      {
        id: "q2-1-4",
        type: "fill-blank",
        question: "La classe 'bg-blue-500' définit une couleur de _____ bleue.",
        blanks: ["fond"],
        correctAnswer: ["fond"],
        explanation: "La classe bg- définit la couleur de fond (background).",
        points: 15
      },
      {
        id: "q2-1-5",
        type: "qcm",
        question: "Qu'est-ce que DaisyUI ?",
        options: [
          "Un thème pour Tailwind CSS",
          "Une collection de composants construits avec Tailwind",
          "Un plugin pour VSCode",
          "Un outil de build CSS"
        ],
        correctAnswer: "Une collection de composants construits avec Tailwind",
        explanation: "DaisyUI est une collection de composants prédéfinis construits avec les classes Tailwind CSS.",
        points: 10
      },
      {
        id: "q2-1-6",
        type: "qcm",
        question: "Comment applique-t-on un style responsive avec Tailwind ?",
        options: [
          "Avec des media queries CSS",
          "Avec des préfixes comme 'md:', 'lg:'",
          "Avec JavaScript conditionnel",
          "Avec des fichiers CSS séparés"
        ],
        correctAnswer: "Avec des préfixes comme 'md:', 'lg:'",
        explanation: "Tailwind utilise des préfixes de breakpoint (sm:, md:, lg:, xl:) pour appliquer des styles responsives.",
        points: 15
      },
      {
        id: "q2-1-7",
        type: "true-false",
        question: "Tailwind CSS supporte le mode sombre nativement.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        explanation: "Tailwind CSS supporte le mode sombre avec le préfixe 'dark:' pour les classes.",
        points: 10
      },
      {
        id: "q2-1-8",
        type: "qcm",
        question: "Quelle classe utilise-t-on pour centrer horizontalement un élément ?",
        options: [
          "mx-center",
          "mx-auto",
          "justify-center",
          "text-center"
        ],
        correctAnswer: "mx-auto",
        explanation: "La classe mx-auto applique margin-left: auto et margin-right: auto pour centrer horizontalement.",
        points: 15
      },
      {
        id: "q2-1-9",
        type: "code-complete",
        question: "Complétez ce bouton Tailwind :",
        code: `<button class="bg-blue-600 text-white px-4 py-2 _____">
  Click me
</button>`,
        correctAnswer: "rounded-lg",
        explanation: "La classe rounded-lg ajoute des coins arrondis de taille moyenne au bouton.",
        points: 15
      },
      {
        id: "q2-1-10",
        type: "qcm-multiple",
        question: "Quels sont les avantages de Tailwind CSS ? (Sélectionnez toutes les réponses correctes)",
        options: [
          "Développement rapide",
          "Design cohérent",
          "Taille de CSS optimisée",
          "Apprentissage complexe"
        ],
        correctAnswer: ["Développement rapide", "Design cohérent", "Taille de CSS optimisée"],
        explanation: "Tailwind offre de nombreux avantages mais l'apprentissage est considéré comme relativement simple.",
        points: 20
      }
    ],
  },
  {
    id: "quiz-3-1",
    chapterId: "react-native-1",
    title: "Quiz : React Native Fondamentaux",
    description: "Testez vos connaissances sur le développement mobile avec React Native",
    timeLimit: 600,
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q3-1-1",
        type: "qcm",
        question: "Qu'est-ce que React Native ?",
        options: [
          "Une version mobile de React",
          "Un framework pour créer des applications mobiles natives avec React",
          "Un outil pour convertir des sites web en applications mobiles",
          "Une bibliothèque de composants mobiles"
        ],
        correctAnswer: "Un framework pour créer des applications mobiles natives avec React",
        explanation: "React Native est un framework qui permet de construire des applications mobiles natives en utilisant React et JavaScript.",
        points: 10
      },
      {
        id: "q3-1-2",
        type: "true-false",
        question: "React Native utilise une WebView pour afficher les applications.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Faux",
        explanation: "React Native ne utilise pas de WebView, il compile le code React en composants natifs.",
        points: 10
      },
      {
        id: "q3-1-3",
        type: "qcm",
        question: "Quel outil est recommandé pour démarrer avec React Native ?",
        options: [
          "Create React App",
          "Expo",
          "Vue CLI",
          "Angular CLI"
        ],
        correctAnswer: "Expo",
        explanation: "Expo est l'outil recommandé pour démarrer rapidement avec React Native.",
        points: 15
      },
      {
        id: "q3-1-4",
        type: "fill-blank",
        question: "React Native permet de partager environ _____% du code entre iOS et Android.",
        blanks: ["90"],
        correctAnswer: ["90"],
        explanation: "React Native permet de partager environ 90% du code entre les plateformes iOS et Android.",
        points: 15
      },
      {
        id: "q3-1-5",
        type: "qcm",
        question: "Comment applique-t-on des styles en React Native ?",
        options: [
          "Avec des fichiers CSS",
          "Avec des classes Tailwind",
          "Avec StyleSheet.create()",
          "Avec des styles inline JavaScript"
        ],
        correctAnswer: "Avec StyleSheet.create()",
        explanation: "React Native utilise StyleSheet.create() pour créer et optimiser les styles.",
        points: 15
      },
      {
        id: "q3-1-6",
        type: "qcm",
        question: "Quel est l'équivalent de <div> en React Native ?",
        options: [
          "<div>",
          "<View>",
          "<Container>",
          "<Wrapper>"
        ],
        correctAnswer: "<View>",
        explanation: "View est le composant de base pour les conteneurs en React Native, équivalent de div en web.",
        points: 10
      },
      {
        id: "q3-1-7",
        type: "code-complete",
        question: "Complétez ce composant React Native :",
        code: `import React from 'react';
import { View, Text, _____ } from 'react-native';

function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});`,
        correctAnswer: "StyleSheet",
        explanation: "StyleSheet est importé de react-native pour créer des styles optimisés.",
        points: 15
      },
      {
        id: "q3-1-8",
        type: "true-false",
        question: "React Native peut accéder aux fonctionnalités natives de l'appareil (caméra, GPS).",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        explanation: "React Native peut accéder aux API natives de l'appareil via des modules et bibliothèques spécifiques.",
        points: 10
      },
      {
        id: "q3-1-9",
        type: "qcm",
        question: "Quelle est la principale différence entre React Native et React ?",
        options: [
          "Le langage utilisé",
          "Les composants disponibles",
          "La plateforme cible",
          "La syntaxe"
        ],
        correctAnswer: "La plateforme cible",
        explanation: "La principale différence est que React cible le web tandis que React Native cible les mobiles.",
        points: 15
      },
      {
        id: "q3-1-10",
        type: "qcm-multiple",
        question: "Quels sont les avantages de React Native ? (Sélectionnez toutes les réponses correctes)",
        options: [
          "Performance native",
          "Code partagé entre plateformes",
          "Écosystème React réutilisé",
          "Développement plus lent que le natif"
        ],
        correctAnswer: ["Performance native", "Code partagé entre plateformes", "Écosystème React réutilisé"],
        explanation: "React Native offre de nombreux avantages dont un développement plus rapide que le natif traditionnel.",
        points: 20
      }
    ],
  },
  {
    id: "quiz-4-1",
    chapterId: "nextjs-1",
    title: "Quiz : Next.js Fondamentaux",
    description: "Testez vos connaissances sur Next.js et le développement full-stack",
    timeLimit: 600,
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "q4-1-1",
        type: "qcm",
        question: "Qu'est-ce que Next.js ?",
        options: [
          "Une bibliothèque JavaScript",
          "Un framework React pour le développement full-stack",
          "Un outil de build uniquement",
          "Un système de gestion de base de données"
        ],
        correctAnswer: "Un framework React pour le développement full-stack",
        explanation: "Next.js est un framework React complet qui permet le développement full-stack avec rendu côté serveur.",
        points: 10
      },
      {
        id: "q4-1-2",
        type: "qcm",
        question: "Quelle est la principale caractéristique du rendu côté serveur (SSR) ?",
        options: [
          "Le code s'exécute dans le navigateur",
          "Le HTML est généré sur le serveur",
          "Le site est plus lent",
          "Le JavaScript n'est pas utilisé"
        ],
        correctAnswer: "Le HTML est généré sur le serveur",
        explanation: "Avec le SSR, le HTML est pré-généré sur le serveur avant d'être envoyé au client.",
        points: 15
      },
      {
        id: "q4-1-3",
        type: "true-false",
        question: "Next.js supporte uniquement le rendu côté serveur.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Faux",
        explanation: "Next.js supporte plusieurs modes de rendu : SSR, SSG, ISR et CSR.",
        points: 10
      },
      {
        id: "q4-1-4",
        type: "qcm",
        question: "Qu'est-ce que SSG (Static Site Generation) ?",
        options: [
          "Generation de sites statiques au build time",
          "Generation de sites dynamiques",
          "Un outil de styling",
          "Un système de gestion de contenu"
        ],
        correctAnswer: "Generation de sites statiques au build time",
        explanation: "SSG génère des pages HTML statiques au moment du build pour des performances optimales.",
        points: 15
      },
      {
        id: "q4-1-5",
        type: "fill-blank",
        question: "Les API Routes dans Next.js permettent de créer des _____ REST.",
        blanks: ["API"],
        correctAnswer: ["API"],
        explanation: "Les API Routes permettent de créer des endpoints API directement dans une application Next.js.",
        points: 15
      },
      {
        id: "q4-1-6",
        type: "qcm",
        question: "Quelle directive identifie un Client Component dans Next.js 13+ ?",
        options: [
          "'client'",
          "'use client'",
          "'client-side'",
          "'browser'"
        ],
        correctAnswer: "'use client'",
        explanation: "La directive 'use client' au début d'un fichier identifie un Client Component dans Next.js 13+.",
        points: 15
      },
      {
        id: "q4-1-7",
        type: "true-false",
        question: "Next.js optimise automatiquement les images.",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        explanation: "Next.js inclut une optimisation automatique des images avec le composant Image.",
        points: 10
      },
      {
        id: "q4-1-8",
        type: "code-complete",
        question: "Complétez cette API Route Next.js :",
        code: `// app/api/posts/route.js
import { _____ } from 'next/server';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}`,
        correctAnswer: "NextResponse",
        explanation: "NextResponse est utilisé pour retourner des réponses HTTP dans les API Routes Next.js.",
        points: 15
      },
      {
        id: "q4-1-9",
        type: "qcm",
        question: "Quel est le principal avantage du Server Components ?",
        options: [
          "Ils peuvent utiliser des hooks React",
          "Ils s'exécutent côté serveur et réduisent le JavaScript client",
          "Ils sont plus lents",
          "Ils nécessitent plus de code"
        ],
        correctAnswer: "Ils s'exécutent côté serveur et réduisent le JavaScript client",
        explanation: "Les Server Components s'exécutent côté serveur et n'envoient que le HTML au client, réduisant ainsi le JavaScript nécessaire.",
        points: 15
      },
      {
        id: "q4-1-10",
        type: "qcm-multiple",
        question: "Quelles fonctionnalités offre Next.js ? (Sélectionnez toutes les réponses correctes)",
        options: [
          "Rendu côté serveur",
          "API Routes",
          "Optimisation automatique",
          "Uniquement pour les petits projets"
        ],
        correctAnswer: ["Rendu côté serveur", "API Routes", "Optimisation automatique"],
        explanation: "Next.js offre de nombreuses fonctionnalités et convient à des projets de toutes tailles.",
        points: 20
      }
    ],
  }
];

// Badges data
export const badges = [
  {
    id: "badge-perfect",
    title: "Sans faute",
    description: "100% du premier coup sur un quiz",
    icon: "Trophy",
    condition: "perfect_first_try",
  },
  {
    id: "badge-speedrun",
    title: "Speedrun",
    description: "Temps record sur un quiz",
    icon: "Zap",
    condition: "speed_record",
  },
  {
    id: "badge-streak",
    title: "Série",
    description: "7 jours d'affilée",
    icon: "Flame",
    condition: "week_streak",
  },
  {
    id: "badge-explorer",
    title: "Explorateur",
    description: "Essayer tous les types de questions",
    icon: "Compass",
    condition: "all_question_types",
  },
  {
    id: "badge-master",
    title: "Maître",
    description: "Compléter tous les modules",
    icon: "Crown",
    condition: "all_modules_completed",
  },
];

// Helper function to get stars from percentage
export function getStarsFromPercentage(percentage: number): number {
  if (percentage >= 90) return 3;
  if (percentage >= 70) return 2;
  if (percentage >= 50) return 1;
  return 0;
}

// Helper function to calculate XP from quiz result
export function calculateXP(percentage: number, isFirstAttempt: boolean): number {
  let xp = Math.floor(percentage);
  if (percentage >= 90) xp += 50;
  else if (percentage >= 70) xp += 25;
  else if (percentage >= 50) xp += 10;

  if (isFirstAttempt) xp += 20;
  return xp;
}

// Helper function to get level from XP
export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 500) + 1;
}
