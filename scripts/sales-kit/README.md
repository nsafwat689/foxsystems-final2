# Sales kit generator

Builds the Fox sales kit (one-pager PDF, demo script PDF, proposal .docx) for every product in English and Arabic.
Product facts and prices come from the site data, so regenerate after changing `solutions.ts` or `crmPlans.ts`.

1. Extract the data: copy `extract-data.ts` to `client/src/.kitdata.ts`, bundle it with esbuild
   (`--alias:@=./client/src --platform=node --format=esm`), run it and save the output as `data.json` next to `build.mjs`; delete the temp file.
2. In a folder with `docx`, `qrcode` and `pdf-lib` installed and Playwright available: `node build.mjs "<output folder>"`.

`sales.mjs` holds the selling copy (who to call, questions, demo flow, objections, follow-ups). Keep it to what the site says.
