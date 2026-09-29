import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedFiles, PROJECT_NAME, WELCOME_PATH } from "@/data/project";
import { languageFromPath } from "@/lib/syntax";
import { defaultKali, type KaliState } from "@/lib/kali";
import type { ChatMessage } from "@/lib/ai";

export type ViewId =
  | "editor"
  | "preview"
  | "terminal"
  | "snippets"
  | "grok"
  | "integrations"
  | "swarm";

export type Target = "ios" | "android";

export type DeviceId = "iphone-16" | "ipad-mini" | "pixel-9" | "fold";

export type FileMap = Record<string, { path: string; content: string }>;

export type AgentId =
  | "architect"
  | "ios"
  | "android"
  | "kotlin"
  | "security"
  | "qa"
  | "openclaw"
  | "deploy";

export type SwarmEvent = { id: string; agent: string; text: string; at: number };

export type GrokMsg = { id: string; role: "user" | "assistant"; content: string };

export type ProviderId = "grok" | "openai" | "claude" | "openclaw";

const ALL_AGENTS: AgentId[] = [
  "architect",
  "ios",
  "android",
  "kotlin",
  "security",
  "qa",
  "openclaw",
  "deploy",
];

function filesFromSeed(): FileMap {
  const files: FileMap = {};
  for (const f of seedFiles) files[f.path] = { path: f.path, content: f.content };
  return files;
}

type IdeState = {
  files: FileMap;
  openTabs: string[];
  activePath: string;
  view: ViewId;
  desktopPanel: "terminal" | "snippets" | "problems";
  target: Target;
  device: DeviceId;
  projectName: string;
  kali: KaliState;
  termLines: { id: string; html?: string; text: string; kind: "in" | "out" | "err" | "sys" }[];
  grokMessages: GrokMsg[];
  grokBusy: boolean;
  provider: ProviderId;
  clawRunning: boolean;
  clawChannels: { id: string; name: string; on: boolean }[];
  swarmAgents: AgentId[];
  swarmMission: string;
  swarmEvents: SwarmEvent[];
  swarmBusy: boolean;
  commandOpen: boolean;
  resetProject: () => void;
  setView: (v: ViewId) => void;
  setDesktopPanel: (p: IdeState["desktopPanel"]) => void;
  setTarget: (t: Target) => void;
  setDevice: (d: DeviceId) => void;
  openFile: (path: string) => void;
  closeTab: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  addFile: (path: string, content: string) => void;
  setKali: (k: KaliState) => void;
  pushTerm: (line: Omit<IdeState["termLines"][number], "id">) => void;
  clearTerm: () => void;
  setProvider: (p: ProviderId) => void;
  setGrokBusy: (b: boolean) => void;
  pushGrok: (m: Omit<GrokMsg, "id">) => void;
  toggleClaw: () => void;
  toggleChannel: (id: string) => void;
  toggleSwarmAgent: (id: AgentId) => void;
  setSwarmMission: (s: string) => void;
  pushSwarmEvent: (e: Omit<SwarmEvent, "id" | "at">) => void;
  setSwarmBusy: (b: boolean) => void;
  setCommandOpen: (o: boolean) => void;
};

let seq = 0;
function nid(prefix: string) {
  seq += 1;
  return `${prefix}_${Date.now().toString(36)}_${seq}`;
}

