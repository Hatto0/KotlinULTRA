import { snippets } from "@/data/snippets";
import { documentForFile } from "@/lib/webkit";
import { useIde } from "@/store/ide";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SnippetsPane() {
  const addFile = useIde((s) => s.addFile);
  const setView = useIde((s) => s.setView);

  return (
    <div className="ide-scroll h-full overflow-auto p-4">
      <div className="mb-4">
        <h2 className="font-display text-lg font-medium tracking-tight">Snippets</h2>
        <p className="mt-1 text-sm text-muted">
          Insert production-shaped pieces, then preview them on the virtual device.
        </p>
      </div>
      <ul className="grid gap-3">
        {snippets.map((s) => {
          const path = `snippets/${s.id}.${s.language === "html" ? "html" : s.language === "swift" ? "swift" : "kt"}`;
          const srcDoc = documentForFile(path, s.code, s.language);
          return (
            <li
              key={s.id}
              className="rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{s.title}</h3>
                    <Badge>{s.platform}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{s.description}</p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    addFile(path, s.code);
                    setView("editor");
                  }}
                >
                  Insert
                </Button>
              </div>
              <div className="mt-3 overflow-hidden rounded-[var(--radius-md)] bg-bg">
                <iframe
                  title={s.title}
                  sandbox="allow-scripts"
                  srcDoc={srcDoc}
                  className="h-40 w-full border-0"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
