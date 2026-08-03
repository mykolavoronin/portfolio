import { existsSync, readFileSync } from "node:fs";

const requiredFiles = ["README.md", "LICENSE", "SECURITY.md", "CONTRIBUTING.md", "package.json"];
const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error(`Missing required repository files: ${missing.join(", ")}`);
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const scripts = packageJson.scripts ?? {};
const expectedScripts = ["dev", "build"];
const absentScripts = expectedScripts.filter((name) => !scripts[name]);

if (absentScripts.length > 0) {
  console.warn(`Optional project scripts not defined: ${absentScripts.join(", ")}`);
}

const riskyEnvironmentFiles = [".env", ".env.local", ".env.production"].filter((file) =>
  existsSync(file),
);
if (riskyEnvironmentFiles.length > 0) {
  console.warn(
    `Review tracked environment files and ensure they contain no secrets: ${riskyEnvironmentFiles.join(", ")}`,
  );
}

console.log(`Repository structure is healthy: ${packageJson.name ?? "unnamed package"}`);