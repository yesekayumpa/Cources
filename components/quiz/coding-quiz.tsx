"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Code,
  Eye,
  Bug,
  Zap,
  Trophy,
  BookOpen,
  ArrowRight,
  Copy,
  Download,
  HelpCircle,
  Award,
  Star,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CodingExercise {
  id: string;
  title: string;
  description: string;
  type:
    | "fill-in-code"
    | "debug"
    | "write-from-scratch"
    | "refactor"
    | "feature";
  difficulty: "easy" | "medium" | "hard" | "expert";
  points: number;
  timeLimit: number;
  initialCode?: string;
  solutionCode?: string;
  hints: string[];
  tests: CodingTest[];
  instructions?: string;
  setupCode?: string;
}

interface CodingTest {
  id: string;
  name: string;
  type:
    | "render"
    | "state"
    | "interaction"
    | "boundary"
    | "style"
    | "accessibility";
  validate: (component: any, state?: any) => boolean;
  points: number;
  action?: {
    type: "click" | "input" | "change";
    selector?: string;
    value?: any;
    setup?: any;
  };
  expectedState?: any;
  expectedStyle?: any;
  setup?: any;
}

interface TestResult {
  test: CodingTest;
  passed: boolean;
  error?: string;
  executionTime?: number;
}

interface CodingQuizProps {
  exercises: CodingExercise[];
  totalTime: number;
  passingScore: number;
  maxAttempts: number;
  mode: "quiz" | "practice";
  onComplete?: (score: number, results: TestResult[]) => void;
  onProgress?: (exerciseId: string, progress: number) => void;
}

