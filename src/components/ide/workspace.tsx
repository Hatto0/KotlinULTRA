import { useEffect, useState } from "react";
import {
  Bot,
  Code2,
  FolderTree,
  GitBranch,
  Play,
  Puzzle,
  Search,
  Smartphone,
  TerminalSquare,
  Network,
  Globe,
  Menu,
} from "lucide-react";
import { Group, Panel, Separator as ResizeSep } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { runKali } from "@/lib/kali";
import { useIde, type ViewId } from "@/store/ide";
import { UltraMark } from "./logo";
import { FileTree } from "./file-tree";
import { EditorPane } from "./editor";
import { TerminalPane } from "./terminal";
import { PreviewPane } from "./preview";
import { SnippetsPane } from "./snippets";
import { GrokPane } from "./grok-chat";
import { IntegrationsPane } from "./integrations";
import { SwarmPane } from "./swarm";
import { CommandPalette } from "./command-palette";

const NAV: { id: ViewId; label: string; icon: typeof Code2 }[] = [
  { id: "editor", label: "Edit", icon: Code2 },
  { id: "preview", label: "Preview", icon: Smartphone },
  { id: "terminal", label: "Kali", icon: TerminalSquare },
  { id: "grok", label: "Grok", icon: Bot },
  { id: "snippets", label: "Snips", icon: Puzzle },
];

function useDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const apply = () => setD(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return d;
}

function MainStage({ view }: { view: ViewId }) {
  if (view === "preview") return <PreviewPane />;
  if (view === "terminal") return <TerminalPane />;
  if (view === "snippets") return <SnippetsPane />;
  if (view === "grok") return <GrokPane />;
  if (view === "integrations") return <IntegrationsPane />;
  if (view === "swarm") return <SwarmPane />;
  return <EditorPane />;
}

function runBuild() {
  const s = useIde.getState();
  s.setView("terminal");
  s.pushTerm({
    kind: "sys",
    text:
      s.target === "ios"
        ? "→ xcodebuild -scheme UltraWeather -destination 'platform=iOS Simulator,name=iPhone 16'"
        : "→ ./gradlew :app:assembleDebug",
  });
  const cmd = s.target === "ios" ? "xcodebuild" : "gradle";
  const result = runKali(s.kali, cmd);
  s.setKali(result.state);
  s.pushTerm({ kind: "out", text: result.lines.join("\n") });
  window.setTimeout(() => s.setView("preview"), 480);
}

