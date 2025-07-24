import React, { useState, useEffect } from "react";

/**
 * EditableSection: displays content from resumeData (array or string) with:
 * - AI-enhanced text fallback
 * - contentEditable manual editing
 */
const EditableSection = ({
  label,
  contentArray,
  enhancedText,
  onUpdate,
  isEditable = true,
}) => {
  const [editing, setEditing] = useState(false);
  const [localContent, setLocalContent] = useState("");

  useEffect(() => {
    if (Array.isArray(contentArray)) {
      // Join array of objects or strings
      const content = contentArray
        .map((item) => {
          if (typeof item === "string") return item;
          if (typeof item === "object")
            return Object.values(item).join(" - ");
          return "";
        })
        .join("\n");
      setLocalContent(content);
    } else if (enhancedText) {
      setLocalContent(enhancedText);
    }
  }, [contentArray, enhancedText]);

  const handleBlur = () => {
    setEditing(false);
    onUpdate?.(localContent);
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold text-lg border-b mb-1">{label}</h3>
      <div
        contentEditable={isEditable && editing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onClick={() => isEditable && setEditing(true)}
        className={`whitespace-pre-line px-2 py-1 border ${
          editing ? "bg-yellow-50 border-yellow-500" : "bg-white"
        } rounded transition-all`}
        style={{ minHeight: "60px", cursor: isEditable ? "text" : "default" }}
      >
        {localContent || "No content available"}
      </div>
    </div>
  );
};

export default EditableSection;
