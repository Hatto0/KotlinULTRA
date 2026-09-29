import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as Slot, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { _ as Bot, a as Search, c as Network, d as GitBranch, f as Folder, g as ChevronRight, h as CodeXml, i as Smartphone, l as Menu, m as FileCode, o as Puzzle, p as FolderTree, r as SquareTerminal, s as Play, t as X, u as Globe, v as ArrowUp } from "../_libs/lucide-react.mjs";
import { n as nn, r as qt, t as Qt } from "../_libs/react-resizable-panels.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B9RzFW_h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isLoginRequired(result) {
	return result.ok === false && result.loginRequired === true;
}
function isFramed() {
	try {
		return window.self !== window.top;
	} catch {
		return true;
	}
}
function redirectToLoginIfRequired(result) {
	if (!isLoginRequired(result)) return false;
	const url = result.loginUrl;
	if (!url) return false;
	if (typeof window === "undefined") return false;
	if (isFramed()) {
		const opened = window.open(url, "_blank");
		if (opened) {
			opened.opener = null;
			return true;
		}
	}
	window.location.assign(url);
	return true;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,box-shadow,background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90 shadow-[var(--shadow-border)]",
			secondary: "bg-elevated text-fg hover:bg-elevated/80 shadow-[var(--shadow-border)]",
			ghost: "text-muted hover:text-fg hover:bg-elevated",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			sm: "h-8 rounded-[var(--radius-sm)] px-2.5 text-xs",
			md: "h-10 rounded-[var(--radius-md)] px-3.5 text-sm",
			lg: "h-11 rounded-[var(--radius-md)] px-4 text-sm",
			icon: "size-10 rounded-[var(--radius-md)]",
			"icon-sm": "size-8 rounded-[var(--radius-sm)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Badge({ className, tone = "muted", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide", {
			muted: "text-muted bg-elevated",
			ok: "text-ok bg-ok/10",
			warn: "text-warn bg-warn/10",
			danger: "text-danger bg-danger/10",
			accent: "text-accent-fg bg-accent"
		}[tone], className),
		...props
	});
}
function Sheet({ open, onOpenChange, side = "left", title, children }) {
	const pos = side === "left" ? "inset-y-0 left-0 w-[min(86vw,20rem)] border-r" : side === "right" ? "inset-y-0 right-0 w-[min(86vw,22rem)] border-l" : "inset-x-0 bottom-0 max-h-[78vh] rounded-t-[var(--radius-xl)] border-t";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-bg/70 data-[state=open]:animate-[fadeIn_var(--motion-fast)_var(--ease-out)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn("fixed z-50 bg-surface text-fg shadow-[var(--shadow-border)] outline-none", pos),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-sm font-medium tracking-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ide-scroll h-[calc(100%-3.25rem)] overflow-auto",
				children
			})]
		})] })
	});
}
var KALI_STABLE = "2026.3";
var KALI_ROLLING = "2026.4";
function dir(name, children) {
	return {
		type: "dir",
		name,
		children
	};
}
function file(name, content) {
	return {
		type: "file",
		name,
		content
	};
}
function createFs() {
	return dir("/", {
		home: dir("home", { kali: dir("kali", {
			"UltraWeather": dir("UltraWeather", { README: file("README", "Kotlin ULTRA workspace mount.\n") }),
			".zshrc": file(".zshrc", "export PATH=$PATH:/usr/bin:/opt/ultra/bin\n")
		}) }),
		etc: dir("etc", { "os-release": file("os-release", `PRETTY_NAME="Kali GNU/Linux Rolling ${KALI_STABLE}"
NAME="Kali GNU/Linux"
VERSION="${KALI_STABLE}"
ID=kali
VERSION_ID="${KALI_STABLE}"
HOME_URL="https://www.kali.org/"
`) }),
		opt: dir("opt", {
			"android-sdk": dir("android-sdk", { README: file("README", "Android SDK 35 · platform-tools 35.0.2\n") }),
			xcode: dir("xcode", { README: file("README", "Xcode 16.4 toolchain (virtualized)\n") }),
			ultra: dir("ultra", { bin: dir("bin", {}) })
		}),
		usr: dir("usr", { bin: dir("bin", {}) }),
		tmp: dir("tmp", {})
	});
}
var fsRoot = createFs();
function resolve(path) {
	if (!path) return "/home/kali";
	const parts = [];
	const src = path.startsWith("/") ? path : path;
	for (const p of src.split("/")) {
		if (!p || p === ".") continue;
		if (p === "..") parts.pop();
		else parts.push(p);
	}
	return "/" + parts.join("/");
}
function abs(cwd, path) {
	if (path.startsWith("/")) return resolve(path);
	if (path === "~" || path.startsWith("~/")) return resolve("/home/kali" + path.slice(1));
	return resolve(cwd + "/" + path);
}
function walk(path) {
	if (path === "/") return fsRoot;
	const parts = path.split("/").filter(Boolean);
	let node = fsRoot;
	for (const p of parts) {
		if (!node || node.type !== "dir" || !node.children) return null;
		node = node.children[p];
	}
	return node ?? null;
}
function displayCwd(cwd) {
	if (cwd === "/home/kali") return "~";
	if (cwd.startsWith("/home/kali/")) return "~" + cwd.slice(10);
	return cwd;
}
function promptLines(state) {
	return {
		userHost: `${state.user}㉿${state.host}`,
		path: displayCwd(state.cwd)
	};
}
function defaultKali() {
	fsRoot = createFs();
	return {
		cwd: "/home/kali",
		version: KALI_STABLE,
		user: "kali",
		host: "ultra",
		history: []
	};
}
function ok(state, lines) {
	return {
		state,
		lines,
		kind: "out"
	};
}
function err(state, lines) {
	return {
		state,
		lines,
		kind: "err"
	};
}
var HELP = [
	"Kotlin ULTRA · Kali GNU/Linux Rolling (virtualized ARM64)",
	"",
	"shell     ls  cd  pwd  cat  echo  whoami  uname  clear  history  help",
	"system    df  free  ps  env  date  uname -a",
	"kali      kali-upgrade  apt  nethunter",
	"mobile    sdkmanager  adb  xcodebuild  gradle  kotlin  swift",
	"git       git status  git log  git branch",
	"lab       nmap  ping   (loopback and lab.ultra.local only)",
	"",
	"Most stable track: 2026.3  ·  rolling target: 2026.4"
];
function runApt(state, args) {
	const sub = args[0] ?? "";
	if (sub === "update") return ok(state, [
		"Hit:1 https://http.kali.org/kali kali-rolling InRelease",
		"Reading package lists... done",
		`Kali ${state.version} indexes synchronized.`
	]);
	if (sub === "full-upgrade" || sub === "upgrade" || sub === "dist-upgrade") return kaliUpgrade(state);
	if (sub === "--version") return ok(state, [`apt 2.9.8 (${state.version})`]);
	return ok(state, ["apt 2.9.8", "usage: apt update | apt full-upgrade"]);
}
function kaliUpgrade(state) {
	if (state.version === "2026.4") return ok(state, ["Already on Kali Rolling 2026.4 — the current stable rolling snapshot.", "0 upgraded, 0 newly installed, 0 to remove."]);
	const next = {
		...state,
		version: KALI_ROLLING
	};
	const os = walk("/etc/os-release");
	if (os && os.type === "file") os.content = `PRETTY_NAME="Kali GNU/Linux Rolling ${KALI_ROLLING}"
NAME="Kali GNU/Linux"
VERSION="${KALI_ROLLING}"
ID=kali
VERSION_ID="${KALI_ROLLING}"
`;
	return ok(next, [
		"Calculating upgrade... done",
		"The following packages will be upgraded: kali-linux-core linux-image nethunter-core",
		"Applying rolling snapshot 2026.4 …",
		"Unpacking kali-linux-core (2026.4) …",
		"Setting up linux-image-6.12-arm64 …",
		"Restarting virtualized services … done",
		"Kali is now 2026.4 (rolling, most stable current)."
	]);
}
var LAB_HOSTS = /* @__PURE__ */ new Set([
	"127.0.0.1",
	"localhost",
	"lab.ultra.local",
	"::1"
]);
function runKali(state, raw) {
	const input = raw.trim();
	if (!input) return ok(state, []);
	const next = {
		...state,
		history: [...state.history, input]
	};
	const parts = input.split(/\s+/);
	const cmd = parts[0] ?? "";
	const args = parts.slice(1);
	switch (cmd) {
		case "help":
		case "kali": return ok(next, HELP);
		case "pwd": return ok(next, [next.cwd]);
		case "whoami": return ok(next, [next.user]);
		case "date": return ok(next, [(/* @__PURE__ */ new Date()).toUTCString()]);
		case "clear": return ok(next, ["__CLEAR__"]);
		case "history": return ok(next, next.history.map((h, i) => ` ${i + 1}  ${h}`));
		case "echo": return ok(next, [args.join(" ")]);
		case "uname":
			if (args.includes("-a")) return ok(next, [`Linux ${next.host} 6.12.0-kali6-arm64 #1 SMP Kali ${next.version} aarch64 GNU/Linux`]);
			return ok(next, ["Linux"]);
		case "cd": {
			const target = abs(next.cwd, args[0] ?? "~");
			const node = walk(target);
			if (!node || node.type !== "dir") return err(next, [`cd: no such directory: ${args[0] ?? ""}`]);
			return ok({
				...next,
				cwd: target
			}, []);
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
			const node = walk(abs(next.cwd, args[0]));
			if (!node || node.type !== "file") return err(next, [`cat: ${args[0]}: No such file`]);
			return ok(next, (node.content ?? "").replace(/\n$/, "").split("\n"));
		}
		case "env": return ok(next, [
			"USER=kali",
			"HOME=/home/kali",
			"SHELL=/usr/bin/zsh",
			"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/opt/ultra/bin",
			`KALI_VERSION=${next.version}`
		]);
		case "df": return ok(next, ["Filesystem     1K-blocks    Used Available Use%", "overlay           4194304  980120   3214184  24%"]);
		case "free": return ok(next, ["               total        used        free", "Mem:         2048000      640120     1407880"]);
		case "ps": return ok(next, [
			"PID TTY          TIME CMD",
			"  1 pts/0    00:00:00 zsh",
			" 42 pts/0    00:00:00 ultra-gateway",
			" 88 pts/0    00:00:00 grok-agent"
		]);
		case "apt":
		case "apt-get": return runApt(next, args);
		case "sudo":
			if (args[0] === "apt" || args[0] === "apt-get") return runApt(next, args.slice(1));
			if (args[0] === "kali-upgrade") return kaliUpgrade(next);
			return ok(next, ["sudo: simulated — root granted in the virtualizer"]);
		case "kali-upgrade": return kaliUpgrade(next);
		case "nethunter": return ok(next, [
			"Kali NetHunter (virtualized) " + next.version,
			"Device: Kotlin ULTRA ARM64 workspace",
			"Chroot: /data/local/nhsystem/kali-arm64",
			"Status: running"
		]);
		case "sdkmanager": return ok(next, [
			"Installed packages:",
			"  platforms;android-35",
			"  build-tools;35.0.0",
			"  platform-tools",
			"  ndk;27.0.12077973"
		]);
		case "adb": return ok(next, [args[0] === "devices" || !args[0] ? "List of devices attached\nemulator-5554	device product:ultra_pixel" : "adb: " + args.join(" ") + " — emulator-5554 online"]);
		case "xcodebuild": return ok(next, [
			"xcodebuild (virtualized) Xcode 16.4",
			"scheme: UltraWeather  destination: iPhone 16 (WebKit)",
			"Compile Swift: ContentView.swift",
			"Link UltraWeather.app",
			"** BUILD SUCCEEDED **"
		]);
		case "gradle":
		case "./gradlew": return ok(next, [
			"Welcome to Gradle 8.11",
			"> Task :app:assembleDebug",
			"BUILD SUCCESSFUL in 1s"
		]);
		case "kotlin": return ok(next, ["Kotlin version 2.1.20 (JRE 21.0.5)"]);
		case "swift": return ok(next, ["swift-driver version: 1.115 Apple Swift version 6.1"]);
		case "git":
			if (args[0] === "status") return ok(next, ["On branch main", "nothing to commit, working tree clean"]);
			if (args[0] === "log") return ok(next, [
				"commit 7a1c9e2  (HEAD -> main)",
				"Author: ultra <dev@ultra>",
				"    Initial UltraWeather scaffold"
			]);
			if (args[0] === "branch") return ok(next, ["* main"]);
			return ok(next, ["usage: git status | git log | git branch"]);
		case "ping": {
			const host = args.find((a) => !a.startsWith("-")) ?? "127.0.0.1";
			if (!LAB_HOSTS.has(host)) return err(next, [`ping: ${host}: sandbox allows only 127.0.0.1 and lab.ultra.local`]);
			return ok(next, [
				`PING ${host} (127.0.0.1): 56 data bytes`,
				"64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.4 ms",
				"64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.3 ms"
			]);
		}
		case "nmap": {
			const host = args.find((a) => !a.startsWith("-")) ?? "";
			if (!host) return ok(next, ["Nmap 7.95 ( https://nmap.org )", "usage: nmap lab.ultra.local"]);
			if (!LAB_HOSTS.has(host)) return err(next, ["nmap: scans are limited to the ULTRA lab (127.0.0.1, lab.ultra.local)."]);
			return ok(next, [
				`Starting Nmap 7.95 at ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " ")} UTC`,
				`Nmap scan report for ${host}`,
				"Host is up (0.0004s latency).",
				"PORT     STATE SERVICE",
				"22/tcp   open  ssh",
				"8080/tcp open  http-proxy",
				"18789/tcp open openclaw-gateway",
				"Nmap done: 1 IP address (1 host up) scanned"
			]);
		}
		default: return err(next, [`zsh: command not found: ${cmd}`, "Type `help` for the virtualized Kali command set."]);
	}
}
var PROJECT_NAME = "UltraWeather";
var WELCOME_PATH = "WELCOME.md";
var seedFiles = [
	{
		path: "WELCOME.md",
		content: `# Kotlin ULTRA

Mobile-first IDE for iOS and Android — Xcode density, Android Studio tooling, agentic flow.

## Try this
- Open \`iosApp/UltraWeather/ContentView.swift\` and change a \`Text\` string. Preview updates live.
- Open \`app/src/main/kotlin/com/ultra/weather/ui/HomeScreen.kt\` and tap Run on Android.
- Open the Kali terminal. Type \`help\`, then \`kali-upgrade\`.
- Ask Grok to add a forecast row, or deploy an AI swarm with that mission.
- Clone a public GitHub repo from Integrations.

Current target: **${PROJECT_NAME}** · Kotlin Multiplatform + SwiftUI + Compose
`
	},
	{
		path: "settings.gradle.kts",
		content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

rootProject.name = "UltraWeather"
include(":app")
include(":shared")
`
	},
	{
		path: "shared/src/commonMain/kotlin/Weather.kt",
		content: `package com.ultra.weather.shared

data class Weather(
    val city: String,
    val tempF: Int,
    val condition: String,
    val high: Int,
    val low: Int,
    val windMph: Int,
)

object WeatherRepository {
    fun now(): Weather = Weather(
        city = "San Francisco",
        tempF = 72,
        condition = "Clear",
        high = 76,
        low = 61,
        windMph = 8,
    )
}
`
	},
	{
		path: "app/src/main/kotlin/com/ultra/weather/MainActivity.kt",
		content: `package com.ultra.weather

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.ultra.weather.ui.HomeScreen
import com.ultra.weather.ui.theme.UltraTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            UltraTheme {
                HomeScreen()
            }
        }
    }
}
`
	},
	{
		path: "app/src/main/kotlin/com/ultra/weather/ui/HomeScreen.kt",
		content: `package com.ultra.weather.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ultra.weather.shared.WeatherRepository