export function Workspace() {
  const view = useIde((s) => s.view);
  const setView = useIde((s) => s.setView);
  const target = useIde((s) => s.target);
  const setTarget = useIde((s) => s.setTarget);
  const projectName = useIde((s) => s.projectName);
  const kali = useIde((s) => s.kali);
  const activePath = useIde((s) => s.activePath);
  const setCommandOpen = useIde((s) => s.setCommandOpen);
  const desktopPanel = useIde((s) => s.desktopPanel);
  const setDesktopPanel = useIde((s) => s.setDesktopPanel);
  const clawRunning = useIde((s) => s.clawRunning);
  const desktop = useDesktop();
  const [filesOpen, setFilesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    if (view !== "editor") setFilesOpen(false);
  }, [view]);

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <CommandPalette />
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-2 sm:px-3">
        {desktop ? null : (
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-fg"
            aria-label="Files"
            onClick={() => setFilesOpen(true)}
          >
            <Menu className="size-4" />
          </button>
        )}
        <UltraMark className="size-7 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="font-display text-sm font-semibold tracking-tight">Kotlin ULTRA</div>
          <div className="truncate text-2xs text-muted">{projectName}</div>
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            onClick={() => setTarget("ios")}
            className={cn(
              "h-8 rounded-full px-3 text-xs",
              target === "ios" ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            iOS
          </button>
          <button
            type="button"
            onClick={() => setTarget("android")}
            className={cn(
              "h-8 rounded-full px-3 text-xs",
              target === "android" ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            Android
          </button>
        </div>
        <Button size="sm" variant="secondary" onClick={() => setView("preview")} className="hidden gap-1.5 pr-3 sm:inline-flex">
          <Smartphone className="size-3.5" />
          Preview
        </Button>
        <Button size="sm" onClick={runBuild} className="gap-1.5 pr-3">
          <Play className="size-3.5" />
          Run
        </Button>
        <button
          type="button"
          className="hidden size-10 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-fg md:inline-flex"
          aria-label="Command palette"
          onClick={() => setCommandOpen(true)}
        >
          <Search className="size-4" />
        </button>
      </header>

      {desktop ? (
        <div className="min-h-0 flex-1">
          <Group orientation="horizontal" className="h-full">
            <Panel defaultSize="18" minSize="14" className="flex flex-col overflow-hidden bg-surface">
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border px-3">
                <FolderTree className="size-3.5 text-muted" />
                <span className="text-xs text-muted">Explorer</span>
              </div>
              <div className="min-h-0 flex-1">
                <FileTree />
              </div>
            </Panel>
            <ResizeSep className="w-px bg-border" />
            <Panel minSize="40" className="overflow-hidden">
              <Group orientation="vertical" className="h-full">
                <Panel minSize="40" className="overflow-hidden">
                  <MainStage
                    view={
                      view === "terminal" || view === "snippets" || view === "grok"
                        ? "editor"
                        : view
                    }
                  />

                </Panel>
                <ResizeSep className="h-px bg-border" />
                <Panel defaultSize="28" minSize="16" className="overflow-hidden">
                  <div className="flex h-9 items-center gap-1 border-b border-border px-2">
                    {(["terminal", "snippets"] as const).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setDesktopPanel(id);
                          if (id === "terminal") setView("terminal");
                          if (id === "snippets") setView("snippets");
                        }}
                        className={cn(
                          "h-7 rounded-[var(--radius-sm)] px-2 text-xs capitalize",
                          desktopPanel === id ? "bg-elevated text-fg" : "text-muted",
                        )}
                      >
                        {id === "terminal" ? "Kali" : "Snippets"}
                      </button>
                    ))}
                  </div>
                  <div className="h-[calc(100%-2.25rem)]">
                    {desktopPanel === "snippets" ? <SnippetsPane /> : <TerminalPane />}
                  </div>
                </Panel>
              </Group>
            </Panel>
            <ResizeSep className="w-px bg-border" />
            <Panel defaultSize="26" minSize="18" className="overflow-hidden bg-surface">
              <GrokPane />
            </Panel>
          </Group>
        </div>
      ) : (
        <div className="min-h-0 flex-1">
          <MainStage view={view} />
        </div>
      )}

      <footer className="flex h-9 shrink-0 items-center gap-3 border-t border-border px-3 text-2xs text-muted">
        <span className="inline-flex items-center gap-1">
          <GitBranch className="size-3" /> main
        </span>
        <span className="hidden truncate sm:inline">{activePath}</span>
        {desktop ? (
          <>
            <NavButton id="integrations" label="Integrations" icon={Globe} view={view} onSelect={setView} />
            <NavButton id="swarm" label="Swarm" icon={Network} view={view} onSelect={setView} />
          </>
        ) : null}
        <span className="ml-auto inline-flex items-center gap-2">
          <Badge tone={clawRunning ? "ok" : "muted"}>Claw {clawRunning ? "up" : "off"}</Badge>
          <span className="tabular-nums">Kali {kali.version}</span>
        </span>
      </footer>

      {desktop ? null : (
        <nav className="flex h-14 shrink-0 items-center justify-around border-t border-border pb-[env(safe-area-inset-bottom)]">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "flex h-12 min-w-12 flex-col items-center justify-center gap-0.5 text-2xs",
                  on ? "text-fg" : "text-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className={cn(
              "flex h-12 min-w-12 flex-col items-center justify-center gap-0.5 text-2xs",
              view === "integrations" || view === "swarm" ? "text-fg" : "text-muted",
            )}
          >
            <Network className="size-4" />
            More
          </button>
        </nav>
      )}

      <Sheet open={filesOpen} onOpenChange={setFilesOpen} title="Explorer">
        <FileTree />
      </Sheet>
      <Sheet open={moreOpen} onOpenChange={setMoreOpen} side="bottom" title="Workspace">
        <div className="space-y-2 p-3">
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => {
              setView("integrations");
              setMoreOpen(false);
            }}
          >
            Integrations
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => {
              setView("swarm");
              setMoreOpen(false);
            }}
          >
            AI swarm
          </Button>
          <div className="flex gap-2">
            <Button className="flex-1" variant={target === "ios" ? "primary" : "secondary"} onClick={() => setTarget("ios")}>
              iOS
            </Button>
            <Button
              className="flex-1"
              variant={target === "android" ? "primary" : "secondary"}
              onClick={() => setTarget("android")}
            >
              Android
            </Button>
          </div>
          <Button variant="ghost" className="w-full" onClick={() => setCommandOpen(true)}>
            Command palette
          </Button>
        </div>
      </Sheet>
    </div>
  );
}

function NavButton({
  id,
  label,
  icon: Icon,
  view,
  onSelect,
}: {
  id: ViewId;
  label: string;
  icon: typeof Globe;
  view: ViewId;
  onSelect: (v: ViewId) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-2 text-xs",
        view === id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}
