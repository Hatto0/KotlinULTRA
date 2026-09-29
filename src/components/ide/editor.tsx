import { useMemo } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { highlight } from "@/lib/syntax";
import { languageOf, useIde } from "@/store/ide";

export function EditorPane() {
  const files = useIde((s) => s.files);
  const openTabs = useIde((s) => s.openTabs);
  const activePath = useIde((s) => s.activePath);
  const openFile = useIde((s) => s.openFile);
  const closeTab = useIde((s) => s.closeTab);
  const updateFile = useIde((s) => s.updateFile);
  const file = files[activePath];
  const language = languageOf(activePath);
  const content = file?.content ?? "";
  const html = useMemo(() => highlight(content, language), [content, language]);
  const lines = content.split("\n");
  const lineCount = Math.max(lines.length, 1);
  const blockHeight = lineCount * 24 + 24;

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <div className="ide-scroll flex shrink-0 gap-0 overflow-x-auto border-b border-border">
        {openTabs.map((path) => {
          const name = path.split("/").pop() ?? path;
          const on = path === activePath;
          return (
            <div
              key={path}
              className={cn(
                "group flex h-10 shrink-0 items-center border-r border-border",
                on ? "bg-surface text-fg" : "text-muted hover:text-fg",
              )}
            >
              <button
                type="button"
                onClick={() => openFile(path)}
                className="h-10 max-w-44 truncate px-3 text-xs"
              >
                {name}
              </button>
              <button
                type="button"
                aria-label={`Close ${name}`}
                onClick={() => closeTab(path)}
                className="mr-1 inline-flex size-7 items-center justify-center rounded-[var(--radius-xs)] opacity-60 hover:bg-elevated hover:opacity-100"
              >
                <X className="size-3" />
              </button>
            </div>
          );
        })}
      </div>

      {!file ? (
        <div className="flex flex-1 items-center justify-center text-sm text-muted">
          Open a file from the explorer.
        </div>
      ) : (
        <div className="ide-scroll relative flex min-h-0 flex-1 overflow-auto">
          <div
            aria-hidden
            className="sticky left-0 z-20 select-none border-r border-border bg-surface/80 py-3 pr-2 pl-3 font-mono text-xs leading-6 text-subtle"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="text-right tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="relative min-w-0 flex-1" style={{ height: blockHeight }}>
            <pre
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre py-3 pr-4 pl-3 font-mono text-xs leading-6 text-fg"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <textarea
              value={content}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              onChange={(e) => updateFile(activePath, e.target.value)}
              className="absolute inset-0 z-10 h-full w-full resize-none overflow-hidden bg-transparent py-3 pr-4 pl-3 font-mono text-xs leading-6 text-transparent caret-fg outline-none"
              aria-label={`Editor ${activePath}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
