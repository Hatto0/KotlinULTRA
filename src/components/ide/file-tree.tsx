import { useMemo, useState } from "react";
import { ChevronRight, FileCode, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIde } from "@/store/ide";

type Node = { name: string; path: string; children?: Record<string, Node>; file?: boolean };

function buildTree(paths: string[]): Node {
  const root: Node = { name: "", path: "", children: {} };
  for (const path of paths) {
    const parts = path.split("/");
    let cur = root;
    let acc = "";
    for (let i = 0; i < parts.length; i++) {
      const name = parts[i] ?? "";
      acc = acc ? `${acc}/${name}` : name;
      cur.children ??= {};
      cur.children[name] ??= { name, path: acc, children: {}, file: i === parts.length - 1 };
      cur = cur.children[name];
    }
  }
  return root;
}

function TreeBranch({ node, depth }: { node: Node; depth: number }) {
  const activePath = useIde((s) => s.activePath);
  const openFile = useIde((s) => s.openFile);
  const isFile = node.file;
  const [open, setOpen] = useState(depth < 2);
  const kids = Object.values(node.children ?? {}).sort((a, b) => {
    const ad = a.file ? 1 : 0;
    const bd = b.file ? 1 : 0;
    if (ad !== bd) return ad - bd;
    return a.name.localeCompare(b.name);
  });

  if (isFile) {
    return (
      <button
        type="button"
        onClick={() => openFile(node.path)}
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 text-left text-xs",
          activePath === node.path ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/70 hover:text-fg",
        )}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <FileCode className="size-3.5 shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-full items-center gap-1.5 rounded-[var(--radius-sm)] px-2 text-left text-xs text-muted hover:bg-elevated/70 hover:text-fg"
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <ChevronRight className={cn("size-3.5 shrink-0 transition-transform duration-[var(--motion-quick)]", open && "rotate-90")} />
        <Folder className="size-3.5 shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>
      {open
        ? kids.map((c) => <TreeBranch key={c.path} node={c} depth={depth + 1} />)
        : null}
    </div>
  );
}

export function FileTree() {
  const files = useIde((s) => s.files);
  const tree = useMemo(() => buildTree(Object.keys(files).sort()), [files]);
  const kids = Object.values(tree.children ?? {});
  return (
    <nav className="ide-scroll h-full overflow-auto p-2" aria-label="Project files">
      {kids.map((c) => (
        <TreeBranch key={c.path} node={c} depth={0} />
      ))}
    </nav>
  );
}
