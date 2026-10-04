"use client";

import { FiMail, FiUser, FiClock, FiRefreshCw, FiInbox, FiAlertCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useMessagesInbox } from "./hooks/useMessagesInbox";
import { timeAgo } from "@/utils/dateHelpers";

export default function MessagesInbox() {
  const {
    messages,
    isLoading,
    error,
    expandedId,
    fetchMessages,
    toggleExpand,
  } = useMessagesInbox();

  /* ---- Loading state ---- */
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
              <div className="h-3 w-14 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ---- Error state ---- */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <FiAlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-gray-700 font-semibold mb-1">Could not load messages</p>
        <p className="text-gray-400 text-sm mb-6">{error}</p>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          <FiRefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  /* ---- Empty state ---- */
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <FiInbox className="w-8 h-8 text-blue-400" />
        </div>
        <p className="text-gray-700 font-semibold mb-1">No messages yet</p>
        <p className="text-gray-400 text-sm">When users send a message it will appear here.</p>
      </div>
    );
  }

  /* ---- Message list ---- */
  return (
    <div className="space-y-3">
      {messages.map((msg) => {
        const isOpen = expandedId === msg._id;
        return (
          <div
            key={msg._id}
            className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden ${
              isOpen ? "border-blue-200 shadow-md" : "border-gray-100 hover:border-gray-200"
            }`}
          >
            {/* Row header — always visible */}
            <button
              onClick={() => toggleExpand(msg._id)}
              className="w-full flex items-center gap-4 p-5 text-left"
            >
              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm uppercase">
                {msg.name.charAt(0)}
              </div>

              {/* Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-gray-900 text-sm truncate">{msg.name}</span>
                  <span className="hidden sm:inline text-gray-300">·</span>
                  <span className="hidden sm:inline text-xs text-gray-400 truncate">{msg.email}</span>
                </div>
                <p className="text-sm text-gray-500 font-medium truncate">{msg.subject}</p>
              </div>

              {/* Time + chevron */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                  <FiClock size={11} /> {timeAgo(msg.createdAt)}
                </span>
                {isOpen ? (
                  <FiChevronUp className="text-gray-400" size={16} />
                ) : (
                  <FiChevronDown className="text-gray-400" size={16} />
                )}
              </div>
            </button>

            {/* Expanded body */}
            {isOpen && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <div className="pt-4 space-y-3">
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><FiUser size={11} /> {msg.name}</span>
                    <span className="flex items-center gap-1"><FiMail size={11} /> {msg.email}</span>
                    <span className="flex items-center gap-1">
                      <FiClock size={11} />
                      {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </div>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiMail size={12} /> Reply via Email
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
