import { Metadata } from "next";
import { TITLE } from "@/data";
import { getBaseUrl } from "@/utils/url";

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  modifiedTime?: string;
}

/**
 * Shared helper to construct uniform metadata across all pages.
 */
export function constructMetadata({
  title,
  description = "🚀 Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende wird das Bungertstadion jedes Jahr zum Schauplatz für nationale und internationale Spitzenathleten.",
  path = "",
  image = "og-image.png",
  noIndex = false,
  type = "website",
  modifiedTime,
}: MetadataProps = {}): Metadata {
  const baseUrl = getBaseUrl();
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}/${image}`;
  const displayTitle = title ? title : TITLE;

  return {
    title: displayTitle,
    description,
    alternates: {
      canonical: path ? `${baseUrl}${path}` : undefined,
    },
    openGraph: {
      title: displayTitle,
      description,
      type,
      modifiedTime,
      url: `${baseUrl}${path}`,
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 1080,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    keywords: "Leichtathletik, Rehlingen, Pfingstsportfest, Bungertstadion",
  };
}
