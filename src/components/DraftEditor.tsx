
import React, { useState, useEffect } from "react";
import { Save, Plus } from "lucide-react";
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
  const { toast } = useToast();

  useEffect(() => {
    const savedDraft = localStorage.getItem("currentDraft");
    if (savedDraft) {
      const draft: Draft = JSON.parse(savedDraft);
      setParagraphs(draft.paragraphs);
      setCurrentDraftId(draft.id);
    }
  }, []);

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
      title: "Draft saved successfully",
      description: "Your changes have been saved to local storage.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-editor-border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-editor-text">
              Text Editor
            </h1>
            <div className="flex gap-3">
              <button
                onClick={saveDraft}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </button>
              <button
                onClick={addParagraph}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Paragraph
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
                    ? "Start writing your text here..."
                    : "Continue your story..."
                }
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-editor-border p-6">
          <h2 className="text-lg font-medium text-editor-text mb-4">Preview</h2>
          <div className="prose max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`preview-${currentDraftId}-${index}`}
                className="mb-4 text-editor-text leading-relaxed animate-fade-in"
              >
                {paragraph || <span className="text-editor-placeholder">Empty paragraph</span>}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
