"use client";

import { MiniCodeLab } from "@/components/code-lab/mini-code-lab";

export function LessonCodeExample() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">🧪 Pratiquons ensemble !</h3>
        <p className="text-muted-foreground">
          Maintenant que vous avez compris les concepts, mettez-les en pratique avec ce petit exercice.
        </p>
      </div>

      <MiniCodeLab
        title="Créez votre premier composant React"
        description="Utilisez useState pour créer un compteur qui s'incrémente quand on clique sur le bouton"
        initialCode={`import { useState } from 'react';

export default function Counter() {
  // Initialisez le state ici
  
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Compteur: {/* Affichez la valeur ici */}
      </h1>
      <button 
        onClick={() => {
          // Implémentez l'incrémentation ici
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Incrémenter
      </button>
    </div>
  );
}`}
        hints={[
          "Utilisez useState(0) pour initialiser le compteur à 0",
          "Déstructurez le tableau retourné par useState : const [count, setCount] = useState(0)",
          "Affichez la valeur avec {count} dans le JSX",
          "Utilisez setCount(count + 1) pour incrémenter la valeur"
        ]}
        validationRules={[
          {
            check: (code: string) => code.includes('useState'),
            message: "✅ useState est importé et utilisé",
            points: 25
          },
          {
            check: (code: string) => code.includes('const [count, setCount]'),
            message: "✅ Le state est correctement déstructuré",
            points: 25
          },
          {
            check: (code: string) => code.includes('{count}'),
            message: "✅ La valeur du compteur est affichée",
            points: 25
          },
          {
            check: (code: string) => code.includes('setCount('),
            message: "✅ La fonction de mise à jour est utilisée",
            points: 25
          }
        ]}
        height={400}
        showSolution={true}
        solutionCode={`import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Compteur: {count}
      </h1>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Incrémenter
      </button>
    </div>
  );
}`}
        onComplete={(score) => {
          console.log(`Exercice terminé avec un score de ${score}%`);
        }}
      />

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">💡 Points clés à retenir :</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• useState est un Hook qui permet d'ajouter un état local aux composants fonctionnels</li>
          <li>• Il retourne un tableau avec deux éléments : la valeur actuelle et une fonction pour la mettre à jour</li>
          <li>• La déstructuration permet d'extraire ces éléments facilement</li>
          <li>• Appeler la fonction de mise à jour déclenche un nouveau rendu du composant</li>
        </ul>
      </div>
    </div>
  );
}
