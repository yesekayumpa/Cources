"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeLab } from "@/components/code-lab/code-lab";
import {
  Save,
  FolderOpen,
  Share,
  Download,
  Trash2,
  Plus,
  Search,
  Star,
  Clock,
  Users,
  Code,
  Zap,
  Trophy,
  BookOpen,
  Rocket,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SavedProject {
  id: string;
  name: string;
  description: string;
  code: string;
  template: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  isPublic: boolean;
  stars: number;
  views: number;
}

const sampleProjects: SavedProject[] = [
  {
    id: "1",
    name: "Compteur React",
    description: "Un simple compteur avec useState",
    code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-8">
      <h1>Compteur: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`,
    template: "react",
    tags: ["react", "hooks", "beginner"],
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 3600000,
    isPublic: true,
    stars: 15,
    views: 123,
  },
  {
    id: "2",
    name: "Todo List",
    description: "Une liste de tâches complète",
    code: `import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };
  
  return (
    <div className="p-8">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Ajouter</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
    template: "react",
    tags: ["react", "hooks", "intermediate"],
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 7200000,
    isPublic: true,
    stars: 23,
    views: 256,
  },
];

function CodeLabContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAppStore();

  const [activeTab, setActiveTab] = useState("editor");
  const [savedProjects, setSavedProjects] =
    useState<SavedProject[]>(sampleProjects);
  const [currentProject, setCurrentProject] = useState<SavedProject | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTags, setProjectTags] = useState("");

  // Charger le code depuis les paramètres d'URL si partagé
  useEffect(() => {
    const sharedCode = searchParams.get("code");
    if (sharedCode) {
      setActiveTab("editor");
      // Le code sera chargé dans le CodeLab via les props
    }
  }, [searchParams]);

  const allTags = Array.from(new Set(savedProjects.flatMap((p) => p.tags)));

  const filteredProjects = savedProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleSaveProject = () => {
    if (!projectName.trim()) return;

    const newProject: SavedProject = {
      id: Date.now().toString(),
      name: projectName,
      description: projectDescription,
      code: "", // Sera récupéré du CodeLab
      template: "react",
      tags: projectTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPublic: false,
      stars: 0,
      views: 0,
    };

    setSavedProjects([newProject, ...savedProjects]);
    setShowSaveDialog(false);
    setProjectName("");
    setProjectDescription("");
    setProjectTags("");
    setActiveTab("projects");
  };

  const handleDeleteProject = (projectId: string) => {
    setSavedProjects(savedProjects.filter((p) => p.id !== projectId));
  };

  const handleLoadProject = (project: SavedProject) => {
    setCurrentProject(project);
    setActiveTab("editor");
  };

  const handleShareProject = (project: SavedProject) => {
    const shareUrl = `${window.location.origin}/code-lab?project=${project.id}`;
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Code className="w-8 h-8 text-primary" />
                Code Lab
              </h1>
              <p className="text-muted-foreground mt-2">
                Laboratoire de code interactif pour apprendre et expérimenter
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
                <Save className="w-4 h-4" />
                Sauvegarder
              </Button>
              <Button onClick={() => setActiveTab("editor")}>
                <Plus className="w-4 h-4" />
                Nouveau projet
              </Button>
            </div>
          </div>
        </div>

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Sauvegarder le projet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom du projet</Label>
                  <Input
                    id="name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Mon projet"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Description du projet..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    value={projectTags}
                    onChange={(e) => setProjectTags(e.target.value)}
                    placeholder="react, hooks, beginner"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveProject}
                    disabled={!projectName.trim()}
                  >
                    Sauvegarder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor">Éditeur</TabsTrigger>
            <TabsTrigger value="projects">Mes Projets</TabsTrigger>
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
          </TabsList>

          {/* Editor Tab */}
          <TabsContent value="editor" className="mt-6">
            <CodeLab
              initialCode={currentProject?.code || ""}
              template={(currentProject?.template as any) || "react"}
              height={600}
              showConsole={true}
              autoRun={false}
            />
          </TabsContent>

          {/* My Projects Tab */}
          <TabsContent value="projects" className="mt-6">
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher un projet..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={selectedTag || "all"}
                  onValueChange={(value) =>
                    setSelectedTag(value === "all" ? null : value)
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filtrer par tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les tags</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">
                          {project.name}
                        </CardTitle>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShareProject(project)}
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {project.stars}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.views}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleLoadProject(project)}
                        className="w-full"
                      >
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Ouvrir
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <Code className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucun projet trouvé</p>
                  <Button
                    onClick={() => setActiveTab("editor")}
                    className="mt-4"
                  >
                    Créer un nouveau projet
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Galerie Communautaire
                </h2>
                <p className="text-muted-foreground">
                  Découvrez et inspirez-vous des projets créés par la communauté
                </p>
              </div>

              {/* Featured Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProjects
                  .filter((p) => p.isPublic)
                  .map((project) => (
                    <Card
                      key={project.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {project.name}
                          </CardTitle>
                          <Badge variant="secondary">
                            <Trophy className="w-3 h-3 mr-1" />
                            Populaire
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {project.stars}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {Math.floor(Math.random() * 20)}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {project.views}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleLoadProject(project)}
                            className="flex-1"
                          >
                            <Rocket className="w-4 h-4 mr-2" />
                            Essayer
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShareProject(project)}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Explorer par catégorie
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Débutant",
                    "Intermédiaire",
                    "Avancé",
                    "UI/UX",
                    "Jeux",
                    "Utilitaires",
                    "Animations",
                    "Data",
                  ].map((category) => (
                    <Card
                      key={category}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4 text-center">
                        <Code className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-medium">{category}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {Math.floor(Math.random() * 50) + 10} projets
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function CodeLabPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Code className="w-8 h-8 mx-auto mb-4 text-muted-foreground animate-spin" />
            <p className="text-muted-foreground">Chargement du Code Lab...</p>
          </div>
        </div>
      }
    >
      <CodeLabContent />
    </Suspense>
  );
}
