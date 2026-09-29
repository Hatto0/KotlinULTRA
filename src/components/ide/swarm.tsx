import { askGrok } from "@/lib/ai";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AGENT_META, useIde, type AgentId } from "@/store/ide";

const ORDER: AgentId[] = [
  "architect",
  "ios",
  "android",
  "kotlin",
  "security",
  "qa",
  "openclaw",
  "deploy",
];

export function SwarmPane() {
  const agents = useIde((s) => s.swarmAgents);
  const toggle = useIde((s) => s.toggleSwarmAgent);
  const mission = useIde((s) => s.swarmMission);
  const setMission = useIde((s) => s.setSwarmMission);
  const events = useIde((s) => s.swarmEvents);
  const push = useIde((s) => s.pushSwarmEvent);
  const busy = useIde((s) => s.swarmBusy);
  const setBusy = useIde((s) => s.setSwarmBusy);
  const addFile = useIde((s) => s.addFile);
  const files = useIde((s) => s.files);
  const activePath = useIde((s) => s.activePath);
  const clawRunning = useIde((s) => s.clawRunning);
  const setView = useIde((s) => s.setView);

  async function deploy() {
    if (busy || !mission.trim() || agents.length === 0) return;
    setBusy(true);
    push({ agent: "control", text: `Deploying swarm · ${agents.length} agents` });
    for (const id of ORDER.filter((a) => agents.includes(a))) {
      push({ agent: AGENT_META[id].label, text: "online" });
    }
    const file = files[activePath];
    const res = await askGrok({
      data: {
        prompt: `Mission: ${mission}\nActive agents: ${agents.join(", ")}\nOpenClaw gateway: ${clawRunning ? "running" : "stopped"}\nWrite a coordinated plan. If you produce a file, use a single fenced code block and mention the path.`,
        context: file ? `${activePath}\n${file.content}` : undefined,
        mode: "swarm",
      },
    });
    setBusy(false);
    if (!res.ok) {
      push({ agent: "control", text: res.error });
      return;
    }
    push({ agent: "Architect", text: res.text.slice(0, 1200) });
    const pathHint = res.text.match(/(?:iosApp|app|shared|snippets)\/[\w./-]+\.\w+/);
    const block = res.text.match(/```(?:[\w+-]*)\n([\s\S]*?)```/);
    if (pathHint && block?.[1]) {
      addFile(pathHint[0], block[1].replace(/\n$/, ""));
      push({ agent: "Deploy", text: `Wrote ${pathHint[0]} into the workspace.` });
      setView("editor");
    } else {
      push({ agent: "Deploy", text: "Plan ready. No file patch detected — review the timeline." });
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <div className="ide-scroll min-h-0 flex-1 overflow-auto p-4">
        <h2 className="font-display text-lg font-medium tracking-tight">AI swarm</h2>
        <p className="mt-1 text-sm text-muted">
          Craft a specialist crew, then deploy. Grok coordinates; OpenClaw can run the gateway skills.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {ORDER.map((id) => {
            const on = agents.includes(id);
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  className={cn(
                    "flex h-[4.5rem] w-full flex-col items-start justify-center rounded-[var(--radius-md)] px-3 text-left shadow-[var(--shadow-border)]",
                    on ? "bg-elevated text-fg" : "bg-surface text-muted",
                  )}
                >
                  <span className="text-sm font-medium">{AGENT_META[id].label}</span>
                  <span className="text-2xs text-subtle">{AGENT_META[id].blurb}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <label className="mt-4 block text-xs text-muted">
          Mission
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows={3}
            className="mt-1 w-full resize-none rounded-[var(--radius-md)] bg-elevated px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] outline-none"
          />
        </label>
        <Button className="mt-3 w-full" disabled={busy} onClick={() => void deploy()}>
          {busy ? "Deploying…" : "Deploy swarm"}
        </Button>
        <ol className="mt-4 space-y-2">
          {events.map((e) => (
            <li key={e.id} className="rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
              <div className="flex items-center gap-2">
                <Badge>{e.agent}</Badge>
                <span className="text-2xs tabular-nums text-subtle">
                  {new Date(e.at).toLocaleTimeString()}
                </span>
              </div>
              <pre className="mt-1 whitespace-pre-wrap font-sans text-xs text-fg">{e.text}</pre>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
