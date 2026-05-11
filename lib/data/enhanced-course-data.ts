// Enhanced Course Data - Programme Complet Multi-Frameworks
// Ce fichier contient le programme complet de cours pour former un développeur full-stack

import type { Module, Chapter, Lesson } from "./course-data";

// PILIER 1 ⚛️ : REACT.JS - LA FONDATION
export const reactFoundationModule: Module = {
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

###  Composants Réutilisables
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

## Structure d'un Projet React

\`\`\`
my-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
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

###  Visualisation du Processus

\`\`\`
// État A (Virtual DOM)
┌─────────────┐
│  <div>      │
│    <h1>     │ ← React modifie ici
│      Hello     │
│    </h1>     │
│    <p>World</p>│
│  </div>      │
└─────────────┘

// État B (Virtual DOM)
┌─────────────┐
│  <div>      │
│    <h1>     │ ← Seul le h1 a changé
│      Hello     │
│    </h1>     │
│    <p>World</p>│ ← Inchangé
│  </div>      │
└─────────────┘

// DOM Réel (après optimisation)
┌─────────────┐
│  <div>      │ ← React applique uniquement
│    <h1>     │   le changement minime
│      Hello     │
│    </h1>     │
│    <p>World</p>│
│  </div>      │
└─────────────┘
\`\`\`

###  Avantages Concrets

- **Performance** : 60x plus rapide pour les mises à jour complexes
- **Développement** : Programmation déclarative au lieu d'impérative
- **Debugging** : Outils développeurs intégrés (React DevTools)

## Exemple Pratique

\`\`\`jsx
import { useState } from 'react';

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
}
\`\`\`

Dans cet exemple :
- **useState** : Crée un état local pour le compteur
- **onClick** : Gère l'interaction utilisateur
- **Render déclaratif** : L'UI reflète automatiquement l'état
          `,
          codeExamples: [
            {
              title: "Virtual DOM Demo",
              code: `import { useState } from 'react';

// Sans React (DOM direct - lent)
function SlowCounter() {
  let count = 0;
  
  return {
    increment: () => {
      count++;
      document.getElementById('count').textContent = count;
    }
  };
}

// Avec React (Virtual DOM - rapide)
function FastCounter() {
  const [count, setCount] = useState(0);
  
  return {
    increment: () => setCount(c => c + 1)
  };
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

**Vite** est un **outil de build moderne** créé par Evan You (créateur de Vue) qui offre :
- **Démarrage ultra-rapide** : Serveur de développement en millisecondes
- **Hot Module Replacement** : Mise à jour instantanée sans recharger
- **Build optimisé** : Bundle production ultra-rapide
- **Support TypeScript** : Configuration native

##  Création du Projet

\`\`\`bash
npm create vite@latest my-react-app --template react
cd my-react-app
npm install
npm run dev
\`\`\`

##  Structure du Projet

\`\`\`
my-react-app/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
\`\`\`

##  Configuration Vite

\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
\`\`\`

##  Personnalisation

### Package.json amélioré

\`\`\`json
{
  "name": "my-react-app",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0"
  }
}
\`\`\`

##  Déploiement

\`\`\`bash
# Build pour production
npm run build

# Preview local
npm run preview

# Déploiement sur Vercel
npm i -g vercel
vercel --prod
\`\`\`
##  Projet Final : Todo App

Créez une application Todo complète avec :
- ✅ Ajout de tâches
- ✅ Suppression de tâches
- ✅ Marquage comme complétées
- ✅ Filtrage (toutes/actives/complétées)
- ✅ Persistance locale
- ✅ Animations fluides

\`\`\`jsx
import { useState } from 'react';
import './App.css';

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

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>Ma Todo List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Ajouter une tâche..."
      />
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
\`\`\`

Ce projet vous donnera une base solide pour comprendre :
- **Gestion d'état** avec useState
- **Manipulation de tableaux** en JavaScript
- **Événements** et interactivité
- **Styling** avec CSS modules
- **Structure de composants** réutilisables
          `,
          codeExamples: [
            {
              title: "Todo App Complet",
              code: `import { useState } from 'react';
import './App.css';

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
├── public/              # Fichiers statiques
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── ui/        # Composants génériques (Button, Input, etc.)
│   │   ├── forms/     # Composants de formulaires
│   │   └── layout/    # Composants de mise en page
│   ├── hooks/           # Hooks personnalisés
│   ├── services/        # Appels API et logique métier
│   ├── utils/           # Fonctions utilitaires
│   ├── styles/          # Styles globaux et thèmes
│   ├── pages/           # Pages (si routing)
│   ├── App.jsx          # Composant racine
│   └── main.jsx         # Point d'entrée
├── package.json
├── vite.config.js       # Configuration Vite
├── .eslintrc.js        # Règles ESLint
├── .prettierrc        # Configuration Prettier
└── README.md
\`\`\`

##  Organisation des Composants

### Composants Atomiques

\`\`\`jsx
// components/ui/Button.jsx
export function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={\`btn btn-\${variant}\`} {...props}>
      {children}
    </button>
  );
}
\`\`\`

### Composants Composés

\`\`\`jsx
// components/forms/ContactForm.jsx
import { Button } from '../ui/Button';

export function ContactForm() {
  return (
    <form>
      <Button>Envoyer</Button>
    </form>
  );
}
\`\`\`

##  Configuration Essentielle

### ESLint Configuration

\`\`\`json
{
  "extends": [
    "react-app",
    "react-hooks"
  ],
  "rules": {
    "react/prop-types": "warn",
    "react-hooks/exhaustive-deps": "warn"
  }
}
\`\`\`

### Prettier Configuration

\`\`\`json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
\`\`\`

##  Bonnes Pratiques

### 1. Props Destructuring

\`\`\`jsx
//  Éviter
function UserCard(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.email}</p>
    </div>
  );
}

//  Préférer
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
// Éviter
function Loading({ isLoading }) {
  if (isLoading) {
    return <div>Chargement...</div>;
  } else {
    return <div>Contenu chargé</div>;
  }
}

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
//  Danger : pas de key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo.text}</li>
      ))}
    </ul>
  );
}

//  Sécurisé : key unique
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

##  Outils de Développement

### VSCode Extensions Indispensables

- **ES7+ React/Redux/React-Native snippets** : Raccourcis de code
- **Prettier** : Formatage automatique
- **ESLint** : Détection d'erreurs en temps réel
- **React Developer Tools** : Debugging des composants
- **Auto Rename Tag** : Renommage intelligent

### Commandes Utiles

\`\`\`bash
# Installation de dépendances
npm install axios react-router-dom

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build

# Linter le code
npm run lint

# Formater le code
npm run format
\`\`\`

Cette structure vous prépare pour des projets React de toute taille, de l'application simple au système d'entreprise complexe.
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
};

export default reactFoundationModule;

// PILIER 2  : TAILWIND CSS + DAISYUI
export const tailwindModule: Module = {
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

## Pourquoi Tailwind est-il si efficace ?

###  Productivité 10x
- **Pas de switch de contexte** : Restez dans votre HTML/JSX
- **Pas de nommage de classes** : Fini les débats de naming
- **Design constraints** : Le système vous empêche de créer des designs incohérents
- **Responsive intégré** : Mobile-first par défaut

###  Avantages Concrets

#### 1. Classes Prédéfinies
- **Spacing** : \`p-4\`, \`m-2\`, \`gap-6\`
- **Typography** : \`text-sm\`, \`font-bold\`, \`leading-relaxed\`
- **Colors** : \`bg-blue-500\`, \`text-gray-900\`
- **Layout** : \`flex\`, \`grid\`, \`block\`

#### 2. Modificateurs Responsives
- **Breakpoints** : \`sm:\`, \`md:\`, \`lg:\`, \`xl:\`
- **Exemples** : \`w-full md:w-1/2\`, \`p-4 md:p-8\`

#### 3. Pseudo-classes
- **States** : \`hover:\`, \`focus:\`, \`active:\`
- **Dark mode** : \`dark:\` prefix

## Installation et Configuration

### Installation avec React

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
\`\`\`

### Configuration

\`\`\`javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6'
      }
    }
  }
}
\`\`\`

### PostCSS Configuration

\`\`\`javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
\`\`\`

##  DaisyUI : Composants Préfabriqués

DaisyUI est une **collection de composants** construits avec Tailwind CSS :

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
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
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

#### 3. Modales
\`\`\`html
<!-- Trigger -->
<label for="my-modal" class="btn btn-primary" onclick="my_modal.showModal()">Open Modal</label>

<!-- Modal -->
<input type="checkbox" id="my_modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Modal Title</h3>
    <p class="py-4">This is a modal dialog.</p>
    <div class="modal-action">
      <label for="my_modal" class="btn">Close</label>
    </div>
  </div>
</div>
\`\`\`

#### 4. Forms
\`\`\`html
<div class="form-control">
  <label class="label">
    <span class="label-text">Your Name</span>
    <input type="text" placeholder="Type here" class="input input-bordered" />
  </label>
</div>
\`\`\`

##  Thèmes et Personnalisation

### Thèmes Inclus (28 thèmes)

DaisyUI propose **28 thèmes prédéfinis** :

#### Thèmes Clairs
- **light** : Thème par défaut
- **cupcake** : Pastels doux
- **bumblebee** : Jaunes chaleureux
- **emerald** : Verts naturels
- **corporate** : Professionnel sobre

#### Thèmes Sombres
- **dark** : Sombre élégant
- **synthwave** : Néon bleuté
- **retro** : Ambiance années 80
- **cyberpunk** : Futuriste radical
- **valentine** : Rouges passionnés

### Personnalisation Avancée

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#22d3ee',
        neutral: '#1f2937',
        'base-100': '#f3f4f6',
        'base-200': '#e5e7eb',
        // ... vos couleurs personnalisées
      }
    }
  }
}
\`\`\`

##  Workflow de Développement

### 1. Intellisense

\`\`\`json
// settings.json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "html": "html",
    "javascript": "javascript",
    "css": "css"
  }
}
\`\`\`

### 2. Plugins VSCode Essentiels

- **Tailwind CSS IntelliSense** : Auto-complétion des classes
- **Tailwind Fold** : Organiser les classes dans l'éditeur
- **Prettier - Tailwind** : Formatage automatique
- **Tailwindwind CSS** : Preview des classes

##  Projets Pratiques

### Projet 1 : Dashboard Moderne

Créez un dashboard complet avec :
- **Sidebar navigation** : \`bg-gray-800\`, \`text-white\`
- **Cards** : \`card\`, \`card-compact\`, \`card-side\`
- **Stats** : \`stat\`, \`stat-title\`, \`stat-desc\`
- **Charts** : Integration avec Chart.js ou Recharts

### Projet 2 : Landing Page Marketing

Page d'accueil marketing avec :
- **Hero section** : \`hero\`, \`hero-overlay\`
- **Features grid** : \`grid\`, \`feature\`
- **Testimonials carousel** : \`carousel\`
- **Call-to-action** : \`btn btn-lg\`

### Projet 3 : Application SaaS

Interface SaaS moderne avec :
- **Tableaux de bord** : \`bg-base-200\`, \`glass\`
- **Navigation tabs** : \`tabs\`, \`tab-active\`
- **Forms complexes** : \`form-control\`, \`input-group\`
- **Data display** : \`table\`, \`table-zebra\`

##  Bonnes Pratiques

### 1. Architecture des Classes

\`\`\`html
<!--  Bon : Sémantique et réutilisable -->
<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-900 mb-4">Title</h2>
  <p class="text-gray-600">Content</p>
</div>

<!--  Mauvais : Classes spécifiques -->
<div class="p-4 bg-white rounded-lg shadow-md custom-card">
  <h2 class="text-xl font-bold text-gray-900 mb-4 custom-title">Title</h2>
  <p class="text-gray-600 custom-content">Content</p>
</div>
\`\`\`

### 2. Responsive Mobile-First

\`\`\`html
<!-- Mobile First -->
<div class="w-full p-4 md:w-1/2 lg:w-1/3">
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold">Mobile First</h3>
  </div>
</div>
\`\`\`

### 3. Composants Réutilisables

\`\`\`jsx
//  Composant réutilisable
function Alert({ variant = 'info', children }) {
  const baseClasses = 'p-4 rounded-lg border-l-4';
  const variantClasses = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700'
  };
  
  return (
    <div className={\`\${baseClasses} \${variantClasses[variant]}\`}>
      {children}
    </div>
  );
}
\`\`\`

##  Conclusion

Tailwind CSS + DaisyUI vous permet de :
- **Prototyper 10x plus vite** : Interfaces complètes en minutes
- **Maintenir la cohérence** : Design system intégré
- **Collaborer efficacement** : Classes standards partagées
- **Itérer rapidement** : Modifications en temps réel
- **Ship avec confiance** : Production-ready immédiatement

C'est l'approche moderne pour créer des interfaces magnifiques rapidement ! 🚀
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
        },
        {
          id: "tailwind-1-2",
          title: "Les Classes Essentielles",
          description: "Maîtrisez toutes les classes fondamentales de Tailwind",
          order: 2,
          lessons: [
            {
              id: "tailwind-1-2-1",
              title: "Couleurs et Typographie",
              content: `
# Couleurs et Typographie Tailwind

##  Système de Couleurs

### Palette par Défaut

\`\`\`css
/* Couleurs primaires */
.bg-blue-500 { background-color: rgb(59 130 246); }
.bg-red-500 { background-color: rgb(239 68 68); }
.bg-green-500 { background-color: rgb(34 197 94); }
.bg-yellow-500 { background-color: rgb(234 179 8); }
.bg-purple-500 { background-color: rgb(168 85 247); }
.bg-gray-500 { background-color: rgb(107 114 128); }

/* Couleurs neutres */
.bg-slate-50 { background-color: rgb(248 250 252); }
.bg-slate-100 { background-color: rgb(241 245 249); }
.bg-slate-200 { background-color: rgb(229 231 235); }
/* ... jusqu'à slate-900 */
\`\`\`

### Utilisation dans JSX

\`\`\`jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  <h1 className="text-2xl font-bold">Bouton primaire</h1>
</div>

<div className="bg-gradient-to-r from-blue-400 to-purple-600 text-white p-6 rounded-xl">
  <h2 className="text-3xl font-bold">Hero section</h2>
</div>
\`\`\`

##  Typographie

### Tailles de Police

\`\`\`html
<!-- Tailles absolues -->
<p class="text-xs">Texte très petit (12px)</p>
<p class="text-sm">Texte petit (14px)</p>
<p class="text-base">Texte normal (16px)</p>
<p class="text-lg">Texte grand (18px)</p>
<p class="text-xl">Texte très grand (20px)</p>
<p class="text-2xl">Texte géant (24px)</p>
<p class="text-3xl">Texte très géant (30px)</p>

<!-- Tailles relatives -->
<p class="text-sm">Petit</p>
<p class="text-base">Normal</p>
<p class="text-lg">Grand</p>
\`\`\`

### Graisses

\`\`\`html
<p class="font-thin">Light (100)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semi-bold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extra-bold (800)</p>
\`\`\`

### Hauteur de Ligne

\`\`\`html
<p class="leading-none">Aucune hauteur de ligne</p>
<p class="leading-tight">Hauteur serrée (1.25)</p>
<p class="leading-snug">Hauteur confortable (1.375)</p>
<p class="leading-normal">Hauteur normale (1.5)</p>
<p class="leading-relaxed">Hauteur détendue (1.625)</p>
<p class="leading-loose">Hauteur lâche (2)</p>
\`\`\`

##  Espacement

### Padding

\`\`\`html
<div class="p-4">Padding: 1rem (16px)</div>
<div class="px-6 py-2">Horizontal: 1.5rem, Vertical: 0.5rem</div>
<div class="p-4 md:p-8">Mobile: 1rem, Desktop: 2rem</div>
\`\`\`

### Margin

\`\`\`html
<div class="m-4">Margin: 1rem</div>
<div class="mx-auto">Centré horizontalement</div>
<div class="my-8">Margin verticale: 2rem</div>
\`\`\`

### Gap

\`\`\`html
<div class="gap-4">Espace entre éléments: 1rem</div>
<div class="space-y-4">Espace vertical entre éléments</div>
<div class="space-x-2">Espace horizontal entre éléments</div>
\`\`\`

##  Exemples Pratiques

### Cards Completes

\`\`\`jsx
// Card avec ombre et bordure
<div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
  <h3 className="text-xl font-bold text-gray-900 mb-4">Card Title</h3>
  <p className="text-gray-600">Card content goes here</p>
</div>

// Card avec gradient
<div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl">
  <h3 className="text-2xl font-bold mb-2">Premium Card</h3>
  <p className="text-blue-100">Premium content</p>
</div>
\`\`\`

### Boutons Variés

\`\`\`jsx
// Bouton primaire
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
  Primary Button
</button>

// Bouton secondaire
<button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors">
  Secondary Button
</button>

// Bouton avec icône
<button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L4 19l-1.5-1.5L12 17.5L7 13z"/>
  </svg>
  Get Started
</button>
\`\`\`

##  Thème Sombre

### Mode Sombre Automatique

\`\`\`jsx
// Avec le hook useTheme
import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    >
      {theme === 'dark' ? '' : ''}
    </button>
  );
}
\`\`\`

### Classes Dark Mode

\`\`\`html
<!-- Ces classes basculent automatiquement -->
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h2 className="text-xl font-bold dark:text-white">Titre</h2>
  <p className="text-gray-600 dark:text-gray-300">Contenu</p>
</div>
\`\`\`

Maîtrisez ces bases pour créer des interfaces magnifiques rapidement avec Tailwind CSS !
          `,
              codeExamples: [
                {
                  title: "Système de couleurs",
                  code: `<div class="bg-blue-500 text-white p-4 rounded-lg">Bouton bleu</div>`,
                  language: "html"
                }
              ],
              duration: 60
            },
            {
              id: "tailwind-1-2-2",
              title: "Layout et Responsive",
              content: `
# Layout et Responsive avec Tailwind

## Mobile-First Design

### Philosophie Responsive

Tailwind CSS adopte une approche **mobile-first** : concevez d'abord pour mobile, puis adaptez pour les écrans plus grands.

### Breakpoints par Défaut

\`\`\`css
/* Breakpoints Tailwind */
sm: 640px   /* Petits écrans */
md: 768px   /* Tablettes */
lg: 1024px  /* Desktop */
xl: 1280px  /* Grands écrans */
2xl: 1536px /* Très grands écrans */
\`\`\`

##  Flexbox avec Tailwind

### Flex Direction

\`\`\`html
<div class="flex flex-row">Horizontal</div>
<div class="flex flex-col">Vertical</div>
<div class="flex flex-row-reverse">Horizontal inversé</div>
<div class="flex flex-col-reverse">Vertical inversé</div>
\`\`\`

### Alignement et Distribution

\`\`\`html
<!-- Justify Content (axe principal) -->
<div class="flex justify-start">À gauche</div>
<div class="flex justify-center">Centré</div>
<div class="flex justify-end">À droite</div>
<div class="flex justify-between">Espace entre</div>
<div class="flex justify-around">Espace autour</div>
<div class="flex justify-evenly">Espace égal</div>

<!-- Align Items (axe secondaire) -->
<div class="flex items-start">En haut</div>
<div class="flex items-center">Au milieu</div>
<div class="flex items-end">En bas</div>
<div class="flex items-stretch">Étiré</div>
<div class="flex items-baseline">Sur la ligne de base</div>
\`\`\`

### Wrap et Gap

\`\`\`html
<!-- Gestion du dépassement -->
<div class="flex flex-wrap">Retour à la ligne</div>
<div class="flex flex-nowrap">Pas de retour</div>

<!-- Espacement -->
<div class="flex gap-4">Espace de 1rem entre éléments</div>
<div class="flex gap-x-2">Espace horizontal seulement</div>
<div class="flex gap-y-4">Espace vertical seulement</div>
\`\`\`

##  Grid System

### Grid de Base

\`\`\`html
<div class="grid grid-cols-3 gap-4">
  <div class="bg-white p-4 rounded">Item 1</div>
  <div class="bg-white p-4 rounded">Item 2</div>
  <div class="bg-white p-4 rounded">Item 3</div>
</div>
\`\`\`

### Grid Avancé

\`\`\`html
<!-- Colonnes responsives -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 colonne sur mobile, 2 sur tablette, 3 sur desktop -->
</div>

<!-- Lignes responsives -->
<div class="grid grid-rows-2 md:grid-rows-3">
  <!-- 2 lignes sur mobile, 3 sur desktop -->
</div>

<!-- Zones de grille -->
<div class="grid grid-cols-4 grid-rows-3 gap-4">
  <div class="col-span-2">Span 2 colonnes</div>
  <div class="row-span-2">Span 2 lignes</div>
</div>
\`\`\`

##  Positionnement

### Positionnement Relatif

\`\`\`html
<div class="relative">
  <div class="absolute top-0 left-0">En haut à gauche</div>
  <div class="absolute top-0 right-0">En haut à droite</div>
  <div class="absolute bottom-0 left-0">En bas à gauche</div>
  <div class="absolute bottom-0 right-0">En bas à droite</div>
  <div class="absolute inset-0">Recouvre tout</div>
</div>
\`\`\`

### Positionnement Fixe

\`\`\`html
<div class="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
  <!-- Header fixe en haut -->
</div>

<div class="fixed bottom-0 right-0 p-4">
  <!-- Bouton flottant en bas à droite -->
</div>
\`\`\`

### Sticky Positionnement

\`\`\`html
<div class="sticky top-0 bg-white shadow-md">
  <!-- Reste visible en haut quand on scroll -->
</div>
\`\`\`

##  Bordures et Ombres

### Bordures

\`\`\`html
<div class="border border-gray-300 rounded-lg">Bordure grise</div>
<div class="border-t-2 border-b-4 border-l-8 border-r-16">Bordures spécifiques</div>
<div class="border-2 border-blue-500">Bordure bleue de 2px</div>
\`\`\`

### Ombres

\`\`\`html
<div class="shadow-sm">Petite ombre</div>
<div class="shadow-md">Ombre moyenne</div>
<div class="shadow-lg">Grande ombre</div>
<div class="shadow-xl">Très grande ombre</div>
<div class="shadow-2xl">Ombre géante</div>

<div class="shadow-inner">Ombre intérieure</div>
\`\`\`

## Animations et Transitions

### Transitions de Base

\`\`\`html
<button class="transition-all duration-300 ease-in-out">
  <!-- Transition fluide sur toutes les propriétés -->
</button>

<div class="transition-colors duration-200">
  <!-- Transition sur les couleurs seulement -->
</div>

<div class="transition-transform duration-500">
  <!-- Transition sur les transformations seulement -->
</div>
\`\`\`

### Animations Utilitaires

\`\`\`html
<div class="animate-spin">Rotation infinie</div>
<div class="animate-pulse">Pulsation</div>
<div class="animate-bounce">Rebond</div>
<div class="animate-ping">Effet radar</div>
<div class="animate-fade-in">Apparition en fondu</div>
\`\`\`

##  Projet Pratique

### Création d'une Landing Page

\`\`\`jsx
function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Titre Héros
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Sous-titre descriptif
          </p>
          <div className="mt-10 flex justify-center">
            <a href="#features" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-base font-medium transition-colors">
              Commencer
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fonctionnalité 1</h3>
            <p className="text-gray-600">Description de la fonctionnalité</p>
          </div>
        </div>
      </section>
    </div>
  );
}
\`\`\`

Cette landing page démontre :
- **Gradient backgrounds**
- **Responsive design**
- **Grid layouts**
- **Shadow effects**
- **Smooth transitions**

Maîtrisez ces concepts pour créer des designs modernes et responsives !
          `,
              codeExamples: [
                {
                  title: "Grid Responsive",
                  code: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-6 rounded-lg shadow-lg">Item</div>
</div>`,
                  language: "html"
                }
              ],
              duration: 60
            }
          ]
        }
      ]
    };

  // PILIER 3 📱 : REACT NATIVE
  export const reactNativeModule: Module = {
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

##  Architecture Cross-Platform

### Code Unique, Applications Multiples

\`\`\`
JavaScript React Native
┌─────────────────┐
│                │
│   React Code   │
│                │
└─────────────────┘
        ↓ Compile ↓
┌─────────────────┐     ┌─────────────────┐
│  iOS App        │     │  Android App   │
│  (Swift/Objective-C)│     │  (Java/Kotlin)   │
└─────────────────┘     └─────────────────┘
\`\`\`

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
- **Mises à jour OTA** : Sans revalidation par les stores

##  Installation et Premier Projet

### Installation avec Expo

\`\`\`bash
# Installation d'Expo CLI
npm install -g @expo/cli

# Création d'un projet
npx create-expo-app my-mobile-app
cd my-mobile-app
\`\`\`

### Structure du Projet

\`\`\`
my-mobile-app/
├── assets/          # Images, polices, icônes
├── node_modules/    # Dépendances
├── App.js          # Composant racine
├── app.json         # Configuration Expo
├── package.json     # Dépendances du projet
├── babel.config.js   # Configuration Babel
└── README.md
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
      <Text style={styles.subtitle}>Votre première application mobile</Text>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
\`\`\`

### StyleSheet

Contrairement au CSS du web, React Native utilise **StyleSheet.create()** :

\`\`\`jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
\`\`\`

##  Styles avec NativeWind

### Installation de NativeWind

\`\`\`bash
npm install nativewind
\`\`\`

### Utilisation

\`\`\`jsx
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';

//  Classes Tailwind directement en React Native !
function StyledComponent() {
  return (
    <View className="bg-blue-500 p-4 rounded-lg">
      <Text className="text-white text-lg font-bold">Styled with Tailwind!</Text>
    </View>
  );
}
\`\`\`

##  Navigation Mobile

### React Navigation

\`\`\`bash
npm install @react-navigation/native @react-navigation/stack
\`\`\`

### Stack Navigator

\`\`\`jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

##  Fonctionnalités Mobiles

### Appareil Photo

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

function CameraScreen() {
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    // Demander la permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission caméra requise');
      return;
    }

    // Prendre une photo
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo ? (
        <Image source={{ uri: photo }} style={{ width: 300, height: 300 }} />
      ) : (
        <TouchableOpacity onPress={takePhoto} style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>📷 Prendre une photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
\`\`\`

##  Géolocalisation

### Installation Expo Location

\`\`\`bash
npx expo install expo-location
\`\`\`

### Utilisation

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation requise');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {location ? (
        <View>
          <Text> Position: {location.coords.latitude}, {location.coords.longitude}</Text>
          <Text> Précision: {location.coords.accuracy}m</Text>
        </View>
      ) : (
        <Text>{errorMsg}</Text>
      )}
    </View>
  );
}
\`\`\`

##  Notifications Push

### Configuration

\`\`\`json
// app.json
{
  "expo": {
    "name": "my-app",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#ffffff",
      "iosDisplayInForeground": true
    },
    "plugins": [
      [
        "expo-notifications"
      ]
    ]
  }
}
\`\`\`

##  Projet Pratique

### Application Todo Mobile

\`\`\`jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

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

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)}>
        <Text style={item.completed ? styles.completedText : styles.normalText}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
        <Text>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Ajouter une tâche..."
        onSubmitEditing={addTodo}
      />
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  normalText: { fontSize: 16 },
  completedText: { fontSize: 16, textDecorationLine: 'line-through', color: '#888' },
  deleteButton: { marginLeft: 10 },
  list: { marginTop: 10 },
});
\`\`\`

Cette application mobile démontre :
- **Gestion d'état** avec useState
- **Listes optimisées** avec FlatList
- **Navigation tactile** avec TouchableOpacity
- **Styles natifs** avec StyleSheet
- **Patterns React** familiers

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
  };

  // PILIER 4  : NEXT.JS - DÉVELOPPEMENT FULL-STACK
  export const nextjsModule: Module = {
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

### Structure du Projet

\`\`\`
my-next-app/
├── app/                    # App Router (Next.js 13+)
├── pages/                   # Pages Router (Next.js 12-)
├── public/                  # Fichiers statiques
├── src/                    # Composants et utilitaires
├── styles/                  # CSS globals
├── next.config.js           # Configuration Next.js
├── package.json             # Dépendances
└── README.md
\`\`\`

##  Routing Avancé

### App Router (Next.js 13+)

\`\`\`jsx
// app/dashboard/page.jsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}

// app/posts/[id]/page.jsx
export default function PostPage({ params }) {
  return <h1>Post: {params.id}</h1>;
}
\`\`\`

### API Routes

\`\`\`jsx
// app/api/posts/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request) {
  const { title, content } = await request.json();
  const post = await createPost({ title, content });
  return NextResponse.json(post, { status: 201 });
}
\`\`\`

##  Performance et Optimisation

### Image Optimization

\`\`\`jsx
import Image from 'next/image';

export default function Avatar({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      placeholder="blur"
      priority={true}
    />
  );
}
\`\`\`

### Dynamic Imports

\`\`\`jsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('../components/heavy-component'),
  { 
    loading: () => <p>Chargement...</p>,
    ssr: false // Rendu côté client uniquement
  }
);
\`\`\`

##  Base de Données avec Prisma

### Installation

\`\`\`bash
npm install prisma @prisma/client
\`\`\`

### Schéma

\`\`\`prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  posts     Post[]
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  published Boolean   @default(false)
  author    User   @relation(fields: [authorId])
  authorId  String
}
\`\`\`

### Utilisation

\`\`\`jsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.post.findMany({
    include: { author: true }
  });
}

export async function createPost({ title, content, authorId }) {
  return await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { id: authorId } }
    }
  });
}
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
  };

  // PILIER 5 🛠️ : OUTILS ET BONNES PRATIQUES
  export const toolsModule: Module = {
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

### Configuration tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable"],
    "allowJs": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
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

##  Hooks Typés

\`\`\`typescript
import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = (text: string) => {
    setTodos([...todos, {
      id: Date.now().toString(),
      text,
      completed: false
    }]);
  };
  
  return { todos, addTodo };
};
\`\`\`

##  Patterns Avancés

### Generic Components

\`\`\`tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

##  Refactoring Sécurisé

### Exemple de Refactoring

\`\`\`typescript
// Avant : Props non typées
function UserCard(props: any) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.email}</p>
    </div>
  );
}

//  Après : Props typées et refactorisé
interface UserCardProps {
  user: {
    name: string;
    email: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
\`\`\`

##  Tests avec TypeScript

### Tests Unitaires

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
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
  };

  // PILIER 6  : PROJETS D'INTÉGRATION COMPLÈTE
  export const projectsModule: Module = {
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

## Structure du Projet

\`\`\`
portfolio/
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── ui/        # Composants génériques
│   │   ├── sections/   # Sections de page
│   │   └── layouts/    # Layouts
│   ├── data/           # Données statiques
│   ├── styles/          # Styles globaux
│   ├── hooks/           # Hooks personnalisés
│   ├── utils/           # Utilitaires
│   ├── pages/           # Pages Next.js
│   └── types/           # Types TypeScript
├── public/               # Fichiers statiques
├── package.json          # Dépendances
├── next.config.js        # Configuration Next.js
├── tailwind.config.js    # Configuration Tailwind
└── README.md
\`\`\`

##  Composants Principaux

### Header Component

\`\`\`tsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-900">Portfolio</span>
          </div>
          
          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </a>
            <a href="#projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Projects
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
\`\`\`

### Hero Section

\`\`\`tsx
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            John Doe
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Développeur Full-Stack spécialisé en React & Node.js
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-base font-medium transition-colors"
            >
              Voir mes projets
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
\`\`\`

##  Fonctionnalités Clés

### Navigation Smooth

\`\`\`tsx
import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        if (rect.top < window.scrollY + 100) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};
\`\`\`

### Animations avec Framer Motion

\`\`\`bash
npm install framer-motion
\`\`\`

\`\`\`tsx
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      {children}
    </motion.div>
  );
};
\`\`\`

Ce portfolio démontre :
- **Architecture moderne** avec séparation claire des responsabilités
- **Design responsive** avec Tailwind CSS
- **Animations fluides** avec Framer Motion
- **Navigation smooth** et expérience utilisateur optimale
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
  };

  // Export de tous les modules
  export const enhancedModules = [
    reactFoundationModule,
    tailwindModule,
    reactNativeModule,
    nextjsModule,
    toolsModule,
    projectsModule
  ];
