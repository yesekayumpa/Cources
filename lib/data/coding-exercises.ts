import { CodingExercise } from "@/components/quiz/coding-quiz";

// Données des quiz de codage
export const codingQuizzes = [
  {
    id: "react-basics-001",
    title: "Quiz Pratique : React Basics",
    description: "Testez vos connaissances fondamentales de React avec des exercices pratiques",
    exercises: ["hello-world-001", "button-001", "counter-001"],
    totalTime: 15,
    passingScore: 70,
    maxAttempts: 3,
    difficulty: "beginner",
    xpReward: 150,
    tags: ["React", "useState", "Components"]
  },
  {
    id: "react-intermediate-001",
    title: "Quiz Pratique : React Intermediary",
    description: "Approfondissez vos compétences React avec des exercices plus complexes",
    exercises: ["todo-list-001", "form-001"],
    totalTime: 25,
    passingScore: 75,
    maxAttempts: 3,
    difficulty: "intermediate",
    xpReward: 250,
    tags: ["React", "Forms", "State Management"]
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
    tags: ["React", "Advanced", "Patterns"]
  },
  {
    id: "react-expert-001",
    title: "Quiz Pratique : React Expert",
    description: "Testez votre maîtrise de React avec des exercices de niveau expert",
    exercises: ["infinite-scroll-001"],
    totalTime: 30,
    passingScore: 85,
    maxAttempts: 2,
    difficulty: "expert",
    xpReward: 600,
    tags: ["React", "Expert", "Performance"]
  }
];

// Exercices de codage pour différents niveaux et types
export const codingExercises: CodingExercise[] = [
  // Niveau Débutant
  {
    id: "counter-001",
    title: "Compteur React simple",
    description: "Créez votre premier composant React avec un compteur",
    type: "write-from-scratch",
    difficulty: "easy",
    points: 25,
    timeLimit: 5,
    initialCode: `// Écrivez votre composant ici`,
    solutionCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        Compteur: {count}
      </h1>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={increment}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        <button
          onClick={decrement}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={count <= 0}
        >
          -
        </button>
      </div>
    </div>
  );
}

window.App = Counter;`,
    hints: [
      "Commencez par importer useState depuis React",
      "Utilisez useState(0) pour initialiser le compteur à 0",
      "Créez des fonctions pour incrémenter et décrémenter",
      "N'oubliez pas de retourner votre composant"
    ],
    tests: [
      {
        id: "test-1",
        name: "Le composant s'affiche sans erreur",
        type: "render",
        validate: (component) => !component.error,
        points: 10
      },
      {
        id: "test-2",
        name: "Le compteur commence à 0",
        type: "state",
        validate: (component) => component.state?.count === 0,
        points: 15
      },
      {
        id: "test-3",
        name: "Le bouton + incrémente le compteur",
        type: "interaction",
        action: { type: "click", selector: "button:first-child" },
        expectedState: { count: 1 },
        points: 25
      },
      {
        id: "test-4",
        name: "Le bouton - décrémente le compteur",
        type: "interaction",
        action: { type: "click", selector: "button:last-child", setup: { count: 5 } },
        expectedState: { count: 4 },
        points: 25
      },
      {
        id: "test-5",
        name: "Le compteur ne descend pas sous 0",
        type: "boundary",
        setup: { count: 0 },
        action: { type: "click", selector: "button:last-child" },
        expectedState: { count: 0 },
        points: 25
      }
    ]
  },
  {
    id: "hello-world-001",
    title: "Hello World",
    description: "Affichez votre premier message en React",
    type: "fill-in-code",
    difficulty: "easy",
    points: 20,
    timeLimit: 3,
    initialCode: `import React from 'react';

function HelloWorld() {
  // ❓ Complétez le code ici
  
  return (
    <div>
      {/* ❓ Ajoutez le titre ici */}
      
      {/* ❓ Ajoutez le message ici */}
    </div>
  );
}`,
    solutionCode: `import React from 'react';

