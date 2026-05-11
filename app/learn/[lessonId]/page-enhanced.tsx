"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardEnhanced } from "@/components/ui/card-enhanced";
import { LearningLayout } from "@/components/layout/learning-layout";
import { useAppStore } from "@/lib/store";
import { extendedModules } from "@/lib/data/extended-course-data";
import { cn } from "@/lib/utils";
import {
  Play,
  CheckCircle2,
  Clock,
  Target,
  BookOpen,
  Code,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function EnhancedLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { userProgress, markLessonComplete } = useAppStore();
  
  const lessonId = params.lessonId as string;
  const [currentSection, setCurrentSection] = useState("content");
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(false);

  // Find lesson data
  const findLesson = () => {
    for (const module of extendedModules) {
      for (const chapter of module.chapters) {
        const lesson = chapter.lessons.find(l => l.id === lessonId);
        if (lesson) {
          return { module, chapter, lesson };
        }
      }
    }
    return null;
  };

  const context = findLesson();
  
  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CardEnhanced className="max-w-md">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Leçon non trouvée</h2>
            <p className="text-muted-foreground mb-4">
              Cette leçon n'existe pas ou n'est pas accessible.
            </p>
            <Button onClick={() => router.push("/")}>
              Retour à l'accueil
            </Button>
          </div>
        </CardEnhanced>
      </div>
    );
  }

  const { module, chapter, lesson } = context;
  const isLessonCompleted = userProgress.completedLessons.includes(lessonId);

  useEffect(() => {
    setCompleted(isLessonCompleted);
  }, [isLessonCompleted]);

  const handleCompleteLesson = () => {
    if (!completed) {
      markLessonComplete(lessonId);
      setCompleted(true);
    }
  };

  const handleNextLesson = () => {
    const lessonIndex = chapter.lessons.findIndex((l: any) => l.id === lessonId);
    if (lessonIndex < chapter.lessons.length - 1) {
      const nextLesson = chapter.lessons[lessonIndex + 1];
      router.push(`/learn/${nextLesson.id}`);
    } else {
      // Go to quiz
      router.push(`/quiz/${lessonId}`);
    }
  };

  const handlePreviousLesson = () => {
    const lessonIndex = chapter.lessons.findIndex((l: any) => l.id === lessonId);
    if (lessonIndex > 0) {
      const prevLesson = chapter.lessons[lessonIndex - 1];
      router.push(`/learn/${prevLesson.id}`);
    }
  };

  const renderCodeExample = (example: any, index: number) => {
    return (
      <div key={index} className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm">{example.title}</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(example.code);
              // Could add toast here
            }}
          >
            Copier
          </Button>
        </div>
        <div className="bg-muted rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language={example.language}
            style={tomorrow}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "0.875rem"
            }}
          >
            {example.code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentSection) {
      case "content":
        return (
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-6 text-foreground">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-foreground leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="ml-4">{children}</li>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{children}</code>
                ),
                pre: ({ children }) => {
                  const codeContent = children?.props?.children || children;
                  return (
                    <div className="bg-muted rounded-lg overflow-hidden mb-4">
                      <SyntaxHighlighter
                        language="javascript"
                        style={tomorrow}
                        showLineNumbers
                      >
                        {codeContent}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>
        );

      case "objectives":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Objectifs d'apprentissage</h3>
            <div className="grid gap-3">
              {lesson.objectives?.map((objective: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{objective}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "resources":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Ressources complémentaires</h3>
            <div className="grid gap-3">
              {lesson.resources?.map((resource: any, index: number) => (
                <CardEnhanced key={index} variant="default" interactive>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        resource.type === "video" ? "bg-red-100 text-red-600" :
                        resource.type === "article" ? "bg-blue-100 text-blue-600" :
                        "bg-green-100 text-green-600"
                      )}>
                        {resource.type === "video" ? <Video className="w-5 h-5" /> :
                         resource.type === "article" ? <FileText className="w-5 h-5" /> :
                         <ExternalLink className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(resource.url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardEnhanced>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <LearningLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <CardEnhanced className="mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{chapter.title}</span>
                  </div>
                  {completed && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Terminé</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              {[
                { id: "content", label: "Contenu", icon: BookOpen },
                { id: "objectives", label: "Objectifs", icon: Target },
                lesson.resources && lesson.resources.length > 0 && { id: "resources", label: "Ressources", icon: ExternalLink }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={currentSection === tab.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentSection(tab.id)}
                  className="rounded-b-none"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {renderContent()}
            </div>

            {/* Code Examples */}
            {lesson.codeExamples && lesson.codeExamples.length > 0 && currentSection === "content" && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Exemples de code
                </h3>
                <div>
                  {lesson.codeExamples.map((example: any, index: number) => 
                    renderCodeExample(example, index)
                  )}
                </div>
              </div>
            )}
          </div>
        </CardEnhanced>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousLesson}
              disabled={chapter.lessons.findIndex((l: any) => l.id === lessonId) === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            
            {!completed && (
              <Button
                onClick={handleCompleteLesson}
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Marquer comme terminé
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowNotes(!showNotes)}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Notes
            </Button>
            
            <Button
              onClick={handleNextLesson}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {chapter.lessons.findIndex((l: any) => l.id === lessonId) === chapter.lessons.length - 1 
                ? "Quiz du chapitre" 
                : "Suivant"}
            </Button>
          </div>
        </div>

        {/* Notes Panel */}
        {showNotes && (
          <CardEnhanced className="mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mes notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Prenez des notes sur cette leçon..."
                className="w-full h-32 p-3 border rounded-lg resize-none bg-background"
              />
              <div className="flex justify-end mt-3">
                <Button
                  onClick={() => {
                    localStorage.setItem(`notes-${lessonId}`, notes);
                    // Could add toast here
                  }}
                >
                  Sauvegarder
                </Button>
              </div>
            </div>
          </CardEnhanced>
        )}
      </div>
    </LearningLayout>
  );
}
