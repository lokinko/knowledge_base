#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_OUTPUT_DIR = "sources/rednote";
const DEFAULT_MEDIA_DIR = "sources/media";
const DEFAULT_CATEGORY = "rednote";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

function usage() {
  return `Usage:
  node tools/rednote_importer.mjs <url-or-share-text> [...]
  node tools/rednote_importer.mjs --input sources/rednote_links.txt

Options:
  --input <file>          Read one Xiaohongshu share text or URL per line.
  --stdin                 Read share texts or URLs from stdin, one per line.
  --output <dir>          Markdown output directory. Default: ${DEFAULT_OUTPUT_DIR}
  --media <dir>           Local image directory. Default: ${DEFAULT_MEDIA_DIR}
  --category <name>       Frontmatter category. Default: ${DEFAULT_CATEGORY}
  --cookie <cookie>       Xiaohongshu cookie. Defaults to REDNOTE_COOKIE env var.
  --no-download-media     Keep remote image URLs in Markdown.
  --delay-ms <ms>         Delay between batch items. Default: 1000
  --dry-run               Fetch and parse, but do not write files.
  --help                  Show this help.
`;
}

function parseArgs(argv) {
  const options = {
    inputs: [],
    inputFile: null,
    readStdin: false,
    outputDir: DEFAULT_OUTPUT_DIR,
    mediaDir: DEFAULT_MEDIA_DIR,
    category: DEFAULT_CATEGORY,
    cookie: process.env.REDNOTE_COOKIE || "",
    downloadMedia: true,
    delayMs: 1000,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--input") {
      options.inputFile = requireValue(argv, ++i, arg);
    } else if (arg === "--stdin") {
      options.readStdin = true;
    } else if (arg === "--output") {
      options.outputDir = requireValue(argv, ++i, arg);
    } else if (arg === "--media") {
      options.mediaDir = requireValue(argv, ++i, arg);
    } else if (arg === "--category") {
      options.category = requireValue(argv, ++i, arg);
    } else if (arg === "--cookie") {
      options.cookie = requireValue(argv, ++i, arg);
    } else if (arg === "--no-download-media") {
      options.downloadMedia = false;
    } else if (arg === "--delay-ms") {
      const value = Number(requireValue(argv, ++i, arg));
      if (!Number.isFinite(value) || value < 0) {
        throw new Error("--delay-ms must be a non-negative number");
      }
      options.delayMs = value;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      options.inputs.push(arg);
    }
  }

  return options;
}

function requireValue(argv, index, option) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${option} requires a value`);
  }
  return value;
}

async function collectInputs(options) {
  const inputs = [...options.inputs];

  if (options.inputFile) {
    const text = await fs.readFile(options.inputFile, "utf8");
    inputs.push(...splitInputLines(text));
  }

  if (options.readStdin) {
    const text = await readStdin();
    inputs.push(...splitInputLines(text));
  }

  return inputs.map((value) => value.trim()).filter(Boolean);
}

function splitInputLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

function extractRednoteUrl(text) {
  const mobileMatch = text.match(/https?:\/\/xhslink\.com\/(?:a|o)?\/[^\s,，)）]+/i);
  if (mobileMatch) {
    return mobileMatch[0];
  }

  const webMatch = text.match(
    /https:\/\/www\.xiaohongshu\.com\/(?:discovery\/item|explore)\/[a-zA-Z0-9]+(?:\?[^\s,，)）]*)?/i,
  );
  if (webMatch) {
    return webMatch[0].replace("/explore/", "/discovery/item/");
  }

  return null;
}

function normalizeRednoteWebUrl(url) {
  return String(url || "").replace("/explore/", "/discovery/item/");
}

async function importOne(rawInput, options) {
  const requestedUrl = extractRednoteUrl(rawInput);
  if (!requestedUrl) {
    throw new Error(`No valid Xiaohongshu URL found: ${rawInput}`);
  }

  const fetched = await fetchText(requestedUrl, options);
  const canonicalUrl = normalizeRednoteWebUrl(fetched.finalUrl || requestedUrl);
  const html = fetched.text;
  const note = parseNote(html, canonicalUrl);
  if (!note.title && !note.content && note.images.length === 0) {
    throw new Error("Parsed note is empty. The page may require login or a valid cookie.");
  }

  const outputDir = path.resolve(options.outputDir);
  const mediaDir = path.resolve(options.mediaDir);
  const now = new Date();
  const importDate = toLocalDate(now);
  const safeTitle = sanitizeMarkdownFilename(note.title || "Untitled Xiaohongshu Note");
  const mediaBaseName = sanitizeAssetFilename(note.title || note.noteId || "rednote");
  const notePath = await uniquePath(path.join(outputDir, `${safeTitle}.md`));

  const imageRefs = [];
  if (options.downloadMedia && note.images.length > 0 && !options.dryRun) {
    await fs.mkdir(mediaDir, { recursive: true });
    for (let i = 0; i < note.images.length; i += 1) {
      const downloaded = await downloadImage(note.images[i], mediaDir, mediaBaseName, i, options);
      imageRefs.push(toMarkdownRelativePath(path.dirname(notePath), downloaded.filePath));
    }
  } else {
    imageRefs.push(...note.images);
  }

  const markdown = renderMarkdown(note, {
    sourceUrl: requestedUrl,
    canonicalUrl,
    importedAt: now,
    importDate,
    category: options.category,
    imageRefs,
    downloadMedia: options.downloadMedia,
  });

  if (options.dryRun) {
    return {
      sourceUrl: requestedUrl,
      canonicalUrl,
      notePath,
      title: note.title,
      imageCount: note.images.length,
      written: false,
    };
  }

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(notePath, markdown, "utf8");

  return {
    sourceUrl: requestedUrl,
    canonicalUrl,
    notePath,
    title: note.title,
    imageCount: note.images.length,
    written: true,
  };
}

async function fetchText(url, options) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: makeHeaders(options),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${url}`);
  }
  return {
    text: await response.text(),
    finalUrl: response.url,
  };
}

