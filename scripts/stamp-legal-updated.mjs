// Stamps the real "last updated" date for the legal pages into
// src/lib/legalUpdated.json, read from git — the only honest record of when
// that content actually changed.
//
// Wired to `prebuild`, so every Vercel deploy re-derives the dates and an edit
// to Privacy.tsx or Terms.tsx moves its own date without anyone remembering to.
//
// WHY NOT `new Date()`: a build-time timestamp would restamp both pages on
// every unrelated deploy, so the policy would claim it was revised today when
// nothing in it changed. On a legal page a stale-but-true date beats a fresh
// lie, so when git can't answer we keep the committed value instead.
//
// Chrome (LegalPage.tsx) is deliberately NOT tracked: restyling the wrapper is
// not a policy change and must not move the date.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "src/lib/legalUpdated.json");

const TRACKED = {
  privacy: "src/page-components/Privacy.tsx",
  terms: "src/page-components/Terms.tsx",
};

function lastCommitDate(file) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    // No git binary, or not a repository. Handled by the caller.
    return "";
  }
}

const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
const stamped = { ...existing };

for (const [key, file] of Object.entries(TRACKED)) {
  const date = lastCommitDate(file);
  if (date) {
    stamped[key] = date;
  } else if (stamped[key]) {
    // Expected on a shallow clone whose fetched commits didn't touch this file
    // — which also means the content did not change, so the committed value is
    // the correct answer, not a degraded one.
    console.warn(
      `[stamp-legal-updated] git returned no date for ${file}; keeping committed value ${stamped[key]}`,
    );
  } else {
    throw new Error(
      `[stamp-legal-updated] No git date for ${file} and no committed fallback in ${OUT}. ` +
        `Run this script in a full clone and commit the result.`,
    );
  }
}

fs.writeFileSync(OUT, `${JSON.stringify(stamped, null, 2)}\n`);
console.log("[stamp-legal-updated]", stamped);
