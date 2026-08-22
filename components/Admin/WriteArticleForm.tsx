"use client";

import {
  FiType,
  FiTag,
  FiImage,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiArchive,
} from "react-icons/fi";

import { useWriteArticle } from "./hooks/useWriteArticle";
import QuillEditor from "@/shared/Editor/QuillEditor";
import { ConfirmationModal } from "@/shared/Modal/ConfirmationModal";
import { CustomDropdown } from "@/shared/Dropdown/CustomDropdown";

export const WriteArticleForm = ({ slug }: { slug?: string }) => {
  const {
    categories,
    formData,
    status,
    errorMessage,
    isSlugUnique,
    isEdit,
    originalStatus,
    handleChange,
    handleSubmit,
    setFormData,
    setStatus,
    resetKey,
    router,
  } = useWriteArticle(slug);

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {status === "error" && (
        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 font-bold border border-red-100">
          <FiAlertCircle size={20} />
          {errorMessage}
        </div>
      )}

      <ConfirmationModal
        isOpen={status === "success"}
        onClose={() => {
          setStatus("idle");
          if (isEdit) router.push("/admin/manage");
        }}
        onConfirm={() => {
          setStatus("idle");
          if (isEdit) router.push("/admin/manage");
        }}
        title="Success!"
        message={
          isEdit
            ? "Article updated successfully!"
            : "Your article has been created successfully!"
        }
        type="success"
        confirmText="Great!"
        cancelText="Back to List"
      />

      <div className="space-y-6">
        <div className="space-y-2 min-w-0">
          <label className="text-sm font-bold text-gray-900 ml-1">
            Article Title
          </label>
          <div className="relative">
            <FiType className="absolute left-4 top-4 text-gray-400" />
            <input
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a catchy title..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">
              Slug (URL identifier)
            </label>
            <div className="relative">
              <input
                id="slug"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                placeholder="article-url-slug"
                className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 transition-all font-medium text-gray-600 ${
                  isSlugUnique === "taken"
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {isSlugUnique === "checking" && (
                  <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                )}
                {isSlugUnique === "unique" && (
                  <FiCheckCircle className="text-green-500 w-5 h-5" />
                )}
                {isSlugUnique === "taken" && (
                  <FiAlertCircle className="text-red-500 w-5 h-5" />
                )}
              </div>
            </div>
            {isSlugUnique === "taken" && (
              <p className="text-xs text-red-500 font-bold ml-1">
                This slug is already taken
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">
              Category
            </label>
            <CustomDropdown
              id="categoryId"
              options={categories.map(c => ({ id: c._id, name: c.name }))}
              value={formData.categoryId}
              onChange={(val) => handleChange({ target: { name: 'categoryId', value: val } } as any)}
              placeholder="Select Category"
              icon={<FiTag />}
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2 min-w-0">
            <label className="text-sm font-bold text-gray-900 ml-1">
              Cover Image URL
            </label>
            <div className="relative">
              <FiImage className="absolute left-4 top-4 text-gray-400" />
              <input
                name="coverImage"
                required
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">
              Read Time (minutes)
            </label>
            <input
              name="readTime"
              type="number"
              required
              value={formData.readTime}
              onChange={handleChange}
              className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
            />
          </div>
        </div>

        <div className="space-y-2 min-w-0">
          <label className="text-sm font-bold text-gray-900 ml-1">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="AI, React, WebDev..."
            className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          />
        </div>

        <div className="space-y-2 max-w-full">
          <label className="text-sm font-bold text-gray-900 ml-1">
            Content (Rich Text Editor)
          </label>
          <div id="content" className="w-full max-w-full overflow-hidden">
            <QuillEditor
              key={resetKey}
              value={formData.content}
              onChange={(val) => {
                handleChange({
                  target: { name: "content", value: val },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }}
              placeholder="Write your article content here..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-4">
        {originalStatus !== "published" && (
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={
              status === "submitting" ||
              status === "success" ||
              (isSlugUnique === "taken" && !isEdit) ||
              isSlugUnique === "checking"
            }
            className="flex-1 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 border-2 border-gray-100 hover:bg-gray-50 text-gray-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "submitting" ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
              <>
                {isEdit ? "Save Changes" : "Save as Draft"}
                <FiArchive />
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={(e) => handleSubmit(e, "published")}
          disabled={
            status === "submitting" ||
            status === "success" ||
            (isSlugUnique === "taken" && !isEdit) ||
            isSlugUnique === "checking"
          }
          className={`flex-[2] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95 ${
            status === "success"
              ? "bg-green-600 text-white"
              : (isSlugUnique === "taken" && !isEdit) ||
                  isSlugUnique === "checking"
                ? "bg-gray-400 text-white cursor-not-allowed shadow-none"
                : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {isEdit ? "Updating..." : "Publishing..."}
            </span>
          ) : status === "success" ? (
            <span className="flex items-center gap-2">
              <FiCheckCircle size={24} />
              {isEdit ? "Updated Successfully!" : "Published Successfully!"}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {isEdit ? "Update & Publish" : "Publish Article"}
              <FiSend />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};
