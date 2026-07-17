import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appCss = readFileSync(`${process.cwd()}/src/app.css`, "utf8");
const indexHtml = readFileSync(`${process.cwd()}/index.html`, "utf8");

describe("Responsive Layout", () => {
  it("aktiviert das kompakte Layout schon auf Tablets", () => {
    expect(appCss).toContain("@media (max-width: 1024px)");
    expect(appCss).not.toContain("@media (max-width: 760px)");
  });

  it("lässt mobile Navigationseinträge schrumpfen", () => {
    const mobileLinkRule = appCss.match(/\.bottom-nav a \{[\s\S]*?\n  \}/)?.[0];

    expect(mobileLinkRule).toContain("min-width: 0");
    expect(mobileLinkRule).toContain("overflow: hidden");
  });

  it("enthält die notwendige Viewport-Angabe", () => {
    expect(indexHtml).toContain(
      'name="viewport" content="width=device-width, initial-scale=1.0"',
    );
  });
});
