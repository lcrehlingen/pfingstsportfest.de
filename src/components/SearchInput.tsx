"use client";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * A reusable search input with standard Tailwind theme styles and clear buttons.
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = "Suchen...",
  className = "w-full sm:max-w-xs shrink-0",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-tourLightOrange rounded-xl text-sm font-medium text-white placeholder-gray-400 focus:outline-hidden focus:ring-4 focus:ring-tourLightOrange/15 focus:shadow-glow-orange transition duration-300"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition cursor-pointer"
          aria-label="Eingabe löschen"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
