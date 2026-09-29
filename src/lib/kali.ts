export const KALI_STABLE = "2026.3";
export const KALI_ROLLING = "2026.4";

export type FsNode = {
  type: "dir" | "file";
  name: string;
  children?: Record<string, FsNode>;
  content?: string;
};

export type KaliState = {
  cwd: string;
  version: string;
  user: string;
  host: string;
  history: string[];
};

function dir(name: string, children: Record<string, FsNode>): FsNode {
  return { type: "dir", name, children };
}
function file(name: string, content: string): FsNode {
  return { type: "file", name, content };
}

export function createFs(): FsNode {
  return dir("/", {
    home: dir("home", {
      kali: dir("kali", {
        "UltraWeather": dir("UltraWeather", {
          README: file("README", "Kotlin ULTRA workspace mount.\n"),
        }),
        ".zshrc": file(".zshrc", "export PATH=$PATH:/usr/bin:/opt/ultra/bin\n"),
      }),
    }),
    etc: dir("etc", {
      "os-release": file(
        "os-release",
        `PRETTY_NAME="Kali GNU/Linux Rolling ${KALI_STABLE}"
NAME="Kali GNU/Linux"
VERSION="${KALI_STABLE}"
ID=kali
VERSION_ID="${KALI_STABLE}"
HOME_URL="https://www.kali.org/"
`,
      ),
    }),
    opt: dir("opt", {
      "android-sdk": dir("android-sdk", {
        README: file("README", "Android SDK 35 · platform-tools 35.0.2\n"),
      }),
      xcode: dir("xcode", {
        README: file("README", "Xcode 16.4 toolchain (virtualized)\n"),
      }),
      ultra: dir("ultra", {
        bin: dir("bin", {}),
      }),
    }),
    usr: dir("usr", {
      bin: dir("bin", {}),
    }),
    tmp: dir("tmp", {}),
  });
}

let fsRoot = createFs();

function resolve(path: string): string {
  if (!path) return "/home/kali";
  const parts: string[] = [];
  const src = path.startsWith("/") ? path : path;
  for (const p of src.split("/")) {
    if (!p || p === ".") continue;
    if (p === "..") parts.pop();
    else parts.push(p);
  }
  return "/" + parts.join("/");
}

function abs(cwd: string, path: string): string {
  if (path.startsWith("/")) return resolve(path);
  if (path === "~" || path.startsWith("~/")) {
    return resolve("/home/kali" + path.slice(1));
  }
  return resolve(cwd + "/" + path);
}

function walk(path: string): FsNode | null {
  if (path === "/") return fsRoot;
  const parts = path.split("/").filter(Boolean);
  let node: FsNode | undefined = fsRoot;
  for (const p of parts) {
    if (!node || node.type !== "dir" || !node.children) return null;
    node = node.children[p];
  }
  return node ?? null;
}

function displayCwd(cwd: string) {
  if (cwd === "/home/kali") return "~";
  if (cwd.startsWith("/home/kali/")) return "~" + cwd.slice("/home/kali".length);
  return cwd;
}

export function promptLines(state: KaliState): { userHost: string; path: string } {
  return {
    userHost: `${state.user}㉿${state.host}`,
    path: displayCwd(state.cwd),
  };
}

export function defaultKali(): KaliState {
  fsRoot = createFs();
  return {
    cwd: "/home/kali",
    version: KALI_STABLE,
    user: "kali",
    host: "ultra",
    history: [],
  };
}

export type CommandResult = {
  state: KaliState;
  lines: string[];
  kind: "out" | "err";
};

function ok(state: KaliState, lines: string[]): CommandResult {
  return { state, lines, kind: "out" };
}
function err(state: KaliState, lines: string[]): CommandResult {
  return { state, lines, kind: "err" };
}

const HELP = [
  "Kotlin ULTRA · Kali GNU/Linux Rolling (virtualized ARM64)",
  "",
  "shell     ls  cd  pwd  cat  echo  whoami  uname  clear  history  help",
  "system    df  free  ps  env  date  uname -a",
  "kali      kali-upgrade  apt  nethunter",
  "mobile    sdkmanager  adb  xcodebuild  gradle  kotlin  swift",
  "git       git status  git log  git branch",
  "lab       nmap  ping   (loopback and lab.ultra.local only)",
  "",
  "Most stable track: " + KALI_STABLE + "  ·  rolling target: " + KALI_ROLLING,
];

