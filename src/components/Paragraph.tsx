
import React from "react";

// Interface que define as propriedades do componente Paragraph
interface ParagraphProps {
  value: string;      // Conteúdo do parágrafo
  onChange: (value: string) => void; // Função chamada quando o conteúdo é alterado
  placeholder?: string; // Texto placeholder opcional
}

// Componente Paragraph: representa um parágrafo editável no editor
const Paragraph = ({ value, onChange, placeholder }: ParagraphProps) => {
  return (
    // Container com animação de fade in
    <div className="animate-fade-in">
      {/* Área de texto editável com suporte a modo escuro */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 border border-editor-border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all duration-200 placeholder:text-editor-placeholder dark:placeholder:text-gray-500 text-editor-text dark:text-gray-300 bg-white dark:bg-gray-800"
      />
    </div>
  );
};

export default Paragraph;
