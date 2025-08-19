await Bun.build({
  entrypoints: ["src/main.ts"],
  minify: false,
  format: "cjs",
  outdir: "dist",
});
