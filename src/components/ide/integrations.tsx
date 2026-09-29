import { useState } from "react";
import { redirectToLoginIfRequired } from "@/lib/app-data";
import { fetchGithubFile, fetchGithubRepo, listGoogleDrive } from "@/lib/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useIde } from "@/store/ide";

type GhEntry = { name: string; path: string; type: string; downloadUrl: string | null };

export function IntegrationsPane() {
  const addFile = useIde((s) => s.addFile);
  const clawRunning = useIde((s) => s.clawRunning);
  const toggleClaw = useIde((s) => s.toggleClaw);
  const channels = useIde((s) => s.clawChannels);
  const toggleChannel = useIde((s) => s.toggleChannel);
  const provider = useIde((s) => s.provider);
  const setProvider = useIde((s) => s.setProvider);
  const setView = useIde((s) => s.setView);

  const [repo, setRepo] = useState("android/nowinandroid");
  const [ghStatus, setGhStatus] = useState<string | null>(null);
  const [entries, setEntries] = useState<GhEntry[]>([]);
  const [ghBusy, setGhBusy] = useState(false);

  const [driveStatus, setDriveStatus] = useState<string | null>(null);
  const [driveItems, setDriveItems] = useState<string[]>([]);
  const [driveBusy, setDriveBusy] = useState(false);

  async function loadRepo() {
    setGhBusy(true);
    setGhStatus(null);
    const res = await fetchGithubRepo({ data: { repo } });
    setGhBusy(false);
    if (!res.ok) {
      setGhStatus(res.error);
      setEntries([]);
      return;
    }
    setGhStatus(res.repo);
    setEntries(res.entries);
  }

  async function importFile(e: GhEntry) {
    if (!e.downloadUrl) {
      setGhStatus("Folders cannot be imported in one shot — pick a file.");
      return;
    }
    const res = await fetchGithubFile({ data: { downloadUrl: e.downloadUrl, path: e.path } });
    if (!res.ok) {
      setGhStatus(res.error);
      return;
    }
    const dest = `github/${e.path}`;
    addFile(dest, res.content);
    setView("editor");
  }

  async function loadDrive() {
    setDriveBusy(true);
    setDriveStatus(null);
    const res = await listGoogleDrive();
    setDriveBusy(false);
    if (res.loginRequired) {
      redirectToLoginIfRequired({
        ok: false,
        data: null,
        loginRequired: true,
        loginUrl: res.loginUrl ?? undefined,
      });
      setDriveStatus("Continue with Grok to connect Drive.");
      return;
    }
    if (!res.ok) {
      setDriveStatus(res.errorMessage ?? "Drive unavailable.");
      setDriveItems([]);
      return;
    }
    setDriveItems(res.names.slice(0, 24));
    setDriveStatus(
      res.names.length ? `${res.names.length} items` : "Connected — no files returned.",
    );
  }

  return (
    <div className="ide-scroll h-full overflow-auto p-4 space-y-4">
      <header>
        <h2 className="font-display text-lg font-medium tracking-tight">Integrations</h2>
        <p className="mt-1 text-sm text-muted">
          GitHub public repos, Google Drive, model profiles, and the OpenClaw gateway.
        </p>
      </header>

      <section className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">GitHub</h3>
          <Badge>public API</Badge>
        </div>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void loadRepo();
          }}
        >
          <Input
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="owner/repo"
            aria-label="GitHub repository"
          />
          <Button type="submit" variant="secondary" disabled={ghBusy}>
            Load
          </Button>
        </form>
        {ghStatus ? <p className="mt-2 text-xs text-muted">{ghStatus}</p> : null}
        <ul className="mt-3 space-y-1">
          {entries.map((e) => (
            <li key={e.path} className="flex items-center justify-between gap-2">
              <span className="truncate font-mono text-xs text-fg">
                {e.type === "dir" ? "/" : ""}
                {e.name}
              </span>
              <Button size="sm" variant="ghost" onClick={() => void importFile(e)}>
                Import
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">Google Drive</h3>
          <Badge>viewer data</Badge>
        </div>
        <p className="mt-1 text-xs text-muted">
          Lists files from the Google account connected in Grok.
        </p>
        <Button
          className="mt-3"
          variant="secondary"
          disabled={driveBusy}
          onClick={() => void loadDrive()}
        >
          Browse Drive
        </Button>
        {driveStatus ? <p className="mt-2 text-xs text-muted">{driveStatus}</p> : null}
        <ul className="mt-2 space-y-1">
          {driveItems.map((n) => (
            <li key={n} className="truncate text-xs text-fg">
              {n}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
        <h3 className="text-sm font-medium">Model profiles</h3>
        <p className="mt-1 text-xs text-muted">
          Active: {provider}. All chat is served by Grok 4.5.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["grok", "openai", "claude", "openclaw"] as const).map((id) => (
            <Button
              key={id}
              size="sm"
              variant={provider === id ? "primary" : "secondary"}
              onClick={() => {
                setProvider(id);
                setView("grok");
              }}
            >
              {id === "openai" ? "OpenAI" : id === "claude" ? "Claude" : id === "openclaw" ? "OpenClaw" : "Grok"}
            </Button>
          ))}
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">OpenClaw gateway</h3>
          <Badge tone={clawRunning ? "ok" : "muted"}>{clawRunning ? "running" : "stopped"}</Badge>
        </div>
        <p className="mt-1 text-xs text-muted">
          Local-style gateway on virtual port 18789. Channels route to Grok; skills can touch the Kali shell and files.
        </p>
        <Button className="mt-3" variant={clawRunning ? "secondary" : "primary"} onClick={toggleClaw}>
          {clawRunning ? "Stop gateway" : "Start gateway"}
        </Button>
        <ul className="mt-3 space-y-1">
          {channels.map((c) => (
            <li key={c.id} className="flex h-10 items-center justify-between">
              <span className="text-sm">{c.name}</span>
              <button
                type="button"
                onClick={() => toggleChannel(c.id)}
                className="text-xs text-muted hover:text-fg"
              >
                {c.on ? "On" : "Off"}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-xs text-subtle">
          skills: file · kali-terminal · git · webkit-preview
        </p>
      </section>
    </div>
  );
}
