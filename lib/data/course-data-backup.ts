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
  moduleId: string;
  order: number;
  lessons: Lesson[];
  quizId: string;
  projectTitle?: string;
  projectDescription?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  chapters: Chapter[];
  color: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}

export interface UserProgress {
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
}

export interface QuizResult {
  id: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  oduleId: string;
  userId: string;
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpent: number;
  answers: { questionId: string; answer: string | string[]; correct: boolean }[];
  attempt: number;
  completedAt: Date;
  stars: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  badges: string[];
  streak: number;
  joinedAt: Date;
}

// Course Content
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

### Écosystème Immense
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

## Pourquoi Vite ?

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

## Structure de Projet Scalable

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

### Approche Tailwind
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

## DaisyUI : Composants Préfabriqués

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

## Installation et Premier Projet

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

## Installation et Configuration

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

## Pourquoi TypeScript ?

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
                    content: `# Installation de React

Il existe plusieurs façons de démarrer un projet React.La plus moderne est d'utiliser un framework comme Next.js ou Vite.

## Avec Vite(recommandé)

Vite est un outil de build ultra - rapide qui offre une excellente expérience de développement.

## Avec Create React App

CRA est l'outil historique de Facebook pour créer des applications React, mais il est aujourd'hui moins recommandé.

## Structure d'un projet

Après l'installation, vous aurez une structure de base avec les fichiers essentiels pour démarrer.`,
                codeExamples: [
                  {
                    title: "Création avec Vite",
                    language: "bash",
                    code: `npm create vite@latest mon-app -- --template react
cd mon-app
npm install
npm run dev`,
                  },
                  {
                    title: "Création avec Create React App",
                    language: "bash",
                    code: `npx create-react-app mon-app
cd mon-app
npm start`,
                  },
                ],
              },
              {
                id: "lesson-1-1-3",
                title: "Structure d'un projet React",
                duration: 15,
                content: `# Structure d'un projet React

Un projet React bien organisé suit généralement une structure claire qui facilite la maintenance et la collaboration.

## Dossiers principaux

- **src/** : Code source de l'application
- **public/** : Fichiers statiques (images, favicon, etc.)
- **node_modules/** : Dépendances installées

## Fichiers importants

- **index.js** ou **main.jsx** : Point d'entrée de l'application
- **App.js** : Composant racine
- **package.json** : Configuration et dépendances`,
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
└── vite.config.js`,
                  },
                  {
                    title: "Point d'entrée (main.jsx)",
                    language: "jsx",
                    code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-1-2",
            title: "JSX en profondeur",
            moduleId: "module-1",
            order: 2,
            quizId: "quiz-1-2",
            lessons: [
              {
                id: "lesson-1-2-1",
                title: "Syntaxe JSX et expressions JavaScript",
                duration: 20,
                content: `# Syntaxe JSX

JSX est une extension de syntaxe pour JavaScript qui ressemble à du HTML. C'est la façon recommandée d'écrire des interfaces en React.

## Expressions JavaScript dans JSX

Vous pouvez intégrer n'importe quelle expression JavaScript valide dans du JSX en l'entourant d'accolades \`{}\`.

## Règles importantes

- Un composant doit retourner un seul élément parent
- Les attributs utilisent le camelCase (className au lieu de class)
- Les balises doivent être fermées (même les auto-fermantes)`,
                codeExamples: [
                  {
                    title: "Expressions dans JSX",
                    language: "jsx",
                    code: `function Greeting() {
  const name = "Marie";
  const age = 25;
  
  return (
    <div>
      <h1>Bonjour, {name} !</h1>
      <p>Tu as {age} ans.</p>
      <p>Dans 5 ans, tu auras {age + 5} ans.</p>
    </div>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-1-2-2",
                title: "Attributs et props en JSX",
                duration: 15,
                content: `# Attributs en JSX

Les attributs JSX sont similaires aux attributs HTML, mais avec quelques différences importantes.

## Différences clés

- \`class\` devient \`className\`
- \`for\` devient \`htmlFor\`
- Les attributs de style sont des objets JavaScript
- Les événements utilisent le camelCase (onClick, onChange)`,
                codeExamples: [
                  {
                    title: "Attributs JSX",
                    language: "jsx",
                    code: `function StyledButton() {
  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px'
  };

  return (
    <button
      className="btn-primary"
      style={buttonStyle}
      onClick={() => alert('Cliqué !')}
    >
      Cliquez-moi
    </button>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-1-2-3",
                title: "Conditions et boucles dans le JSX",
                duration: 20,
                content: `# Rendu conditionnel

React offre plusieurs façons d'afficher du contenu conditionnellement.

## Méthodes courantes

- Opérateur ternaire \`condition ? a : b\`
- Opérateur && pour le rendu conditionnel
- Variables JSX
- Fonctions de rendu`,
                codeExamples: [
                  {
                    title: "Rendu conditionnel",
                    language: "jsx",
                    code: `function UserGreeting({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Bienvenue, {username} !</h1>
      ) : (
        <h1>Veuillez vous connecter</h1>
      )}
      
      {isLoggedIn && <button>Déconnexion</button>}
    </div>
  );
}`,
                  },
                  {
                    title: "Boucles avec map()",
                    language: "jsx",
                    code: `function TodoList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-1-2-4",
                title: "Fragments et clés",
                duration: 15,
                content: `# Fragments React

Les Fragments permettent de grouper des éléments sans ajouter de nœud supplémentaire au DOM.

## Les clés (keys)

Les clés aident React à identifier quels éléments d'une liste ont changé. Elles doivent être uniques parmi les éléments frères.`,
                codeExamples: [
                  {
                    title: "Utilisation des Fragments",
                    language: "jsx",
                    code: `import { Fragment } from 'react';

function Table() {
  return (
    <table>
      <tbody>
        <tr>
          <Columns />
        </tr>
      </tbody>
    </table>
  );
}

function Columns() {
  return (
    <>
      <td>Colonne 1</td>
      <td>Colonne 2</td>
    </>
  );
}`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-1-3",
            title: "Composants React",
            moduleId: "module-1",
            order: 3,
            quizId: "quiz-1-3",
            projectTitle: "Créer une carte de profil utilisateur",
            projectDescription:
              "Créez un composant de carte de profil avec avatar, nom, bio et liens sociaux",
            lessons: [
              {
                id: "lesson-1-3-1",
                title: "Composants fonctionnels vs classes",
                duration: 15,
                content: `# Types de composants

React supporte deux types de composants : les composants fonctionnels et les composants de classe. Aujourd'hui, les composants fonctionnels avec Hooks sont recommandés.`,
                codeExamples: [
                  {
                    title: "Composant fonctionnel",
                    language: "jsx",
                    code: `function Welcome({ name }) {
  return <h1>Bonjour, {name}</h1>;
}`,
                  },
                  {
                    title: "Composant de classe (ancien)",
                    language: "jsx",
                    code: `class Welcome extends React.Component {
  render() {
    return <h1>Bonjour, {this.props.name}</h1>;
  }
}`,
                  },
                ],
              },
              {
                id: "lesson-1-3-2",
                title: "Création de son premier composant",
                duration: 20,
                content: `# Créer un composant

Un composant React est simplement une fonction qui retourne du JSX. Le nom doit commencer par une majuscule.`,
                codeExamples: [
                  {
                    title: "Composant complet",
                    language: "jsx",
                    code: `function Card({ title, description, imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Card;`,
                  },
                ],
              },
              {
                id: "lesson-1-3-3",
                title: "Props et validation avec PropTypes",
                duration: 20,
                content: `# Les Props

Les props (propriétés) sont le mécanisme principal pour passer des données d'un composant parent à un composant enfant.`,
                codeExamples: [
                  {
                    title: "Utilisation des props",
                    language: "jsx",
                    code: `import PropTypes from 'prop-types';

function UserCard({ name, age, email, isAdmin }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Âge: {age}</p>
      <p>Email: {email}</p>
      {isAdmin && <span className="badge">Admin</span>}
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool
};

UserCard.defaultProps = {
  isAdmin: false
};`,
                  },
                ],
              },
              {
                id: "lesson-1-3-4",
                title: "Composition de composants (children)",
                duration: 15,
                content: `# Composition avec children

La prop spéciale \`children\` permet de passer des éléments JSX à un composant, créant ainsi des composants "conteneurs" flexibles.`,
                codeExamples: [
                  {
                    title: "Utilisation de children",
                    language: "jsx",
                    code: `function Card({ children, title }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Utilisation
function App() {
  return (
    <Card title="Mon titre">
      <p>Contenu de la carte</p>
      <button>Action</button>
    </Card>
  );
}`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        title: "État et événements",
        description: "Maîtrisez la gestion des événements et l'état avec useState",
        icon: "Zap",
        color: "yellow",
        chapters: [
          {
            id: "chapter-2-1",
            title: "Gestion des événements",
            moduleId: "module-2",
            order: 1,
            quizId: "quiz-2-1",
            lessons: [
              {
                id: "lesson-2-1-1",
                title: "onClick, onChange et autres événements",
                duration: 20,
                content: `# Événements React

React gère les événements de manière similaire au DOM, mais avec une syntaxe en camelCase et des fonctions comme gestionnaires.`,
                codeExamples: [
                  {
                    title: "Gestionnaires d'événements",
                    language: "jsx",
                    code: `function EventExamples() {
  const handleClick = () => {
    console.log('Bouton cliqué !');
  };

  const handleChange = (e) => {
    console.log('Valeur:', e.target.value);
  };

  return (
    <div>
      <button onClick={handleClick}>Cliquez-moi</button>
      <input onChange={handleChange} placeholder="Tapez ici" />
    </div>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-1-2",
                title: "Passage de paramètres aux gestionnaires",
                duration: 15,
                content: `# Passer des paramètres

Parfois, vous avez besoin de passer des données supplémentaires à vos gestionnaires d'événements.`,
                codeExamples: [
                  {
                    title: "Paramètres avec arrow function",
                    language: "jsx",
                    code: `function ItemList({ items }) {
  const handleDelete = (id) => {
    console.log('Supprimer item:', id);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-1-3",
                title: "Event pooling et synthétique events",
                duration: 15,
                content: `# Événements synthétiques

React utilise des événements synthétiques qui encapsulent les événements natifs du navigateur pour une compatibilité cross-browser.`,
                codeExamples: [
                  {
                    title: "Événement synthétique",
                    language: "jsx",
                    code: `function Form() {
  const handleSubmit = (e) => {
    // e est un événement synthétique React
    e.preventDefault();
    console.log('Type:', e.type);
    console.log('Target:', e.target);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Envoyer</button>
    </form>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-1-4",
                title: "Prévention du comportement par défaut",
                duration: 10,
                content: `# preventDefault et stopPropagation

Ces méthodes permettent de contrôler le comportement par défaut et la propagation des événements.`,
                codeExamples: [
                  {
                    title: "Prévenir le comportement par défaut",
                    language: "jsx",
                    code: `function Link({ href, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Navigation vers:', href);
    // Logique personnalisée...
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-2-2",
            title: "Le Hook useState",
            moduleId: "module-2",
            order: 2,
            quizId: "quiz-2-2",
            projectTitle: "Compteur avec historique",
            projectDescription:
              "Créez un compteur qui garde l'historique de toutes les valeurs",
            lessons: [
              {
                id: "lesson-2-2-1",
                title: "Introduction aux Hooks React",
                duration: 15,
                content: `# Les Hooks React

Les Hooks sont des fonctions spéciales qui permettent d'utiliser l'état et d'autres fonctionnalités React dans les composants fonctionnels.`,
                codeExamples: [
                  {
                    title: "Premier Hook",
                    language: "jsx",
                    code: `import { useState } from 'react';

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
}`,
                  },
                ],
              },
              {
                id: "lesson-2-2-2",
                title: "Déclaration et utilisation de useState",
                duration: 20,
                content: `# useState en détail

useState retourne un tableau avec deux éléments : la valeur actuelle et une fonction pour la modifier.`,
                codeExamples: [
                  {
                    title: "Différents types d'état",
                    language: "jsx",
                    code: `function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isStudent, setIsStudent] = useState(false);
  const [hobbies, setHobbies] = useState([]);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
    </form>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-2-3",
                title: "Mise à jour fonctionnelle du state",
                duration: 20,
                content: `# Mise à jour fonctionnelle

Quand la nouvelle valeur dépend de l'ancienne, utilisez la forme fonctionnelle pour éviter les bugs.`,
                codeExamples: [
                  {
                    title: "Mise à jour fonctionnelle",
                    language: "jsx",
                    code: `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // ✅ Utilise la forme fonctionnelle
    setCount(prevCount => prevCount + 1);
  };

  const incrementThree = () => {
    // Ces trois appels utilisent tous la valeur précédente
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <button onClick={incrementThree}>
      Count: {count}
    </button>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-2-4",
                title: "Patterns avancés avec useState",
                duration: 25,
                content: `# Patterns avancés

Découvrez des patterns utiles pour gérer des états complexes avec useState.`,
                codeExamples: [
                  {
                    title: "État objet",
                    language: "jsx",
                    code: `function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateField = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      <input
        value={user.email}
        onChange={(e) => updateField('email', e.target.value)}
      />
    </form>
  );
}`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-2-3",
            title: "Formulaires contrôlés",
            moduleId: "module-2",
            order: 3,
            quizId: "quiz-2-3",
            lessons: [
              {
                id: "lesson-2-3-1",
                title: "Inputs contrôlés vs non contrôlés",
                duration: 15,
                content: `# Composants contrôlés

Dans un composant contrôlé, React gère la valeur de l'input via l'état.`,
                codeExamples: [
                  {
                    title: "Input contrôlé",
                    language: "jsx",
                    code: `function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-3-2",
                title: "Gestion de formulaires complexes",
                duration: 20,
                content: `# Formulaires complexes

Pour les formulaires avec plusieurs champs, organisez votre état de manière efficace.`,
                codeExamples: [
                  {
                    title: "Formulaire complet",
                    language: "jsx",
                    code: `function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {/* Autres champs... */}
    </form>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-3-3",
                title: "Validation en temps réel",
                duration: 20,
                content: `# Validation de formulaires

Validez les entrées utilisateur en temps réel pour une meilleure expérience.`,
                codeExamples: [
                  {
                    title: "Validation avec feedback",
                    language: "jsx",
                    code: `function ValidatedInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setError('Email invalide');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div>
      <input value={email} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-2-3-4",
                title: "useRef pour les formulaires",
                duration: 15,
                content: `# useRef dans les formulaires

useRef permet d'accéder directement aux éléments DOM, utile pour les inputs non contrôlés.`,
                codeExamples: [
                  {
                    title: "Utilisation de useRef",
                    language: "jsx",
                    code: `import { useRef } from 'react';

function FileInput() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Fichier:', file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleClick}>
        Choisir un fichier
      </button>
    </div>
  );
}`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "module-3",
        title: "Hooks avancés",
        description: "Maîtrisez useEffect, useContext et créez vos propres Hooks",
        icon: "Layers",
        color: "green",
        chapters: [
          {
            id: "chapter-3-1",
            title: "useEffect et cycle de vie",
            moduleId: "module-3",
            order: 1,
            quizId: "quiz-3-1",
            lessons: [
              {
                id: "lesson-3-1-1",
                title: "Comprendre useEffect",
                duration: 25,
                content: `# Le Hook useEffect

useEffect permet d'exécuter des effets de bord dans vos composants : appels API, timers, abonnements, etc.`,
                codeExamples: [
                  {
                    title: "useEffect de base",
                    language: "jsx",
                    code: `import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // [] = exécuté une seule fois

  return <div>{data ? data.message : 'Chargement...'}</div>;
}`,
                  },
                ],
              },
              {
                id: "lesson-3-1-2",
                title: "Tableau de dépendances",
                duration: 20,
                content: `# Dépendances de useEffect

Le tableau de dépendances contrôle quand l'effet s'exécute.`,
                codeExamples: [
                  {
                    title: "Différents cas",
                    language: "jsx",
                    code: `useEffect(() => {
  // S'exécute à chaque rendu
});

useEffect(() => {
  // S'exécute une seule fois (au montage)
}, []);

useEffect(() => {
  // S'exécute quand count change
  console.log('Count a changé:', count);
}, [count]);`,
                  },
                ],
              },
              {
                id: "lesson-3-1-3",
                title: "Cleanup et désabonnement",
                duration: 20,
                content: `# Nettoyage des effets

La fonction de cleanup permet d'annuler les effets (timers, abonnements) quand le composant est démonté.`,
                codeExamples: [
                  {
                    title: "Fonction de cleanup",
                    language: "jsx",
                    code: `useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Fonction de cleanup
  return () => {
    clearInterval(timer);
  };
}, []);`,
                  },
                ],
              },
              {
                id: "lesson-3-1-4",
                title: "Patterns courants (API calls, timers)",
                duration: 25,
                content: `# Patterns useEffect

Découvrez les patterns les plus utilisés avec useEffect.`,
                codeExamples: [
                  {
                    title: "Appel API avec gestion d'erreurs",
                    language: "jsx",
                    code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  return <h1>{user.name}</h1>;
}`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-3-2",
            title: "useContext et Context API",
            moduleId: "module-3",
            order: 2,
            quizId: "quiz-3-2",
            projectTitle: "Thème clair/sombre global",
            projectDescription:
              "Implémentez un système de thème global avec Context API",
            lessons: [
              {
                id: "lesson-3-2-1",
                title: "Problème du prop drilling",
                duration: 15,
                content: `# Le Prop Drilling

Le prop drilling se produit quand vous passez des props à travers plusieurs niveaux de composants.`,
                codeExamples: [
                  {
                    title: "Exemple de prop drilling",
                    language: "jsx",
                    code: `// Problème : theme est passé à travers 3 niveaux
function App() {
  const [theme, setTheme] = useState('light');
  return <Layout theme={theme} />;
}

function Layout({ theme }) {
  return <Content theme={theme} />;
}

function Content({ theme }) {
  return <Button theme={theme} />;
}`,
                  },
                ],
              },
              {
                id: "lesson-3-2-2",
                title: "Création d'un contexte",
                duration: 20,
                content: `# Créer un Context

Context permet de partager des valeurs entre composants sans prop drilling.`,
                codeExamples: [
                  {
                    title: "Création de contexte",
                    language: "jsx",
                    code: `import { createContext, useContext, useState } from 'react';

// 1. Créer le contexte
const ThemeContext = createContext();

// 2. Créer le Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook personnalisé pour utiliser le contexte
function useTheme() {
  return useContext(ThemeContext);
}`,
                  },
                ],
              },
              {
                id: "lesson-3-2-3",
                title: "Provider et Consumer",
                duration: 20,
                content: `# Utiliser le Context

Enveloppez votre application avec le Provider et consommez les valeurs n'importe où.`,
                codeExamples: [
                  {
                    title: "Utilisation complète",
                    language: "jsx",
                    code: `// App.jsx
function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

// Button.jsx - n'importe où dans l'arbre
function Button() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      className={theme === 'dark' ? 'btn-dark' : 'btn-light'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-3-2-4",
                title: "Combiner Context + useReducer",
                duration: 25,
                content: `# Context + useReducer

Pour des états complexes, combinez Context avec useReducer.`,
                codeExamples: [
                  {
                    title: "Pattern Context + Reducer",
                    language: "jsx",
                    code: `const initialState = { theme: 'light', language: 'fr' };

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-3-3",
            title: "Hooks personnalisés",
            moduleId: "module-3",
            order: 3,
            quizId: "quiz-3-3",
            lessons: [
              {
                id: "lesson-3-3-1",
                title: "Pourquoi créer ses propres hooks",
                duration: 15,
                content: `# Hooks personnalisés

Les hooks personnalisés permettent de réutiliser la logique entre composants.`,
                codeExamples: [
                  {
                    title: "Avantages",
                    language: "jsx",
                    code: `// Sans hook personnalisé : code dupliqué
function Component1() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... même logique de fetch
}

function Component2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... même logique de fetch
}

// Avec hook personnalisé : réutilisable
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... logique centralisée
  return { data, loading };
}`,
                  },
                ],
              },
              {
                id: "lesson-3-3-2",
                title: "Règles de création (use prefix)",
                duration: 15,
                content: `# Règles des Hooks

Suivez ces règles pour créer des hooks valides.`,
                codeExamples: [
                  {
                    title: "Convention de nommage",
                    language: "jsx",
                    code: `// ✅ Commence par "use"
function useWindowSize() { ... }
function useLocalStorage() { ... }
function useDebounce() { ... }

// ❌ Ne commence pas par "use"
function getWindowSize() { ... } // Pas un hook !`,
                  },
                ],
              },
              {
                id: "lesson-3-3-3",
                title: "useLocalStorage, useFetch, useDebounce",
                duration: 30,
                content: `# Hooks utiles

Implémentez des hooks couramment utilisés.`,
                codeExamples: [
                  {
                    title: "useLocalStorage",
                    language: "jsx",
                    code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}`,
                  },
                  {
                    title: "useDebounce",
                    language: "jsx",
                    code: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
                  },
                ],
              },
              {
                id: "lesson-3-3-4",
                title: "Tests de hooks personnalisés",
                duration: 20,
                content: `# Tester les Hooks

Utilisez @testing-library/react-hooks pour tester vos hooks.`,
                codeExamples: [
                  {
                    title: "Test de useCounter",
                    language: "jsx",
                    code: `import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});`,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "module-4",
        title: "Tailwind CSS",
        description: "Maîtrisez le framework CSS utility-first",
        icon: "Palette",
        color: "pink",
        chapters: [
          {
            id: "chapter-4-1",
            title: "Découverte de Tailwind",
            moduleId: "module-4",
            order: 1,
            quizId: "quiz-4-1",
            lessons: [
              {
                id: "lesson-4-1-1",
                title: "Philosophie utility-first",
                duration: 15,
                content: `# Utility-First CSS

Tailwind utilise des classes utilitaires pour construire des designs directement dans le HTML.`,
                codeExamples: [
                  {
                    title: "Approche utility-first",
                    language: "html",
                    code: `<!-- Avec Tailwind -->
<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-800">Titre</h2>
  <p class="mt-2 text-gray-600">Description...</p>
</div>

<!-- Sans Tailwind (CSS traditionnel) -->
<div class="card">
  <h2 class="card-title">Titre</h2>
  <p class="card-description">Description...</p>
</div>`,
                  },
                ],
              },
              {
                id: "lesson-4-1-2",
                title: "Installation avec React",
                duration: 20,
                content: `# Installation de Tailwind

Intégrez Tailwind CSS dans votre projet React.`,
                codeExamples: [
                  {
                    title: "Installation",
                    language: "bash",
                    code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
                  },
                  {
                    title: "Configuration tailwind.config.js",
                    language: "javascript",
                    code: `module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
                  },
                ],
              },
              {
                id: "lesson-4-1-3",
                title: "Parcours des classes essentielles",
                duration: 25,
                content: `# Classes essentielles

Découvrez les classes Tailwind les plus utilisées.`,
                codeExamples: [
                  {
                    title: "Classes courantes",
                    language: "html",
                    code: `<!-- Spacing -->
<div class="p-4 m-2 px-6 py-3">

<!-- Colors -->
<div class="bg-blue-500 text-white">
<div class="border border-gray-300">

<!-- Typography -->
<p class="text-lg font-bold text-center">

<!-- Sizing -->
<div class="w-full h-64 max-w-md">

<!-- Display -->
<div class="flex items-center justify-between">`,
                  },
                ],
              },
              {
                id: "lesson-4-1-4",
                title: "Responsive design avec breakpoints",
                duration: 20,
                content: `# Design Responsive

Tailwind utilise des préfixes pour les media queries.`,
                codeExamples: [
                  {
                    title: "Breakpoints",
                    language: "html",
                    code: `<!-- Mobile-first : styles par défaut pour mobile -->
<div class="
  w-full        <!-- Mobile : pleine largeur -->
  md:w-1/2      <!-- Tablette : moitié -->
  lg:w-1/3      <!-- Desktop : tiers -->
">

<!-- Breakpoints disponibles :
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px
-->`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-4-2",
            title: "Layout et Flexbox/Grid",
            moduleId: "module-4",
            order: 2,
            quizId: "quiz-4-2",
            projectTitle: "Grille de cartes responsive",
            projectDescription: "Créez une grille de cartes produit responsive",
            lessons: [
              {
                id: "lesson-4-2-1",
                title: "Flexbox avec Tailwind",
                duration: 25,
                content: `# Flexbox

Utilisez les classes Tailwind pour créer des layouts flexbox.`,
                codeExamples: [
                  {
                    title: "Flexbox patterns",
                    language: "html",
                    code: `<!-- Navigation horizontale -->
<nav class="flex items-center justify-between p-4">
  <div class="flex items-center gap-4">
    <a href="#">Home</a>
    <a href="#">About</a>
  </div>
  <button>Login</button>
</nav>

<!-- Centrage parfait -->
<div class="flex items-center justify-center h-screen">
  <p>Centré !</p>
</div>`,
                  },
                ],
              },
              {
                id: "lesson-4-2-2",
                title: "Grid System",
                duration: 25,
                content: `# CSS Grid

Le système de grille Tailwind pour des layouts complexes.`,
                codeExamples: [
                  {
                    title: "Grid responsive",
                    language: "html",
                    code: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 bg-white rounded shadow">Card 1</div>
  <div class="p-4 bg-white rounded shadow">Card 2</div>
  <div class="p-4 bg-white rounded shadow">Card 3</div>
</div>`,
                  },
                ],
              },
              {
                id: "lesson-4-2-3",
                title: "Positionnement et espacement",
                duration: 20,
                content: `# Position et Spacing

Maîtrisez le positionnement et l'espacement avec Tailwind.`,
                codeExamples: [
                  {
                    title: "Positionnement",
                    language: "html",
                    code: `<!-- Position relative/absolute -->
<div class="relative">
  <img src="..." class="w-full" />
  <span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
    NEW
  </span>
</div>

<!-- Fixed header -->
<header class="fixed top-0 left-0 right-0 bg-white shadow z-50">
  ...
</header>`,
                  },
                ],
              },
              {
                id: "lesson-4-2-4",
                title: "Containers et largeurs",
                duration: 15,
                content: `# Containers

Utilisez les containers pour contrôler la largeur maximale du contenu.`,
                codeExamples: [
                  {
                    title: "Container",
                    language: "html",
                    code: `<div class="container mx-auto px-4">
  <!-- Contenu centré avec largeur maximale -->
</div>

<!-- Largeurs spécifiques -->
<div class="max-w-sm">Small</div>
<div class="max-w-md">Medium</div>
<div class="max-w-lg">Large</div>
<div class="max-w-xl">Extra Large</div>`,
                  },
                ],
              },
            ],
          },
          {
            id: "chapter-4-3",
            title: "Composants réutilisables",
            moduleId: "module-4",
            order: 3,
            quizId: "quiz-4-3",
            lessons: [
              {
                id: "lesson-4-3-1",
                title: "Créer des composants stylisés",
                duration: 20,
                content: `# Composants Tailwind

Créez des composants React réutilisables avec Tailwind.`,
                codeExamples: [
                  {
                    title: "Button component",
                    language: "jsx",
                    code: `function Button({ children, variant = 'primary', size = 'md' }) {
  const baseStyles = 'rounded font-medium transition-colors';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]} \${sizes[size]}\`}>
      {children}
    </button>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-4-3-2",
                title: "Variantes avec clsx/classnames",
                duration: 20,
                content: `# clsx pour les classes conditionnelles

Utilisez clsx pour gérer les classes dynamiques proprement.`,
                codeExamples: [
                  {
                    title: "Avec clsx",
                    language: "jsx",
                    code: `import clsx from 'clsx';

function Button({ variant, disabled, className }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded font-medium',
        {
          'bg-blue-500 text-white': variant === 'primary',
          'bg-gray-200 text-gray-800': variant === 'secondary',
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
    >
      Click
    </button>
  );
}`,
                  },
                ],
              },
              {
                id: "lesson-4-3-3",
                title: "Composants polymorphiques",
                duration: 25,
                content: `# Composants polymorphiques

Créez des composants qui peuvent rendre différents éléments HTML.`,
                codeExamples: [
                  {
                    title: "Composant polymorphique",
                    language: "jsx",
                    code: `function Text({ as: Component = 'p', variant, children, ...props }) {
  const variants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    body: 'text-base',
    small: 'text-sm text-gray-500',
  };

  return (
    <Component className={variants[variant]} {...props}>
      {children}
    </Component>
  );
}

// Usage
<Text as="h1" variant="h1">Grand titre</Text>
<Text as="span" variant="small">Petit texte</Text>`,
                  },
                ],
              },
              {
                id: "lesson-4-3-4",
                title: "Design System miniature",
                duration: 30,
                content: `# Design System

Construisez un mini système de design avec des composants cohérents.`,
                codeExamples: [
                  {
                    title: "Système de tokens",
                    language: "javascript",
                    code: `// theme.js
export const theme = {
  colors: {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
  },
  spacing: {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  },
  radius: {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  },
};`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    // Quiz Data
    export const quizzes: Quiz[] = [
      {
        id: "quiz-1-1",
        chapterId: "chapter-1-1",
        title: "Quiz : Introduction à React",
        description:
          "Testez vos connaissances sur les fondamentaux de React et le DOM virtuel",
        timeLimit: 600,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q1-1-1",
            type: "qcm",
            question: "Qui a développé React ?",
            options: ["Google", "Facebook (Meta)", "Microsoft", "Apple"],
            correctAnswer: "Facebook (Meta)",
            explanation:
              "React a été développé par Facebook (maintenant Meta) et est maintenu par Facebook et une communauté de développeurs.",
            points: 10,
          },
          {
            id: "q1-1-2",
            type: "true-false",
            question:
              "Le DOM virtuel est une copie exacte du DOM réel stockée en mémoire.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation:
              "Le DOM virtuel est effectivement une représentation légère du DOM réel en mémoire JavaScript, ce qui permet à React de calculer les différences avant de mettre à jour le vrai DOM.",
            points: 10,
          },
          {
            id: "q1-1-3",
            type: "qcm",
            question:
              "Quel est le principal avantage du DOM virtuel dans React ?",
            options: [
              "Il rend le code plus lisible",
              "Il optimise les mises à jour du DOM réel",
              "Il permet d'écrire moins de code",
              "Il remplace complètement le DOM réel",
            ],
            correctAnswer: "Il optimise les mises à jour du DOM réel",
            explanation:
              "Le DOM virtuel permet à React de calculer les différences (diffing) et de ne mettre à jour que les parties nécessaires du DOM réel, ce qui améliore les performances.",
            points: 10,
          },
          {
            id: "q1-1-4",
            type: "fill-blank",
            question:
              "Pour créer un projet React avec Vite, on utilise la commande : npm create ___@latest",
            correctAnswer: "vite",
            explanation:
              "La commande complète est 'npm create vite@latest' qui lance l'outil de création de projet Vite.",
            points: 15,
          },
          {
            id: "q1-1-5",
            type: "qcm-multiple",
            question:
              "Quels sont les avantages de React ? (plusieurs réponses possibles)",
            options: [
              "Composants réutilisables",
              "Performance grâce au DOM virtuel",
              "Remplace complètement HTML",
              "Large écosystème",
            ],
            correctAnswer: [
              "Composants réutilisables",
              "Performance grâce au DOM virtuel",
              "Large écosystème",
            ],
            explanation:
              "React offre des composants réutilisables, de bonnes performances via le DOM virtuel, et un large écosystème. Il ne remplace pas HTML mais travaille avec.",
            points: 15,
          },
          {
            id: "q1-1-6",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce composant React :",
            code: `function Welcome() {
  return (
    <h1>Bonjour</h1>
    <p>Bienvenue sur React</p>
  );
}`,
            correctAnswer: "Fragment ou div parent",
            explanation:
              "Un composant React doit retourner un seul élément parent. Il faut envelopper les éléments dans un Fragment (<></>) ou une div.",
            points: 20,
          },
          {
            id: "q1-1-7",
            type: "qcm",
            question: "Dans quel dossier se trouve généralement le code source d'une application React ?",
            options: ["public/", "src/", "node_modules/", "build/"],
            correctAnswer: "src/",
            explanation:
              "Le dossier src/ contient le code source de l'application. public/ contient les fichiers statiques, node_modules/ les dépendances, et build/ le code compilé.",
            points: 10,
          },
          {
            id: "q1-1-8",
            type: "order",
            question:
              "Remettez dans l'ordre les étapes du processus de mise à jour avec le DOM virtuel :",
            orderItems: [
              "Changement d'état",
              "Création d'un nouveau DOM virtuel",
              "Comparaison (diffing) avec l'ancien DOM virtuel",
              "Mise à jour du DOM réel",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation:
              "React suit ce processus : 1) L'état change, 2) Un nouveau DOM virtuel est créé, 3) Il est comparé avec l'ancien (diffing), 4) Seules les différences sont appliquées au DOM réel.",
            points: 20,
          },
          {
            id: "q1-1-9",
            type: "true-false",
            question:
              "React est un framework JavaScript complet comme Angular.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Faux",
            explanation:
              "React est une bibliothèque (library), pas un framework complet. Il se concentre uniquement sur la couche vue (UI) et peut être complété par d'autres bibliothèques.",
            points: 10,
          },
          {
            id: "q1-1-10",
            type: "qcm",
            question: "Quel fichier est le point d'entrée typique d'une application React avec Vite ?",
            options: ["App.jsx", "main.jsx", "index.html", "vite.config.js"],
            correctAnswer: "main.jsx",
            explanation:
              "main.jsx (ou index.js avec CRA) est le point d'entrée où React monte l'application dans le DOM via ReactDOM.createRoot().",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-1-2",
        chapterId: "chapter-1-2",
        title: "Quiz : JSX en profondeur",
        description: "Testez vos connaissances sur la syntaxe JSX et ses particularités",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q1-2-1",
            type: "qcm",
            question: "Comment intègre-t-on une expression JavaScript dans du JSX ?",
            options: [
              "Avec des parenthèses ()",
              "Avec des accolades {}",
              "Avec des crochets []",
              "Avec des guillemets \"\"",
            ],
            correctAnswer: "Avec des accolades {}",
            explanation:
              "Les accolades {} permettent d'insérer n'importe quelle expression JavaScript valide dans du JSX.",
            points: 10,
          },
          {
            id: "q1-2-2",
            type: "fill-blank",
            question:
              "En JSX, l'attribut HTML 'class' devient ___",
            correctAnswer: "className",
            explanation:
              "En JSX, 'class' est un mot réservé en JavaScript, donc on utilise 'className' à la place.",
            points: 10,
          },
          {
            id: "q1-2-3",
            type: "code-complete",
            question: "Complétez le code pour afficher une liste d'éléments :",
            code: `function List({ items }) {
  return (
    <ul>
      {items.___(item => (
        <li ___={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
            blanks: ["map", "key"],
            correctAnswer: ["map", "key"],
            explanation:
              "On utilise map() pour parcourir un tableau et key pour identifier de manière unique chaque élément de la liste.",
            points: 20,
          },
          {
            id: "q1-2-4",
            type: "true-false",
            question: "En JSX, les balises doivent toujours être fermées, même les auto-fermantes comme <img>.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation:
              "Contrairement au HTML, JSX exige que toutes les balises soient fermées : <img /> au lieu de <img>.",
            points: 10,
          },
          {
            id: "q1-2-5",
            type: "qcm",
            question: "Quel est le résultat de ce code JSX : {true && <p>Visible</p>} ?",
            options: [
              "Rien ne s'affiche",
              "Le texte 'Visible' s'affiche",
              "Une erreur se produit",
              "'true' s'affiche",
            ],
            correctAnswer: "Le texte 'Visible' s'affiche",
            explanation:
              "L'opérateur && retourne le second opérande si le premier est truthy. true étant truthy, <p>Visible</p> est affiché.",
            points: 10,
          },
          {
            id: "q1-2-6",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce JSX :",
            code: `function Button() {
  return (
    <button class="btn" onclick="handleClick()">
      Cliquez
    </button>
  );
}`,
            correctAnswer: "className et onClick",
            explanation:
              "En JSX : 'class' devient 'className' et 'onclick' devient 'onClick' (camelCase). De plus, onClick doit recevoir une fonction, pas une chaîne.",
            points: 20,
          },
          {
            id: "q1-2-7",
            type: "qcm",
            question: "Comment écrire un Fragment React de manière raccourcie ?",
            options: ["<Fragment></Fragment>", "<></>", "<Frag></Frag>", "[]"],
            correctAnswer: "<></>",
            explanation:
              "La syntaxe raccourcie <></> est équivalente à <React.Fragment></React.Fragment> et permet de grouper des éléments sans nœud DOM supplémentaire.",
            points: 10,
          },
          {
            id: "q1-2-8",
            type: "fill-blank",
            question:
              "Pour appliquer des styles inline en JSX, on utilise un ___ JavaScript",
            correctAnswer: "objet",
            explanation:
              "Les styles inline en JSX sont passés sous forme d'objet JavaScript : style={{ color: 'red', fontSize: '16px' }}",
            points: 10,
          },
          {
            id: "q1-2-9",
            type: "qcm-multiple",
            question: "Quelles expressions sont valides dans du JSX ? (plusieurs réponses)",
            options: [
              "{2 + 2}",
              "{if (true) 'yes'}",
              "{condition ? 'a' : 'b'}",
              "{array.map(x => x)}",
            ],
            correctAnswer: ["{2 + 2}", "{condition ? 'a' : 'b'}", "{array.map(x => x)}"],
            explanation:
              "Les instructions if ne sont pas des expressions. On utilise le ternaire ou && pour les conditions en JSX.",
            points: 15,
          },
          {
            id: "q1-2-10",
            type: "qcm",
            question: "Pourquoi les clés (keys) sont-elles importantes dans les listes React ?",
            options: [
              "Pour le style CSS",
              "Pour l'identification et l'optimisation du rendu",
              "Pour l'accessibilité",
              "Elles sont optionnelles",
            ],
            correctAnswer: "Pour l'identification et l'optimisation du rendu",
            explanation:
              "Les clés aident React à identifier quels éléments ont changé, été ajoutés ou supprimés, optimisant ainsi le rendu.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-1-3",
        chapterId: "chapter-1-3",
        title: "Quiz : Composants React",
        description: "Testez vos connaissances sur les composants et les props",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q1-3-1",
            type: "qcm",
            question: "Quelle est la convention de nommage pour les composants React ?",
            options: [
              "camelCase (monComposant)",
              "PascalCase (MonComposant)",
              "snake_case (mon_composant)",
              "kebab-case (mon-composant)",
            ],
            correctAnswer: "PascalCase (MonComposant)",
            explanation:
              "Les composants React doivent commencer par une majuscule (PascalCase) pour être distingués des éléments HTML natifs.",
            points: 10,
          },
          {
            id: "q1-3-2",
            type: "true-false",
            question: "Les props d'un composant React peuvent être modifiées par le composant enfant.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Faux",
            explanation:
              "Les props sont en lecture seule (read-only). Un composant ne doit jamais modifier ses props directement.",
            points: 10,
          },
          {
            id: "q1-3-3",
            type: "code-complete",
            question: "Complétez ce composant pour utiliser les props correctement :",
            code: `function Greeting({ ___ }) {
  return <h1>Bonjour, {___} !</h1>;
}`,
            blanks: ["name", "name"],
            correctAnswer: ["name", "name"],
            explanation:
              "On déstructure la prop 'name' des props et on l'utilise dans le JSX avec des accolades.",
            points: 15,
          },
          {
            id: "q1-3-4",
            type: "qcm",
            question: "Que représente la prop spéciale 'children' ?",
            options: [
              "Les composants enfants du DOM",
              "Le contenu passé entre les balises ouvrante et fermante",
              "Les props des enfants",
              "Une liste d'éléments",
            ],
            correctAnswer: "Le contenu passé entre les balises ouvrante et fermante",
            explanation:
              "La prop 'children' contient tout ce qui est passé entre <Component> et </Component>.",
            points: 10,
          },
          {
            id: "q1-3-5",
            type: "qcm",
            question: "Quel type de composant est recommandé aujourd'hui ?",
            options: [
              "Composants de classe",
              "Composants fonctionnels avec Hooks",
              "Les deux sont équivalents",
              "Composants purs uniquement",
            ],
            correctAnswer: "Composants fonctionnels avec Hooks",
            explanation:
              "Depuis React 16.8, les composants fonctionnels avec Hooks sont la méthode recommandée car ils sont plus simples et plus flexibles.",
            points: 10,
          },
          {
            id: "q1-3-6",
            type: "fill-blank",
            question: "Pour passer des props à un composant, on utilise la syntaxe d'___ comme en HTML.",
            correctAnswer: "attributs",
            explanation:
              "Les props sont passées comme des attributs HTML : <Component prop1={value1} prop2={value2} />",
            points: 10,
          },
          {
            id: "q1-3-7",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce composant :",
            code: `function Welcome({ name }) {
  name = name.toUpperCase();
  return <h1>Bonjour {name}</h1>;
}`,
            correctAnswer: "Ne pas modifier les props directement",
            explanation:
              "Les props sont immuables. On doit créer une variable locale ou utiliser une variable d'état pour les modifications.",
            points: 20,
          },
          {
            id: "q1-3-8",
            type: "qcm-multiple",
            question: "Quelles sont les caractéristiques des composants React ? (plusieurs réponses)",
            options: [
              "Réutilisables",
              "Composables",
              "Modifiables directement",
              "Prévisibles",
            ],
            correctAnswer: ["Réutilisables", "Composables", "Prévisibles"],
            explanation:
              "Les composants React sont réutilisables, composables (peuvent être combinés) et prévisibles (même props = même rendu). Ils ne sont pas modifiables directement.",
            points: 15,
          },
          {
            id: "q1-3-9",
            type: "order",
            question: "Remettez dans l'ordre le cycle de rendu d'un composant :",
            orderItems: [
              "Appel du composant avec les props",
              "Calcul du JSX à retourner",
              "Comparaison avec le rendu précédent",
              "Mise à jour du DOM si nécessaire",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation:
              "React suit ce processus : 1) Appel du composant, 2) Calcul du rendu, 3) Comparaison, 4) Mise à jour du DOM.",
            points: 20,
          },
          {
            id: "q1-3-10",
            type: "true-false",
            question: "Un composant React peut retourner un tableau d'éléments JSX.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation:
              "Depuis React 16, un composant peut retourner un tableau d'éléments ou un Fragment. Chaque élément du tableau doit avoir une clé unique.",
            points: 10,
          },
          {
            id: "q1-3-6",
            type: "fill-blank",
            question: "Pour passer des props à un composant, on utilise la syntaxe d'___ comme en HTML.",
            correctAnswer: "attributs",
            explanation:
              "Les props sont passées comme des attributs HTML : <Component prop1={value1} prop2={value2} />",
            points: 10,
          },
          {
            id: "q1-3-7",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce composant :",
            code: `function Welcome({ name }) {
  name = name.toUpperCase();
  return <h1>Bonjour {name}</h1>;
}`,
            correctAnswer: "Ne pas modifier les props directement",
            explanation:
              "Les props sont immuables. On doit créer une variable locale ou utiliser une variable d'état pour les modifications.",
            points: 20,
          },
          {
            id: "q1-3-8",
            type: "qcm-multiple",
            question: "Quelles sont les caractéristiques des composants React ? (plusieurs réponses)",
            options: [
              "Réutilisables",
              "Composables",
              "Modifiables directement",
              "Prévisibles",
            ],
            correctAnswer: ["Réutilisables", "Composables", "Prévisibles"],
            explanation:
              "Les composants React sont réutilisables, composables (peuvent être combinés) et prévisibles (même props = même rendu). Ils ne sont pas modifiables directement.",
            points: 15,
          },
          {
            id: "q1-3-9",
            type: "order",
            question: "Remettez dans l'ordre le cycle de rendu d'un composant :",
            orderItems: [
              "Appel du composant avec les props",
              "Calcul du JSX à retourner",
              "Comparaison avec le rendu précédent",
              "Mise à jour du DOM si nécessaire",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation:
              "React suit ce processus : 1) Appel du composant, 2) Calcul du rendu, 3) Comparaison, 4) Mise à jour du DOM.",
            points: 20,
          },
          {
            id: "q1-3-10",
            type: "true-false",
            question: "Un composant React peut retourner un tableau d'éléments JSX.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation:
              "Depuis React 16, un composant peut retourner un tableau d'éléments ou un Fragment. Chaque élément du tableau doit avoir une clé unique.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-2-1",
        chapterId: "chapter-2-1",
        title: "Quiz : Gestion des événements",
        description: "Testez vos connaissances sur les événements React et leur gestion",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q2-1-1",
            type: "qcm",
            question: "Quel attribut utilise-t-on pour gérer les clics en React ?",
            options: ["onclick", "onClick", "on-click", "on_click"],
            correctAnswer: "onClick",
            explanation: "React utilise la convention camelCase pour les événements, donc 'onclick' HTML devient 'onClick' en React.",
            points: 10,
          },
          {
            id: "q2-1-2",
            type: "true-false",
            question: "Les gestionnaires d'événements React reçoivent un événement synthétique.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "React utilise des événements synthétiques (SyntheticEvent) qui enveloppent les événements natifs pour assurer une compatibilité cross-browser.",
            points: 10,
          },
          {
            id: "q2-1-3",
            type: "code-complete",
            question: "Complétez ce gestionnaire d'événement :",
            code: `function Button() {
  const handleClick = (___) => {
    console.log('Bouton cliqué !');
  };
  
  return <button ___={handleClick}>Cliquez-moi</button>;
}`,
            blanks: ["event", "onClick"],
            correctAnswer: ["event", "onClick"],
            explanation: "Les gestionnaires reçoivent un objet événement en paramètre et sont attachés avec onClick.",
            points: 20,
          },
          {
            id: "q2-1-4",
            type: "qcm",
            question: "Comment empêcher le comportement par défaut d'un événement ?",
            options: [
              "event.preventDefault()",
              "event.stopDefault()",
              "event.cancel()",
              "return false",
            ],
            correctAnswer: "event.preventDefault()",
            explanation: "preventDefault() empêche le comportement par défaut (ex: soumission de formulaire, navigation).",
            points: 10,
          },
          {
            id: "q2-1-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce code :",
            code: `function Form() {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Envoyer</button>
    </form>
  );
}`,
            correctAnswer: "handleSubmit doit preventDefault",
            explanation: "Il faut définir handleSubmit(e) et appeler e.preventDefault() pour éviter le rechargement de la page.",
            points: 20,
          },
          {
            id: "q2-1-6",
            type: "qcm-multiple",
            question: "Quels sont les événements clavier courants en React ? (plusieurs réponses)",
            options: ["onKeyDown", "onKeyUp", "onKeyPress", "onType"],
            correctAnswer: ["onKeyDown", "onKeyUp", "onKeyPress"],
            explanation: "React supporte onKeyDown, onKeyUp, onKeyPress. onType n'existe pas.",
            points: 15,
          },
          {
            id: "q2-1-7",
            type: "fill-blank",
            question: "Pour accéder à la valeur d'un input contrôlé, on utilise l'état du composant via le Hook ___.",
            correctAnswer: "useState",
            explanation: "Les inputs contrôlés utilisent useState pour stocker et mettre à jour leur valeur.",
            points: 10,
          },
          {
            id: "q2-1-8",
            type: "order",
            question: "Remettez dans l'ordre le flux d'un événement de clic :",
            orderItems: [
              "Utilisateur clique sur l'élément",
              "React crée un événement synthétique",
              "Le gestionnaire d'événement est appelé",
              "Le DOM est mis à jour si nécessaire",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "React suit ce processus : clic → événement synthétique → gestionnaire → mise à jour DOM.",
            points: 20,
          },
          {
            id: "q2-1-9",
            type: "qcm",
            question: "Comment passer des paramètres à un gestionnaire d'événements ?",
            options: [
              "onClick={handler(param)}",
              "onClick={() => handler(param)}",
              "onClick={handler.bind(param)}",
              "onClick={handler(param, event)}",
            ],
            correctAnswer: "onClick={() => handler(param)}",
            explanation: "On utilise une fonction fléchée pour appeler le gestionnaire avec des paramètres tout en passant l'événement.",
            points: 15,
          },
          {
            id: "q2-1-10",
            type: "true-false",
            question: "Les événements React sont attachés directement au DOM virtuel.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Faux",
            explanation: "React utilise la délégation d'événements : un seul écouteur est attaché au conteneur principal pour tous les événements.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-2-2",
        chapterId: "chapter-2-2",
        title: "Quiz : Le Hook useState",
        description: "Testez vos connaissances sur la gestion d'état avec useState",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q2-2-1",
            type: "qcm",
            question: "D'où vient le Hook useState ?",
            options: ["React", "JavaScript natif", "Node.js", "TypeScript"],
            correctAnswer: "React",
            explanation: "useState est un Hook intégré à React qui doit être importé depuis 'react'.",
            points: 10,
          },
          {
            id: "q2-2-2",
            type: "fill-blank",
            question: "useState retourne un tableau avec deux éléments : l'état actuel et une fonction pour le ___.",
            correctAnswer: "mettre à jour",
            explanation: "useState retourne [valeur, setValeur] où setValeur met à jour l'état.",
            points: 10,
          },
          {
            id: "q2-2-3",
            type: "code-complete",
            question: "Complétez ce Hook useState :",
            code: `const [count, ___] = ___(0);`,
            blanks: ["setCount", "useState"],
            correctAnswer: ["setCount", "useState"],
            explanation: "On déstructure le tableau retourné par useState : [valeur, setValeur].",
            points: 15,
          },
          {
            id: "q2-2-4",
            type: "true-false",
            question: "La mise à jour d'état avec useState est synchrone.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Faux",
            explanation: "Les mises à jour d'état sont asynchrones. React les regroupe pour optimiser les performances.",
            points: 10,
          },
          {
            id: "q2-2-5",
            type: "qcm",
            question: "Comment mettre à jour l'état basé sur l'état précédent ?",
            options: [
              "setState(newState)",
              "setState(prevState => newState)",
              "state = newState",
              "updateState(newState)",
            ],
            correctAnswer: "setState(prevState => newState)",
            explanation: "Quand le nouvel état dépend du précédent, on utilise la forme fonctionnelle pour éviter les problèmes de concurrence.",
            points: 15,
          },
          {
            id: "q2-2-6",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce code :",
            code: `function Counter() {
  let count = 0;
  
  const increment = () => {
    count = count + 1;
  };
  
  return <button onClick={increment}>{count}</button>;
}`,
            correctAnswer: "Utiliser useState au lieu de let",
            explanation: "Il faut utiliser const [count, setCount] = useState(0) et setCount(count + 1) pour que React re-rendre le composant.",
            points: 20,
          },
          {
            id: "q2-2-7",
            type: "qcm-multiple",
            question: "Quelles sont les règles des Hooks React ? (plusieurs réponses)",
            options: [
              "Utiliser seulement au niveau racine",
              "Utiliser dans les conditions",
              "Appeler dans les boucles",
              "Utiliser dans les composants fonctionnels",
            ],
            correctAnswer: ["Utiliser seulement au niveau racine", "Utiliser dans les composants fonctionnels"],
            explanation: "Les Hooks doivent être appelés au niveau racine et seulement dans les composants fonctionnels.",
            points: 15,
          },
          {
            id: "q2-2-8",
            type: "order",
            question: "Remettez dans l'ordre le processus de mise à jour avec useState :",
            orderItems: [
              "Appel de la fonction de mise à jour",
              "React planifie un re-rendu",
              "Le composant est re-rendu",
              "Le nouvel état est appliqué",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "setState → planification → re-rendu → application du nouvel état.",
            points: 20,
          },
          {
            id: "q2-2-9",
            type: "fill-blank",
            question: "Pour stocker un objet dans l'état, on utilise useState avec un ___.",
            correctAnswer: "objet",
            explanation: "useState peut stocker n'importe quelle valeur JavaScript, y compris des objets.",
            points: 10,
          },
          {
            id: "q2-2-10",
            type: "qcm",
            question: "Que se passe-t-il si on appelle la fonction de mise à jour avec la même valeur ?",
            options: [
              "Le composant re-rend quand même",
              "React ignore la mise à jour",
              "Une erreur se produit",
              "L'état est dupliqué",
            ],
            correctAnswer: "React ignore la mise à jour",
            explanation: "React compare l'ancien et le nouvel état. S'ils sont identiques, le re-rendu est évité pour optimiser les performances.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-2-3",
        chapterId: "chapter-2-3",
        title: "Quiz : Formulaires contrôlés",
        description: "Testez vos connaissances sur les formulaires contrôlés en React",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q2-3-1",
            type: "qcm",
            question: "Qu'est-ce qu'un formulaire contrôlé en React ?",
            options: [
              "Un formulaire où React contrôle les valeurs des champs",
              "Un formulaire HTML normal",
              "Un formulaire sans validation",
              "Un formulaire avec CSS",
            ],
            correctAnswer: "Un formulaire où React contrôle les valeurs des champs",
            explanation: "Dans un formulaire contrôlé, React stocke les valeurs des champs dans l'état et les met à jour via onChange.",
            points: 10,
          },
          {
            id: "q2-3-2",
            type: "true-false",
            question: "Dans un formulaire contrôlé, la valeur d'un input vient de l'état React.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "C'est le principe d'un formulaire contrôlé : la valeur est contrôlée par React via l'état.",
            points: 10,
          },
          {
            id: "q2-3-3",
            type: "code-complete",
            question: "Complétez ce champ contrôlé :",
            code: `function Form() {
  const [value, setValue] = useState('');
  
  return (
    <input
      type="text"
      ___={value}
      ___={(e) => setValue(e.target.value)}
    />
  );
}`,
            blanks: ["value", "onChange"],
            correctAnswer: ["value", "onChange"],
            explanation: "Un champ contrôlé a une valeur liée à l'état et onChange pour la mettre à jour.",
            points: 20,
          },
          {
            id: "q2-3-4",
            type: "qcm",
            question: "Comment gérer un champ de type checkbox dans un formulaire contrôlé ?",
            options: [
              "Avec checked et onChange",
              "Avec value et onChange",
              "Avec selected et onChange",
              "Avec checked et onCheck",
            ],
            correctAnswer: "Avec checked et onChange",
            explanation: "Les checkboxes utilisent l'attribut 'checked' au lieu de 'value' pour leur état coché/décoché.",
            points: 15,
          },
          {
            id: "q2-3-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce formulaire :",
            code: `function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <form>
      <input value={email} />
      <input value={password} />
    </form>
  );
}`,
            correctAnswer: "Manque les onChange",
            explanation: "Les inputs contrôlés doivent avoir onChange pour mettre à jour l'état, sinon ils deviennent read-only.",
            points: 20,
          },
          {
            id: "q2-3-6",
            type: "qcm-multiple",
            question: "Quels sont les avantages des formulaires contrôlés ? (plusieurs réponses)",
            options: [
              "Validation en temps réel",
              "Formatage des données",
              "Moins de code",
              "Accès immédiat aux valeurs",
            ],
            correctAnswer: ["Validation en temps réel", "Formatage des données", "Accès immédiat aux valeurs"],
            explanation: "Les formulaires contrôlés permettent validation, formatage et accès immédiat, mais nécessitent plus de code.",
            points: 15,
          },
          {
            id: "q2-3-7",
            type: "fill-blank",
            question: "Pour un champ select, on utilise l'attribut ___ pour contrôler la sélection.",
            correctAnswer: "value",
            explanation: "Contrairement aux checkboxes, les selects utilisent 'value' pour contrôler l'option sélectionnée.",
            points: 10,
          },
          {
            id: "q2-3-8",
            type: "order",
            question: "Remettez dans l'ordre le flux d'un champ contrôlé :",
            orderItems: [
              "Utilisateur tape dans le champ",
              "onChange est déclenché",
              "La fonction met à jour l'état",
              "Le composant re-rend avec la nouvelle valeur",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "Saisie → onChange → setState → re-rendu avec nouvelle valeur.",
            points: 20,
          },
          {
            id: "q2-3-9",
            type: "qcm",
            question: "Comment réinitialiser un formulaire contrôlé ?",
            options: [
              "Réinitialiser chaque état à sa valeur initiale",
              "Appeler form.reset()",
              "Recharger la page",
              "Utiliser clear()",
            ],
            correctAnswer: "Réinitialiser chaque état à sa valeur initiale",
            explanation: "Dans un formulaire contrôlé, on doit réinitialiser chaque état individuellement à sa valeur initiale.",
            points: 15,
          },
          {
            id: "q2-3-10",
            type: "true-false",
            question: "Les formulaires contrôlés sont plus performants que les non contrôlés.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Faux",
            explanation: "Les formulaires contrôlés sont moins performants car ils provoquent un re-rendu à chaque changement, mais offrent plus de contrôle.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-3-1",
        chapterId: "chapter-3-1",
        title: "Quiz : useEffect et cycle de vie",
        description: "Testez vos connaissances sur les effets de bord et le cycle de vie React",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q3-1-1",
            type: "qcm",
            question: "À quoi sert le Hook useEffect ?",
            options: [
              "Gérer les effets de bord",
              "Créer des composants",
              "Styliser les éléments",
              "Router l'application",
            ],
            correctAnswer: "Gérer les effets de bord",
            explanation: "useEffect permet de gérer les effets de bord : appels API, abonnements, manipulation DOM, etc.",
            points: 10,
          },
          {
            id: "q3-1-2",
            type: "true-false",
            question: "useEffect s'exécute après chaque rendu du composant.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "Par défaut, useEffect s'exécute après chaque rendu. On peut contrôler cela avec le tableau de dépendances.",
            points: 10,
          },
          {
            id: "q3-1-3",
            type: "code-complete",
            question: "Complétez cet useEffect pour s'exécuter une seule fois :",
            code: `useEffect(() => {
  console.log('Composant monté');
}, ___);`,
            blanks: ["[]"],
            correctAnswer: ["[]"],
            explanation: "Un tableau vide [] signifie que l'effet ne dépend de rien et ne s'exécute qu'une fois (au montage).",
            points: 15,
          },
          {
            id: "q3-1-4",
            type: "qcm",
            question: "Que retourne useEffect lorsqu'il a une fonction de nettoyage ?",
            options: [
              "Une fonction de nettoyage",
              "Une Promise",
              "Un objet",
              "Un tableau",
            ],
            correctAnswer: "Une fonction de nettoyage",
            explanation: "useEffect peut retourner une fonction qui sera appelée lors du démontage ou avant le prochain effet.",
            points: 15,
          },
          {
            id: "q3-1-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce code :",
            code: `function Timer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, []);
  
  return <div>{count}</div>;
}`,
            correctAnswer: "Utiliser la forme fonctionnelle ou ajouter count aux dépendances",
            explanation: "Il faut utiliser setCount(c => c + 1) ou ajouter count aux dépendances pour éviter les problèmes de closure.",
            points: 20,
          },
          {
            id: "q3-1-6",
            type: "qcm-multiple",
            question: "Quand utiliser useEffect ? (plusieurs réponses)",
            options: [
              "Appels API",
              "Abonnements (WebSocket, EventSource)",
              "Manipulation directe du DOM",
              "Calculs simples",
            ],
            correctAnswer: ["Appels API", "Abonnements (WebSocket, EventSource)", "Manipulation directe du DOM"],
            explanation: "useEffect est pour les effets de bord. Les calculs simples doivent être faits pendant le rendu.",
            points: 15,
          },
          {
            id: "q3-1-7",
            type: "fill-blank",
            question: "Le tableau de dépendances de useEffect contrôle quand l'effet doit être ___.",
            correctAnswer: "réexécuté",
            explanation: "Les dépendances déterminent si l'effet doit être réexécuté quand elles changent.",
            points: 10,
          },
          {
            id: "q3-1-8",
            type: "order",
            question: "Remettez dans l'ordre le cycle de vie avec useEffect :",
            orderItems: [
              "Rendu initial du composant",
              "Exécution de useEffect",
              "Mise à jour d'état ou props",
              "Réexécution de useEffect si dépendances changent",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "Rendu → useEffect → mise à jour → réexécution si nécessaire.",
            points: 20,
          },
          {
            id: "q3-1-9",
            type: "qcm",
            question: "Comment éviter les boucles infinies avec useEffect ?",
            options: [
              "Bien gérer le tableau de dépendances",
              "Utiliser useCallback",
              "Ne jamais mettre d'état dans les dépendances",
              "Utiliser useMemo",
            ],
            correctAnswer: "Bien gérer le tableau de dépendances",
            explanation: "Il faut s'assurer que les dépendances sont correctes et ne provoquent pas de réexécutions infinies.",
            points: 15,
          },
          {
            id: "q3-1-10",
            type: "true-false",
            question: "Plusieurs useEffect peuvent coexister dans un même composant.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "On peut utiliser plusieurs useEffect pour séparer logiquement différents effets de bord.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-3-2",
        chapterId: "chapter-3-2",
        title: "Quiz : useContext et Context API",
        description: "Testez vos connaissances sur le partage de données avec Context",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q3-2-1",
            type: "qcm",
            question: "Quel problème résout la Context API ?",
            options: [
              "Le prop drilling",
              "Les performances",
              "Le styling",
              "Le routing",
            ],
            correctAnswer: "Le prop drilling",
            explanation: "La Context API permet d'éviter le prop drilling en partageant des données directement aux composants qui en ont besoin.",
            points: 10,
          },
          {
            id: "q3-2-2",
            type: "true-false",
            question: "Un contexte doit être créé avec useContext.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Faux",
            explanation: "Un contexte est créé avec createContext(). useContext est utilisé pour consommer le contexte dans un composant.",
            points: 10,
          },
          {
            id: "q3-2-3",
            type: "code-complete",
            question: "Complétez la création et consommation d'un contexte :",
            code: `const ThemeContext = ___('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = ___(ThemeContext);
  return <div>{theme}</div>;
}`,
            blanks: ["createContext", "useContext"],
            correctAnswer: ["createContext", "useContext"],
            explanation: "createContext crée le contexte et useContext le consomme dans les composants enfants.",
            points: 20,
          },
          {
            id: "q3-2-4",
            type: "qcm",
            question: "Quel composant fournit les données du contexte aux composants enfants ?",
            options: [
              "Context.Provider",
              "Context.Consumer",
              "Context.Provider",
              "Context.Supplier",
            ],
            correctAnswer: "Context.Provider",
            explanation: "Context.Provider est le composant qui fournit la valeur du contexte à ses descendants.",
            points: 15,
          },
          {
            id: "q3-2-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce code :",
            code: `const UserContext = createContext();

function App() {
  const user = { name: 'John' };
  
  return (
    <UserContext>
      <Profile />
    </UserContext>
  );
}`,
            correctAnswer: "Manque l'attribut value",
            explanation: "Context.Provider nécessite un attribut value pour fournir la valeur du contexte.",
            points: 20,
          },
          {
            id: "q3-2-6",
            type: "qcm-multiple",
            question: "Quand utiliser la Context API ? (plusieurs réponses)",
            options: [
              "Thème (clair/sombre)",
              "Authentification utilisateur",
              "Données locales d'un formulaire",
              "Préférences linguistiques",
            ],
            correctAnswer: ["Thème (clair/sombre)", "Authentification utilisateur", "Préférences linguistiques"],
            explanation: "La Context API est idéale pour les données globales comme thème, auth, préférences. Pas pour les données locales.",
            points: 15,
          },
          {
            id: "q3-2-7",
            type: "fill-blank",
            question: "La valeur par défaut d'un contexte est utilisée quand aucun ___ n'est trouvé dans l'arbre.",
            correctAnswer: "Provider",
            explanation: "Si aucun Provider n'est trouvé dans l'arbre des composants, la valeur par défaut du contexte est utilisée.",
            points: 10,
          },
          {
            id: "q3-2-8",
            type: "order",
            question: "Remettez dans l'ordre le flux du Context API :",
            orderItems: [
              "Création du contexte avec createContext",
              "Fourniture de la valeur avec Provider",
              "Consommation dans un composant enfant",
              "Mise à jour de la valeur si nécessaire",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "createContext → Provider → useContext → mise à jour.",
            points: 20,
          },
          {
            id: "q3-2-9",
            type: "qcm",
            question: "Comment créer un contexte avec TypeScript ?",
            options: [
              "createContext<Type>(defaultValue)",
              "createContext<Type>()",
              "createContext(defaultValue: Type)",
              "createContext(): Type",
            ],
            correctAnswer: "createContext<Type>(defaultValue)",
            explanation: "Avec TypeScript, on utilise createContext<Type>(defaultValue) pour typer le contexte.",
            points: 15,
          },
          {
            id: "q3-2-10",
            type: "true-false",
            question: "Les composants consommant un contexte se re-rendent quand la valeur change.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "React optimise le re-rendu : seuls les composants consommant le contexte qui a changé sont re-rendus.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-3-3",
        chapterId: "chapter-3-3",
        title: "Quiz : Hooks personnalisés",
        description: "Testez vos connaissances sur la création de Hooks personnalisés",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q3-3-1",
            type: "qcm",
            question: "Quelle est la convention de nommage pour les Hooks personnalisés ?",
            options: [
              "Commencer par 'use'",
              "Commencer par 'hook'",
              "Commencer par une majuscule",
              "Pas de convention particulière",
            ],
            correctAnswer: "Commencer par 'use'",
            explanation: "Les Hooks personnalisés doivent commencer par 'use' (ex: useCounter, useFetch) pour que React les reconnaisse.",
            points: 10,
          },
          {
            id: "q3-3-2",
            type: "true-false",
            question: "Un Hook personnalisé peut utiliser d'autres Hooks React.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "Les Hooks personnalisés peuvent composer d'autres Hooks React pour créer une logique réutilisable.",
            points: 10,
          },
          {
            id: "q3-3-3",
            type: "code-complete",
            question: "Complétez ce Hook personnalisé simple :",
            code: `function ___() {
  const [value, setValue] = useState(0);
  
  const increment = () => setValue(prev => prev + 1);
  const decrement = () => setValue(prev => prev - 1);
  
  return { value, increment, decrement };
}`,
            blanks: ["useCounter"],
            correctAnswer: ["useCounter"],
            explanation: "Un Hook personnalisé suit la convention useXXX et peut retourner des valeurs et fonctions.",
            points: 20,
          },
          {
            id: "q3-3-4",
            type: "qcm",
            question: "Quel est l'avantage principal des Hooks personnalisés ?",
            options: [
              "Réutiliser la logique d'état",
              "Améliorer les performances",
              "Remplacer les composants",
              "Styliser plus facilement",
            ],
            correctAnswer: "Réutiliser la logique d'état",
            explanation: "Les Hooks personnalisés permettent d'extraire et réutiliser la logique d'état entre composants.",
            points: 15,
          },
          {
            id: "q3-3-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce Hook :",
            code: `function useData() {
  if (someCondition) {
    const [data, setData] = useState(null);
  }
  
  return data;
}`,
            correctAnswer: "Hook appelé conditionnellement",
            explanation: "Les Hooks ne peuvent pas être appelés conditionnellement. useState doit être au niveau racine du Hook.",
            points: 20,
          },
          {
            id: "q3-3-6",
            type: "qcm-multiple",
            question: "Que peut retourner un Hook personnalisé ? (plusieurs réponses)",
            options: [
              "Un tableau",
              "Un objet",
              "Une seule valeur",
              "Une fonction",
            ],
            correctAnswer: ["Un tableau", "Un objet", "Une seule valeur", "Une fonction"],
            explanation: "Un Hook personnalisé peut retourner n'importe quelle valeur JavaScript.",
            points: 15,
          },
          {
            id: "q3-3-7",
            type: "fill-blank",
            question: "Les Hooks personnalisés permettent de partager la logique sans changer la ___ du composant.",
            correctAnswer: "structure",
            explanation: "Les Hooks permettent de partager la logique sans modifier la structure hiérarchique des composants.",
            points: 10,
          },
          {
            id: "q3-3-8",
            type: "order",
            question: "Remettez dans l'ordre la création d'un Hook personnalisé :",
            orderItems: [
              "Identifier la logique à réutiliser",
              "Créer une fonction useXXX",
              "Extraire la logique avec les Hooks React",
              "Retourner les valeurs/fonctions nécessaires",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "Identification → création → extraction → retour des valeurs.",
            points: 20,
          },
          {
            id: "q3-3-9",
            type: "qcm",
            question: "Comment gérer le nettoyage dans un Hook personnalisé ?",
            options: [
              "Retourner une fonction depuis useEffect",
              "Utiliser un Hook useCleanup",
              "Appeler cleanup() manuellement",
              "Utiliser componentWillUnmount",
            ],
            correctAnswer: "Retourner une fonction depuis useEffect",
            explanation: "Le nettoyage se gère comme dans useEffect : en retournant une fonction de nettoyage.",
            points: 15,
          },
          {
            id: "q3-3-10",
            type: "true-false",
            question: "Les Hooks personnalisés peuvent être testés unitairement.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "Les Hooks personnalisés peuvent être testés avec @testing-library/react-hooks ou en les utilisant dans des composants de test.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-4-1",
        chapterId: "chapter-4-1",
        title: "Quiz : Découverte de Tailwind",
        description: "Testez vos connaissances sur les bases de Tailwind CSS",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q4-1-1",
            type: "qcm",
            question: "Quel type de framework est Tailwind CSS ?",
            options: [
              "Utility-first CSS framework",
              "Component-based framework",
              "CSS-in-JS library",
              "CSS preprocessor",
            ],
            correctAnswer: "Utility-first CSS framework",
            explanation: "Tailwind est un framework CSS utilitaire qui fournit des classes de bas niveau pour construire des designs personnalisés.",
            points: 10,
          },
          {
            id: "q4-1-2",
            type: "true-false",
            question: "Tailwind CSS nécessite d'écrire du CSS personnalisé.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Faux",
            explanation: "Avec Tailwind, on utilise les classes utilitaires directement dans le HTML/JSX sans écrire de CSS personnalisé.",
            points: 10,
          },
          {
            id: "q4-1-3",
            type: "code-complete",
            question: "Complétez ces classes Tailwind pour un bouton bleu centré :",
            code: `<button className="bg-blue-500 text-white ___ ___">
  Cliquez-moi
</button>`,
            blanks: ["px-4", "py-2"],
            correctAnswer: ["px-4", "py-2"],
            explanation: "px-4 ajoute du padding horizontal, py-2 du padding vertical pour créer un bouton.",
            points: 15,
          },
          {
            id: "q4-1-4",
            type: "qcm",
            question: "Que signifie 'md:' dans une classe Tailwind ?",
            options: [
              "Breakpoint medium (768px)",
              "Medium density",
              "Middle position",
              "Minimum width",
            ],
            correctAnswer: "Breakpoint medium (768px)",
            explanation: "Les préfixes de breakpoint (sm:, md:, lg:, xl:) appliquent les classes à partir de certaines tailles d'écran.",
            points: 15,
          },
          {
            id: "q4-1-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ces classes Tailwind :",
            code: `<div className="margin-4 padding-2 background-color-red">
  Contenu
</div>`,
            correctAnswer: "Utiliser les bonnes classes Tailwind",
            explanation: "Tailwind utilise m-4 (margin), p-2 (padding) et bg-red-500 (background-color).",
            points: 20,
          },
          {
            id: "q4-1-6",
            type: "qcm-multiple",
            question: "Quels sont les avantages de Tailwind CSS ? (plusieurs réponses)",
            options: [
              "CSS optimisé et purgé",
              "Design cohérent",
              "Moins de CSS à maintenir",
              "Apprentissage rapide",
            ],
            correctAnswer: ["CSS optimisé et purgé", "Design cohérent", "Moins de CSS à maintenir"],
            explanation: "Tailwind génère du CSS optimisé, assure la cohérence et réduit la maintenance du CSS.",
            points: 15,
          },
          {
            id: "q4-1-7",
            type: "fill-blank",
            question: "Pour créer un espacement de 1rem (16px), on utilise la classe ___.",
            correctAnswer: "p-4",
            explanation: "Tailwind utilise une échelle où 1 unité = 0.25rem. Donc 4 unités = 1rem (16px).",
            points: 10,
          },
          {
            id: "q4-1-8",
            type: "order",
            question: "Remettez dans l'ordre le workflow Tailwind :",
            orderItems: [
              "Écrire des classes utilitaires",
              "Configuration personnalisée si besoin",
              "Build et purge du CSS",
              "Déploiement avec CSS optimisé",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "Classes → configuration → build/purge → déploiement.",
            points: 20,
          },
          {
            id: "q4-1-9",
            type: "qcm",
            question: "Comment créer des espacements responsive avec Tailwind ?",
            options: [
              "sm:p-4 md:p-6 lg:p-8",
              "p-responsive-4-6-8",
              "p(4,6,8)",
              "responsive:p-4-6-8",
            ],
            correctAnswer: "sm:p-4 md:p-6 lg:p-8",
            explanation: "On empile les préfixes de breakpoint pour créer des designs responsive.",
            points: 15,
          },
          {
            id: "q4-1-10",
            type: "true-false",
            question: "Tailwind CSS inclut des préférences pour le mode sombre.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "Tailwind supporte le mode sombre avec des classes comme 'dark:' et des préférences utilisateur.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-4-2",
        chapterId: "chapter-4-2",
        title: "Quiz : Layout et Flexbox/Grid",
        description: "Testez vos connaissances sur les systèmes de layout avec Tailwind",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q4-2-1",
            type: "qcm",
            question: "Quelle classe Tailwind active Flexbox ?",
            options: ["flex", "display-flex", "flexbox", "dflex"],
            correctAnswer: "flex",
            explanation: "La classe 'flex' active display: flex en CSS.",
            points: 10,
          },
          {
            id: "q4-2-2",
            type: "true-false",
            question: "Les classes Flexbox de Tailwind suivent les mêmes noms que les propriétés CSS.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "Tailwind utilise des noms cohérents avec CSS : justify-center, items-center, flex-row, etc.",
            points: 10,
          },
          {
            id: "q4-2-3",
            type: "code-complete",
            question: "Complétez ces classes pour centrer un élément avec Flexbox :",
            code: `<div className="flex ___ ___ h-screen">
  <div>Centré</div>
</div>`,
            blanks: ["justify-center", "items-center"],
            correctAnswer: ["justify-center", "items-center"],
            explanation: "justify-center centre horizontalement, items-center centre verticalement.",
            points: 15,
          },
          {
            id: "q4-2-4",
            type: "qcm",
            question: "Comment créer une grille avec Tailwind ?",
            options: [
              "grid grid-cols-3",
              "display-grid cols-3",
              "grid-layout 3-columns",
              "grid-columns-3",
            ],
            correctAnswer: "grid grid-cols-3",
            explanation: "'grid' active display: grid et 'grid-cols-3' définit 3 colonnes.",
            points: 15,
          },
          {
            id: "q4-2-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce layout :",
            code: `<div className="flex direction-column">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`,
            correctAnswer: "Utiliser flex-col",
            explanation: "Tailwind utilise 'flex-col' pour flex-direction: column, pas 'direction-column'.",
            points: 20,
          },
          {
            id: "q4-2-6",
            type: "qcm-multiple",
            question: "Quelles sont les propriétés Flexbox disponibles dans Tailwind ? (plusieurs réponses)",
            options: [
              "justify-content",
              "align-items",
              "flex-direction",
              "flex-wrap",
            ],
            correctAnswer: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
            explanation: "Tailwind inclut toutes les propriétés Flexbox principales avec des classes correspondantes.",
            points: 15,
          },
          {
            id: "q4-2-7",
            type: "fill-blank",
            question: "Pour créer un espacement entre les éléments Flexbox, on utilise la classe gap-___.",
            correctAnswer: "4",
            explanation: "gap-4 ajoute un espacement de 1rem (16px) entre tous les éléments flex.",
            points: 10,
          },
          {
            id: "q4-2-8",
            type: "order",
            question: "Remettez dans l'ordre la création d'une grille responsive :",
            orderItems: [
              "Ajouter la classe grid",
              "Définir les colonnes par défaut",
              "Ajouter les colonnes responsive",
              "Ajuster les gaps si nécessaire",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "grid → grid-cols → responsive grid-cols → gap.",
            points: 20,
          },
          {
            id: "q4-2-9",
            type: "qcm",
            question: "Comment centrer une grille avec Tailwind ?",
            options: [
              "place-items-center",
              "grid-center",
              "justify-items-center",
              "items-center",
            ],
            correctAnswer: "place-items-center",
            explanation: "place-items-center centre les éléments à la fois horizontalement et verticalement dans une grille.",
            points: 15,
          },
          {
            id: "q4-2-10",
            type: "true-false",
            question: "Tailwind supporte CSS Grid nativement.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "Tailwind inclut des classes complètes pour CSS Grid : grid, grid-cols, grid-rows, gap, etc.",
            points: 10,
          },
        ],
      },
      {
        id: "quiz-4-3",
        chapterId: "chapter-4-3",
        title: "Quiz : Composants réutilisables",
        description: "Testez vos connaissances sur la création de composants réutilisables avec Tailwind",
        timeLimit: 900,
        passingScore: 70,
        maxAttempts: 3,
        questions: [
          {
            id: "q4-3-1",
            type: "qcm",
            question: "Quelle approche Tailwind est recommandée pour les composants réutilisables ?",
            options: [
              "@apply dans des classes CSS",
              "Classes utilitaires directement",
              "CSS-in-JS",
              "Modules CSS",
            ],
            correctAnswer: "@apply dans des classes CSS",
            explanation: "Pour les composants réutilisables, @apply permet d'extraire des classes utilitaires dans des classes CSS.",
            points: 10,
          },
          {
            id: "q4-3-2",
            type: "true-false",
            question: "La directive @apply fonctionne dans les fichiers CSS.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "@apply est une directive Tailwind utilisée dans les fichiers CSS pour combiner des classes utilitaires.",
            points: 10,
          },
          {
            id: "q4-3-3",
            type: "code-complete",
            question: "Complétez ce composant bouton avec @apply :",
            code: `.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded-lg ___ ___;
}`,
            blanks: ["hover:bg-blue-600", "transition-colors"],
            correctAnswer: ["hover:bg-blue-600", "transition-colors"],
            explanation: "@apply peut inclure des états comme hover: et des transitions.",
            points: 15,
          },
          {
            id: "q4-3-4",
            type: "qcm",
            question: "Comment gérer les variantes d'un composant avec Tailwind ?",
            options: [
              "Classes CSS avec @apply",
              "Props dynamiques",
              "JavaScript inline styles",
              "CSS variables",
            ],
            correctAnswer: "Classes CSS avec @apply",
            explanation: "On crée différentes classes CSS avec @apply pour chaque variante du composant.",
            points: 15,
          },
          {
            id: "q4-3-5",
            type: "code-fix",
            question: "Trouvez et corrigez l'erreur dans ce CSS :",
            code: `.card {
  @apply bg-white p-4 shadow;
  @apply dark:bg-gray-800;
}`,
            correctAnswer: "Combiner les @apply",
            explanation: "On peut combiner toutes les classes dans un seul @apply ou utiliser plusieurs @apply selon les besoins.",
            points: 20,
          },
          {
            id: "q4-3-6",
            type: "qcm-multiple",
            question: "Quels sont les avantages des composants avec @apply ? (plusieurs réponses)",
            options: [
              "Code plus propre",
              "Facile à maintenir",
              "Performance optimale",
              "Réutilisabilité",
            ],
            correctAnswer: ["Code plus propre", "Facile à maintenir", "Réutilisabilité"],
            explanation: "@apply rend le code plus propre, maintenable et réutilisable tout en gardant les bénéfices de Tailwind.",
            points: 15,
          },
          {
            id: "q4-3-7",
            type: "fill-blank",
            question: "Pour créer des variantes de taille, on utilise souvent des classes comme btn-___ et btn-___.",
            correctAnswer: ["sm", "lg"],
            explanation: "Les variantes de taille suivent souvent des conventions comme btn-sm, btn-md, btn-lg.",
            points: 10,
          },
          {
            id: "q4-3-8",
            type: "order",
            question: "Remettez dans l'ordre la création d'un composant réutilisable :",
            orderItems: [
              "Identifier les classes communes",
              "Créer une classe CSS avec @apply",
              "Ajouter les variantes nécessaires",
              "Tester et documenter le composant",
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "Identification → création → variantes → test/documentation.",
            points: 20,
          },
          {
            id: "q4-3-9",
            type: "qcm",
            question: "Comment gérer le mode sombre dans les composants ?",
            options: [
              "Classes dark: avec @apply",
              "Variables CSS",
              "JavaScript conditionnel",
              "Media queries manuelles",
            ],
            correctAnswer: "Classes dark: avec @apply",
            explanation: "Tailwind permet d'utiliser dark: dans @apply pour gérer le mode sombre dans les composants.",
            points: 15,
          },
          {
            id: "q4-3-10",
            type: "true-false",
            question: "Les composants Tailwind peuvent être partagés entre projets.",
            options: ["Vrai", "Faux"],
            correctAnswer: "Vrai",
            explanation: "Les composants créés avec Tailwind et @apply peuvent être partagés et réutilisés entre différents projets.",
            points: 10,
          },
        ],
      },
    ];

    // Badges data
    export const badges: Badge[] = [
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
        id: "badge-persistent",
        title: "Persévérant",
        description: "10 quiz complétés",
        icon: "Target",
        condition: "complete_10_quizzes",
      },
      {
        id: "badge-react-expert",
        title: "Expert React",
        description: "Tous les quiz React ≥ 90%",
        icon: "Atom",
        condition: "react_mastery",
      },
      {
        id: "badge-tailwind-master",
        title: "Maître Tailwind",
        description: "Tous les quiz Tailwind ≥ 90%",
        icon: "Palette",
        condition: "tailwind_mastery",
      },
      {
        id: "badge-scholar",
        title: "Érudit",
        description: "Quiz parfait sur tous les modules",
        icon: "GraduationCap",
        condition: "all_perfect",
      },
      {
        id: "badge-streak-7",
        title: "Série de 7",
        description: "7 jours consécutifs d'apprentissage",
        icon: "Flame",
        condition: "streak_7",
      },
      {
        id: "badge-first-quiz",
        title: "Premier pas",
        description: "Premier quiz complété",
        icon: "Star",
        condition: "first_quiz",
      },
    ];

    // Helper function to get stars from percentage
    export function getStarsFromPercentage(percentage: number): number {
      if(percentage >= 90) return 3;
if (percentage >= 70) return 2;
if (percentage >= 50) return 1;
return 0;
}

// Helper function to calculate XP from quiz result
export function calculateXP(percentage: number, isFirstAttempt: boolean): number {
  let xp = Math.floor(percentage);
  if (percentage >= 90) xp += 50;
  else if (percentage >= 70) xp += 25;
  if (isFirstAttempt) xp *= 1.5;
  return Math.floor(xp);
}

// Helper function to get level from XP
export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 500) + 1;
}
