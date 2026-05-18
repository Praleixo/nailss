import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const publicDir = path.join(root, "public");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await cp(path.join(root, "index.html"), path.join(dist, "index.html"));
await cp(path.join(root, "assets"), path.join(dist, "assets"), {
  recursive: true
});

if (existsSync(publicDir)) {
  await cp(publicDir, dist, {
    recursive: true,
    force: true
  });
}

console.log("Static site generated in dist/");