function runApt(state: KaliState, args: string[]): CommandResult {
  const sub = args[0] ?? "";
  if (sub === "update") {
    return ok(state, [
      "Hit:1 https://http.kali.org/kali kali-rolling InRelease",
      "Reading package lists... done",
      `Kali ${state.version} indexes synchronized.`,
    ]);
  }
  if (sub === "full-upgrade" || sub === "upgrade" || sub === "dist-upgrade") {
    return kaliUpgrade(state);
  }
  if (sub === "--version") {
    return ok(state, [`apt 2.9.8 (${state.version})`]);
  }
  return ok(state, [
    "apt 2.9.8",
    "usage: apt update | apt full-upgrade",
  ]);
}

function kaliUpgrade(state: KaliState): CommandResult {
  if (state.version === KALI_ROLLING) {
    return ok(state, [
      "Already on Kali Rolling " + KALI_ROLLING + " — the current stable rolling snapshot.",
      "0 upgraded, 0 newly installed, 0 to remove.",
    ]);
  }
  const next = { ...state, version: KALI_ROLLING };
  const os = walk("/etc/os-release");
  if (os && os.type === "file") {
    os.content = `PRETTY_NAME="Kali GNU/Linux Rolling ${KALI_ROLLING}"
NAME="Kali GNU/Linux"
VERSION="${KALI_ROLLING}"
ID=kali
VERSION_ID="${KALI_ROLLING}"
`;
  }
  return ok(next, [
    "Calculating upgrade... done",
    "The following packages will be upgraded: kali-linux-core linux-image nethunter-core",
    "Applying rolling snapshot " + KALI_ROLLING + " …",
    "Unpacking kali-linux-core (" + KALI_ROLLING + ") …",
    "Setting up linux-image-6.12-arm64 …",
    "Restarting virtualized services … done",
    "Kali is now " + KALI_ROLLING + " (rolling, most stable current).",
  ]);
}

const LAB_HOSTS = new Set(["127.0.0.1", "localhost", "lab.ultra.local", "::1"]);

