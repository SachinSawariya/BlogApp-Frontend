"use client";

import { useState } from "react";
import commonApi from "@/api";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      await commonApi({
        action: "saveContactFormMsgToDB",
        data: formData,
      });
      setStatus("success");
      setFormData(INITIAL_FORM_STATE);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(message);
      setStatus("error");
    }
  };

  return {
    formData,
    status,
    errorMsg,
    handleChange,
    handleSubmit,
  };
}