export const useIde = create<IdeState>()(
  persist(
    (set, get) => ({
      files: filesFromSeed(),
      openTabs: [WELCOME_PATH],
      activePath: WELCOME_PATH,
      view: "editor",
      desktopPanel: "terminal",
      target: "ios",
      device: "iphone-16",
      projectName: PROJECT_NAME,
      kali: defaultKali(),
      termLines: [
        {
          id: "boot",
          kind: "sys",
          text: `Kali GNU/Linux Rolling ${defaultKali().version} · ultra arm64 — type help`,
        },
      ],
      grokMessages: [],
      grokBusy: false,
      provider: "grok",
      clawRunning: false,
      clawChannels: [
        { id: "imessage", name: "iMessage", on: true },
        { id: "telegram", name: "Telegram", on: false },
        { id: "discord", name: "Discord", on: false },
        { id: "slack", name: "Slack", on: false },
      ],
      swarmAgents: [...ALL_AGENTS],
      swarmMission: "Add a 4-hour forecast strip to iOS and Android home screens.",
      swarmEvents: [],
      swarmBusy: false,
      commandOpen: false,
      resetProject: () =>
        set({
          files: filesFromSeed(),
          openTabs: [WELCOME_PATH],
          activePath: WELCOME_PATH,
          kali: defaultKali(),
        }),
      setView: (view) => set({ view }),
      setDesktopPanel: (desktopPanel) => set({ desktopPanel }),
      setTarget: (target) =>
        set({
          target,
          device: target === "ios" ? "iphone-16" : "pixel-9",
        }),
      setDevice: (device) => set({ device }),
      openFile: (path) => {
        const { openTabs } = get();
        set({
          activePath: path,
          openTabs: openTabs.includes(path) ? openTabs : [...openTabs, path],
          view: "editor",
        });
      },
      closeTab: (path) => {
        const { openTabs, activePath } = get();
        const next = openTabs.filter((p) => p !== path);
        const fallback = next[next.length - 1] ?? Object.keys(get().files)[0] ?? WELCOME_PATH;
        set({
          openTabs: next,
          activePath: activePath === path ? fallback : activePath,
        });
      },
      updateFile: (path, content) => {
        const files = { ...get().files };
        const prev = files[path];
        if (!prev) return;
        files[path] = { ...prev, content };
        set({ files });
      },
      addFile: (path, content) => {
        const files = { ...get().files, [path]: { path, content } };
        const { openTabs } = get();
        set({
          files,
          activePath: path,
          openTabs: openTabs.includes(path) ? openTabs : [...openTabs, path],
          view: "editor",
        });
      },
      setKali: (kali) => set({ kali }),
      pushTerm: (line) =>
        set({ termLines: [...get().termLines.slice(-400), { ...line, id: nid("t") }] }),
      clearTerm: () => set({ termLines: [] }),
      setProvider: (provider) => set({ provider }),
      setGrokBusy: (grokBusy) => set({ grokBusy }),
      pushGrok: (m) =>
        set({ grokMessages: [...get().grokMessages, { ...m, id: nid("g") }] }),
      toggleClaw: () => set({ clawRunning: !get().clawRunning }),
      toggleChannel: (id) =>
        set({
          clawChannels: get().clawChannels.map((c) =>
            c.id === id ? { ...c, on: !c.on } : c,
          ),
        }),
      toggleSwarmAgent: (id) => {
        const cur = get().swarmAgents;
        set({
          swarmAgents: cur.includes(id) ? cur.filter((a) => a !== id) : [...cur, id],
        });
      },
      setSwarmMission: (swarmMission) => set({ swarmMission }),
      pushSwarmEvent: (e) =>
        set({
          swarmEvents: [...get().swarmEvents, { ...e, id: nid("s"), at: Date.now() }],
        }),
      setSwarmBusy: (swarmBusy) => set({ swarmBusy }),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
    }),
    {
      name: "kotlin-ultra-ide",
      partialize: (s) => ({
        files: s.files,
        openTabs: s.openTabs,
        activePath: s.activePath,
        target: s.target,
        device: s.device,
        provider: s.provider,
        clawRunning: s.clawRunning,
        clawChannels: s.clawChannels,
        swarmAgents: s.swarmAgents,
        swarmMission: s.swarmMission,
        kali: { ...s.kali, history: s.kali.history.slice(-50) },
      }),
    },
  ),
);

export function languageOf(path: string) {
  return languageFromPath(path);
}

export const AGENT_META: Record<AgentId, { label: string; blurb: string }> = {
  architect: { label: "Architect", blurb: "Shapes modules and APIs" },
  ios: { label: "iOS", blurb: "SwiftUI · Xcode" },
  android: { label: "Android", blurb: "Compose · Gradle" },
  kotlin: { label: "Kotlin", blurb: "Shared KMP" },
  security: { label: "Security", blurb: "Kali lab review" },
  qa: { label: "QA", blurb: "Device matrix" },
  openclaw: { label: "OpenClaw", blurb: "Gateway runner" },
  deploy: { label: "Deploy", blurb: "TestFlight · Play" },
};

export type ChatHistory = ChatMessage;