@Composable
fun HomeScreen() {
    val weather = WeatherRepository.now()
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(28.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
        horizontalAlignment = Alignment.Start,
    ) {
        Text(weather.city, fontSize = 16.sp)
        Text("\${weather.tempF}°", fontSize = 72.sp)
        Text(weather.condition, fontSize = 22.sp)
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Text("H: \${weather.high}°")
            Text("L: \${weather.low}°")
        }
        Text("Wind \${weather.windMph} mph")
    }
}
`.replace(/\\\$/g, "$")
	},
	{
		path: "app/src/main/kotlin/com/ultra/weather/ui/theme/Theme.kt",
		content: `package com.ultra.weather.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val UltraDark = darkColorScheme(
    background = Color(0xFF07080C),
    surface = Color(0xFF111318),
    onBackground = Color(0xFFECEEF2),
    primary = Color(0xFFC5CCD6),
)

@Composable
fun UltraTheme(content: @Composable () -> Unit) {
    MaterialTheme(colorScheme = UltraDark, content = content)
}
`
	},
	{
		path: "app/src/main/res/values/themes.xml",
		content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.UltraWeather" parent="android:Theme.Material.NoActionBar">
        <item name="android:statusBarColor">#07080C</item>
        <item name="android:navigationBarColor">#07080C</item>
        <item name="android:windowBackground">#07080C</item>
    </style>
</resources>
`
	},
	{
		path: "iosApp/UltraWeather/ContentView.swift",
		content: `import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("San Francisco")
            Text("72°")
            Text("Clear")
            HStack(spacing: 16) {
                Text("H: 76°")
                Text("L: 61°")
            }
            Text("Wind 8 mph")
        }
        .padding(28)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(Color.black)
        .foregroundStyle(Color.white)
    }
}

#Preview {
    ContentView()
}
`
	},
	{
		path: "iosApp/UltraWeather/WeatherCard.swift",
		content: `import SwiftUI

struct WeatherCard: View {
    let city: String
    let temp: Int
    let condition: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(city)
            Text("\\(temp)°")
            Text(condition)
        }
        .padding(20)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 20))
    }
}
`
	},
	{
		path: "iosApp/UltraWeather/UltraWeatherApp.swift",
		content: `import SwiftUI

@main
struct UltraWeatherApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
`
	},
	{
		path: "iosApp/Info.plist",
		content: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>UltraWeather</string>
    <key>CFBundleIdentifier</key>
    <string>com.ultra.weather</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>UILaunchScreen</key>
    <dict/>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>
</dict>
</plist>
`
	},
	{
		path: "preview/index.html",
		content: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UltraWeather WebKit</title>
    <style>
      html, body { margin: 0; height: 100%; background: #07080c; color: #eceef2;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { padding: 28px; }
      .city { font-size: 16px; opacity: 0.72; letter-spacing: 0.04em; }
      .temp { font-size: 72px; font-weight: 500; letter-spacing: -0.04em; line-height: 1; margin: 8px 0; }
      .cond { font-size: 22px; }
      .row { display: flex; gap: 16px; margin-top: 10px; opacity: 0.8; }
    </style>
  </head>
  <body>
    <main>
      <div class="city">San Francisco</div>
      <div class="temp">72°</div>
      <div class="cond">Clear</div>
      <div class="row"><span>H: 76°</span><span>L: 61°</span></div>
      <div class="row">Wind 8 mph</div>
    </main>
  </body>
</html>
`
	}
];
var KEYWORDS = {
	kotlin: [
		"abstract",
		"actual",
		"annotation",
		"as",
		"break",
		"by",
		"catch",
		"class",
		"companion",
		"const",
		"constructor",
		"continue",
		"crossinline",
		"data",
		"delegate",
		"do",
		"else",
		"enum",
		"expect",
		"external",
		"false",
		"final",
		"finally",
		"for",
		"fun",
		"get",
		"if",
		"import",
		"in",
		"infix",
		"init",
		"inline",
		"inner",
		"interface",
		"internal",
		"is",
		"lateinit",
		"noinline",
		"null",
		"object",
		"open",
		"operator",
		"out",
		"override",
		"package",
		"private",
		"protected",
		"public",
		"reified",
		"return",
		"sealed",
		"set",
		"super",
		"suspend",
		"tailrec",
		"this",
		"throw",
		"true",
		"try",
		"typealias",
		"typeof",
		"val",
		"var",
		"vararg",
		"when",
		"where",
		"while"
	],
	swift: [
		"associatedtype",
		"actor",
		"as",
		"async",
		"await",
		"break",
		"case",
		"catch",
		"class",
		"continue",
		"convenience",
		"default",
		"defer",
		"deinit",
		"do",
		"else",
		"enum",
		"extension",
		"fallthrough",
		"false",
		"fileprivate",
		"final",
		"for",
		"func",
		"get",
		"guard",
		"if",
		"import",
		"in",
		"indirect",
		"infix",
		"init",
		"inout",
		"internal",
		"is",
		"lazy",
		"let",
		"mutating",
		"nil",
		"nonisolated",
		"open",
		"operator",
		"optional",
		"override",
		"postfix",
		"precedencegroup",
		"prefix",
		"private",
		"protocol",
		"public",
		"repeat",
		"required",
		"rethrows",
		"return",
		"self",
		"Self",
		"set",
		"some",
		"static",
		"struct",
		"subscript",
		"super",
		"switch",
		"throw",
		"throws",
		"true",
		"try",
		"typealias",
		"var",
		"weak",
		"where",
		"while",
		"willSet",
		"didSet"
	],
	gradle: [
		"plugins",
		"id",
		"android",
		"kotlin",
		"dependencies",
		"implementation",
		"api",
		"testImplementation",
		"classpath",
		"apply",
		"true",
		"false",
		"repositories",
		"google",
		"mavenCentral",
		"version",
		"applicationId"
	],
	xml: [],
	json: [
		"true",
		"false",
		"null"
	],
	js: [
		"async",
		"await",
		"break",
		"case",
		"catch",
		"class",
		"const",
		"continue",
		"debugger",
		"default",
		"delete",
		"do",
		"else",
		"export",
		"extends",
		"false",
		"finally",
		"for",
		"function",
		"if",
		"import",
		"in",
		"instanceof",
		"let",
		"new",
		"null",
		"return",
		"static",
		"super",
		"switch",
		"this",
		"throw",
		"true",
		"try",
		"typeof",
		"var",
		"void",
		"while",
		"with",
		"yield"
	],
	ts: [
		"as",
		"async",
		"await",
		"break",
		"case",
		"catch",
		"class",
		"const",
		"continue",
		"declare",
		"default",
		"delete",
		"do",
		"else",
		"enum",
		"export",
		"extends",
		"false",
		"finally",
		"for",
		"from",
		"function",
		"if",
		"implements",
		"import",
		"in",
		"infer",
		"instanceof",
		"interface",
		"keyof",
		"let",
		"new",
		"null",
		"of",
		"private",
		"protected",
		"public",
		"readonly",
		"return",
		"static",
		"super",
		"switch",
		"this",
		"throw",
		"true",
		"try",
		"type",
		"typeof",
		"var",
		"void",
		"while",
		"with",
		"yield"
	],
	html: [],
	css: [
		"important",
		"from",
		"to"
	],
	md: [],
	plist: [],
	sh: [
		"if",
		"then",
		"else",
		"fi",
		"for",
		"do",
		"done",
		"in",
		"while",
		"case",
		"esac",
		"function",
		"return",
		"export",
		"local",
		"true",
		"false"
	]
};
function escapeHtml(s) {
	return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
function langKey(language) {
	const l = language.toLowerCase();
	if (l === "kotlin" || l === "kt" || l === "kts") return "kotlin";
	if (l === "swift") return "swift";
	if (l === "gradle" || l === "kts-gradle") return "gradle";
	if (l === "xml" || l === "plist") return l === "plist" ? "plist" : "xml";
	if (l === "json") return "json";
	if (l === "javascript" || l === "js") return "js";
	if (l === "typescript" || l === "ts" || l === "tsx") return "ts";
	if (l === "html") return "html";
	if (l === "css") return "css";
	if (l === "markdown" || l === "md") return "md";
	if (l === "bash" || l === "sh" || l === "zsh") return "sh";
	return l;
}
function languageFromPath(path) {
	const name = path.split("/").pop() ?? path;
	if (name.endsWith(".kt") || name.endsWith(".kts")) return "kotlin";
	if (name.endsWith(".swift")) return "swift";
	if (name.endsWith(".xml")) return "xml";
	if (name.endsWith(".plist")) return "plist";
	if (name.endsWith(".json")) return "json";
	if (name.endsWith(".html") || name.endsWith(".htm")) return "html";
	if (name.endsWith(".css")) return "css";
	if (name.endsWith(".md")) return "md";
	if (name.endsWith(".ts") || name.endsWith(".tsx")) return "ts";
	if (name.endsWith(".js") || name.endsWith(".jsx")) return "js";
	if (name.endsWith(".gradle")) return "gradle";
	if (name.endsWith(".sh")) return "sh";
	return "text";
}
function wrap(cls, text) {
	return `<span class="${cls}">${text}</span>`;
}
function highlightCodeLine(line, language) {
	const key = langKey(language);
	if (key === "md") {
		if (line.startsWith("#")) return wrap("tok-kw", escapeHtml(line));
		return escapeHtml(line).replace(/`([^`]+)`/g, (_m, g1) => wrap("tok-str", "`" + g1 + "`"));
	}
	if (key === "xml" || key === "html" || key === "plist") return escapeHtml(line).replace(/(<\/?[\w:-]+)/g, (m) => wrap("tok-kw", m)).replace(/([\w:-]+)=/g, (m) => wrap("tok-attr", m.slice(0, -1)) + "=").replace(/(".*?"|&#39;.*?&#39;)/g, (m) => wrap("tok-str", m));
	const keywords = new Set(KEYWORDS[key] ?? KEYWORDS.kotlin);
	let i = 0;
	let out = "";
	const n = line.length;
	while (i < n) {
		const rest = line.slice(i);
		if (rest.startsWith("//") || key === "sh" && rest.startsWith("#")) {
			out += wrap("tok-cm", escapeHtml(line.slice(i)));
			break;
		}
		if (rest.startsWith("/*")) {
			const end = line.indexOf("*/", i + 2);
			const endAt = end === -1 ? n : end + 2;
			out += wrap("tok-cm", escapeHtml(line.slice(i, endAt)));
			i = endAt;
			continue;
		}
		const str = rest.match(/^("""[\s\S]*?"""|"(?:\\.|[^"\\])*(?:"|$)|'(?:\\.|[^'\\])*(?:'|$))/);
		if (str) {
			out += wrap("tok-str", escapeHtml(str[0]));
			i += str[0].length;
			continue;
		}
		const num = rest.match(/^\b\d[\d_]*(\.\d+)?[fFL]?\b/);
		if (num) {
			out += wrap("tok-num", num[0]);
			i += num[0].length;
			continue;
		}
		const ident = rest.match(/^[A-Za-z_@$][\w$]*/);
		if (ident) {
			const w = ident[0];
			const nextNonSpace = line.slice(i + w.length).match(/^\s*(\(|\{)/);
			if (keywords.has(w)) out += wrap("tok-kw", escapeHtml(w));
			else if (/^[A-Z]/.test(w)) out += wrap("tok-type", escapeHtml(w));
			else if (nextNonSpace) out += wrap("tok-fn", escapeHtml(w));
			else out += escapeHtml(w);
			i += w.length;
			continue;
		}
		const punct = rest[0];
		if (punct && "{}[]().,;:".includes(punct)) {
			out += wrap("tok-punct", escapeHtml(punct));
			i += 1;
			continue;
		}
		out += escapeHtml(punct ?? "");
		i += 1;
	}
	return out;
}
function highlight(source, language) {
	return source.split("\n").map((line) => highlightCodeLine(line, language) || " ").join("\n");
}
var ALL_AGENTS = [
	"architect",
	"ios",
	"android",
	"kotlin",
	"security",
	"qa",
	"openclaw",
	"deploy"
];
function filesFromSeed() {
	const files = {};
	for (const f of seedFiles) files[f.path] = {
		path: f.path,
		content: f.content
	};
	return files;
}
var seq = 0;
function nid(prefix) {
	seq += 1;
	return `${prefix}_${Date.now().toString(36)}_${seq}`;
}
var useIde = create()(persist((set, get) => ({
	files: filesFromSeed(),
	openTabs: [WELCOME_PATH],
	activePath: WELCOME_PATH,
	view: "editor",
	desktopPanel: "terminal",
	target: "ios",
	device: "iphone-16",
	projectName: PROJECT_NAME,
	kali: defaultKali(),
	termLines: [{
		id: "boot",
		kind: "sys",
		text: `Kali GNU/Linux Rolling ${defaultKali().version} · ultra arm64 — type help`
	}],
	grokMessages: [],
	grokBusy: false,
	provider: "grok",
	clawRunning: false,
	clawChannels: [
		{
			id: "imessage",
			name: "iMessage",
			on: true
		},
		{
			id: "telegram",
			name: "Telegram",
			on: false
		},
		{
			id: "discord",
			name: "Discord",
			on: false
		},
		{
			id: "slack",
			name: "Slack",
			on: false
		}
	],
	swarmAgents: [...ALL_AGENTS],
	swarmMission: "Add a 4-hour forecast strip to iOS and Android home screens.",
	swarmEvents: [],
	swarmBusy: false,
	commandOpen: false,
	resetProject: () => set({
		files: filesFromSeed(),
		openTabs: [WELCOME_PATH],
		activePath: WELCOME_PATH,
		kali: defaultKali()
	}),
	setView: (view) => set({ view }),
	setDesktopPanel: (desktopPanel) => set({ desktopPanel }),
	setTarget: (target) => set({
		target,
		device: target === "ios" ? "iphone-16" : "pixel-9"
	}),
	setDevice: (device) => set({ device }),
	openFile: (path) => {
		const { openTabs } = get();
		set({
			activePath: path,
			openTabs: openTabs.includes(path) ? openTabs : [...openTabs, path],
			view: "editor"
		});
	},
	closeTab: (path) => {
		const { openTabs, activePath } = get();
		const next = openTabs.filter((p) => p !== path);
		const fallback = next[next.length - 1] ?? Object.keys(get().files)[0] ?? "WELCOME.md";
		set({
			openTabs: next,
			activePath: activePath === path ? fallback : activePath
		});
	},
	updateFile: (path, content) => {
		const files = { ...get().files };
		const prev = files[path];
		if (!prev) return;
		files[path] = {
			...prev,
			content
		};
		set({ files });
	},
	addFile: (path, content) => {
		const files = {
			...get().files,
			[path]: {
				path,
				content
			}
		};
		const { openTabs } = get();
		set({
			files,
			activePath: path,
			openTabs: openTabs.includes(path) ? openTabs : [...openTabs, path],
			view: "editor"
		});
	},
	setKali: (kali) => set({ kali }),
	pushTerm: (line) => set({ termLines: [...get().termLines.slice(-400), {
		...line,
		id: nid("t")
	}] }),
	clearTerm: () => set({ termLines: [] }),
	setProvider: (provider) => set({ provider }),
	setGrokBusy: (grokBusy) => set({ grokBusy }),
	pushGrok: (m) => set({ grokMessages: [...get().grokMessages, {
		...m,
		id: nid("g")
	}] }),
	toggleClaw: () => set({ clawRunning: !get().clawRunning }),
	toggleChannel: (id) => set({ clawChannels: get().clawChannels.map((c) => c.id === id ? {
		...c,
		on: !c.on
	} : c) }),
	toggleSwarmAgent: (id) => {
		const cur = get().swarmAgents;
		set({ swarmAgents: cur.includes(id) ? cur.filter((a) => a !== id) : [...cur, id] });
	},
	setSwarmMission: (swarmMission) => set({ swarmMission }),
	pushSwarmEvent: (e) => set({ swarmEvents: [...get().swarmEvents, {
		...e,
		id: nid("s"),
		at: Date.now()
	}] }),
	setSwarmBusy: (swarmBusy) => set({ swarmBusy }),
	setCommandOpen: (commandOpen) => set({ commandOpen })
}), {
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
		kali: {
			...s.kali,
			history: s.kali.history.slice(-50)
		}
	})
}));
function languageOf(path) {
	return languageFromPath(path);
}
var AGENT_META = {
	architect: {
		label: "Architect",
		blurb: "Shapes modules and APIs"
	},
	ios: {
		label: "iOS",
		blurb: "SwiftUI · Xcode"
	},
	android: {
		label: "Android",
		blurb: "Compose · Gradle"
	},
	kotlin: {
		label: "Kotlin",
		blurb: "Shared KMP"
	},
	security: {
		label: "Security",
		blurb: "Kali lab review"
	},
	qa: {
		label: "QA",
		blurb: "Device matrix"
	},
	openclaw: {
		label: "OpenClaw",
		blurb: "Gateway runner"
	},
	deploy: {
		label: "Deploy",
		blurb: "TestFlight · Play"
	}
};
function UltraMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "6",
				className: "fill-bg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: "fill-fg",
				d: "M4 6h4v20H4zm4 0h6v4l-4 6H8zm0 10h2l4 6v4H8z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "6",
				width: "4",
				height: "20",
				className: "fill-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "6",
				width: "4",
				height: "20",
				className: "fill-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "22",
				width: "12",
				height: "4",
				className: "fill-accent"
			})
		]
	});
}
function buildTree(paths) {
	const root = {
		name: "",
		path: "",
		children: {}
	};
	for (const path of paths) {
		const parts = path.split("/");
		let cur = root;
		let acc = "";
		for (let i = 0; i < parts.length; i++) {
			const name = parts[i] ?? "";
			acc = acc ? `${acc}/${name}` : name;
			cur.children ??= {};
			cur.children[name] ??= {
				name,
				path: acc,
				children: {},
				file: i === parts.length - 1
			};
			cur = cur.children[name];
		}
	}
	return root;
}
function TreeBranch({ node, depth }) {
	const activePath = useIde((s) => s.activePath);
	const openFile = useIde((s) => s.openFile);
	const isFile = node.file;
	const [open, setOpen] = (0, import_react.useState)(depth < 2);
	const kids = Object.values(node.children ?? {}).sort((a, b) => {
		const ad = a.file ? 1 : 0;
		const bd = b.file ? 1 : 0;
		if (ad !== bd) return ad - bd;
		return a.name.localeCompare(b.name);
	});
	if (isFile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => openFile(node.path),
		className: cn("flex h-9 w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 text-left text-xs", activePath === node.path ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/70 hover:text-fg"),
		style: { paddingLeft: 8 + depth * 12 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: node.name
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen((v) => !v),
		className: "flex h-9 w-full items-center gap-1.5 rounded-[var(--radius-sm)] px-2 text-left text-xs text-muted hover:bg-elevated/70 hover:text-fg",
		style: { paddingLeft: 8 + depth * 12 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("size-3.5 shrink-0 transition-transform duration-[var(--motion-quick)]", open && "rotate-90") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-3.5 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: node.name
			})
		]
	}), open ? kids.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeBranch, {
		node: c,
		depth: depth + 1
	}, c.path)) : null] });
}
function FileTree() {
	const files = useIde((s) => s.files);
	const tree = (0, import_react.useMemo)(() => buildTree(Object.keys(files).sort()), [files]);
	const kids = Object.values(tree.children ?? {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "ide-scroll h-full overflow-auto p-2",
		"aria-label": "Project files",
		children: kids.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeBranch, {
			node: c,
			depth: 0
		}, c.path))
	});
}
function EditorPane() {
	const files = useIde((s) => s.files);
	const openTabs = useIde((s) => s.openTabs);
	const activePath = useIde((s) => s.activePath);
	const openFile = useIde((s) => s.openFile);
	const closeTab = useIde((s) => s.closeTab);
	const updateFile = useIde((s) => s.updateFile);
	const file = files[activePath];
	const language = languageOf(activePath);
	const content = file?.content ?? "";
	const html = (0, import_react.useMemo)(() => highlight(content, language), [content, language]);
	const lines = content.split("\n");
	const lineCount = Math.max(lines.length, 1);
	const blockHeight = lineCount * 24 + 24;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ide-scroll flex shrink-0 gap-0 overflow-x-auto border-b border-border",
			children: openTabs.map((path) => {
				const name = path.split("/").pop() ?? path;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("group flex h-10 shrink-0 items-center border-r border-border", path === activePath ? "bg-surface text-fg" : "text-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => openFile(path),
						className: "h-10 max-w-44 truncate px-3 text-xs",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Close ${name}`,
						onClick: () => closeTab(path),
						className: "mr-1 inline-flex size-7 items-center justify-center rounded-[var(--radius-xs)] opacity-60 hover:bg-elevated hover:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
					})]
				}, path);
			})
		}), !file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-center justify-center text-sm text-muted",
			children: "Open a file from the explorer."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ide-scroll relative flex min-h-0 flex-1 overflow-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "sticky left-0 z-20 select-none border-r border-border bg-surface/80 py-3 pr-2 pl-3 font-mono text-xs leading-6 text-subtle",
				children: Array.from({ length: lineCount }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-right tabular-nums",
					children: i + 1
				}, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				style: { height: blockHeight },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-0 overflow-hidden whitespace-pre py-3 pr-4 pl-3 font-mono text-xs leading-6 text-fg",
					dangerouslySetInnerHTML: { __html: html }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: content,
					spellCheck: false,
					autoCapitalize: "off",
					autoCorrect: "off",
					onChange: (e) => updateFile(activePath, e.target.value),
					className: "absolute inset-0 z-10 h-full w-full resize-none overflow-hidden bg-transparent py-3 pr-4 pl-3 font-mono text-xs leading-6 text-transparent caret-fg outline-none",
					"aria-label": `Editor ${activePath}`
				})]
			})]
		})]
	});
}
function TerminalPane() {
	const kali = useIde((s) => s.kali);
	const setKali = useIde((s) => s.setKali);
	const lines = useIde((s) => s.termLines);
	const pushTerm = useIde((s) => s.pushTerm);
	const clearTerm = useIde((s) => s.clearTerm);
	const [value, setValue] = (0, import_react.useState)("");
	const bottom = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const p = promptLines(kali);
	(0, import_react.useEffect)(() => {
		bottom.current?.scrollIntoView({ block: "end" });
	}, [lines.length]);
	function submit(e) {
		e.preventDefault();
		const cmd = value;
		setValue("");
		const rendered = `┌──(${p.userHost})-[${p.path}]\n└─$ ${cmd}`;
		pushTerm({
			kind: "in",
			text: rendered
		});
		const result = runKali(kali, cmd);
		setKali(result.state);
		if (result.lines[0] === "__CLEAR__") {
			clearTerm();
			return;
		}
		if (result.lines.length) pushTerm({
			kind: result.kind,
			text: result.lines.join("\n")
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-bg",
		onClick: () => inputRef.current?.focus(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-9 shrink-0 items-center justify-between border-b border-border px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-2xs tracking-wide text-muted",
				children: [
					"kali@",
					kali.host,
					" · ",
					kali.version
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-2xs text-muted hover:text-fg",
				onClick: () => clearTerm(),
				children: "Clear"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ide-scroll min-h-0 flex-1 overflow-auto px-3 py-2 font-mono text-xs leading-5",
			children: [
				lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: l.kind === "err" ? "whitespace-pre-wrap text-danger" : l.kind === "in" ? "whitespace-pre-wrap text-fg" : l.kind === "sys" ? "whitespace-pre-wrap text-muted" : "whitespace-pre-wrap text-muted",
					children: l.kind === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KaliPrompt, { text: l.text }) : l.text
				}, l.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "kali-prompt-user",
								children: "┌──("
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "kali-prompt-user",
								children: p.userHost
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "kali-prompt-user",
								children: ")-["
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "kali-prompt-path",
								children: p.path
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "kali-prompt-user",
								children: "]"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kali-prompt-user",
							children: "└─$"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							value,
							onChange: (e) => setValue(e.target.value),
							className: "min-w-0 flex-1 bg-transparent text-fg outline-none",
							"aria-label": "Kali command",
							autoComplete: "off",
							spellCheck: false
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottom })
			]
		})]
	});
}
function KaliPrompt({ text }) {
	const idx = text.indexOf("└─$");
	const head = idx >= 0 ? text.slice(0, idx) : text;
	const tail = idx >= 0 ? text.slice(idx) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "kali-prompt-user",
		children: head
	}), tail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-fg",
		children: tail
	}) : null] });
}
function extractQuotedTexts(source) {
	const out = [];
	const re = /Text\(\s*"([^"]+)"/g;
	let m;
	while (m = re.exec(source)) if (m[1]) out.push(m[1]);
	const kt = /Text\(\s*"([^"]+)"\s*,/g;
	while (m = kt.exec(source)) if (m[1] && !out.includes(m[1])) out.push(m[1]);
	return out;
}
function page(inner, bg = "#07080c", fg = "#eceef2") {
	return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  html,body{margin:0;height:100%;background:${bg};color:${fg};
    font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif;}
  main{padding:28px;display:flex;flex-direction:column;gap:8px;min-height:100%;box-sizing:border-box;}
  .t0{font-size:15px;letter-spacing:.06em;text-transform:uppercase;opacity:.62;font-weight:500;}
  .t1{font-size:72px;line-height:1;letter-spacing:-.05em;font-weight:500;}
  .t2{font-size:22px;font-weight:500;}
  .row{display:flex;gap:16px;opacity:.8;margin-top:6px;}
  .chip{font-size:14px;}
</style></head><body><main>${inner}</main></body></html>`;
}
function swiftuiToHtml(source) {
	const texts = extractQuotedTexts(source);
	if (texts.length === 0) return page(`<div class="t2">SwiftUI preview</div><div class="chip">Add Text("…") to render live.</div>`);
	const [a, b, c, ...rest] = texts;
	const hero = b && /°|deg|temp/i.test(b) ? b : a;
	const city = hero === a ? c ? a : a : a;
	const cond = texts.find((t) => t !== city && t !== hero) ?? "";
	const extras = rest.filter((t) => t !== city && t !== hero && t !== cond);
	return page([
		city ? `<div class="t0">${escape(city)}</div>` : "",
		hero ? `<div class="t1">${escape(hero)}</div>` : "",
		cond ? `<div class="t2">${escape(cond)}</div>` : "",
		extras.length ? `<div class="row">${extras.map((t) => `<span class="chip">${escape(t)}</span>`).join("")}</div>` : ""
	].join(""));
}
function composeToHtml(source) {
	return swiftuiToHtml(source);
}
function htmlDocument(source) {
	const trimmed = source.trim();
	if (/^<!doctype/i.test(trimmed) || /^<html/i.test(trimmed)) return source;
	return page(source);
}
function escape(s) {
	return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
function previewKindFor(path, language) {
	if (path.endsWith(".swift") || language === "swift") return "ios";
	if (path.endsWith(".kt") && path.includes("/ui/")) return "android";
	if (path.endsWith(".html") || language === "html") return "web";
	if (path.endsWith(".xml") && path.includes("res/")) return "android";
	return "code";
}
function documentForFile(path, content, language) {
	const kind = previewKindFor(path, language);
	if (kind === "ios") return swiftuiToHtml(content);
	if (kind === "android" && language === "kotlin") return composeToHtml(content);
	if (kind === "web" || language === "html") return htmlDocument(content);
	return page(`<div class="t2">${escape(path.split("/").pop() ?? path)}</div>
     <div class="chip">No visual preview for this file. Run iOS or Android, or open an HTML / SwiftUI / Compose view.</div>`);
}
var FRAMES = {
	"iphone-16": {
		w: 320,
		h: 692,
		r: "2.4rem",
		label: "iPhone 16"
	},
	"ipad-mini": {
		w: 420,
		h: 640,
		r: "1.4rem",
		label: "iPad mini"
	},
	"pixel-9": {
		w: 320,
		h: 692,
		r: "1.8rem",
		label: "Pixel 9"
	},
	fold: {
		w: 380,
		h: 640,
		r: "1.2rem",
		label: "Pixel Fold"
	}
};
function PreviewPane() {
	const files = useIde((s) => s.files);
	const activePath = useIde((s) => s.activePath);
	const device = useIde((s) => s.device);
	const setDevice = useIde((s) => s.setDevice);
	const target = useIde((s) => s.target);
	const file = files[activePath];
	const language = languageOf(activePath);
	const kind = previewKindFor(activePath, language);
	const srcDoc = (0, import_react.useMemo)(() => documentForFile(activePath, file?.content ?? "", language), [
		activePath,
		file?.content,
		language
	]);
	const frame = FRAMES[device];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-10 shrink-0 items-center justify-between gap-2 border-b border-border px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "truncate text-xs text-muted",
				children: ["Virtualized WebKit · ", kind === "ios" ? "SwiftUI" : kind === "android" ? "Compose" : kind === "web" ? "HTML" : "source"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: (target === "ios" ? ["iphone-16", "ipad-mini"] : ["pixel-9", "fold"]).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDevice(id),
					className: cn("h-7 rounded-full px-2.5 text-2xs", device === id ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated"),
					children: FRAMES[id].label
				}, id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ide-scroll flex min-h-0 flex-1 items-start justify-center overflow-auto p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative shrink-0 bg-elevated p-2 shadow-[var(--shadow-border)]",
				style: {
					width: frame.w + 16,
					borderRadius: frame.r
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-2 h-4 w-20 rounded-full bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "WebKit preview",
					sandbox: "allow-scripts",
					srcDoc,
					className: "block bg-bg",
					style: {
						width: frame.w,
						height: frame.h,
						border: 0,
						borderRadius: `calc(${frame.r} - 8px)`
					}
				})]
			})
		})]
	});
}
var snippets = [
	{
		id: "swiftui-card",
		title: "SwiftUI glass card",
		platform: "ios",
		language: "swift",
		description: "Material card with city and temperature.",
		code: `struct GlassCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("San Francisco")
            Text("72°")
            Text("Clear")
        }
        .padding(20)
        .background(.ultraThinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 20))
    }
}
`
	},
	{
		id: "swiftui-list",
		title: "Forecast list",
		platform: "ios",
		language: "swift",
		description: "Hourly forecast using List.",
		code: `struct ForecastList: View {
    let hours = ["Now", "1PM", "2PM", "3PM"]
    var body: some View {
        List(hours, id: \\.self) { hour in
            HStack {
                Text(hour)
                Spacer()
                Text("72°")
            }
        }
    }
}
`
	},
	{
		id: "compose-scaffold",
		title: "Compose scaffold",
		platform: "android",
		language: "kotlin",
		description: "Material3 scaffold with a FAB.",
		code: `@Composable
