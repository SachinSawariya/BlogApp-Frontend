"use client";
import React, { useState } from "react";
import QuillEditor from "@/shared/Editor/QuillEditor";

export default function TestEditorPage() {
  const [content, setContent] = useState<string>(
    `<h2>Test Lists</h2><p>Here is an unordered bullet list:</p><ul><li>First bullet</li><li>Second bullet</li><li>Third bullet</li></ul><p>Here is an ordered numbered list:</p><ol><li>First step</li><li>Second step</li><li>Third step</li></ol>`
  );

  return (
    <div style={{ padding: 40, maxWidth: 1000, margin: "0 auto" }}>
      <h1 className="text-2xl font-bold mb-4">Quill Editor Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Editor:</h2>
        <QuillEditor
          value={content}
          onChange={(val) => setContent(val)}
          placeholder="Type here..."
        />
      </div>

      <div className="border-t pt-8">
        <h2 className="text-lg font-semibold mb-2">Article Page Preview:</h2>
        <div className="p-6 bg-white rounded-2xl border shadow-sm prose article-rendered-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>

      <div className="border-t pt-4 mt-8">
        <h2 className="text-sm font-semibold mb-1 text-gray-500">Raw Output HTML:</h2>
        <pre className="p-4 bg-gray-100 rounded text-xs overflow-x-auto">
          {content}
        </pre>
      </div>
    </div>
  );
}
