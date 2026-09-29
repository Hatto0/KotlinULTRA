const KEYWORDS: Record<string, string[]> = {
  kotlin: [
    "abstract", "actual", "annotation", "as", "break", "by", "catch", "class",
    "companion", "const", "constructor", "continue", "crossinline", "data",
    "delegate", "do", "else", "enum", "expect", "external", "false", "final",
    "finally", "for", "fun", "get", "if", "import", "in", "infix", "init",
    "inline", "inner", "interface", "internal", "is", "lateinit", "noinline",
    "null", "object", "open", "operator", "out", "override", "package",
    "private", "protected", "public", "reified", "return", "sealed", "set",
    "super", "suspend", "tailrec", "this", "throw", "true", "try", "typealias",
    "typeof", "val", "var", "vararg", "when", "where", "while",
  ],
  swift: [
    "associatedtype", "actor", "as", "async", "await", "break", "case", "catch",
    "class", "continue", "convenience", "default", "defer", "deinit", "do",
    "else", "enum", "extension", "fallthrough", "false", "fileprivate", "final",
    "for", "func", "get", "guard", "if", "import", "in", "indirect", "infix",
    "init", "inout", "internal", "is", "lazy", "let", "mutating", "nil",
    "nonisolated", "open", "operator", "optional", "override", "postfix",
    "precedencegroup", "prefix", "private", "protocol", "public", "repeat",
    "required", "rethrows", "return", "self", "Self", "set", "some", "static",
    "struct", "subscript", "super", "switch", "throw", "throws", "true", "try",
    "typealias", "var", "weak", "where", "while", "willSet", "didSet",
  ],
  gradle: [
    "plugins", "id", "android", "kotlin", "dependencies", "implementation",
    "api", "testImplementation", "classpath", "apply", "true", "false",
    "repositories", "google", "mavenCentral", "version", "applicationId",
  ],
  xml: [],
  json: ["true", "false", "null"],
  js: [
    "async", "await", "break", "case", "catch", "class", "const", "continue",
    "debugger", "default", "delete", "do", "else", "export", "extends", "false",
    "finally", "for", "function", "if", "import", "in", "instanceof", "let",
    "new", "null", "return", "static", "super", "switch", "this", "throw",
    "true", "try", "typeof", "var", "void", "while", "with", "yield",
  ],
  ts: [
    "as", "async", "await", "break", "case", "catch", "class", "const",
    "continue", "declare", "default", "delete", "do", "else", "enum", "export",
    "extends", "false", "finally", "for", "from", "function", "if", "implements",
    "import", "in", "infer", "instanceof", "interface", "keyof", "let", "new",
    "null", "of", "private", "protected", "public", "readonly", "return",
    "static", "super", "switch", "this", "throw", "true", "try", "type",
    "typeof", "var", "void", "while", "with", "yield",
  ],
  html: [],
  css: ["important", "from", "to"],
  md: [],
  plist: [],
  sh: [
    "if", "then", "else", "fi", "for", "do", "done", "in", "while", "case",
    "esac", "function", "return", "export", "local", "true", "false",
  ],
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

function langKey(language: string): string {
  const l = language.toLowerCase();
  if (l === "kotlin" || l === "kt" || l === "kts") return "kotlin";
  if (l === "swift") return "swift";
  if (l === "gradle" || l === "kts-gradle") return "gradle";
  if (l === "xml" || l === "plist") return l === "plist" ? "plist" : "xml";
  if (l === "json") return "json";
  if (l === "javascript" || l === "js") return "js";
  if (l === "typescript" || l === "ts" || l === "tsx") return "ts";
  if (l === "html") return "html";
  if (l === "css") return "css";
  if (l === "markdown" || l === "md") return "md";
  if (l === "bash" || l === "sh" || l === "zsh") return "sh";
  return l;
}

export function languageFromPath(path: string): string {
  const name = path.split("/").pop() ?? path;
  if (name.endsWith(".kt") || name.endsWith(".kts")) return "kotlin";
  if (name.endsWith(".swift")) return "swift";
  if (name.endsWith(".xml")) return "xml";
  if (name.endsWith(".plist")) return "plist";
  if (name.endsWith(".json")) return "json";
  if (name.endsWith(".html") || name.endsWith(".htm")) return "html";
  if (name.endsWith(".css")) return "css";
  if (name.endsWith(".md")) return "md";
  if (name.endsWith(".ts") || name.endsWith(".tsx")) return "ts";
  if (name.endsWith(".js") || name.endsWith(".jsx")) return "js";
  if (name.endsWith(".gradle")) return "gradle";
  if (name.endsWith(".sh")) return "sh";
  return "text";
}

function wrap(cls: string, text: string) {
  return `<span class="${cls}">${text}</span>`;
}

function highlightCodeLine(line: string, language: string): string {
  const key = langKey(language);
  if (key === "md") {
    if (line.startsWith("#")) return wrap("tok-kw", escapeHtml(line));
    return escapeHtml(line).replace(
      /`([^`]+)`/g,
      (_m, g1: string) => wrap("tok-str", "`" + g1 + "`"),
    );
  }
  if (key === "xml" || key === "html" || key === "plist") {
    return escapeHtml(line)
      .replace(/(<\/?[\w:-]+)/g, (m) => wrap("tok-kw", m))
      .replace(/([\w:-]+)=/g, (m) => wrap("tok-attr", m.slice(0, -1)) + "=")
      .replace(/(".*?"|&#39;.*?&#39;)/g, (m) => wrap("tok-str", m));
  }

  const keywords = new Set(KEYWORDS[key] ?? KEYWORDS.kotlin);
  let i = 0;
  let out = "";
  const n = line.length;

  while (i < n) {
    const rest = line.slice(i);

    if (rest.startsWith("//") || (key === "sh" && rest.startsWith("#"))) {
      out += wrap("tok-cm", escapeHtml(line.slice(i)));
      break;
    }
    if (rest.startsWith("/*")) {
      const end = line.indexOf("*/", i + 2);
      const endAt = end === -1 ? n : end + 2;
      out += wrap("tok-cm", escapeHtml(line.slice(i, endAt)));
      i = endAt;
      continue;
    }

    const str = rest.match(/^("""[\s\S]*?"""|"(?:\\.|[^"\\])*(?:"|$)|'(?:\\.|[^'\\])*(?:'|$))/);
    if (str) {
      out += wrap("tok-str", escapeHtml(str[0]));
      i += str[0].length;
      continue;
    }

    const num = rest.match(/^\b\d[\d_]*(\.\d+)?[fFL]?\b/);
    if (num) {
      out += wrap("tok-num", num[0]);
      i += num[0].length;
      continue;
    }

    const ident = rest.match(/^[A-Za-z_@$][\w$]*/);
    if (ident) {
      const w = ident[0];
      const nextNonSpace = line.slice(i + w.length).match(/^\s*(\(|\{)/);
      if (keywords.has(w)) out += wrap("tok-kw", escapeHtml(w));
      else if (/^[A-Z]/.test(w)) out += wrap("tok-type", escapeHtml(w));
      else if (nextNonSpace) out += wrap("tok-fn", escapeHtml(w));
      else out += escapeHtml(w);
      i += w.length;
      continue;
    }

    const punct = rest[0];
    if (punct && "{}[]().,;:".includes(punct)) {
      out += wrap("tok-punct", escapeHtml(punct));
      i += 1;
      continue;
    }

    out += escapeHtml(punct ?? "");
    i += 1;
  }
  return out;
}

export function highlight(source: string, language: string): string {
  return source
    .split("\n")
    .map((line) => highlightCodeLine(line, language) || " ")
    .join("\n");
}
