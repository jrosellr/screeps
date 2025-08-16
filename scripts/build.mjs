import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/**/*.ts"],
  bundle: false,
  minify: false,
  format: "cjs",
  outdir: "dist",
});
