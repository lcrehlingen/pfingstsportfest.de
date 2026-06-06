"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

interface NewsItem {
  slug: string;
  date: string;
  title: string;
  image: string;
}

interface NewsGridProps {
  news: NewsItem[];
}

export default function NewsGrid({ news }: NewsGridProps) {
  const [visibleCount, setVisibleCount] = useState(9);

  // Paginated articles sliced for display (no filters applied)
  const paginatedNews = useMemo(() => {
    return news.slice(0, visibleCount);
  }, [news, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="flex flex-col gap-8 w-full text-white">
      
      {/* Results Status */}
      <div className="flex justify-between items-center text-xs text-gray-400 px-1">
        <span>Gesamtberichte</span>
        <span>{news.length} Artikel verfügbar</span>
      </div>

      {/* Grid Display */}
      <div className="flex flex-col gap-10">
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedNews.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-xs"
            >
              <Link href={`/news/${item.slug}`} className="flex flex-col h-full">
                {/* Card Cover Image with zoom effect */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                  <ExportedImage
                    src={`/` + item.image}
                    width={640}
                    height={360}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Card Content container */}
                <div className="flex flex-1 flex-col justify-between p-6 gap-4">
                  <div className="flex flex-col gap-2.5">
                    
                    {/* Date Indicator badge */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <time dateTime={item.date}>
                        {new Date(item.date).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    {/* Header title */}
                    <h3 className="font-wa-headline text-xl font-bold text-white group-hover:text-tourLightOrange line-clamp-3 transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Action Arrow link */}
                  <div className="flex items-center gap-1 text-sm font-bold text-tourLightOrange group-hover:text-white mt-1">
                    Weiterlesen
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>

                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Load More Pagination Button */}
        {news.length > visibleCount && (
          <div className="flex justify-center pt-2">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-gray-100 px-6 py-3.5 text-center text-base font-bold text-tourDarkBlue transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-white/5 cursor-pointer"
            >
              Weitere Artikel laden
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
