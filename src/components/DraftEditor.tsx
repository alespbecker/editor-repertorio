
import React, { useState, useEffect } from "react";
import { Save, Plus, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import Paragraph from "./Paragraph";

// Interface que define a estrutura de um rascunho
interface Draft {
  id: string;          // Identificador único do rascunho
  paragraphs: string[]; // Array de parágrafos do texto
  lastModified: number; // Timestamp da última modificação
}

const DraftEditor = () => {
  // Estados do componente
  const [paragraphs, setParagraphs] = useState<string[]>([""]); // Array de parágrafos
  const [currentDraftId, setCurrentDraftId] = useState<string>(
    Date.now().toString() // ID único baseado no timestamp atual
  );
  // Estado para controle do modo escuro/claro
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  
  // Hooks personalizados
  const { toast } = useToast(); // Para notificações
  const isMobile = useIsMobile(); // Para verificar se é dispositivo móvel

  // Efeito executado na montagem do componente
  useEffect(() => {
    // Recupera rascunho salvo do localStorage
    const savedDraft = localStorage.getItem("currentDraft");
    if (savedDraft) {
      const draft: Draft = JSON.parse(savedDraft);
      setParagraphs(draft.paragraphs);
      setCurrentDraftId(draft.id);
    }

    // Carrega preferência de tema do usuário
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Alterna entre modo escuro e claro
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    document.documentElement.classList.toggle("dark");
  };

  // Atualiza o conteúdo de um parágrafo específico
  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };

  // Adiciona um novo parágrafo vazio ao texto
  const addParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  // Salva o rascunho atual no localStorage
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
    // Container principal com suporte a modo escuro
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        {/* Seção do editor */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-editor-border dark:border-gray-700 p-6 mb-8 transition-colors duration-200">
          {/* Cabeçalho com título e botões de ação */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <h1 className="text-2xl font-semibold text-editor-text dark:text-white">
              Editor de Redação
            </h1>
            {/* Grupo de botões */}
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              {/* Botão de alternar tema */}
              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center justify-center p-2 sm:px-4 sm:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                ) : (
                  <Moon className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                </span>
              </button>
              {/* Botão de salvar rascunho */}
              <button
                onClick={saveDraft}
                className="inline-flex items-center justify-center p-2 sm:px-4 sm:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                title="Salvar Rascunho"
              >
                <Save className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Salvar Rascunho</span>
              </button>
              {/* Botão de adicionar parágrafo */}
              <button
                onClick={addParagraph}
                className="inline-flex items-center justify-center p-2 sm:px-4 sm:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                title="Adicionar Parágrafo"
              >
                <Plus className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Adicionar Parágrafo</span>
              </button>
            </div>
          </div>

          {/* Lista de parágrafos editáveis */}
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

        {/* Seção de visualização */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-editor-border dark:border-gray-700 p-6 transition-colors duration-200">
          <h2 className="text-lg font-medium text-editor-text dark:text-white mb-4">
            Visualização
          </h2>
          {/* Área de visualização dos parágrafos */}
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
