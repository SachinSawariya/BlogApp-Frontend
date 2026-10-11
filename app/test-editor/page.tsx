"use client";
import React, { useState } from "react";
import QuillEditor from "@/shared/Editor/QuillEditor";

export default function TestEditorPage() {
  const [content, setContent] = useState<string>(
    `<h2>Test Lists</h2><p>Here is an unordered bullet list:</p><ul><li>First bullet</li><li>Second bullet</li><li>Third bullet</li></ul><p>Here is an ordered numbered list:</p><ol><li>First step</li><li>Second step</li><li>Third step</li></ol>`
  );

  return (
    <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto transition-colors">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quill Editor Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Editor:</h2>
        <QuillEditor
          value={content}
          onChange={(val) => setContent(val)}
          placeholder="Type here..."
        />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Article Page Preview:</h2>
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm prose dark:prose-invert article-rendered-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-8">
        <h2 className="text-sm font-semibold mb-1 text-gray-500 dark:text-gray-400">Raw Output HTML:</h2>
        <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded text-xs text-gray-800 dark:text-gray-200 overflow-x-auto border border-transparent dark:border-gray-800">
          {content}
        </pre>
      </div>
    </div>
  );
}
