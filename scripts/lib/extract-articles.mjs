/**
 * Pulls per-article metadata out of pages/ArticleDetail.tsx for the prerender.
 *
 * The articles' titles, dates and images live in that file next to their body
 * content. Copying them into a second data module would give two sources that
 * drift, so this reads the original instead: it slices out the articleContent
 * object literal and evaluates it. The literal holds only strings and template
 * literals, no JSX and no imports, so it evaluates standalone.
 *
 * It validates what it got and throws rather than returning something partly
 * wrong — a prerender that silently emits half the articles with blank titles
 * would be worse than not prerendering them at all.
 */
import fs from "node:fs";
import path from "node:path";

const SRC = path.join("client", "src", "pages", "ArticleDetail.tsx");
const MARKER = "const articleContent";

export function extractArticles() {
  const source = fs.readFileSync(SRC, "utf8");

  const declStart = source.indexOf(MARKER);
  if (declStart === -1) throw new Error(`${SRC}: "${MARKER}" not found — has the file been restructured?`);

  const objStart = source.indexOf("{", source.indexOf("=", declStart));
  if (objStart === -1) throw new Error(`${SRC}: could not find the start of the articleContent object`);

  // Walk to the matching brace, skipping over string and template literals so
  // a "{" inside article body HTML does not end the scan early.
  let depth = 0;
  let i = objStart;
  let quote = null;
  for (; i < source.length; i++) {
    const c = source[i];
    const prev = source[i - 1];
    if (quote) {
      if (c === quote && prev !== "\\") quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { quote = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) { i++; break; }
    }
  }
  if (depth !== 0) throw new Error(`${SRC}: unbalanced braces while scanning articleContent`);

  const literal = source.slice(objStart, i);

  let data;
  try {
    // eslint-disable-next-line no-new-func
    data = new Function(`"use strict"; return (${literal});`)();
  } catch (err) {
    throw new Error(`${SRC}: articleContent did not evaluate as a plain object — ${err.message}`);
  }

  const ids = Object.keys(data);
  if (ids.length === 0) throw new Error(`${SRC}: articleContent evaluated to an empty object`);

  const out = [];
  for (const id of ids) {
    for (const lang of ["en", "ar"]) {
      const a = data[id]?.[lang];
      if (!a) throw new Error(`${SRC}: article "${id}" has no "${lang}" entry`);
      for (const field of ["title", "image", "date"]) {
        if (!a[field]) throw new Error(`${SRC}: article "${id}" (${lang}) is missing "${field}"`);
      }
      out.push({
        id,
        language: lang,
        title: a.title,
        subtitle: a.subtitle || a.title,
        image: a.image,
        date: a.date,
        category: a.category || "",
      });
    }
  }

  return { count: ids.length, articles: out };
}
