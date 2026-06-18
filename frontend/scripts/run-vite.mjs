import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const tempRoot = resolve(projectRoot, ".vite-temp");

mkdirSync(tempRoot, { recursive: true });

const require = createRequire(import.meta.url);
const vitePackageJson = require.resolve("vite/package.json");
const viteBin = resolve(dirname(vitePackageJson), "bin", "vite.js");
const args = process.argv.slice(2);

const child = spawn(process.execPath, [viteBin, ...args], {
  cwd: projectRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    TEMP: tempRoot,
    TMP: tempRoot,
    TMPDIR: tempRoot,
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
