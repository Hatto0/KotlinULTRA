import { useEffect, useRef, useState, type FormEvent } from "react";
import { promptLines, runKali } from "@/lib/kali";
import { useIde } from "@/store/ide";

export function TerminalPane() {
  const kali = useIde((s) => s.kali);
  const setKali = useIde((s) => s.setKali);
  const lines = useIde((s) => s.termLines);
  const pushTerm = useIde((s) => s.pushTerm);
  const clearTerm = useIde((s) => s.clearTerm);
  const [value, setValue] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const p = promptLines(kali);

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [lines.length]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const cmd = value;
    setValue("");
    const rendered = `┌──(${p.userHost})-[${p.path}]\n└─$ ${cmd}`;
    pushTerm({ kind: "in", text: rendered });
    const result = runKali(kali, cmd);
    setKali(result.state);
    if (result.lines[0] === "__CLEAR__") {
      clearTerm();
      return;
    }
    if (result.lines.length) {
      pushTerm({
        kind: result.kind,
        text: result.lines.join("\n"),
      });
    }
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col bg-bg"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-border px-3">
        <span className="font-mono text-2xs tracking-wide text-muted">
          kali@{kali.host} · {kali.version}
        </span>
        <button
          type="button"
          className="text-2xs text-muted hover:text-fg"
          onClick={() => clearTerm()}
        >
          Clear
        </button>
      </div>
      <div className="ide-scroll min-h-0 flex-1 overflow-auto px-3 py-2 font-mono text-xs leading-5">
        {lines.map((l) => (
          <pre
            key={l.id}
            className={
              l.kind === "err"
                ? "whitespace-pre-wrap text-danger"
                : l.kind === "in"
                  ? "whitespace-pre-wrap text-fg"
                  : l.kind === "sys"
                    ? "whitespace-pre-wrap text-muted"
                    : "whitespace-pre-wrap text-muted"
            }
          >
            {l.kind === "in" ? (
              <KaliPrompt text={l.text} />
            ) : (
              l.text
            )}
          </pre>
        ))}
        <form onSubmit={submit} className="mt-1">
          <div className="text-xs">
            <span className="kali-prompt-user">┌──(</span>
            <span className="kali-prompt-user">{p.userHost}</span>
            <span className="kali-prompt-user">)-[</span>
            <span className="kali-prompt-path">{p.path}</span>
            <span className="kali-prompt-user">]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="kali-prompt-user">└─$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-fg outline-none"
              aria-label="Kali command"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </form>
        <div ref={bottom} />
      </div>
    </div>
  );
}

function KaliPrompt({ text }: { text: string }) {
  const idx = text.indexOf("└─$");
  const head = idx >= 0 ? text.slice(0, idx) : text;
  const tail = idx >= 0 ? text.slice(idx) : "";
  return (
    <>
      <span className="kali-prompt-user">{head}</span>
      {tail ? <span className="text-fg">{tail}</span> : null}
    </>
  );
}
