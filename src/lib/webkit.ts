export type PreviewKind = "ios" | "android" | "web" | "code";

export function extractQuotedTexts(source: string): string[] {
  const out: string[] = [];
  const re = /Text\(\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    if (m[1]) out.push(m[1]);
  }
  const kt = /Text\(\s*"([^"]+)"\s*,/g;
  while ((m = kt.exec(source))) {
    if (m[1] && !out.includes(m[1])) out.push(m[1]);
  }
  return out;
}

function page(inner: string, bg = "#07080c", fg = "#eceef2"): string {
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  html,body{margin:0;height:100%;background:${bg};color:${fg};
    font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif;}
  main{padding:28px;display:flex;flex-direction:column;gap:8px;min-height:100%;box-sizing:border-box;}
  .t0{font-size:15px;letter-spacing:.06em;text-transform:uppercase;opacity:.62;font-weight:500;}
  .t1{font-size:72px;line-height:1;letter-spacing:-.05em;font-weight:500;}
  .t2{font-size:22px;font-weight:500;}
  .row{display:flex;gap:16px;opacity:.8;margin-top:6px;}
  .chip{font-size:14px;}
</style></head><body><main>${inner}</main></body></html>`;
}

export function swiftuiToHtml(source: string): string {
  const texts = extractQuotedTexts(source);
  if (texts.length === 0) {
    return page(`<div class="t2">SwiftUI preview</div><div class="chip">Add Text("…") to render live.</div>`);
  }
  const [a, b, c, ...rest] = texts;
  const hero = b && /°|deg|temp/i.test(b) ? b : a;
  const city = hero === a ? (c ? a : a) : a;
  const cond = texts.find((t) => t !== city && t !== hero) ?? "";
  const extras = rest.filter((t) => t !== city && t !== hero && t !== cond);
  const inner = [
    city ? `<div class="t0">${escape(city)}</div>` : "",
    hero ? `<div class="t1">${escape(hero)}</div>` : "",
    cond ? `<div class="t2">${escape(cond)}</div>` : "",
    extras.length
      ? `<div class="row">${extras.map((t) => `<span class="chip">${escape(t)}</span>`).join("")}</div>`
      : "",
  ].join("");
  return page(inner);
}

export function composeToHtml(source: string): string {
  return swiftuiToHtml(source);
}

export function htmlDocument(source: string): string {
  const trimmed = source.trim();
  if (/^<!doctype/i.test(trimmed) || /^<html/i.test(trimmed)) return source;
  return page(source);
}

function escape(s: string) {
  return s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

export function previewKindFor(path: string, language: string): PreviewKind {
  if (path.endsWith(".swift") || language === "swift") return "ios";
  if (path.endsWith(".kt") && path.includes("/ui/")) return "android";
  if (path.endsWith(".html") || language === "html") return "web";
  if (path.endsWith(".xml") && path.includes("res/")) return "android";
  return "code";
}

export function documentForFile(path: string, content: string, language: string): string {
  const kind = previewKindFor(path, language);
  if (kind === "ios") return swiftuiToHtml(content);
  if (kind === "android" && language === "kotlin") return composeToHtml(content);
  if (kind === "web" || language === "html") return htmlDocument(content);
  return page(
    `<div class="t2">${escape(path.split("/").pop() ?? path)}</div>
     <div class="chip">No visual preview for this file. Run iOS or Android, or open an HTML / SwiftUI / Compose view.</div>`,
  );
}
