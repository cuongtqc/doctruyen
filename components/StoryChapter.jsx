"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Main Reader component
export const StoryChapter = ({
  story,
  currentChapter,
  initialChapterNumber,
}) => {
  const router = useRouter();
  const [currentChapterNumber, setCurrentChapterNumber] =
    useState(initialChapterNumber);
  const [fontSize, setFontSize] = useState(16); // Default font size in pixels
  const [backgroundColor, setBackgroundColor] = useState("bg-stone-900"); // Default background color

  // Determine if navigation buttons should be enabled
  const hasPreviousChapter = currentChapterNumber > 1;
  const hasNextChapter = currentChapterNumber < story.chapters?.length;

  // Handler for font size changes
  const handleFontSizeChange = (increment) => {
    setFontSize((prevSize) => {
      const newSize = prevSize + increment;
      // Clamp the font size to a reasonable range
      return Math.max(12, Math.min(24, newSize));
    });
  };

  // Handlers for chapter navigation
  const handlePreviousChapter = () => {
    if (hasPreviousChapter) {
      setCurrentChapterNumber((prev) => prev - 1);
    }
  };

  const handleNextChapter = () => {
    if (hasNextChapter) {
      setCurrentChapterNumber((prev) => prev + 1);
    }
  };

  // Handlers for background color changes
  const handleBackgroundChange = (color) => {
    setBackgroundColor(color);
  };

  if (!currentChapter) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-900 text-white">
        Chapter not found.
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${backgroundColor} text-stone-300 font-sans`}
    >
      <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {/* Chapter Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          {currentChapter.title}
        </h1>

        {/* Author */}
        <p className="text-sm sm:text-base text-stone-400 mb-8">
          By {story.author}
        </p>

        {/* Content with dynamic font size */}
        <div
          className="leading-relaxed whitespace-pre-wrap text-stone-200"
          style={{ fontSize: `${fontSize}px` }}
        >
          {currentChapter.translatedContent}
        </div>

        {/* Navigation & Reader Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-stone-800 bg-opacity-90 backdrop-blur-sm p-4 sm:p-6 shadow-top-2xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 border-t border-stone-700 rounded-t-xl">
          {/* Chapter Navigation Buttons */}
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={handlePreviousChapter}
              disabled={!hasPreviousChapter}
              className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200
                ${
                  hasPreviousChapter
                    ? "bg-stone-600 hover:bg-stone-500 text-white shadow-md"
                    : "bg-stone-700 text-stone-500 cursor-not-allowed"
                }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextChapter}
              disabled={!hasNextChapter}
              className={`py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200
                ${
                  hasNextChapter
                    ? "bg-stone-600 hover:bg-stone-500 text-white shadow-md"
                    : "bg-stone-700 text-stone-500 cursor-not-allowed"
                }`}
            >
              Next
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-stone-400">Font Size:</span>
            <button
              onClick={() => handleFontSizeChange(-2)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-700 text-white hover:bg-stone-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <button
              onClick={() => handleFontSizeChange(2)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-700 text-white hover:bg-stone-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Background Color Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-stone-400">Background:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBackgroundChange("bg-stone-900")}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  backgroundColor === "bg-stone-900"
                    ? "border-white"
                    : "border-transparent"
                } bg-stone-900`}
              ></button>
              <button
                onClick={() => handleBackgroundChange("bg-slate-800")}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  backgroundColor === "bg-slate-800"
                    ? "border-white"
                    : "border-transparent"
                } bg-slate-800`}
              ></button>
              <button
                onClick={() => handleBackgroundChange("bg-amber-100")}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  backgroundColor === "bg-amber-100"
                    ? "border-stone-900"
                    : "border-transparent"
                } bg-amber-100`}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
