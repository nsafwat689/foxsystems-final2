// Loaded via `node --import` before any other module so the
// DEP0169 url.parse() deprecation warning emitted from upstream Express
// middleware (parseurl) is filtered out before it reaches the console.
process.removeAllListeners("warning");
process.on("warning", (warning) => {
  if (warning && warning.code === "DEP0169") return;
  console.warn((warning && warning.stack) || warning);
});
