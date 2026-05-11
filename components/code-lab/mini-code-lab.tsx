"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Target,
  Code,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MiniCodeLabProps {
  title: string;
  description: string;
  initialCode: string;
  expectedOutput?: string;
  hints?: string[];
  validationRules?: Array<{
    check: (code: string) => boolean;
    message: string;
    points: number;
  }>;
  height?: number;
  showSolution?: boolean;
  solutionCode?: string;
  onComplete?: (score: number) => void;
}

export function MiniCodeLab({
  title,
  description,
  initialCode,
  expectedOutput,
  hints = [],
  validationRules = [],
  height = 300,
  showSolution = false,
  solutionCode,
  onComplete,
}: MiniCodeLabProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [validationResults, setValidationResults] = useState<
    Array<{ passed: boolean; message: string; points: number }>
  >([]);
  const [showSolution, setShowSolutionLocal] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = async () => {
    setIsRunning(true);
    setError(null);
    setValidationResults([]);

    try {
      // Simuler la compilation et l'exécution
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; padding: 20px; }
            .validation-result { margin: 10px 0; padding: 10px; border-radius: 4px; }
            .validation-passed { background: #10b981; color: white; }
            .validation-failed { background: #ef4444; color: white; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <div id="validation"></div>
          <script type="text/babel">
            ${code}
            
            // Simuler la validation
            const validationDiv = document.getElementById('validation');
            const results = [];
            
            ${validationRules
              .map(
                (rule, index) => `
              try {
                const passed = ${rule.check.toString().replace("code", "code")};
                results.push({
                  passed: passed,
                  message: '${rule.message}',
                  points: ${rule.points}
                });
                
                const resultDiv = document.createElement('div');
                resultDiv.className = 'validation-result ' + (passed ? 'validation-passed' : 'validation-failed');
                resultDiv.textContent = '${rule.message}' + (passed ? ' ✓' : ' ✗');
                validationDiv.appendChild(resultDiv);
              } catch (e) {
                console.error('Validation error:', e);
              }
            `,
              )
              .join("\n")}
            
            // Envoyer les résultats au parent
            window.parent.postMessage({
              type: 'validation-results',
              results: results
            }, '*');
            
            // Rendre le composant
            try {
              const root = ReactDOM.createRoot(document.getElementById('root'));
              const App = eval('(' + code + ')');
              root.render(React.createElement(App));
            } catch (err) {
              window.parent.postMessage({
                type: 'error',
                message: err.message
              }, '*');
            }
          </script>
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setOutput(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsRunning(false);
    }
  };

  // Écouter les messages de l'iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "validation-results") {
        setValidationResults(event.data.results);
        const totalPoints = event.data.results.reduce(
          (sum: number, result: any) =>
            sum + (result.passed ? result.points : 0),
          0,
        );
        const maxPoints = validationRules.reduce(
          (sum, rule) => sum + rule.points,
          0,
        );
        const finalScore = Math.round((totalPoints / maxPoints) * 100);
        setScore(finalScore);

        if (finalScore === 100 && !isCompleted) {
          setIsCompleted(true);
          onComplete?.(finalScore);
        }
      } else if (event.data.type === "error") {
        setError(event.data.message);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [validationRules, isCompleted, onComplete]);

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setError(null);
    setValidationResults([]);
    setScore(0);
    setIsCompleted(false);
    setShowSolutionLocal(false);
    setCurrentHintIndex(0);
  };

  const showNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const revealSolution = () => {
    if (solutionCode) {
      setCode(solutionCode);
      setShowSolutionLocal(true);
    }
  };

  const passedValidations = validationResults.filter((r) => r.passed).length;
  const totalValidations = validationResults.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {validationResults.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant={score === 100 ? "default" : "secondary"}>
              {score}% {score === 100 && "🎉"}
            </Badge>
            {passedValidations > 0 && (
              <span className="text-sm text-muted-foreground">
                {passedValidations}/{totalValidations} tests passés
              </span>
            )}
          </div>
        )}
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ height }}>
        {/* Code Editor */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code className="w-4 h-4" />
              Votre code
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-gray-900 text-gray-100"
              style={{ height: "calc(100% - 40px)", tabSize: 2 }}
              spellCheck={false}
              placeholder="Écrivez votre code ici..."
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Résultat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {output ? (
              <iframe
                ref={iframeRef}
                src={output}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                title="Code Preview"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-50">
                <div className="text-center">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Cliquez sur "Exécuter" pour voir le résultat</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Validation Results */}
      {validationResults.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Tests de validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {validationResults.map((result, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-2 rounded",
                    result.passed
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {result.passed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {result.message}
                  </span>
                  <span className="text-sm">+{result.points} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button onClick={runCode} disabled={isRunning}>
            {isRunning ? (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Exécution...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Exécuter
              </>
            )}
          </Button>
          <Button variant="outline" onClick={resetCode}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>

          {hints.length > 0 && (
            <Button variant="outline" onClick={() => setShowHint(!showHint)}>
              <Lightbulb className="w-4 h-4 mr-2" />
              Indice {currentHintIndex + 1}/{hints.length}
            </Button>
          )}

          {showSolution && solutionCode && (
            <Button variant="outline" onClick={revealSolution}>
              <Eye className="w-4 h-4 mr-2" />
              {showSolutionLocal ? "Masquer" : "Voir"} la solution
            </Button>
          )}
        </div>

        {isCompleted && (
          <Badge className="bg-green-100 text-green-800">
            🎉 Exercice complété !
          </Badge>
        )}
      </div>

      {/* Hint Display */}
      {showHint && hints[currentHintIndex] && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            {hints[currentHintIndex]}
            {currentHintIndex < hints.length - 1 && (
              <Button
                variant="link"
                size="sm"
                onClick={showNextHint}
                className="ml-2 p-0"
              >
                Indice suivant →
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Expected Output */}
      {expectedOutput && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Résultat attendu</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
              {expectedOutput}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