fun WeatherScaffold() {
    Scaffold(
        floatingActionButton = {
            FloatingActionButton(onClick = {}) { Text("+") }
        }
    ) { padding ->
        Column(Modifier.padding(padding).padding(24.dp)) {
            Text("San Francisco")
            Text("72°")
        }
    }
}
`
	},
	{
		id: "compose-row",
		title: "Metric chips",
		platform: "android",
		language: "kotlin",
		description: "Row of compact weather metrics.",
		code: `@Composable
fun MetricRow() {
    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("H: 76°")
        Text("L: 61°")
        Text("UV 4")
        Text("Wind 8")
    }
}
`
	},
	{
		id: "kmp-repo",
		title: "Shared repository",
		platform: "kmp",
		language: "kotlin",
		description: "expect/actual-ready weather model.",
		code: `data class Hourly(val hour: String, val tempF: Int)

expect fun platformName(): String

class ForecastRepo {
    fun nextFour(): List<Hourly> = listOf(
        Hourly("Now", 72),
        Hourly("1PM", 73),
        Hourly("2PM", 74),
        Hourly("3PM", 73),
    )
}
`
	},
	{
		id: "gradle-kmp",
		title: "KMP android+ios",
		platform: "kmp",
		language: "kotlin",
		description: "shared module targets.",
		code: `kotlin {
    androidTarget()
    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
        it.binaries.framework { baseName = "Shared"; isStatic = true }
    }
    sourceSets {
        commonMain.dependencies { implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0") }
    }
}
`
	},
	{
		id: "webkit-hero",
		title: "WebKit hero",
		platform: "web",
		language: "html",
		description: "Device-ready HTML weather hero.",
		code: `<main style="padding:28px;font-family:-apple-system,sans-serif;background:#07080c;color:#eceef2;height:100%">
  <div style="opacity:.7">San Francisco</div>
  <div style="font-size:72px;letter-spacing:-.04em">72°</div>
  <div>Clear</div>
