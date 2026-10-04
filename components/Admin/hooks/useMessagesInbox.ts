"use client";

import { useState, useEffect } from "react";
import commonApi from "@/api";

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export function useMessagesInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await commonApi({ action: "getAllMsg" });
      const sorted = (res?.data || []).sort(
        (a: ContactMessage, b: ContactMessage) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMessages(sorted);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load messages.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return {
    messages,
    isLoading,
    error,
    expandedId,
    fetchMessages,
    toggleExpand,
  };
}
