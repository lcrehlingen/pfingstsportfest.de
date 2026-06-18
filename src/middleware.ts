import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, images, next-internals, sitemaps, and robots
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/sponsors") ||
    pathname.startsWith("/results") ||
    pathname.includes(".") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/news-sitemap.xml"
  ) {
    return;
  }

  // 2. If already on an English path, stop here
  const isEnglishPath = pathname.startsWith("/en") || pathname === "/en";
  if (isEnglishPath) {
    return;
  }

  // 3. Detect language preference
  // Check if there is an explicit locale cookie set (e.g. from an explicit language toggle)
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  let preferredLocale = localeCookie;

  if (!preferredLocale) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const enIndex = acceptLanguage.indexOf("en");
    const deIndex = acceptLanguage.indexOf("de");

    // If English exists in header and has a higher preference (or German is absent)
    if (enIndex !== -1 && (deIndex === -1 || enIndex < deIndex)) {
      preferredLocale = "en";
    } else {
      preferredLocale = "de";
    }
  }

  // 4. Redirect if preferred language is English
  if (preferredLocale === "en") {
    const targetUrl = new URL(`/en${pathname === "/" ? "" : pathname}`, request.url);
    const response = NextResponse.redirect(targetUrl);
    // Persist English preference so future hits don't need re-detection
    response.cookies.set("NEXT_LOCALE", "en", { path: "/" });
    return response;
  }
}

export const config = {
  matcher: [
    // Match all page routes
    "/((?!_next|api|.*\\.).*)"
  ],
};
