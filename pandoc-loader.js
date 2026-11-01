import { createPandocInstance } from
  "https://esm.sh/pandoc-wasm@1.1.0/src/core.js?bundle";


const style = ` 
/* Document layout */
:root {
  color-scheme: light;
  font-family:  "Segoe UI", Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.65;
  color: #242424;
  background: #fff;
}

* {
  box-sizing: border-box;
}

body {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 48px;
  background: #fff;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: #171717;
  line-height: 1.3;
  font-weight: 650;
  margin: 1.6em 0 0.6em;
  page-break-after: avoid;
}

h1 {
  font-size: 2em;
  border-bottom: 2px solid #e5e5e5;
  padding-bottom: 0.35em;
}

h2 {
  font-size: 1.55em;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.25em;
}

h3 { font-size: 1.25em; }
h4 { font-size: 1.1em; }

p {
  margin: 0.8em 0;
}

/* Links */
a {
  color: #2459a6;
  // text-decoration: none;
  overflow-wrap: anywhere;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.2em auto;
}

figure {
  margin: 1.2em 0;
  text-align: center;
}

figcaption {
  color: #666;
  font-size: 0.9em;
  margin-top: 0.4em;
}

/* Lists */
ul, ol {
  padding-left: 1.8em;
  margin: 0.8em 0;
}

li {
  margin: 0.25em 0;
}

/* Tables */
/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.2em 0;
  font-size: 0.95em;
  table-layout: auto;
}

th, td {
  border: 1px solid #d8d8d8;
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
  white-space: normal;
  word-break: normal;
  min-width: 50px;
}

th {
  background: #f3f4f6;
  font-weight: 650;
}

/* Code */
code, pre {
  font-family: "Cascadia Code", Consolas, monospace;
}

code {
  background: #f2f3f5;
  padding: 0.15em 0.35em;
  border-radius: 3px;
  font-size: 0.9em;
}

pre {
  background: #f5f6f8;
  border: 1px solid #e1e3e6;
  border-radius: 5px;
  padding: 14px 16px;
  overflow-x: auto;
  line-height: 1.5;
  font-size: 0.9em;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

pre code {
  background: none;
  padding: 0;
}

/* Quotes */
blockquote {
  margin: 1em 0;
  padding: 0.5em 1em;
  border-left: 4px solid #cbd5e1;
  background: #f8fafc;
  color: #4b5563;
}

/* Separators */
hr {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 2em 0;
}

/* Print */
@media print {
  @page {
    size: A4;
    margin: 18mm 16mm;
  }

  body {
    max-width: none;
    padding: 0;
    font-size: 10.5pt;
  }

  a {
    color: inherit;
  }

  img, figure, table, pre, blockquote {
    break-inside: avoid;
  }

  h1, h2, h3, h4 {
    break-after: avoid;
  }

  pre {
    white-space: pre-wrap;
  }
}
`

let pandocInstance;

export async function initialize(wasmBinary) {
  if (!pandocInstance) {
    pandocInstance = await createPandocInstance(wasmBinary);
  }
  return true;
}

function getMimeType(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  const types = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    avif: "image/avif",
    bmp: "image/bmp"
  };
  return types[ext] || "application/octet-stream";
}

function toBlob(data, filename) {
  const type = getMimeType(filename);

  if (data instanceof Blob) return data;

  if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    return new Blob([data], { type });
  }

  if (Array.isArray(data)) {
    return new Blob([new Uint8Array(data)], { type });
  }

  throw new Error(`Unsupported image data: ${filename}`);
}
function decodePath(path) {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function rewriteImageResources(markdown, imageFiles) {
  const files = {};
  const resources = new Map();

  for (const [path, data] of Object.entries(imageFiles)) {
    resources.set(path, data);
    resources.set(decodePath(path), data);
  }

  let index = 0;

  const converted = markdown.replace(
    /!\[([^\]]*)\]\(\s*(?:<([^>]+)>|([^)]+?))\s*\)/g,
    (match, alt, bracketedPath, plainPath) => {
      const path = (bracketedPath ?? plainPath).trim();
      const data = resources.get(path) ?? resources.get(decodePath(path));

      // Leave external or unresolved images unchanged.
      if (!data) return match;

      const extension = path.match(/\.[a-zA-Z0-9]+$/)?.[0] || ".bin";
      const filename = `__sb_image_${index++}${extension}`;

      files[filename] = toBlob(data, path);


      return `![${alt}](${filename})`;
    }
  );

  return { markdown: converted, files };
}
function escapeMarkdownDestination(path) {
  return `<${path.replace(/>/g, "%3E")}>`;
}

function convertWikiImageLinks(markdown) {
  const lines = markdown.split("\n");

  return lines.map(line => {
    // Convert ![[image.png]] to ![image.png](<image.png>)
    return line.replace(
      /!\[\[([^\]]+)\]\]/g,
      (_, path) => `![${path}](${escapeMarkdownDestination(path)})`
    );
  }).join("\n");
}

export async function markdownToHtml(
  markdown,
  title = "Document",
  imageFiles = {}
) {
  if (!pandocInstance) {
    throw new Error("Pandoc WASM has not been initialized");
  }

  const convertedMarkdown = convertWikiImageLinks(markdown);

  const {
    markdown: finalMarkdown,
    files
  } = rewriteImageResources(convertedMarkdown, imageFiles);


  const result = await pandocInstance.convert({
    from: "markdown-implicit_figures",
    to: "html",
    standalone: true,
    "embed-resources": true,
    metadata: { title }
  }, finalMarkdown, files);

  if (result.stderr) {
    console.warn("Pandoc:", result.stderr);
  }

  if (result.warnings?.length) {
    console.warn("Pandoc warnings:", result.warnings);
  }

  const html = result.stdout.replace("</head>",
    `<style>${style}</style>\n</head>`
  );
  return html;
}