function makeHeaders(options) {
  const headers = {
    "user-agent": USER_AGENT,
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    referer: "https://www.xiaohongshu.com/",
  };
  if (options.cookie) {
    headers.cookie = options.cookie;
  }
  return headers;
}

function parseNote(html, sourceUrl) {
  const state = parseInitialState(html);
  const note = extractStateNote(state);
  const title = cleanText(note?.title || extractTitle(html));
  const content = cleanContent(note?.desc || extractContentFromHtml(html));
  const images = extractImages(note);
  const tags = extractTags(note, content);
  const videoUrl = extractVideoUrl(note);
  const noteId = note?.id || note?.noteId || extractNoteId(sourceUrl);
  const type = note?.type || (videoUrl ? "video" : "normal");

  return {
    title: title || "Untitled Xiaohongshu Note",
    content,
    images,
    tags,
    videoUrl,
    noteId,
    type,
  };
}

function parseInitialState(html) {
  const match = html.match(/window\.__INITIAL_STATE__\s*=\s*([\s\S]*?)<\/script>/);
  if (!match) {
    return null;
  }

  let raw = match[1].trim();
  raw = raw.replace(/;+\s*$/, "");
  raw = raw.replace(/\bundefined\b/g, "null");

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function extractStateNote(state) {
  const detailMap = state?.note?.noteDetailMap;
  if (!detailMap || typeof detailMap !== "object") {
    return null;
  }

  const firstKey = Object.keys(detailMap)[0];
  const detail = detailMap[firstKey];
  return detail?.note || detail || null;
}

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(match[1]).replace(/\s*-\s*小红书\s*$/, "") : "";
}