</main>
`
	},
	{
		id: "swift-nav",
		title: "Navigation stack",
		platform: "ios",
		language: "swift",
		description: "iOS 16+ NavigationStack.",
		code: `struct RootNav: View {
    var body: some View {
        NavigationStack {
            ContentView()
                .navigationTitle("UltraWeather")
                .toolbar {
                    ToolbarItem(placement: .topBarTrailing) {
                        Button("Radar") {}
                    }
                }
        }
    }
}
`
	}
];
function SnippetsPane() {
	const addFile = useIde((s) => s.addFile);
	const setView = useIde((s) => s.setView);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ide-scroll h-full overflow-auto p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Snippets"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Insert production-shaped pieces, then preview them on the virtual device."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3",
			children: snippets.map((s) => {
				const path = `snippets/${s.id}.${s.language === "html" ? "html" : s.language === "swift" ? "swift" : "kt"}`;
				const srcDoc = documentForFile(path, s.code, s.language);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium",
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: s.platform })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: s.description
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => {
								addFile(path, s.code);
								setView("editor");
							},
							children: "Insert"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 overflow-hidden rounded-[var(--radius-md)] bg-bg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: s.title,
							sandbox: "allow-scripts",
							srcDoc,
							className: "h-40 w-full border-0"
						})
					})]
				}, s.id);
			})
		})]
	});
}
var askGrok = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3b48a732b3fa0a8244ad5563a15ebd933ae02f8931951ca2a965c9c65a517e75"));
var fetchGithubRepo = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0f8312db61018acc02919c431577f12c7c89799bb7479a5dda8180c40bf8570a"));
var fetchGithubFile = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("4bb57031461cad3d2b36799667c2cc60bdf67defdd55ddc896ec41cfdb9f8bd7"));
var listGoogleDrive = createServerFn({ method: "POST" }).handler(createSsrRpc("c21c910ed1408c7fa941feb9aa6fd00feead0f9f2f920a6af2079fbf37fd9a21"));
var PROVIDERS = [
	{
		id: "grok",
		label: "Grok"
	},
	{
		id: "openai",
		label: "OpenAI"
	},
	{
		id: "claude",
		label: "Claude"
	},
	{
		id: "openclaw",
		label: "OpenClaw"
	}
];
function GrokPane() {
	const files = useIde((s) => s.files);
	const activePath = useIde((s) => s.activePath);
	const messages = useIde((s) => s.grokMessages);
	const busy = useIde((s) => s.grokBusy);
	const provider = useIde((s) => s.provider);
	const setProvider = useIde((s) => s.setProvider);
	const pushGrok = useIde((s) => s.pushGrok);
	const setBusy = useIde((s) => s.setGrokBusy);
	const updateFile = useIde((s) => s.updateFile);
	const [value, setValue] = (0, import_react.useState)("");
	async function send(prompt) {
		if (!prompt.trim() || busy) return;
		const file = files[activePath];
		pushGrok({
			role: "user",
			content: prompt
		});
		setBusy(true);
		const history = [...messages, {
			role: "user",
			content: prompt
		}].map((m) => ({
			role: m.role,
			content: m.content
		}));
		const res = await askGrok({ data: {
			prompt,
			context: file ? `Active file: ${activePath} (${languageOf(activePath)})\n\n${file.content}` : void 0,
			mode: provider,
			history
		} });
		setBusy(false);
		if (!res.ok) {
			pushGrok({
				role: "assistant",
				content: res.error
			});
			return;
		}
		pushGrok({
			role: "assistant",
			content: res.text
		});
	}
	function onSubmit(e) {
		e.preventDefault();
		const p = value;
		setValue("");
		send(p);
	}
	function applyLastCode() {
		const last = [...messages].reverse().find((m) => m.role === "assistant");
		if (!last) return;
		const block = last.content.match(/```(?:[\w+-]*)\n([\s\S]*?)```/);
		if (block?.[1]) updateFile(activePath, block[1].replace(/\n$/, ""));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-medium",
							children: "Assistant"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-2xs text-subtle",
						children: "Runtime is Grok 4.5. Other providers are voice/tool profiles on the same engine."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1",
						children: PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setProvider(p.id),
							className: cn("h-7 rounded-full px-2.5 text-2xs", provider === p.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated"),
							children: p.label
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ide-scroll min-h-0 flex-1 space-y-3 overflow-auto p-3",
				children: [
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Ask for a SwiftUI layout, a Compose refactor, or an explanation of the open file."
					}) : null,
					messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("rounded-[var(--radius-md)] px-3 py-2 text-sm leading-relaxed", m.role === "user" ? "bg-elevated text-fg" : "text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-2xs uppercase tracking-wide text-subtle",
							children: m.role === "user" ? "You" : provider === "grok" ? "Grok" : provider
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "whitespace-pre-wrap font-sans text-sm",
							children: m.content
						})]
					}, m.id)),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-4 w-32 rounded-full shimmer",
						"aria-label": "Thinking"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => void send("Explain the open file like a senior mobile engineer."),
							children: "Explain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => void send("Refactor the open file for clarity. Return the full file in one code block."),
							children: "Refactor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: applyLastCode,
							children: "Apply"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "flex items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value,
						onChange: (e) => setValue(e.target.value),
						placeholder: "Ask Grok…",
						rows: 2,
						className: "min-h-10 flex-1 resize-none rounded-[var(--radius-md)] bg-elevated px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle",
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								e.currentTarget.form?.requestSubmit();
							}
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: busy || !value.trim(),
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
					})]
				})]
			})
		]
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-10 w-full rounded-[var(--radius-md)] bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle outline-none transition-[box-shadow] duration-[var(--motion-quick)] focus:shadow-[var(--shadow-border-hover)] focus-visible:ring-2 focus-visible:ring-accent/40", className),
		...props
	});
}
function IntegrationsPane() {
	const addFile = useIde((s) => s.addFile);
	const clawRunning = useIde((s) => s.clawRunning);
	const toggleClaw = useIde((s) => s.toggleClaw);
	const channels = useIde((s) => s.clawChannels);
	const toggleChannel = useIde((s) => s.toggleChannel);
	const provider = useIde((s) => s.provider);
	const setProvider = useIde((s) => s.setProvider);
	const setView = useIde((s) => s.setView);
	const [repo, setRepo] = (0, import_react.useState)("android/nowinandroid");
	const [ghStatus, setGhStatus] = (0, import_react.useState)(null);
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [ghBusy, setGhBusy] = (0, import_react.useState)(false);
	const [driveStatus, setDriveStatus] = (0, import_react.useState)(null);
	const [driveItems, setDriveItems] = (0, import_react.useState)([]);
	const [driveBusy, setDriveBusy] = (0, import_react.useState)(false);
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
	async function importFile(e) {
		if (!e.downloadUrl) {
			setGhStatus("Folders cannot be imported in one shot — pick a file.");
			return;
		}
		const res = await fetchGithubFile({ data: {
			downloadUrl: e.downloadUrl,
			path: e.path
		} });
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
				loginUrl: res.loginUrl ?? void 0
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
		setDriveStatus(res.names.length ? `${res.names.length} items` : "Connected — no files returned.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ide-scroll h-full overflow-auto p-4 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-medium tracking-tight",
				children: "Integrations"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "GitHub public repos, Google Drive, model profiles, and the OpenClaw gateway."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "GitHub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "public API" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-3 flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							loadRepo();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: repo,
							onChange: (e) => setRepo(e.target.value),
							placeholder: "owner/repo",
							"aria-label": "GitHub repository"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							disabled: ghBusy,
							children: "Load"
						})]
					}),
					ghStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: ghStatus
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1",
						children: entries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate font-mono text-xs text-fg",
								children: [e.type === "dir" ? "/" : "", e.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => void importFile(e),
								children: "Import"
							})]
						}, e.path))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Google Drive"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "viewer data" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Lists files from the Google account connected in Grok."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "secondary",
						disabled: driveBusy,
						onClick: () => void loadDrive(),
						children: "Browse Drive"
					}),
					driveStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: driveStatus
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1",
						children: driveItems.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "truncate text-xs text-fg",
							children: n
						}, n))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Model profiles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							"Active: ",
							provider,
							". All chat is served by Grok 4.5."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							"grok",
							"openai",
							"claude",
							"openclaw"
						].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: provider === id ? "primary" : "secondary",
							onClick: () => {
								setProvider(id);
								setView("grok");
							},
							children: id === "openai" ? "OpenAI" : id === "claude" ? "Claude" : id === "openclaw" ? "OpenClaw" : "Grok"
						}, id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "OpenClaw gateway"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: clawRunning ? "ok" : "muted",
							children: clawRunning ? "running" : "stopped"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Local-style gateway on virtual port 18789. Channels route to Grok; skills can touch the Kali shell and files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: clawRunning ? "secondary" : "primary",
						onClick: toggleClaw,
						children: clawRunning ? "Stop gateway" : "Start gateway"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1",
						children: channels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex h-10 items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggleChannel(c.id),
								className: "text-xs text-muted hover:text-fg",
								children: c.on ? "On" : "Off"
							})]
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs text-subtle",
						children: "skills: file · kali-terminal · git · webkit-preview"
					})
				]
			})
		]
	});
}
var ORDER = [
	"architect",
	"ios",
	"android",
	"kotlin",
	"security",
	"qa",
	"openclaw",
	"deploy"
];
function SwarmPane() {
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
		push({
			agent: "control",
			text: `Deploying swarm · ${agents.length} agents`
		});
		for (const id of ORDER.filter((a) => agents.includes(a))) push({
			agent: AGENT_META[id].label,
			text: "online"
		});
		const file = files[activePath];
		const res = await askGrok({ data: {
			prompt: `Mission: ${mission}\nActive agents: ${agents.join(", ")}\nOpenClaw gateway: ${clawRunning ? "running" : "stopped"}\nWrite a coordinated plan. If you produce a file, use a single fenced code block and mention the path.`,
			context: file ? `${activePath}\n${file.content}` : void 0,
			mode: "swarm"
		} });
		setBusy(false);
		if (!res.ok) {
			push({
				agent: "control",
				text: res.error
			});
			return;
		}
		push({
			agent: "Architect",
			text: res.text.slice(0, 1200)
		});
		const pathHint = res.text.match(/(?:iosApp|app|shared|snippets)\/[\w./-]+\.\w+/);
		const block = res.text.match(/```(?:[\w+-]*)\n([\s\S]*?)```/);
		if (pathHint && block?.[1]) {
			addFile(pathHint[0], block[1].replace(/\n$/, ""));
			push({
				agent: "Deploy",
				text: `Wrote ${pathHint[0]} into the workspace.`
			});
			setView("editor");
		} else push({
			agent: "Deploy",
			text: "Plan ready. No file patch detected — review the timeline."
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0 flex-col bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ide-scroll min-h-0 flex-1 overflow-auto p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium tracking-tight",
					children: "AI swarm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Craft a specialist crew, then deploy. Grok coordinates; OpenClaw can run the gateway skills."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: ORDER.map((id) => {
						const on = agents.includes(id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggle(id),
							className: cn("flex h-[4.5rem] w-full flex-col items-start justify-center rounded-[var(--radius-md)] px-3 text-left shadow-[var(--shadow-border)]", on ? "bg-elevated text-fg" : "bg-surface text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: AGENT_META[id].label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xs text-subtle",
								children: AGENT_META[id].blurb
							})]
						}) }, id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-xs text-muted",
					children: ["Mission", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: mission,
						onChange: (e) => setMission(e.target.value),
						rows: 3,
						className: "mt-1 w-full resize-none rounded-[var(--radius-md)] bg-elevated px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					disabled: busy,
					onClick: () => void deploy(),
					children: busy ? "Deploying…" : "Deploy swarm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-2",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-[var(--radius-md)] bg-surface px-3 py-2 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: e.agent }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xs tabular-nums text-subtle",
								children: new Date(e.at).toLocaleTimeString()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-1 whitespace-pre-wrap font-sans text-xs text-fg",
							children: e.text
						})]
					}, e.id))
				})
			]
		})
	});
}
var ACTIONS = [
	{
		id: "editor",
		label: "Go to editor",
		run: (s) => s.setView("editor")
	},
	{
		id: "preview",
		label: "Open WebKit preview",
		run: (s) => s.setView("preview")
	},
	{
		id: "terminal",
		label: "Open Kali terminal",
		run: (s) => s.setView("terminal")
	},
	{
		id: "snippets",
		label: "Snippets library",
		run: (s) => s.setView("snippets")
	},
	{
		id: "grok",
		label: "Ask Grok",
		run: (s) => s.setView("grok")
	},
	{
		id: "integrations",
		label: "Integrations",
		run: (s) => s.setView("integrations")
	},
	{
		id: "swarm",
		label: "AI swarm",
		run: (s) => s.setView("swarm")
	},
	{
		id: "ios",
		label: "Target iOS",
		run: (s) => s.setTarget("ios")
	},
	{
		id: "android",
		label: "Target Android",
		run: (s) => s.setTarget("android")
	}
];
function CommandPalette() {
	const open = useIde((s) => s.commandOpen);
	const setOpen = useIde((s) => s.setCommandOpen);
	const files = useIde((s) => s.files);
	const openFile = useIde((s) => s.openFile);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen(!useIde.getState().commandOpen);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [setOpen]);
	const fileHits = (0, import_react.useMemo)(() => {
		const n = q.trim().toLowerCase();
		const paths = Object.keys(files);
		if (!n) return paths.slice(0, 8);
		return paths.filter((p) => p.toLowerCase().includes(n)).slice(0, 12);
	}, [files, q]);
	const actionHits = (0, import_react.useMemo)(() => {
		const n = q.trim().toLowerCase();
		return ACTIONS.filter((a) => !n || a.label.toLowerCase().includes(n) || a.id.includes(n));
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => {
			setOpen(o);
			if (!o) setQ("");
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed top-[12%] left-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 rounded-[var(--radius-lg)] bg-surface p-2 shadow-[var(--shadow-border)] outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "sr-only",
					children: "Command palette"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Files and commands",
					className: "h-11 w-full rounded-[var(--radius-md)] bg-elevated px-3 text-sm text-fg outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ide-scroll mt-2 max-h-72 overflow-auto",
					children: [actionHits.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex h-10 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm text-fg hover:bg-elevated",
						onClick: () => {
							a.run(useIde.getState());
							setOpen(false);
							setQ("");
						},
						children: a.label
					}, a.id)), fileHits.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex h-10 w-full items-center rounded-[var(--radius-sm)] px-3 text-left font-mono text-xs text-muted hover:bg-elevated hover:text-fg",
						onClick: () => {
							openFile(p);
							useIde.getState().setView("editor");
							setOpen(false);
							setQ("");
						},
						children: p
					}, p))]
				})
			]
		})] })
	});
}
var NAV = [
	{
		id: "editor",
		label: "Edit",
		icon: CodeXml
	},
	{
		id: "preview",
		label: "Preview",
		icon: Smartphone
	},
	{
		id: "terminal",
		label: "Kali",
		icon: SquareTerminal
	},
	{
		id: "grok",
		label: "Grok",
		icon: Bot
	},
	{
		id: "snippets",
		label: "Snips",
		icon: Puzzle
	}
];
function useDesktop() {
	const [d, setD] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 900px)");
		const apply = () => setD(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	return d;
}
function MainStage({ view }) {
	if (view === "preview") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPane, {});
	if (view === "terminal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalPane, {});
	if (view === "snippets") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnippetsPane, {});
	if (view === "grok") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokPane, {});
	if (view === "integrations") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationsPane, {});
	if (view === "swarm") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwarmPane, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorPane, {});
}
function runBuild() {
	const s = useIde.getState();
	s.setView("terminal");
	s.pushTerm({
		kind: "sys",
		text: s.target === "ios" ? "→ xcodebuild -scheme UltraWeather -destination 'platform=iOS Simulator,name=iPhone 16'" : "→ ./gradlew :app:assembleDebug"
	});
	const cmd = s.target === "ios" ? "xcodebuild" : "gradle";
	const result = runKali(s.kali, cmd);
	s.setKali(result.state);
	s.pushTerm({
		kind: "out",
		text: result.lines.join("\n")
	});
	window.setTimeout(() => s.setView("preview"), 480);
}
function Workspace() {
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
	const [filesOpen, setFilesOpen] = (0, import_react.useState)(false);
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (view !== "editor") setFilesOpen(false);
	}, [view]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-12 shrink-0 items-center gap-2 border-b border-border px-2 sm:px-3",
				children: [
					desktop ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-fg",
						"aria-label": "Files",
						onClick: () => setFilesOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UltraMark, { className: "size-7 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-sm font-semibold tracking-tight",
							children: "Kotlin ULTRA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-2xs text-muted",
							children: projectName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-1 sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTarget("ios"),
							className: cn("h-8 rounded-full px-3 text-xs", target === "ios" ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
							children: "iOS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTarget("android"),
							className: cn("h-8 rounded-full px-3 text-xs", target === "android" ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
							children: "Android"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setView("preview"),
						className: "hidden gap-1.5 pr-3 sm:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-3.5" }), "Preview"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: runBuild,
						className: "gap-1.5 pr-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), "Run"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "hidden size-10 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-fg md:inline-flex",
						"aria-label": "Command palette",
						onClick: () => setCommandOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
					})
				]
			}),
			desktop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(qt, {
					orientation: "horizontal",
					className: "h-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qt, {
							defaultSize: "18",
							minSize: "14",
							className: "flex flex-col overflow-hidden bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-9 shrink-0 items-center gap-2 border-b border-border px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderTree, { className: "size-3.5 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: "Explorer"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-h-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(nn, { className: "w-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
							minSize: "40",
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(qt, {
								orientation: "vertical",
								className: "h-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
										minSize: "40",
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainStage, { view: view === "terminal" || view === "snippets" || view === "grok" ? "editor" : view })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(nn, { className: "h-px bg-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qt, {
										defaultSize: "28",
										minSize: "16",
										className: "overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-9 items-center gap-1 border-b border-border px-2",
											children: ["terminal", "snippets"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													setDesktopPanel(id);
													if (id === "terminal") setView("terminal");
													if (id === "snippets") setView("snippets");
												},
												className: cn("h-7 rounded-[var(--radius-sm)] px-2 text-xs capitalize", desktopPanel === id ? "bg-elevated text-fg" : "text-muted"),
												children: id === "terminal" ? "Kali" : "Snippets"
											}, id))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-[calc(100%-2.25rem)]",
											children: desktopPanel === "snippets" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnippetsPane, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalPane, {})
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(nn, { className: "w-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
							defaultSize: "26",
							minSize: "18",
							className: "overflow-hidden bg-surface",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokPane, {})
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainStage, { view })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex h-9 shrink-0 items-center gap-3 border-t border-border px-3 text-2xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-3" }), " main"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden truncate sm:inline",
						children: activePath
					}),
					desktop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
						id: "integrations",
						label: "Integrations",
						icon: Globe,
						view,
						onSelect: setView
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
						id: "swarm",
						label: "Swarm",
						icon: Network,
						view,
						onSelect: setView
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: clawRunning ? "ok" : "muted",
							children: ["Claw ", clawRunning ? "up" : "off"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: ["Kali ", kali.version]
						})]
					})
				]
			}),
			desktop ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex h-14 shrink-0 items-center justify-around border-t border-border pb-[env(safe-area-inset-bottom)]",
				children: [NAV.map((item) => {
					const Icon = item.icon;
					const on = view === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView(item.id),
						className: cn("flex h-12 min-w-12 flex-col items-center justify-center gap-0.5 text-2xs", on ? "text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMoreOpen(true),
					className: cn("flex h-12 min-w-12 flex-col items-center justify-center gap-0.5 text-2xs", view === "integrations" || view === "swarm" ? "text-fg" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "size-4" }), "More"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: filesOpen,
				onOpenChange: setFilesOpen,
				title: "Explorer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTree, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: moreOpen,
				onOpenChange: setMoreOpen,
				side: "bottom",
				title: "Workspace",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "w-full justify-start",
							onClick: () => {
								setView("integrations");
								setMoreOpen(false);
							},
							children: "Integrations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							className: "w-full justify-start",
							onClick: () => {
								setView("swarm");
								setMoreOpen(false);
							},
							children: "AI swarm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								variant: target === "ios" ? "primary" : "secondary",
								onClick: () => setTarget("ios"),
								children: "iOS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								variant: target === "android" ? "primary" : "secondary",
								onClick: () => setTarget("android"),
								children: "Android"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "w-full",
							onClick: () => setCommandOpen(true),
							children: "Command palette"
						})
					]
				})
			})
		]
	});
}
function NavButton({ id, label, icon: Icon, view, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(id),
		className: cn("inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-2 text-xs", view === id ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {});
}
//#endregion
export { Home as component, redirectToLoginIfRequired as n, isLoginRequired as t };
