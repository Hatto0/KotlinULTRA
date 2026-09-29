import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useIde, type ViewId } from "@/store/ide";

const ACTIONS: { id: string; label: string; run: (ctx: ReturnType<typeof useIde.getState>) => void }[] = [
  { id: "editor", label: "Go to editor", run: (s) => s.setView("editor") },
  { id: "preview", label: "Open WebKit preview", run: (s) => s.setView("preview") },
  { id: "terminal", label: "Open Kali terminal", run: (s) => s.setView("terminal") },
  { id: "snippets", label: "Snippets library", run: (s) => s.setView("snippets") },
  { id: "grok", label: "Ask Grok", run: (s) => s.setView("grok") },
  { id: "integrations", label: "Integrations", run: (s) => s.setView("integrations") },
  { id: "swarm", label: "AI swarm", run: (s) => s.setView("swarm") },
  { id: "ios", label: "Target iOS", run: (s) => s.setTarget("ios") },
  { id: "android", label: "Target Android", run: (s) => s.setTarget("android") },
];

export function CommandPalette() {
  const open = useIde((s) => s.commandOpen);
  const setOpen = useIde((s) => s.setCommandOpen);
  const files = useIde((s) => s.files);
  const openFile = useIde((s) => s.openFile);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!useIde.getState().commandOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const fileHits = useMemo(() => {
    const n = q.trim().toLowerCase();
    const paths = Object.keys(files);
    if (!n) return paths.slice(0, 8);
    return paths.filter((p) => p.toLowerCase().includes(n)).slice(0, 12);
  }, [files, q]);

  const actionHits = useMemo(() => {
    const n = q.trim().toLowerCase();
    return ACTIONS.filter((a) => !n || a.label.toLowerCase().includes(n) || a.id.includes(n));
  }, [q]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQ("");
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70" />
        <Dialog.Content className="fixed top-[12%] left-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 rounded-[var(--radius-lg)] bg-surface p-2 shadow-[var(--shadow-border)] outline-none">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Files and commands"
            className="h-11 w-full rounded-[var(--radius-md)] bg-elevated px-3 text-sm text-fg outline-none"
          />
          <div className="ide-scroll mt-2 max-h-72 overflow-auto">
            {actionHits.map((a) => (
              <button
                key={a.id}
                type="button"
                className="flex h-10 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm text-fg hover:bg-elevated"
                onClick={() => {
                  a.run(useIde.getState());
                  setOpen(false);
                  setQ("");
                }}
              >
                {a.label}
              </button>
            ))}
            {fileHits.map((p) => (
              <button
                key={p}
                type="button"
                className="flex h-10 w-full items-center rounded-[var(--radius-sm)] px-3 text-left font-mono text-xs text-muted hover:bg-elevated hover:text-fg"
                onClick={() => {
                  openFile(p);
                  useIde.getState().setView("editor" as ViewId);
                  setOpen(false);
                  setQ("");
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
