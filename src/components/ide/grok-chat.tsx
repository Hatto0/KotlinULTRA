import { useState, type FormEvent } from "react";
import { ArrowUp, Bot } from "lucide-react";
import { askGrok } from "@/lib/ai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { languageOf, useIde, type ProviderId } from "@/store/ide";

const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "grok", label: "Grok" },
  { id: "openai", label: "OpenAI" },
  { id: "claude", label: "Claude" },
  { id: "openclaw", label: "OpenClaw" },
];

export function GrokPane() {
  const files = useIde((s) => s.files);
  const activePath = useIde((s) => s.activePath);
  const messages = useIde((s) => s.grokMessages);
  const busy = useIde((s) => s.grokBusy);
  const provider = useIde((s) => s.provider);
  const setProvider = useIde((s) => s.setProvider);
  const pushGrok = useIde((s) => s.pushGrok);
  const setBusy = useIde((s) => s.setGrokBusy);
  const updateFile = useIde((s) => s.updateFile);
  const [value, setValue] = useState("");

  async function send(prompt: string) {
    if (!prompt.trim() || busy) return;
    const file = files[activePath];
    pushGrok({ role: "user", content: prompt });
    setBusy(true);
    const history = [...messages, { role: "user" as const, content: prompt }].map((m) => ({
      role: m.role,
      content: m.content,
    }));
    const context = file
      ? `Active file: ${activePath} (${languageOf(activePath)})\n\n${file.content}`
      : undefined;
    const res = await askGrok({
      data: { prompt, context, mode: provider, history },
    });
    setBusy(false);
    if (!res.ok) {
      pushGrok({ role: "assistant", content: res.error });
      return;
    }
    pushGrok({ role: "assistant", content: res.text });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = value;
    setValue("");
    void send(p);
  }

  function applyLastCode() {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    if (!last) return;
    const block = last.content.match(/```(?:[\w+-]*)\n([\s\S]*?)```/);
    if (block?.[1]) updateFile(activePath, block[1].replace(/\n$/, ""));
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-surface">
      <div className="border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-muted" />
          <h2 className="font-display text-sm font-medium">Assistant</h2>
        </div>
        <p className="mt-1 text-2xs text-subtle">
          Runtime is Grok 4.5. Other providers are voice/tool profiles on the same engine.
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProvider(p.id)}
              className={cn(
                "h-7 rounded-full px-2.5 text-2xs",
                provider === p.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="ide-scroll min-h-0 flex-1 space-y-3 overflow-auto p-3">
        {messages.length === 0 ? (
          <p className="text-sm text-muted">
            Ask for a SwiftUI layout, a Compose refactor, or an explanation of the open file.
          </p>
        ) : null}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "rounded-[var(--radius-md)] px-3 py-2 text-sm leading-relaxed",
              m.role === "user" ? "bg-elevated text-fg" : "text-fg",
            )}
          >
            <div className="mb-1 text-2xs uppercase tracking-wide text-subtle">
              {m.role === "user" ? "You" : provider === "grok" ? "Grok" : provider}
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm">{m.content}</pre>
          </div>
        ))}
        {busy ? (
          <div className="h-4 w-32 rounded-full shimmer" aria-label="Thinking" />
        ) : null}
      </div>
      <div className="border-t border-border p-2">
        <div className="mb-2 flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => void send("Explain the open file like a senior mobile engineer.")}
          >
            Explain
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => void send("Refactor the open file for clarity. Return the full file in one code block.")}
          >
            Refactor
          </Button>
          <Button size="sm" variant="ghost" onClick={applyLastCode}>
            Apply
          </Button>
        </div>
        <form onSubmit={onSubmit} className="flex items-end gap-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask Grok…"
            rows={2}
            className="min-h-10 flex-1 resize-none rounded-[var(--radius-md)] bg-elevated px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
              }
            }}
          />
          <Button type="submit" size="icon" disabled={busy || !value.trim()} aria-label="Send">
            <ArrowUp />
          </Button>
        </form>
      </div>
    </div>
  );
}
