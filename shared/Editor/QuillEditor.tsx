"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import "./QuillEditor.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { FiImage, FiLink, FiUploadCloud, FiX, FiCheck, FiInfo } from "react-icons/fi";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Resizes and compresses an image file using an offscreen HTML5 canvas.
 * Prevents bloated multi-megabyte base64 payloads from slowing down LCP
 * and overflowing MongoDB document boundaries.
 */
const compressImage = (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Prefer WebP for high compression, fallback to JPEG
        try {
          const webpData = canvas.toDataURL("image/webp", quality);
          if (webpData.startsWith("data:image/webp")) {
            resolve(webpData);
            return;
          }
        } catch {
          // fallback
        }
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function QuillEditor({ value, onChange, placeholder }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<import("quill").default | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const [isMounted, setIsMounted] = useState(false);

  // Image Modal State
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageTab, setImageTab] = useState<"url" | "upload">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploadedDataUrl, setUploadedDataUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalFileSize, setOriginalFileSize] = useState<string | null>(null);

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
                { key: "plain", label: "Plain" },
                { key: "javascript", label: "JavaScript" },
                { key: "typescript", label: "TypeScript" },
                { key: "python", label: "Python" },
                { key: "java", label: "Java" },
                { key: "cpp", label: "C++" },
                { key: "csharp", label: "C#" },
                { key: "html", label: "HTML" },
                { key: "css", label: "CSS" },
                { key: "sql", label: "SQL" },
                { key: "json", label: "JSON" },
                { key: "bash", label: "Bash" },
              ],
            },
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: () => {
                  setShowImageModal(true);
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

        quill.clipboard.addMatcher("code.editor-code", (node, delta) => {
          const Delta = Quill.import("delta");
          const blockDelta = new Delta();
          delta.ops.forEach((op: { insert?: string | Record<string, unknown> }) => {
            if (op.insert) {
              blockDelta.insert(op.insert, { "code-block": true });
            }
          });
          return blockDelta;
        });

        quillInstanceRef.current = quill;

        const cleanValue = (html: string) => {
          if (!html) return html;
          const corruptedString =
            "PlainBashC++C#CSSDiffHTML/XMLJavaJavaScriptMarkdownPHPPythonRubySQL";
          return html.split(corruptedString).join("");
        };

        if (value) {
          quill.clipboard.dangerouslyPasteHTML(cleanValue(value));
          isFirstRender.current = false;
        }

        quill.on("text-change", () => {
          const clone = quill.root.cloneNode(true) as HTMLElement;
          const uiElements = clone.querySelectorAll(".ql-ui");
          uiElements.forEach((el) => el.remove());

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
        const corruptedString =
          "PlainBashC++C#CSSDiffHTML/XMLJavaJavaScriptMarkdownPHPPythonRubySQL";
        const cleanedValue = value.split(corruptedString).join("");

        quillInstanceRef.current.clipboard.dangerouslyPasteHTML(cleanedValue);
        isFirstRender.current = false;
      }
    }
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    setOriginalFileSize(`${sizeInMb} MB`);
    setIsCompressing(true);

    try {
      const compressed = await compressImage(file, 1200, 1200, 0.8);
      setUploadedDataUrl(compressed);
    } catch (err) {
      console.error("Image compression error", err);
    } finally {
      setIsCompressing(false);
    }
  };

  const insertImage = () => {
    const quill = quillInstanceRef.current;
    if (!quill) return;

    const targetSrc = imageTab === "url" ? imageUrl.trim() : uploadedDataUrl;
    if (!targetSrc) return;

    const range = quill.getSelection(true);
    const cleanAlt = (imageAlt.trim() || "Article illustration").replace(/"/g, "&quot;");
    const imageHTML = `<img src="${targetSrc}" alt="${cleanAlt}" loading="lazy" style="max-width: 100%; height: auto; border-radius: 0.75rem; margin: 1.5rem 0; display: block;" />`;

    quill.clipboard.dangerouslyPasteHTML(range.index, imageHTML);
    quill.setSelection(range.index + 1);

    // Reset and close
    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
    setUploadedDataUrl(null);
    setOriginalFileSize(null);
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
    return (
      <div className="quill-editor-container">
        <div className="p-4">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="quill-editor-container relative">
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        style={{ display: "none" }}
      />
      <div ref={editorRef} />

      {/* SEO-Optimized Image Insert Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 border border-gray-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FiImage className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg">Insert Image</h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Optimized for Core Web Vitals & Image SEO
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1 bg-gray-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  imageTab === "url"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FiLink className="w-4 h-4" />
                Web Image URL (CDN / Unsplash)
              </button>
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  imageTab === "upload"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FiUploadCloud className="w-4 h-4" />
                Upload & Compress
              </button>
            </div>

            {/* URL Tab Content */}
            {imageTab === "url" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                  />
                </div>
                {imageUrl && (
                  <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Upload Tab Content */}
            {imageTab === "upload" && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl p-6 text-center transition-colors">
                  <input
                    type="file"
                    id="quill-file-upload"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="quill-file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <FiUploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      Click to choose an image
                    </span>
                    <span className="text-xs text-gray-400">
                      PNG, JPG, WebP (Automatically compressed via canvas)
                    </span>
                  </label>
                </div>

                {isCompressing && (
                  <div className="p-3 bg-blue-50 text-blue-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Compressing and optimizing image...
                  </div>
                )}

                {uploadedDataUrl && !isCompressing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-emerald-600 font-bold px-1">
                      <span className="flex items-center gap-1">
                        <FiCheck className="w-4 h-4" /> Optimized & Compressed
                      </span>
                      {originalFileSize && (
                        <span className="text-gray-400 font-normal">
                          Original: {originalFileSize}
                        </span>
                      )}
                    </div>
                    <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={uploadedDataUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Alt Text Field (Google Image SEO & Accessibility) */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  Image Alt Text (SEO Description)
                </label>
                <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                  <FiInfo className="w-3 h-3" /> Boosts Google Images ranking
                </span>
              </div>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe this image for search engines & screen readers..."
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertImage}
                disabled={
                  (imageTab === "url" && !imageUrl.trim()) ||
                  (imageTab === "upload" && !uploadedDataUrl) ||
                  isCompressing
                }
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
