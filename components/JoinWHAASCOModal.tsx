"use client";

import { useState, useEffect } from "react";

interface JoinWHAASCOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INTEREST_OPTIONS = [
  "Board membership",
  "Committee volunteer",
  "Event planning",
  "Youth programs",
  "Education initiatives",
  "Cultural events",
  "Community outreach",
  "Other",
];

export default function JoinWHAASCOModal({ isOpen, onClose }: JoinWHAASCOModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInterestToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(option)
        ? prev.interests.filter((i) => i !== option)
        : [...prev.interests, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Thank you for your interest! We'll be in touch soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          interests: [],
          message: "",
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: "" });
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit. Please try again later.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Join WHAASCO
            </h2>
            <p className="text-gray-600">
              Share your interest and we'll connect you with opportunities to get involved—whether as a volunteer, committee member, or supporter.
            </p>
          </div>

          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="join-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="join-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="join-email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="join-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="join-phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="join-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I'm interested in (select all that apply)
              </label>
              <div className="space-y-2">
                {INTEREST_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(option)}
                      onChange={() => handleInterestToggle(option)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="join-message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tell us more (optional)
              </label>
              <textarea
                id="join-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all resize-none"
                placeholder="Skills, availability, or questions..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-african-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isSubmitting ? "Submitting..." : "Submit Interest Form"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
