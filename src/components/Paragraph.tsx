
import React from "react";

interface ParagraphProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Paragraph = ({ value, onChange, placeholder }: ParagraphProps) => {
  return (
    <div className="animate-fade-in">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 border border-editor-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all duration-200 placeholder:text-editor-placeholder text-editor-text"
      />
    </div>
  );
};

export default Paragraph;