function HelloWorld() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>Bienvenue dans le monde de React!</p>
    </div>
  );
}`,
    hints: [
      "Utilisez une balise h1 pour le titre",
      "Utilisez une balise p pour le paragraphe",
      "N'oubliez pas le return"
    ],
    tests: [
      {
        id: "test-1",
        name: "Affiche le titre 'Hello World!'",
        type: "render",
        validate: (component) => {
          const element = document.querySelector('h1');
          return element && element.textContent === 'Hello World!';
        },
        points: 10
      },
      {
        id: "test-2",
        name: "Affiche le paragraphe",
        type: "render",
        validate: (component) => {
          const element = document.querySelector('p');
          return element && element.textContent.includes('Bienvenue');
        },
        points: 10
      }
    ]
  },
  {
    id: "button-001",
    title: "Bouton cliquable",
    description: "Créez un bouton qui change de couleur quand on clique",
    type: "write-from-scratch",
    difficulty: "easy",
    points: 20,
    timeLimit: 4,
    initialCode: `// Créez un bouton cliquable ici`,
    solutionCode: `import React, { useState } from 'react';

function ClickableButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '20px 40px',
        fontSize: '18px',
        fontWeight: 'bold',
        backgroundColor: isClicked ? '#28a745' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
    >
      {isClicked ? 'Cliqué !' : 'Cliquez-moi'}
    </button>
  );
}`,
    hints: [
      "Utilisez useState pour gérer l'état du bouton",
      "Créez une fonction pour inverser l'état",
      "Applique le style en fonction de l'état",
      "Utilisez la transition pour l'animation"
    ],
    tests: [
      {
        id: "test-1",
        name: "Le bouton s'affiche",
        type: "render",
        validate: (component) => {
          const element = document.querySelector('button');
          return element && element.textContent.includes('Cliquez');
        },
        points: 10
      },
      {
        id: "test-2",
        name: "Le bouton change de couleur au clic",
        type: "interaction",
        action: { type: "click", selector: "button" },
        expectedState: { isClicked: true },
        points: 10
      }
    ]
  },

  // Niveau Intermédiaire
  {
    id: "todo-list-001",
    title: "Todo List complète",
    description: "Créez une liste de tâches avec ajout, suppression et complétion",
    type: "write-from-scratch",
    difficulty: "medium",
    points: 40,
    timeLimit: 10,
    initialCode: `// Créez une Todo List complète ici`,
    solutionCode: `import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Acheter du pain', completed: false },
    { id: 2, text: 'Appeler le lait', completed: false },
    { id: 3, text: 'Faire les devoirs', completed: true }
  ]);

  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
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

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Todo List
      </h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..."
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: '10px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Ajouter
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: todo.completed ? '#f0f9ff' : '#fff'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    hints: [
      "Commencez par importer useState et définir l'état initial",
      "Créez une fonction pour ajouter une tâche",
      "Utilisez filter pour supprimer une tâche",
      "Utilisez map avec une condition pour marquer comme terminé"
    ],
    tests: [
      {
        id: "test-1",
        name: "Ajouter une tâche",
        type: "interaction",
        action: { type: "input", selector: "input", value: "Nouvelle tâche" },
        expectedState: { todos: { length: 4 } },
        points: 15
      },
      {
        id: "test-2",
        name: "Marquer une tâche comme terminée",
        type: "interaction",
        action: { type: "click", selector: "input[type='checkbox']:first-child" },
        expectedState: { todos: { 0: { completed: true } } },
        points: 15
      },
      {
        id: "test-3",
        name: "Supprimer une tâche",
        type: "interaction",
        action: { type: "click", selector: "button:last-child" },
        expectedState: { todos: { length: 2 } },
        points: 10
      }
    ]
  },
  {
    id: "form-001",
    title: "Formulaire React",
    description: "Créez un formulaire avec validation",
    type: "debug",
    difficulty: "medium",
    points: 35,
    timeLimit: 8,
    initialCode: `// Corrigez les erreurs dans ce formulaire

import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Le nom est requis');
      return;
    }
    
    if (!formData.email.includes('@')) {
      alert('Email invalide');
      return;
    }
    
    console.log('Formulaire soumis:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom:</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Votre message"
          rows={4}
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}`,
    solutionCode: `import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Le nom est requis');
      return;
    }
    
    if (!formData.email.includes('@')) {
      alert('Email invalide');
      return;
    }
    
    console.log('Formulaire soumis:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
          Nom:
        </label>
        <input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Votre nom"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
          Email:
        </label>
        <input
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="votre@email.com"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
          Message:
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Votre message"
          rows={4}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Envoyer
      </button>
    </form>
  );
}`,
    hints: [
      "Erreur 1 : Les labels ne sont pas correctement associés aux inputs",
      "Erreur 2 : Le formulaire n'est pas correctement structuré",
      "Erreur 3 : Les styles manquent pour une meilleure présentation"
    ],
    tests: [
      {
        id: "test-1",
        name: "Le formulaire s'affiche",
        type: "render",
        validate: (component) => {
          const inputs = document.querySelectorAll('input, textarea');
          return inputs.length === 3;
        },
        points: 15
      },
      {
        id: "test-2",
        name: "Validation du nom requis",
        type: "state",
        validate: (component) => {
          const nameInput = document.getElementById('name');
          return nameInput && nameInput.value.trim() !== '';
        },
        points: 10
      },
      {
        id: "test-3",
        name: "Validation de l'email",
        type: "state",
        validate: (component) => {
          const emailInput = document.getElementById('email');
          return emailInput && emailInput.value.includes('@');
        },
        points: 10
      }
    ]
  },

  // Niveau Avancé
  {
    id: "dashboard-001",
    title: "Dashboard avec filtres",
    description: "Créez un tableau de bord avec filtres dynamiques",
    type: "write-from-scratch",
    difficulty: "hard",
    points: 50,
    timeLimit: 15,
    initialCode: `// Créez un dashboard avec filtres ici`,
    solutionCode: `import React, { useState } from 'react';

function Dashboard() {
  const [data, setData] = useState([
    { id: 1, name: 'Alice', role: 'Admin', status: 'active', email: 'alice@example.com' },
    { id: 2, name: 'Bob', role: 'User', status: 'inactive', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', role: 'User', status: 'active', email: 'charlie@example.com' },
    { id: 4, name: 'Diana', role: 'Admin', status: 'inactive', email: 'diana@example.com' }
  ]);

  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: ''
  });

  const filteredData = data.filter(item => {
    const matchesRole = filters.role === 'all' || item.role === filters.role;
    const matchesStatus = filters.status === 'all' || item.status === filters.status;
    const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Tableau de Bord
      </h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <select
          value={filters.role}
          onChange={(e) => setFilters({...filters, role: e.target.value})}
          style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="all">Tous les rôles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        
        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>
        
        <input
          type="text"
          placeholder="Rechercher..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', flex: 1 }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nom</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Rôle</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{item.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{item.email}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{item.role}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.App = Dashboard;`,
    hints: [
      "Utilisez useState pour stocker les données",
      "Créez des filtres avec des états séparés",
      "Utilisez filter() pour filtrer les données selon les critères",
      "Utilisez table pour afficher les données en tableau"
    ],
    tests: [
      {
        id: "test-1",
        name: "Affiche le tableau",
        type: "render",
        validate: (component) => {
          const table = document.querySelector('table');
          const rows = table.querySelectorAll('tbody tr');
          return rows.length === 4;
        },
        points: 20
      },
      {
        id: "test-2",
        name: "Filtre par rôle",
        type: "state",
        validate: (component) => {
          const filterSelect = document.querySelector('select:first-of-type');
          return filterSelect && filterSelect.value === 'all';
        },
        points: 15
      },
      {
        id: "test-3",
        name: "Filtre par statut",
        type: "state",
        validate: (component) => {
          const statusSelect = document.querySelector('select:nth-of-type(2)');
          return statusSelect && statusSelect.value === 'all';
        },
        points: 15
      }
    ]
  },

  // Niveau Expert
  {
    id: "infinite-scroll-001",
    title: "Infinite Scroll",
    description: "Implémentez un scroll infini avec chargement de données",
    type: "feature",
    difficulty: "expert",
    points: 60,
    timeLimit: 20,
    initialCode: `// Implémentez un scroll infini ici`,
    solutionCode: `import React, { useState, useEffect, useRef } from 'react';

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const initialItems = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: \`Item \${index + 1}\`,
      content: \`Contenu de l'item \${index + 1}\`,
      author: \`Utilisateur \${index + 1}\`,
      likes: Math.floor(Math.random() * 100)
    }));
    
    setItems(initialItems);
  }, []);

  const loadMore = () => {
    if (loading) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, index) => ({
        id: items.length + index + 1,
        title: \`Item \${items.length + index + 1}\`,
        content: \`Contenu de l'item \${items.length + index + 1}\`,
        author: \`Utilisateur \${items.length + index + 1}\`,
        likes: Math.floor(Math.random() * 100)
      }));
      
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      {
        root: containerRef.current,
        rootMargin: '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current.lastElementChild);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, items.length]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Infinite Scroll</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>{items.length} items chargés</p>
        {loading && <p>Chargement...</p>}
      </div>

      <div
        ref={containerRef}
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}
      >
        {items.map(item => (
          <div
            key={item.id}
            style={{
              padding: '15px',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#ffffff'
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Par {item.author}</span>
              <span>{item.likes} likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.App = InfiniteScroll;`,
    hints: [
      "Utilisez IntersectionObserver pour détecter le scroll",
      "Maintenez un état de chargement pour éviter les appels multiples",
      "Utilisez un ref pour l'élément scrollable",
      "Chargez les données par lots pour optimiser les performances"
    ],
    tests: [
      {
        id: "test-1",
        name: "Charge initiale des 20 items",
        type: "state",
        validate: (component) => component.items && component.items.length === 20,
        points: 20
      },
      {
        id: "test-2",
        name: "Chargement au scroll",
        type: "interaction",
        action: { type: "scroll" },
        expectedState: { items: { length: 30 } },
        points: 20
      },
      {
        id: "test-3",
        name: "Infinite scroll fonctionne",
        type: "render",
        validate: (component) => {
          const container = document.querySelector('div[style*="height: 400px"]');
          return container && container.children.length > 20;
        },
        points: 20
      }
    ]
  }
];
