"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import "./QuillEditor.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function QuillEditor({ value, onChange, placeholder }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<import("quill").default | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !editorRef.current) return;

    if (!quillInstanceRef.current) {
      import("quill").then((QuillModule) => {
        const Quill = QuillModule.default;

        const toolbarOptions = [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          [{ align: [] }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          ["clean"],
        ];

        const quill = new Quill(editorRef.current!, {
          theme: "snow",
          placeholder: placeholder || "Start writing...",
          modules: {
            syntax: { 
              hljs,
              languages: [
                { key: 'plain', label: 'Plain' },
                { key: 'javascript', label: 'JavaScript' },
                { key: 'typescript', label: 'TypeScript' },
                { key: 'python', label: 'Python' },
                { key: 'java', label: 'Java' },
                { key: 'cpp', label: 'C++' },
                { key: 'csharp', label: 'C#' },
                { key: 'html', label: 'HTML' },
                { key: 'css', label: 'CSS' },
                { key: 'sql', label: 'SQL' },
                { key: 'json', label: 'JSON' },
                { key: 'bash', label: 'Bash' }
              ]
            },
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: () => {
                  fileInputRef.current?.click();
                },
                video: () => {
                  videoInputRef.current?.click();
                },
              },
            },
            clipboard: {
              matchVisual: false,
            },
          },
        });

        quill.clipboard.addMatcher('code.editor-code', (node, delta) => {
          const Delta = Quill.import('delta');
          const blockDelta = new Delta();
          delta.ops.forEach((op: any) => {
            blockDelta.insert(op.insert, { 'code-block': true });
          });
          return blockDelta;
        });

        quillInstanceRef.current = quill;

        const cleanValue = (html: string) => {
          if (!html) return html;
          const corruptedString = "PlainBashC++C#CSSDiffHTML/XMLJavaJavaScriptMarkdownPHPPythonRubySQL";
          return html.split(corruptedString).join("");
        };

        if (value) {
          quill.clipboard.dangerouslyPasteHTML(cleanValue(value));
          isFirstRender.current = false;
        }

        quill.on("text-change", () => {
          const clone = quill.root.cloneNode(true) as HTMLElement;
          const uiElements = clone.querySelectorAll('.ql-ui');
          uiElements.forEach(el => el.remove());
          
          let html = clone.innerHTML;
          html = cleanValue(html);
          if (html === "<p><br></p>" || html === "") {
            onChange("");
          } else {
            onChange(html);
          }
        });
      });
    }
  }, [isMounted]);

  useEffect(() => {
    if (quillInstanceRef.current && value !== quillInstanceRef.current.root.innerHTML) {
       if (!value || value === "") {
          quillInstanceRef.current.setText("");
       } else if (isFirstRender.current) {
          const corruptedString = "PlainBashC++C#CSSDiffHTML/XMLJavaJavaScriptMarkdownPHPPythonRubySQL";
          const cleanedValue = value.split(corruptedString).join("");
          
          quillInstanceRef.current.clipboard.dangerouslyPasteHTML(cleanedValue);
          isFirstRender.current = false;
       }
    }
  }, [value]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !quillInstanceRef.current) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      const quill = quillInstanceRef.current;
      if (!quill) return;
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", imageUrl);
      quill.setSelection(range.index + 1);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !quillInstanceRef.current) return;

    const reader = new FileReader();
    reader.onload = () => {
      const videoUrl = reader.result as string;
      const quill = quillInstanceRef.current;
      if (!quill) return;
      const range = quill.getSelection(true);

      const videoHTML = `<video src="${videoUrl}" controls style="max-width: 100%; border-radius: 0.5rem; margin: 1rem 0; display: block;"></video>`;
      quill.clipboard.dangerouslyPasteHTML(range.index, videoHTML);
      quill.setSelection(range.index + 1);
    };
    reader.readAsDataURL(file);

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  if (!isMounted) {
    return <div className="quill-editor-container"><div className="p-4">Loading editor...</div></div>;
  }

  return (
    <div className="quill-editor-container">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        style={{ display: "none" }}
      />
      <div ref={editorRef} />
    </div>
  );
}
