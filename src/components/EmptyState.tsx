"use client";

import { ReactNode } from "react";

interface EmptyStateProps {
  searchQuery: string;
  onReset: () => void;
  title?: string;
  description?: ReactNode;
  resetButtonText?: string;
}

/**
 * A standard, high-impact component for empty search queries and missing results.
 */
export default function EmptyState({
  searchQuery,
  onReset,
  title = "Keine Ergebnisse gefunden",
  description,
  resetButtonText = "Suche zurücksetzen",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs gap-4 animate-fadeIn">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gray-400 border border-white/10">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className="font-wa-headline text-lg font-bold text-white">{title}</h3>
        <div className="text-sm text-gray-400">
          {description || (
            <p>
              Es wurden keine Austragungen für &quot;
              <strong className="text-white">{searchQuery}</strong>
              &quot; im Archiv gefunden.
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onReset}
        className="mt-2 px-4 py-2 text-xs font-bold text-tourDarkBlue bg-white hover:bg-gray-100 rounded-xl transition duration-300 cursor-pointer"
      >
        {resetButtonText}
      </button>
    </div>
  );
}
