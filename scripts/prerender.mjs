/**
 * Static prerender script.
 * Run after `vite build` and `vite build --ssr`:
 *   node scripts/prerender.mjs
 *
 * Reads dist/index.html as a template, renders each route with React's
 * renderToString, injects the HTML, and writes per-route index.html files.
 * Google (and every other crawler) then receives real content without
 * needing to execute JavaScript.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Update SITE_URL to the production domain before deploying.
const SITE_URL = "https://heartlandpleinair.org";

const routes = [
  {
    path: "/",
    title: "Heartland Plein Air Arts Festival | September 13–19, 2026",
    description:
      "Experience 25 nationally recognized artists painting the beauty of Douglas & Sarpy County at the Heartland Plein Air Arts Festival, September 13–19, 2026.",
  },
  {
    path: "/about",
    title: "About | Heartland Plein Air Arts Festival",
    description:
      "Learn about the Heartland Plein Air Arts Festival — a week of outdoor painting across Douglas and Sarpy County, September 13–19, 2026.",
  },
  {
    path: "/schedule",
    title: "Schedule of Events | Heartland Plein Air Arts Festival",
    description:
      "Full schedule for the Heartland Plein Air Arts Festival, September 12–October 2, 2026 across the Omaha metro.",
  },
  {
    path: "/artists",
    title: "Artists | Heartland Plein Air Arts Festival",
    description:
      "Meet the 25 nationally recognized artists invited to paint the Omaha metro during the Heartland Plein Air Arts Festival, September 13–19, 2026.",
  },
  {
    path: "/faq",
    title: "FAQ | Heartland Plein Air Arts Festival",
    description:
      "Answers to frequently asked questions about the Heartland Plein Air Arts Festival — admission, artists, artwork purchasing, and more.",
  },
  {
    path: "/gallery",
    title: "Gallery | Heartland Plein Air Arts Festival",
    description:
      "Browse paintings by all 23 artists in the Heartland Plein Air Arts Festival, September 13–19, 2026.",
  },
];

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

async function prerender() {
  const serverEntry = path.resolve(root, "dist/server/entry-server.js");
  if (!fs.existsSync(serverEntry)) {
    throw new Error(
      `Server entry not found at ${serverEntry}.\n` +
        "Run: vite build --ssr src/entry-server.tsx --outDir dist/server",
    );
  }

  const { render } = await import(serverEntry);
  const template = fs.readFileSync(
    path.resolve(root, "dist/index.html"),
    "utf-8",
  );

  for (const route of routes) {
    let appHtml;
    try {
      appHtml = render(route.path);
    } catch (err) {
      console.error(`Error rendering ${route.path}:`, err);
      process.exit(1);
    }

    const canonical = `${SITE_URL}${route.path === "/" ? "" : route.path}`;

    let html = template
      // Inject rendered app HTML
      .replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`,
      )
      // Update <title>
      .replace(
        /<title>[^<]*<\/title>/,
        `<title>${route.title}</title>`,
      )
      // Update meta description
      .replace(
        /<meta name="description" content="[^"]*">/,
        `<meta name="description" content="${escapeAttr(route.description)}">`,
      )
      // Inject / update canonical link before </head>
      .replace(
        /<link rel="canonical"[^>]*>/,
        "",
      )
      .replace(
        "</head>",
        `  <link rel="canonical" href="${canonical}" />\n</head>`,
      );

    const outDir =
      route.path === "/"
        ? path.resolve(root, "dist")
        : path.resolve(root, `dist${route.path}`);

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
    console.log(`  ✓ ${route.path}`);
  }
}

console.log("Prerendering routes...");
prerender()
  .then(() => console.log("Done."))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
