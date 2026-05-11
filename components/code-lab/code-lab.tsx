"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Play,
  Square,
  RotateCcw,
  Save,
  Share,
  Copy,
  Bug,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Moon,
  Sun,
  Code,
  Terminal,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeLabProps {
  initialCode?: string;
  template?: "react" | "react-tailwind" | "vanilla" | "typescript";
  height?: number;
  showConsole?: boolean;
  autoRun?: boolean;
  readOnly?: boolean;
}

const templates = {
  react: `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Compteur React</h1>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>Valeur: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Incrémenter
      </button>
    </div>
  );
}

window.App = App;`,

  "react-tailwind": `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const containerStyle = {
    minHeight: '100vh',
    padding: '32px',
    transition: 'all 0.3s ease',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9fafb',
    color: theme === 'dark' ? '#ffffff' : '#111827'
  };

  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '4px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            Compteur Thème
          </h1>
          <button
            onClick={toggleTheme}
            style={{
              ...buttonStyle,
              backgroundColor: theme === 'light' ? '#6b7280' : '#4b5563',
              color: 'white'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        
        <p style={{ fontSize: '20px', marginBottom: '16px', textAlign: 'center' }}>
          Compteur: <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{count}</span>
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={() => setCount(count + 1)}
            style={{ ...buttonStyle, backgroundColor: '#10b981', color: 'white' }}
          >
            +
          </button>
          <button
            onClick={() => setCount(count - 1)}
            style={{ ...buttonStyle, backgroundColor: '#ef4444', color: 'white' }}
            disabled={count <= 0}
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            style={{ ...buttonStyle, backgroundColor: '#6b7280', color: 'white' }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

window.App = App;`,

  typescript: `import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler une API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const containerStyle = {
    padding: '32px',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    padding: '16px',
    margin: '8px 0',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px'
  };

  const nameStyle = {
    fontWeight: '600',
    marginBottom: '4px'
  };

  const emailStyle = {
    color: '#6b7280',
    fontSize: '14px'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Liste des Utilisateurs</h1>
      <div>
        {users.map(user => (
          <div key={user.id} style={cardStyle}>
            <div style={nameStyle}>{user.name}</div>
            <div style={emailStyle}>{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.App = UserList;`,

  vanilla: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compteur Vanilla</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }
        .counter {
            font-size: 2em;
            font-weight: bold;
            margin: 20px 0;
        }
        button {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .increment { background: #4CAF50; color: white; }
        .decrement { background: #f44336; color: white; }
        .reset { background: #ff9800; color: white; }
    </style>
</head>
<body>
    <h1>Compteur Vanilla JavaScript</h1>
    <div class="counter" id="counter">0</div>
    <button class="increment" onclick="increment()">+</button>
    <button class="decrement" onclick="decrement()">-</button>
    <button class="reset" onclick="reset()">Reset</button>

    <script>
        let count = 0;
        const counterEl = document.getElementById('counter');

        function updateDisplay() {
            counterEl.textContent = count;
        }

        function increment() {
            count++;
            updateDisplay();
        }

        function decrement() {
            if (count > 0) {
                count--;
                updateDisplay();
            }
        }

        function reset() {
            count = 0;
            updateDisplay();
        }

        updateDisplay();
    </script>
</body>
</html>`,
};

export function CodeLab({
  initialCode = templates["react"],
  template = "react",
  height = 500,
  showConsole = true,
  autoRun = true,
  readOnly = false,
}: CodeLabProps) {
  const [code, setCode] = useState(initialCode);
  const [currentTemplate, setCurrentTemplate] = useState(template);
  const [output, setOutput] = useState("");
  const [consoleLogs, setConsoleLogs] = useState<
    Array<{
      type: "log" | "error" | "warn";
      message: string;
      timestamp: number;
    }>
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Mettre à jour le code quand le template change
  useEffect(() => {
    if (templates[currentTemplate]) {
      setCode(templates[currentTemplate]);
    }
  }, [currentTemplate]);

  // Auto-run
  useEffect(() => {
    if (autoRun && !readOnly) {
      const timeout = setTimeout(() => {
        runCode();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [code, autoRun]);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setConsoleLogs([]);
    setExecutionTime(null);

    const startTime = performance.now();

    try {
      // Simuler la compilation et l'exécution
      if (currentTemplate === "vanilla") {
        // Pour HTML vanilla, créer un blob URL
        const blob = new Blob([code], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setOutput(url);
      } else {
        // Pour React/TypeScript, simuler avec Babel
        // Dans une vraie implémentation, on utiliserait @babel/standalone
        const compiledCode = `
          ${code}
        `;

        // Simuler l'exécution dans un iframe
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <style>
              body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; }
              * { box-sizing: border-box; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
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
              
              try {
                // Trouver la dernière fonction exportée (le composant)
                const allFunctions = Object.keys(window).filter(key => 
                  typeof window[key] === 'function' && key !== 'eval' && key !== 'console'
                );
                
                if (allFunctions.length > 0) {
                  const Component = window[allFunctions[allFunctions.length - 1]];
                  const root = ReactDOM.createRoot(document.getElementById('root'));
                  root.render(React.createElement(Component));
                } else {
                  // Si pas de fonction trouvée, essayer d'évaluer directement
                  eval(\`\${code}\`);
                }
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
      }

      // Simuler des logs de console
      setConsoleLogs([
        { type: "log", message: "Application démarrée", timestamp: Date.now() },
        {
          type: "log",
          message: "Composant monté avec succès",
          timestamp: Date.now() + 100,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setConsoleLogs([
        {
          type: "error",
          message: err instanceof Error ? err.message : "Erreur inconnue",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));
      setIsRunning(false);
    }
  }, [code, currentTemplate]);

  // Écouter les messages de l'iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "console") {
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: event.data.method,
            message: event.data.args.join(" "),
            timestamp: Date.now(),
          },
        ]);
      } else if (event.data.type === "error") {
        setError(event.data.message);
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: "error",
            message: event.data.message,
            timestamp: Date.now(),
          },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setConsoleLogs([]);
    setError(null);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const shareCode = () => {
    const shareUrl = `${window.location.origin}/code-lab?code=${encodeURIComponent(code)}`;
    navigator.clipboard.writeText(shareUrl);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Code className="w-5 h-5" />
            Code Lab
          </h2>
          <Select
            value={currentTemplate}
            onValueChange={(value: any) => setCurrentTemplate(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="react-tailwind">React + Tailwind</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="vanilla">HTML/CSS/JS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {executionTime && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {executionTime}ms
            </Badge>
          )}

          <div className="flex items-center gap-1 border rounded-md">
            <Button
              variant={viewport === "desktop" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewport("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewport === "tablet" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewport("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewport === "mobile" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewport("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant={theme === "dark" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          {!readOnly && (
            <>
              <Button variant="outline" size="sm" onClick={copyCode}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={shareCode}>
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetCode}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4" />
                    Arrêter
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Exécuter
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ height }}>
        {/* Code Editor */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Éditeur de code
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              readOnly={readOnly}
              className={cn(
                "w-full h-full p-4 font-mono text-sm resize-none focus:outline-none",
                theme === "dark"
                  ? "bg-gray-900 text-gray-100"
                  : "bg-white text-gray-900",
              )}
              style={{
                height: "calc(100% - 40px)",
                tabSize: 2,
              }}
              spellCheck={false}
              placeholder="Écrivez votre code ici..."
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Aperçu en direct
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {output ? (
              <iframe
                ref={iframeRef}
                src={output}
                className="w-full h-full border-0"
                style={{ width: getViewportWidth() }}
                sandbox="allow-scripts allow-same-origin"
                title="Code Preview"
              />
            ) : (
              <div
                className={cn(
                  "w-full h-full flex items-center justify-center text-muted-foreground",
                  theme === "dark" ? "bg-gray-900" : "bg-gray-50",
                )}
              >
                <div className="text-center">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Cliquez sur "Exécuter" pour voir le résultat</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Console */}
      {showConsole && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Console
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "space-y-1 max-h-32 overflow-y-auto p-2 rounded font-mono text-sm",
                theme === "dark" ? "bg-gray-900" : "bg-gray-50",
              )}
            >
              {consoleLogs.length === 0 ? (
                <p className="text-muted-foreground">Aucune sortie console</p>
              ) : (
                consoleLogs.map((log, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-2",
                      log.type === "error" && "text-red-500",
                      log.type === "warn" && "text-yellow-500",
                      log.type === "log" && "text-green-500",
                    )}
                  >
                    <span className="opacity-50">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))
              )}
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
    </div>
  );
}
