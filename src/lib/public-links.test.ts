import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const forbiddenUrl = /(?:https?:\/\/)?(?:[\w.-]+\.)?(?:github\.com|githubusercontent\.com|ghbtns\.com|star-history\.com)\//i;

function filesIn(directory: string, extension: string): string[] {
  return readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? filesIn(path, extension) : entry.name.endsWith(extension) ? [path] : [];
  });
}

const surfaces = [
  ...readdirSync(root).filter((name) => /^README.*\.md$/.test(name)),
  "index.html",
  "llms.txt",
  ...filesIn("docs", ".html"),
  ...filesIn("src/routes", ".svelte"),
  ...filesIn("src/components", ".svelte"),
  ...filesIn("browser-extension", ".html"),
];

describe("public presentation links", () => {
  it("does not expose GitHub URLs or hosted promotion widgets", () => {
    const offenders = surfaces.filter((path) => forbiddenUrl.test(readFileSync(resolve(root, path), "utf8")));
    expect(offenders).toEqual([]);
  });

  it("does not expose issue URLs in translated UI copy", () => {
    for (const path of filesIn("src/lib/i18n", ".json")) {
      expect(readFileSync(resolve(root, path), "utf8"), path).not.toMatch(forbiddenUrl);
    }
  });

  it("keeps functional update, changelog and announcement sources", () => {
    expect(readFileSync(resolve(root, "src-tauri/tauri.conf.json"), "utf8")).toContain(
      "https://github.com/OpenSelena/omniget/releases/latest/download/latest.json",
    );
    expect(readFileSync(resolve(root, "src/lib/stores/changelog-store.svelte.ts"), "utf8")).toContain(
      "https://api.github.com/repos/OpenSelena/omniget/releases/",
    );
    expect(readFileSync(resolve(root, "src/lib/stores/announcement-store.svelte.ts"), "utf8")).toContain(
      "https://raw.githubusercontent.com/OpenSelena/omniget/main/assets/announcements.json",
    );
  });
});
