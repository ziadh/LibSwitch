import React, { useState, useRef, useEffect } from "react";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  const [content, setContent] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (value !== content) {
      setContent(value);
    }
  }, [value, content]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const selectionStart = e.currentTarget.selectionStart;
    const selectionEnd = e.currentTarget.selectionEnd;

    const newContent =
      content.substring(0, selectionStart) +
      pastedText +
      content.substring(selectionEnd);

    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }

    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = selectionStart + pastedText.length;
        textareaRef.current.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
      }
    }, 0);
  };

  const lines = content.split("\n");
  const maxLineNumberWidth = lines.length.toString().length;

  return (
    <pre
      ref={preRef}
      className="flex bg-gray-700 text-gray-100 p-5 m-0 overflow-x-auto font-mono leading-normal rounded-xl"
    >
      <div
        className={`flex flex-col mr-4 select-none text-gray-500 text-right`}
        style={{ minWidth: `${maxLineNumberWidth}ch` }}
      >
        {lines.map((_, index) => (
          <span key={index + 1} className="font-bold text-gray-400">
            {index + 1}
          </span>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onPaste={handlePaste}
        className="flex-1 bg-transparent text-blue-400 border-none outline-none font-inherit text-inherit leading-inherit resize-none overflow-hidden p-0 m-0"
        rows={lines.length}
        readOnly={readOnly}
        spellCheck="false"
      />
    </pre>
  );
};

export default CodeEditor;
