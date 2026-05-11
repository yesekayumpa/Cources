"use client";

import React, { useState, useEffect, useRef } from "react";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { Button } from "@/components/ui/button";
import { ModalEnhanced } from "@/components/ui/modal-enhanced";
import { cn } from "@/lib/utils";
import {
  Play,
  Save,
  Share2,
  Download,
  RotateCcw,
  Settings,
  Eye,
  Code,
  Copy,
  Check,
  Plus,
  X,
  Monitor,
  Smartphone,
  Tablet,
  Moon,
  Sun,
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-muted rounded-lg h-96"></div>,
});

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
  theme?: string;
  readOnly?: boolean;
  showPreview?: boolean;
  onCodeChange?: (code: string) => void;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = "// Bienvenue dans le playground React !\nfunction App() {\n  return <h1>Hello World!</h1>;\n}",
  language = "javascript",
  theme = "vs-dark",
  readOnly = false,
  showPreview = true,
  onCodeChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [savedCodes, setSavedCodes] = useState<any[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [editorTheme, setEditorTheme] = useState(theme);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [copied, setCopied] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const editorRef = useRef<any>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Load saved codes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("playground-saved-codes");
    if (saved) {
      setSavedCodes(JSON.parse(saved));
    }
  }, []);

  // Handle code change
  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  // Save code
  const saveCode = () => {
    if (!saveName.trim()) return;

    const newCode = {
      id: Date.now().toString(),
      name: saveName,
      code: code,
      language: language,
      createdAt: new Date().toISOString(),
    };

    const updatedCodes = [...savedCodes, newCode];
    setSavedCodes(updatedCodes);
    localStorage.setItem(
      "playground-saved-codes",
      JSON.stringify(updatedCodes),
    );
    setShowSaveModal(false);
    setSaveName("");
  };

  // Load saved code
  const loadSavedCode = (savedCode: any) => {
    setCode(savedCode.code);
    setEditorTheme(savedCode.theme || theme);
  };

  // Delete saved code
  const deleteSavedCode = (id: string) => {
    const updatedCodes = savedCodes.filter((code) => code.id !== id);
    setSavedCodes(updatedCodes);
    localStorage.setItem(
      "playground-saved-codes",
      JSON.stringify(updatedCodes),
    );
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  // Download code
  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-${Date.now()}.${language === "javascript" ? "js" : "jsx"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Run code in preview
  const runCode = () => {
    if (!previewRef.current) return;

    setIsPreviewLoading(true);

    try {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <style>
              body { margin: 0; padding: 20px; font-family: system-ui; }
              .error { color: red; background: #ffebee; padding: 10px; border-radius: 4px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              try {
                ${code}
              } catch (error) {
                document.body.innerHTML = '<div class="error">Error: ' + error.message + '</div>';
              }
            </script>
          </body>
        </html>
      `;

      previewRef.current.srcdoc = html;
    } catch (error) {
      console.error("Error running code:", error);
    } finally {
      setTimeout(() => setIsPreviewLoading(false), 500);
    }
  };

  // Get preview size class
  const getPreviewSizeClass = () => {
    switch (previewMode) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-full h-[600px]";
    }
  };

  const monacoOptions = {
    minimap: { enabled: false },
    fontSize: fontSize,
    wordWrap: wordWrap ? "on" : "off",
    lineNumbers: showLineNumbers ? "on" : "off",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    readOnly: readOnly,
    theme: editorTheme,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">Code Playground</h1>

              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => {
                    /* Handle language change */
                  }}
                  className="border rounded-lg px-3 py-1 text-sm bg-background"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="jsx">JSX</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                </select>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSaveModal(true)}
                >
                  <Save className="w-4 h-4" />
                </Button>

                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={runCode}
                icon={<Play className="w-4 h-4" />}
              >
                Exécuter
              </Button>

              <Button variant="outline" size="sm" onClick={downloadCode}>
                <Download className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Editor Panel */}
        <div
          className={cn(
            "flex flex-col border-r",
            showPreview ? "w-1/2" : "w-full",
          )}
        >
          {/* Editor Toolbar */}
          <div className="border-b p-2 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <select
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
                className="border rounded px-2 py-1 text-sm bg-background"
              >
                <option value="vs-dark">Sombre</option>
                <option value="vs-light">Clair</option>
                <option value="hc-black">High Contrast</option>
              </select>

              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-background"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
              </select>

              <Button
                variant={wordWrap ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setWordWrap(!wordWrap)}
              >
                Wrap
              </Button>

              <Button
                variant={showLineNumbers ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setShowLineNumbers(!showLineNumbers)}
              >
                Lines
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCode(initialCode)}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              {showPreview && (
                <Button
                  variant={showPreview ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    /* Toggle preview */
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language={language}
              theme={editorTheme}
              value={code}
              onChange={handleCodeChange}
              options={monacoOptions}
              onMount={(editor) => {
                editorRef.current = editor;
                // Add custom commands
                editor.addCommand(
                  monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                  () => {
                    setShowSaveModal(true);
                  },
                );
              }}
            />
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 flex flex-col">
            {/* Preview Toolbar */}
            <div className="border-b p-2 flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Preview</span>

                <div className="flex items-center gap-1 border rounded-lg">
                  <Button
                    variant={previewMode === "desktop" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewMode === "tablet" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("tablet")}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewMode === "mobile" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {isPreviewLoading && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Chargement...
                </div>
              )}
            </div>

            {/* Preview Frame */}
            <div className="flex-1 p-4 bg-gray-50 overflow-auto">
              <div
                className={cn(
                  "bg-white rounded-lg shadow-lg overflow-hidden mx-auto",
                  getPreviewSizeClass(),
                )}
              >
                <iframe
                  ref={previewRef}
                  className="w-full h-full border-0"
                  title="Code Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Modal */}
      <ModalEnhanced
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Sauvegarder le code"
        size="sm"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Nom du fichier..."
            className="w-full p-2 border rounded-lg"
            autoFocus
          />

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowSaveModal(false)}>
              Annuler
            </Button>
            <Button onClick={saveCode} disabled={!saveName.trim()}>
              Sauvegarder
            </Button>
          </div>
        </div>
      </ModalEnhanced>

      {/* Share Modal */}
      <ModalEnhanced
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Partager le code"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Lien de partage:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={`${window.location.origin}/playground/${Date.now()}`}
                readOnly
                className="flex-1 p-2 border rounded bg-background text-sm"
              />
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Les autres utilisateurs pourront voir et exécuter votre code
          </div>
        </div>
      </ModalEnhanced>

      {/* Saved Codes Sidebar */}
      {savedCodes.length > 0 && (
        <div className="fixed right-4 top-20 w-64 max-h-96 overflow-y-auto bg-background border rounded-lg shadow-lg z-30">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Codes sauvegardés</h3>
          </div>
          <div className="space-y-2">
            {savedCodes.map((savedCode) => (
              <div
                key={savedCode.id}
                className="p-2 hover:bg-muted/50 cursor-pointer rounded"
                onClick={() => loadSavedCode(savedCode)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{savedCode.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(savedCode.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSavedCode(savedCode.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
