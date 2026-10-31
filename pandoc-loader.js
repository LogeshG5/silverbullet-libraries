import { createPandocInstance } from
  "https://esm.sh/pandoc-wasm@1.1.0/src/core.js?bundle";

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

  return result.stdout;
}
