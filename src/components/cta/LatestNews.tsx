import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { getAllNews } from "@/utils/news";

export default async function LatestNews() {
  const news = (await getAllNews()).slice(0, 3);

  if (news.length === 0) {
    return null; // Don't render anything if no news articles exist
  }

  return (
    <section className="w-full bg-white py-16 lg:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 2xl:px-0 flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-tourOrange bg-tourOrange/10 max-w-fit">
              📰 Newsroom
            </span>
            <h2 className="font-wa-headline text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              Aktuelles aus <span className="text-tourOrange">Rehlingen</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-1.5 text-lg font-bold text-tourDarkBlue hover:text-tourOrange transition duration-300 shrink-0"
          >
            Alle Neuigkeiten ansehen
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.slug} className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-tourLightOrange/30 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-glow-orange/5 transition-all duration-300 transform hover:-translate-y-1">
              <Link href={`/news/${item.slug}`} className="flex flex-col h-full">
                {/* Image Container with Zoom effect */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <ExportedImage
                    src={`/` + item.image}
                    width={640}
                    height={360}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Body Content */}
                <div className="flex flex-1 flex-col justify-between p-6 gap-4">
                  <div className="flex flex-col gap-2">
                    {/* Date Tag */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 font-medium">
                      <svg
                        className="h-4 w-4 text-gray-300"
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
                          year: "numeric"
                        })}
                      </time>
                    </div>

                    <h3 className="font-wa-headline text-xl font-bold text-gray-900 group-hover:text-tourOrange line-clamp-2 transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center gap-1 text-sm font-bold text-tourDarkBlue group-hover:text-tourOrange mt-2">
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
      </div>
    </section>
  );
}
