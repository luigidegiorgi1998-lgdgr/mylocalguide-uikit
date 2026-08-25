// @tailwindcss/cli copies url() references in tokens.css into dist/styles.css
// verbatim. tokens.css's "../fonts/…" is correct relative to
// src/styles/tokens.css (fonts live in src/fonts/, a sibling of styles/),
// but dist/styles.css sits one directory shallower (dist/, a direct child
// of the package root), so the same "../fonts/…" string would resolve one
// level too high once compiled. This copies the font next to the compiled
// CSS and rewrites the reference to match.
import { cpSync, readFileSync, writeFileSync } from "node:fs";

cpSync("src/fonts", "dist/fonts", { recursive: true });

const cssPath = "dist/styles.css";
const css = readFileSync(cssPath, "utf8");
writeFileSync(cssPath, css.replaceAll("url(../fonts/", "url(./fonts/"));
