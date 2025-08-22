import { build } from "esbuild";
import * as fs from "fs/promises";

const tsconfigText = await fs.readFile("tsconfig.json", {
  encoding: "utf-8",
  flag: "r",
});

const tsconfig = JSON.parse(tsconfigText);

await build({
  entryPoints: ["src/main.ts"],
  target: tsconfig.target,
  bundle: true,
  minify: false,
  format: "cjs",
  outdir: "dist",
});
