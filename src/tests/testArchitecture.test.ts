import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

// Der Test läuft rekursiv durch src. So rutscht später nicht aus Versehen wieder ein Test
// neben eine Komponente oder einen Hook, obwohl wir einen gemeinsamen Testordner vereinbart haben.
const findTestFiles = (directory: string): string[] =>
  readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return findTestFiles(path);
    return /\.test\.tsx?$/.test(entry) ? [relative(process.cwd(), path)] : [];
  });

describe("Testarchitektur", () => {
  it("hält alle Vitest-Dateien gemeinsam unter src/tests", () => {
    const misplaced = findTestFiles(join(process.cwd(), "src")).filter(
      (path) => !path.startsWith("src/tests/"),
    );

    expect(misplaced).toEqual([]);
  });
});