function extractContentFromHtml(html) {
  const match = html.match(/<div[^>]+id=["']detail-desc["'][^>]*>([\s\S]*?)<\/div>/i);
  if (!match) {
    return "";
  }
  return decodeHtml(match[1].replace(/<[^>]+>/g, ""));
}

function extractImages(note) {
  const imageList = Array.isArray(note?.imageList) ? note.imageList : [];
  const urls = [];

  for (const image of imageList) {
    const candidates = [
      image?.urlDefault,
      image?.urlPre,
      image?.url,
      ...(Array.isArray(image?.infoList) ? image.infoList.map((item) => item?.url) : []),
    ];
    const url = candidates.find((candidate) => typeof candidate === "string" && candidate.startsWith("http"));
    if (url) {
      urls.push(url);
    }
  }

  return [...new Set(urls)];
}

function extractVideoUrl(note) {
  const stream = note?.video?.media?.stream;
  const h264 = Array.isArray(stream?.h264) ? stream.h264 : [];
  const h265 = Array.isArray(stream?.h265) ? stream.h265 : [];
  const first = [...h264, ...h265].find(Boolean);
  return first?.masterUrl || first?.backupUrls?.[0] || null;
}

function extractTags(note, content) {
  const fromList = Array.isArray(note?.tagList)
    ? note.tagList.map((tag) => tag?.name || tag?.tagName).filter(Boolean)
    : [];
  const fromContent = [...content.matchAll(/#([^\s#]+)/g)].map((match) => match[1]);
  return [...new Set([...fromList, ...fromContent].map((tag) => cleanText(tag)).filter(Boolean))];
}

function cleanContent(text) {
  return cleanText(text)
    .replace(/\[话题\]/g, "")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\r\n/g, "\n")
    .trim();
}

function cleanText(text) {
  return decodeHtml(String(text || ""))
    .replace(/\u0000/g, "")
    .trim();
}

function decodeHtml(text) {
  return String(text || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

async function downloadImage(url, mediaDir, baseName, index, options) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: makeHeaders(options),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while downloading image ${url}`);
  }

  const contentType = response.headers.get("content-type") || "";
  const extension = extensionFromContentType(contentType) || extensionFromUrl(url) || ".jpg";
  const targetPath = await uniquePath(path.join(mediaDir, `${baseName}-${index}-${Date.now()}${extension}`));
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(targetPath, buffer);
  return { filePath: targetPath, contentType };
}

function extensionFromContentType(contentType) {
  if (contentType.includes("image/jpeg")) return ".jpg";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("image/webp")) return ".webp";
  if (contentType.includes("image/gif")) return ".gif";
  return "";
}

function extensionFromUrl(url) {
  const match = url.match(/\.(jpg|jpeg|png|webp|gif)(?:[?#]|$)/i);
  if (!match) return "";
  return `.${match[1].toLowerCase().replace("jpeg", "jpg")}`;
}

function renderMarkdown(note, context) {
  const imageAssets = context.imageRefs.filter((ref) => !/^https?:\/\//i.test(ref));
  const frontmatter = [
    "---",
    `title: ${yamlString(note.title)}`,
    `source: ${yamlString(context.sourceUrl)}`,
    context.canonicalUrl && context.canonicalUrl !== context.sourceUrl
      ? `canonical_url: ${yamlString(context.canonicalUrl)}`
      : "",
    `platform: "xiaohongshu"`,
    `type: "source-note"`,
    `status: "new"`,
    `date: ${yamlString(context.importDate)}`,
    `imported_at: ${yamlString(toLocalDateTime(context.importedAt))}`,
    `category: ${yamlString(context.category)}`,
    `note_id: ${yamlString(note.noteId || "")}`,
    `note_type: ${yamlString(note.type || "")}`,
    `downloaded_media: ${context.downloadMedia ? "true" : "false"}`,
    `tags: ${yamlInlineList(["Rednote", "Xiaohongshu", ...note.tags])}`,
    imageAssets.length > 0 ? `assets: ${yamlInlineList(imageAssets)}` : "assets: []",
    "---",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  const parts = [frontmatter, `# ${note.title}`, ""];
  parts.push(`> 来源：${context.sourceUrl}`, "");

  if (note.content) {
    parts.push("## 正文", "", note.content, "");
  }

  if (note.tags.length > 0) {
    parts.push("## 标签", "", note.tags.map((tag) => `#${tag}`).join(" "), "");
  }

  if (note.videoUrl) {
    parts.push("## 视频", "", `[视频链接](${note.videoUrl})`, "");
  }

  if (context.imageRefs.length > 0) {
    parts.push("## 图片", "");
    for (const ref of context.imageRefs) {
      parts.push(`![Image](${ref})`);
    }
    parts.push("");
  }

  return `${parts.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

function yamlString(value) {
  return JSON.stringify(String(value || ""));
}

function yamlInlineList(values) {
  const unique = [...new Set(values.filter(Boolean).map(String))];
  return `[${unique.map((value) => JSON.stringify(value)).join(", ")}]`;
}

function sanitizeMarkdownFilename(value) {
  const sanitized = String(value || "")
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  return (sanitized || "Untitled Xiaohongshu Note").slice(0, 80);
}

function sanitizeAssetFilename(value) {
  const sanitized = String(value || "")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\s_-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
  return (sanitized || "rednote").slice(0, 60);
}

async function uniquePath(filePath) {
  const parsed = path.parse(filePath);
  let candidate = filePath;
  let suffix = 2;
  while (await exists(candidate)) {
    candidate = path.join(parsed.dir, `${parsed.name}-${suffix}${parsed.ext}`);
    suffix += 1;
  }
  return candidate;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toMarkdownRelativePath(fromDir, targetPath) {
  return path.relative(fromDir, targetPath).split(path.sep).join("/");
}

function toLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalDateTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${toLocalDate(date)} ${hours}:${minutes}:${seconds}`;
}

function extractNoteId(url) {
  const match = url.match(/\/(?:discovery\/item|explore)\/([a-zA-Z0-9]+)/);
  return match ? match[1] : "";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const inputs = await collectInputs(options);
  if (inputs.length === 0) {
    throw new Error(`No input provided.\n\n${usage()}`);
  }

  const results = [];
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    try {
      const result = await importOne(input, options);
      results.push(result);
      const action = result.written ? "wrote" : "parsed";
      console.log(`[${i + 1}/${inputs.length}] ${action}: ${result.notePath}`);
      console.log(`  title: ${result.title}`);
      console.log(`  images: ${result.imageCount}`);
    } catch (error) {
      console.error(`[${i + 1}/${inputs.length}] failed: ${error.message}`);
      results.push({ error });
    }

    if (i < inputs.length - 1 && options.delayMs > 0) {
      await delay(options.delayMs);
    }
  }

  const failed = results.filter((result) => result.error).length;
  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
