
import React, { useState, useEffect } from "react";
import { Save, Plus, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Paragraph from "./Paragraph";

interface Draft {
  id: string;
  paragraphs: string[];
  lastModified: number;
}

const DraftEditor = () => {
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [currentDraftId, setCurrentDraftId] = useState<string>(
    Date.now().toString()
  );
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedDraft = localStorage.getItem("currentDraft");
    if (savedDraft) {
      const draft: Draft = JSON.parse(savedDraft);
      setParagraphs(draft.paragraphs);
      setCurrentDraftId(draft.id);
    }

    // Carregar preferência de tema
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    document.documentElement.classList.toggle("dark");
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  const saveDraft = () => {
    const draft: Draft = {
      id: currentDraftId,
      paragraphs,
      lastModified: Date.now(),
    };
    localStorage.setItem("currentDraft", JSON.stringify(draft));
    toast({
      title: "Rascunho salvo com sucesso",
      description: "Suas alterações foram salvas no armazenamento local.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-editor-border dark:border-gray-700 p-6 mb-8 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-editor-text dark:text-white">
              Editor de Texto
            </h1>
            <div className="flex gap-3">
              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 mr-2" />
                ) : (
                  <Moon className="h-4 w-4 mr-2" />
                )}
                {isDarkMode ? "Modo Claro" : "Modo Escuro"}
              </button>
              <button
                onClick={saveDraft}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Rascunho
              </button>
              <button
                onClick={addParagraph}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Parágrafo
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <Paragraph
                key={`${currentDraftId}-${index}`}
                value={paragraph}
                onChange={(value) => handleParagraphChange(index, value)}
                placeholder={
                  index === 0
                    ? "Comece a escrever seu texto aqui..."
                    : "Continue sua história..."
                }
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-editor-border dark:border-gray-700 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-editor-text dark:text-white mb-4">
            Visualização
          </h2>
          <div className="prose max-w-none dark:prose-invert">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`preview-${currentDraftId}-${index}`}
                className="mb-4 text-editor-text dark:text-gray-300 leading-relaxed animate-fade-in"
              >
                {paragraph || (
                  <span className="text-editor-placeholder dark:text-gray-500">
                    Parágrafo vazio
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
