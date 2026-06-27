import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export interface NewsItem {
  slug: string;
  date: string;
  title: string;
  image: string;
}

export interface NewsDetail extends NewsItem {
  content: string;
  description: string;
  photographer: string | null;
}

const getNewsDirectory = () => path.join(process.cwd(), "news");

/**
 * Reads all news files from the "news" directory, parses their frontmatter,
 * and returns them sorted by date descending (newest first).
 */
export async function getAllNews(): Promise<NewsItem[]> {
  const postsDirectory = getNewsDirectory();
  const filenames = await fs.readdir(postsDirectory);
  const mdFiles = filenames.filter((filename) => filename.endsWith(".md"));
  
  const allPostsData = mdFiles.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      date: (matterResult.data.date as string) || "",
      title: (matterResult.data.title as string) || "",
      image: (matterResult.data.image as string) || "",
    };
  });

  const news = await Promise.all(allPostsData);
  
  return news.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Reads a single news file by slug, parses frontmatter and markdown body,
 * and returns the full news details with a generated description fallback.
 */
export async function getNewsBySlug(slug: string): Promise<NewsDetail> {
  const fullPath = path.join(getNewsDirectory(), slug + ".md");
  const fileContents = await fs.readFile(fullPath, "utf-8");
  const matterResult = matter(fileContents);
  
  const content = await remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);

  // Generate plain-text excerpt for metadata description
  const plainText = matterResult.content
    .replace(/[#*`_\[\]()\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const description = plainText.length > 155 
    ? plainText.substring(0, 155).trim() + "..." 
    : plainText;

  return {
    slug,
    content: content.toString(),
    description,
    date: (matterResult.data.date as string) || "",
    title: (matterResult.data.title as string) || "",
    image: (matterResult.data.image as string) || "",
    photographer: (matterResult.data.photographer as string) || null,
  };
}

/**
 * Returns a list of all news slugs. Helpful for static param generation.
 */
export async function getNewsSlugs(): Promise<string[]> {
  const postsDirectory = getNewsDirectory();
  const filenames = await fs.readdir(postsDirectory);
  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}