export function runKali(state: KaliState, raw: string): CommandResult {
  const input = raw.trim();
  if (!input) return ok(state, []);
  const next = { ...state, history: [...state.history, input] };
  const parts = input.split(/\s+/);
  const cmd = parts[0] ?? "";
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
    case "kali":
      return ok(next, HELP);
    case "pwd":
      return ok(next, [next.cwd]);
    case "whoami":
      return ok(next, [next.user]);
    case "date":
      return ok(next, [new Date().toUTCString()]);
    case "clear":
      return ok(next, ["__CLEAR__"]);
    case "history":
      return ok(next, next.history.map((h, i) => ` ${i + 1}  ${h}`));
    case "echo":
      return ok(next, [args.join(" ")]);
    case "uname":
      if (args.includes("-a")) {
        return ok(next, [
          `Linux ${next.host} 6.12.0-kali6-arm64 #1 SMP Kali ${next.version} aarch64 GNU/Linux`,
        ]);
      }
      return ok(next, ["Linux"]);
    case "cd": {
      const target = abs(next.cwd, args[0] ?? "~");
      const node = walk(target);
      if (!node || node.type !== "dir") return err(next, [`cd: no such directory: ${args[0] ?? ""}`]);
      return ok({ ...next, cwd: target }, []);
    }
    case "ls": {
      const target = abs(next.cwd, args.filter((a) => !a.startsWith("-"))[0] ?? ".");
      const node = walk(target);
      if (!node) return err(next, [`ls: cannot access '${target}': No such file`]);
      if (node.type === "file") return ok(next, [node.name]);
      const names = Object.keys(node.children ?? {});
      return ok(next, names.length ? [names.join("  ")] : []);
    }
    case "cat": {
      if (!args[0]) return err(next, ["cat: missing operand"]);
      const target = abs(next.cwd, args[0]);
      const node = walk(target);
      if (!node || node.type !== "file") return err(next, [`cat: ${args[0]}: No such file`]);
      return ok(next, (node.content ?? "").replace(/\n$/, "").split("\n"));
    }
    case "env":
      return ok(next, [
        "USER=kali",
        "HOME=/home/kali",
        "SHELL=/usr/bin/zsh",
        "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/opt/ultra/bin",
        `KALI_VERSION=${next.version}`,
      ]);
    case "df":
      return ok(next, [
        "Filesystem     1K-blocks    Used Available Use%",
        "overlay           4194304  980120   3214184  24%",
      ]);
    case "free":
      return ok(next, [
        "               total        used        free",
        "Mem:         2048000      640120     1407880",
      ]);
    case "ps":
      return ok(next, [
        "PID TTY          TIME CMD",
        "  1 pts/0    00:00:00 zsh",
        " 42 pts/0    00:00:00 ultra-gateway",
        " 88 pts/0    00:00:00 grok-agent",
      ]);
    case "apt":
    case "apt-get":
      return runApt(next, args);
    case "sudo":
      if (args[0] === "apt" || args[0] === "apt-get") return runApt(next, args.slice(1));
      if (args[0] === "kali-upgrade") return kaliUpgrade(next);
      return ok(next, ["sudo: simulated — root granted in the virtualizer"]);
    case "kali-upgrade":
      return kaliUpgrade(next);
    case "nethunter":
      return ok(next, [
        "Kali NetHunter (virtualized) " + next.version,
        "Device: Kotlin ULTRA ARM64 workspace",
        "Chroot: /data/local/nhsystem/kali-arm64",
        "Status: running",
      ]);
    case "sdkmanager":
      return ok(next, [
        "Installed packages:",
        "  platforms;android-35",
        "  build-tools;35.0.0",
        "  platform-tools",
        "  ndk;27.0.12077973",
      ]);
    case "adb":
      return ok(next, [
        args[0] === "devices" || !args[0]
          ? "List of devices attached\nemulator-5554\tdevice product:ultra_pixel"
          : "adb: " + args.join(" ") + " — emulator-5554 online",
      ]);
    case "xcodebuild":
      return ok(next, [
        "xcodebuild (virtualized) Xcode 16.4",
        "scheme: UltraWeather  destination: iPhone 16 (WebKit)",
        "Compile Swift: ContentView.swift",
        "Link UltraWeather.app",
        "** BUILD SUCCEEDED **",
      ]);
    case "gradle":
    case "./gradlew":
      return ok(next, [
        "Welcome to Gradle 8.11",
        "> Task :app:assembleDebug",
        "BUILD SUCCESSFUL in 1s",
      ]);
    case "kotlin":
      return ok(next, ["Kotlin version 2.1.20 (JRE 21.0.5)"]);
    case "swift":
      return ok(next, ["swift-driver version: 1.115 Apple Swift version 6.1"]);
    case "git": {
      if (args[0] === "status") {
        return ok(next, [
          "On branch main",
          "nothing to commit, working tree clean",
        ]);
      }
      if (args[0] === "log") {
        return ok(next, [
          "commit 7a1c9e2  (HEAD -> main)",
          "Author: ultra <dev@ultra>",
          "    Initial UltraWeather scaffold",
        ]);
      }
      if (args[0] === "branch") return ok(next, ["* main"]);
      return ok(next, ["usage: git status | git log | git branch"]);
    }
    case "ping": {
      const host = args.find((a) => !a.startsWith("-")) ?? "127.0.0.1";
      if (!LAB_HOSTS.has(host)) {
        return err(next, [
          `ping: ${host}: sandbox allows only 127.0.0.1 and lab.ultra.local`,
        ]);
      }
      return ok(next, [
        `PING ${host} (127.0.0.1): 56 data bytes`,
        "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.4 ms",
        "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.3 ms",
      ]);
    }
    case "nmap": {
      const host = args.find((a) => !a.startsWith("-")) ?? "";
      if (!host) return ok(next, ["Nmap 7.95 ( https://nmap.org )", "usage: nmap lab.ultra.local"]);
      if (!LAB_HOSTS.has(host)) {
        return err(next, [
          "nmap: scans are limited to the ULTRA lab (127.0.0.1, lab.ultra.local).",
        ]);
      }
      return ok(next, [
        `Starting Nmap 7.95 at ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`,
        `Nmap scan report for ${host}`,
        "Host is up (0.0004s latency).",
        "PORT     STATE SERVICE",
        "22/tcp   open  ssh",
        "8080/tcp open  http-proxy",
        "18789/tcp open openclaw-gateway",
        "Nmap done: 1 IP address (1 host up) scanned",
      ]);
    }
    default:
      return err(next, [
        `zsh: command not found: ${cmd}`,
        "Type `help` for the virtualized Kali command set.",
      ]);
  }
}
