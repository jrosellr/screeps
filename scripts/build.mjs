import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/**/*.ts"],
  bundle: true,
  minify: false,
  format: "esm",
  outdir: "dist",
});