export function CodingQuiz({
  exercises,
  totalTime,
  passingScore,
  maxAttempts,
  mode = "practice",
  onComplete,
  onProgress,
}: CodingQuizProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(totalTime * 60);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  // Initialize code when exercise changes
  useEffect(() => {
    if (currentExercise) {
      setCode(currentExercise.initialCode || "");
      setTestResults([]);
      setShowHint(false);
      setCurrentHintIndex(0);
      setShowSolution(false);
      setTimeRemaining(currentExercise.timeLimit * 60);
    }
  }, [currentExercise, currentExerciseIndex]);

  // Timer
  useEffect(() => {
    if (timeRemaining > 0 && !isCompleted && mode === "quiz") {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isCompleted, mode]);

  const runCode = async () => {
    setIsRunning(true);
    setTestResults([]);

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
            body { 
              margin: 0; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; 
              padding: 20px; 
              background: #f9fafb;
            }
            .test-result { 
              margin: 10px 0; 
              padding: 10px; 
              border-radius: 4px; 
              font-family: monospace;
            }
            .test-passed { 
              background: #10b981; 
              color: white; 
            }
            .test-failed { 
              background: #ef4444; 
              color: white; 
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <div id="tests"></div>
          <script type="text/babel">
            ${currentExercise.setupCode || ""}
            ${code}
            
            // Simuler console.log
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = (...args) => {
              window.parent.postMessage({
                type: 'console',
                method: 'log',
                args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
              }, '*');
              originalLog(...args);
            };
            
            console.error = (...args) => {
              window.parent.postMessage({
                type: 'console',
                method: 'error',
                args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
              }, '*');
              originalError(...args);
            };
            
            console.warn = (...args) => {
              window.parent.postMessage({
                type: 'console',
                method: 'warn',
                args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
              }, '*');
              originalWarn(...args);
            };
            
            // Trouver et rendre le composant
            const allFunctions = Object.keys(window).filter(key => 
              typeof window[key] === 'function' && key !== 'eval' && key !== 'console'
            );
            
            let component = null;
            if (allFunctions.length > 0) {
              component = window[allFunctions[allFunctions.length - 1]];
            }
            
            // Lancer les tests
            const testResults = [];
            ${currentExercise.tests
              .map(
                (test, index) => `
              try {
                const startTime = performance.now();
                let passed = false;
                let error = null;
                
                ${
                  test.type === "render"
                    ? `
                  passed = ${test.validate.toString().replace("component", "component")};
                `
                    : test.type === "state"
                      ? `
                  passed = ${test.validate.toString().replace("component", "component")};
                `
                      : test.type === "interaction"
                        ? `
                  // Simuler l'interaction
                  const element = document.querySelector('${test.action?.selector || ""}');
                  if (element) {
                    element.click();
                    setTimeout(() => {
                      passed = ${test.validate.toString().replace("component", "component")};
                    }, 100);
                  }
                `
                        : test.type === "boundary"
                          ? `
                  // Simuler l'état initial
                  const originalState = component?.state || {};
                  ${test.setup ? `component.state = ${JSON.stringify(test.setup)};` : ""}
                  // Simuler l'action
                  const element = document.querySelector('${test.action?.selector || ""}');
                  if (element) {
                    element.click();
                    setTimeout(() => {
                      passed = ${test.validate.toString().replace("component", "component")};
                    }, 100);
                  }
                `
                          : test.type === "style"
                            ? `
                  // Vérifier le style
                  const element = document.querySelector('${test.action?.selector || ""}');
                  if (element) {
                    const computedStyle = window.getComputedStyle(element);
                    passed = ${JSON.stringify(test.expectedStyle)} === computedStyle.${test.expectedStyle.property || "color"};
                  }
                `
                            : test.type === "accessibility"
                              ? `
                  // Vérifier l'accessibilité
                  const element = document.querySelector('${test.action?.selector || ""}');
                  if (element) {
                    passed = element.hasAttribute('${test.expectedStyle?.attribute || ""}');
                  }
                `
                              : ""
                }
                
                const endTime = performance.now();
                
                testResults.push({
                  id: '${test.id}',
                  name: '${test.name}',
                  type: '${test.type}',
                  passed,
                  error,
                  executionTime: Math.round(endTime - startTime)
                });
                
                // Afficher le résultat dans l'iframe
                const testDiv = document.createElement('div');
                testDiv.className = 'test-result ' + (passed ? 'test-passed' : 'test-failed');
                testDiv.textContent = '${test.name}: ' + (passed ? '✅' : '❌');
                document.getElementById('tests').appendChild(testDiv);
                
              } catch (err) {
                testResults.push({
                  id: '${test.id}',
                  name: '${test.name}',
                  type: '${test.type}',
                  passed: false,
                  error: err.message,
                  executionTime: 0
                });
                
                const testDiv = document.createElement('div');
                testDiv.className = 'test-result test-failed';
                testDiv.textContent = '${test.name}: ❌ ' + err.message;
                document.getElementById('tests').appendChild(testDiv);
              }
            `,
              )
              .join("\n")}
            
            // Envoyer les résultats au parent
            window.parent.postMessage({
              type: 'test-results',
              results: testResults
            }, '*');
            
            // Rendre le composant
            if (component) {
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(component));
            }
          </script>
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setOutput(url);
    } catch (err) {
      console.error("Error running code:", err);
    } finally {
      setIsRunning(false);
    }
  };

  // Écouter les messages de l'iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "test-results") {
        setTestResults(event.data.results);

        // Calculer le score
        const passedTests = event.data.results.filter(
          (r: TestResult) => r.passed,
        );
        const totalPoints = event.data.results.reduce(
          (sum: number, r: TestResult) => sum + (r.passed ? r.test.points : 0),
          0,
        );
        const maxPoints = currentExercise.tests.reduce(
          (sum, test) => sum + test.points,
          0,
        );
        const score = Math.round((totalPoints / maxPoints) * 100);

        setTotalScore(score);

        // Vérifier si tous les tests sont passés
        if (passedTests.length === currentExercise.tests.length) {
          setIsCompleted(true);
          onComplete?.(score, event.data.results);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [currentExercise, onComplete]);

  const resetCode = () => {
    setCode(currentExercise.initialCode || "");
    setOutput("");
    setTestResults([]);
    setTotalScore(0);
    setIsCompleted(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const showNextHint = () => {
    if (currentHintIndex < currentExercise.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const revealSolution = () => {
    if (currentExercise.solutionCode) {
      setCode(currentExercise.solutionCode);
      setShowSolution(true);
    }
  };

  const nextExercise = () => {
    if (!isLastExercise) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      onProgress?.(currentExercise.id, 0);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-orange-100 text-orange-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "🌱";
      case "medium":
        return "🌿";
      case "hard":
        return "🌳";
      case "expert":
        return "🏆";
      default:
        return "📚";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            Quiz Pratique : {currentExercise.title}
          </h2>
          <p className="text-muted-foreground">{currentExercise.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className={getDifficultyColor(currentExercise.difficulty)}
          >
            {getDifficultyIcon(currentExercise.difficulty)}{" "}
            {currentExercise.difficulty}
          </Badge>

          <Badge variant="secondary">
            Exercice {currentExerciseIndex + 1}/{exercises.length}
          </Badge>

          {mode === "quiz" && (
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                <Clock className="w-3 h-3" />
                {Math.floor(timeRemaining / 60)}:
                {(timeRemaining % 60).toString().padStart(2, "0")}
              </Badge>
              <Badge variant="outline">
                Tentative {attemptCount + 1}/{maxAttempts}
              </Badge>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Badge
              variant={totalScore >= passingScore ? "default" : "secondary"}
            >
              <Trophy className="w-3 h-3" />
              {totalScore}% {totalScore >= passingScore && "🎉"}
            </Badge>
            {testResults.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {testResults.filter((r) => r.passed).length}/
                {testResults.length} tests
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      {currentExercise.instructions && (
        <Alert>
          <BookOpen className="h-4 w-4" />
          <AlertDescription>
            <div className="whitespace-pre-wrap">
              {currentExercise.instructions}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Code Editor and Preview */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        style={{ height: 500 }}
      >
        {/* Code Editor */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code className="w-4 h-4" />
              Éditeur de code
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
              readOnly={mode === "quiz" && attemptCount >= maxAttempts}
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Aperçu en direct
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

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              Résultats des tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {testResults.map((result, index) => (
                <div
                  key={result.test.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded text-sm",
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
                    <span>{result.test.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      +{result.passed ? result.test.points : 0} pts
                    </span>
                    {result.executionTime && (
                      <span className="text-xs text-muted-foreground">
                        {result.executionTime}ms
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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

          {currentExercise.hints.length > 0 && (
            <Button variant="outline" onClick={() => setShowHint(!showHint)}>
              <Lightbulb className="w-4 h-4 mr-2" />
              Indice {currentHintIndex + 1}/{currentExercise.hints.length}
            </Button>
          )}

          {currentExercise.solutionCode && (
            <Button variant="outline" onClick={revealSolution}>
              <Eye className="w-4 h-4 mr-2" />
              {showSolution ? "Masquer" : "Voir"} la solution
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isCompleted && (
            <>
              {currentExerciseIndex > 0 && (
                <Button variant="outline" onClick={prevExercise}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
              )}

              {!isLastExercise && (
                <Button
                  onClick={nextExercise}
                  disabled={!isCompleted && mode === "quiz"}
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              {isCompleted && isLastExercise && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <Trophy className="w-4 h-4 mr-2" />
                  Quiz terminé
                </Button>
              )}
            </>
          )}

          <Button variant="outline" onClick={copyCode}>
            <Copy className="w-4 h-4 mr-2" />
            Copier
          </Button>
        </div>
      </div>

      {/* Hint Display */}
      {showHint && currentExercise.hints[currentHintIndex] && (
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            <div className="whitespace-pre-wrap">
              {currentExercise.hints[currentHintIndex]}
            </div>
            {currentHintIndex < currentExercise.hints.length - 1 && (
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

      {/* Solution Display */}
      {showSolution && currentExercise.solutionCode && (
        <Alert>
          <Eye className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="text-sm font-medium">Solution complète :</p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                {currentExercise.solutionCode}
              </pre>
              <p className="text-xs text-muted-foreground">
                ⚠️ Attention : En utilisant la solution, vous marquez 0 points
                pour cet exercice.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Completion Message */}
      {isCompleted && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {totalScore >= passingScore
                  ? "🎉 Excellent !"
                  : "Exercice terminé"}
              </span>
              <span className="text-sm text-muted-foreground">
                Score : {totalScore}% |{" "}
                {testResults.filter((r) => r.passed).length}/
                {testResults.length} tests passés
              </span>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
