export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Parses article HTML content to:
 * 1. Extract <h2> and <h3> headings.
 * 2. Assign clean, unique, slugified `id` attributes.
 * 3. Append anchor links for Google "Jump To" indexing and deep-linking.
 */
export function processArticleContent(rawHtml: string): {
  processedHtml: string;
  headings: HeadingItem[];
} {
  if (!rawHtml) return { processedHtml: "", headings: [] };

  const headings: HeadingItem[] = [];
  const slugCounts: Record<string, number> = {};

  const processedHtml = rawHtml.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h\1>/gi,
    (match, levelStr, attrs, innerContent) => {
      const level = parseInt(levelStr, 10);
      
      // Strip any inner HTML tags (e.g., <strong>, <span>, <a>) to get clean plain text
      const plainText = innerContent.replace(/<[^>]+>/g, "").trim();
      if (!plainText) return match;

      let baseSlug = plainText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      if (!baseSlug) {
        baseSlug = `section-${headings.length + 1}`;
      }

      let slug = baseSlug;
      if (slugCounts[slug] !== undefined) {
        slugCounts[slug]++;
        slug = `${baseSlug}-${slugCounts[baseSlug]}`;
      } else {
        slugCounts[slug] = 0;
      }

      headings.push({ id: slug, text: plainText, level });

      // Clean existing id if present in attrs
      const cleanedAttrs = attrs.replace(/\s*id=["'][^"']*["']/i, "");

      return `<h${level}${cleanedAttrs} id="${slug}" class="scroll-mt-24 group relative">${innerContent}<a href="#${slug}" class="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700 ml-2 text-base select-none no-underline font-normal inline-block" aria-label="Link to section: ${plainText}" title="Direct link to this section">#</a></h${level}>`;
    }
  );

  return { processedHtml, headings };
}
