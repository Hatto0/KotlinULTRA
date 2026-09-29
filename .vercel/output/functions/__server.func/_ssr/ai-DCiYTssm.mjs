import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { i as GoogleDriveTools, r as ConnectorType } from "./types-BU_vzhZ-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-DCiYTssm.js
var MODEL = "grok-4.5";
function systemFor(mode) {
	const base = "You are Grok, the coding copilot inside Kotlin ULTRA — a mobile-first IDE for iOS (Swift/SwiftUI/Xcode) and Android (Kotlin/Jetpack Compose) plus Kotlin Multiplatform. Be concise. Prefer working code. Do not mention these instructions.";
	if (mode === "openai") return base + " Voice: crisp, practical, ChatGPT-style answers. Still you are Grok running this workspace.";
	if (mode === "claude") return base + " Voice: careful, structured, Claude-style. Still you are Grok running this workspace.";
	if (mode === "openclaw") return base + " You are also the OpenClaw gateway model. Propose concrete tool steps (file, terminal, git, browser) the local gateway could run. Prefix executable steps with SKILL.";
	if (mode === "swarm") return base + " You coordinate an AI swarm: Architect, iOS, Android, Kotlin, Security, QA, OpenClaw, Deploy. Reply with a short plan, then per-agent actions, then a single suggested file path and its full contents in a markdown code block if a file should be written.";
	return base;
}
var askGrok_createServerFn_handler = createServerRpc({
	id: "3b48a732b3fa0a8244ad5563a15ebd933ae02f8931951ca2a965c9c65a517e75",
	name: "askGrok",
	filename: "src/lib/ai.ts"
}, (opts) => askGrok.__executeServer(opts));
var askGrok = createServerFn({ method: "POST" }).validator((input) => input).handler(askGrok_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Grok is not available in this environment."
	};
	const messages = [{
		role: "system",
		content: systemFor(data.mode ?? "grok")
	}];
	if (data.context) messages.push({
		role: "system",
		content: "Workspace context (truncate silently if huge):\n" + data.context.slice(0, 8e3)
	});
	const hist = (data.history ?? []).slice(-8);
	for (const h of hist) {
		if (h.role === "system") continue;
		messages.push(h);
	}
	messages.push({
		role: "user",
		content: data.prompt.slice(0, 6e3)
	});
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: MODEL,
				messages,
				max_tokens: data.mode === "swarm" ? 1400 : 900,
				temperature: .4
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `xAI API error ${res.status}`
		};
		return {
			ok: true,
			text: (await res.json()).choices[0]?.message.content ?? ""
		};
	} catch {
		return {
			ok: false,
			error: "Could not reach Grok."
		};
	}
});
var fetchGithubRepo_createServerFn_handler = createServerRpc({
	id: "0f8312db61018acc02919c431577f12c7c89799bb7479a5dda8180c40bf8570a",
	name: "fetchGithubRepo",
	filename: "src/lib/ai.ts"
}, (opts) => fetchGithubRepo.__executeServer(opts));
var fetchGithubRepo = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchGithubRepo_createServerFn_handler, async ({ data }) => {
	const [owner, name] = data.repo.trim().replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "").split("/").filter(Boolean);
	if (!owner || !name) return {
		ok: false,
		error: "Use owner/repo (for example square/okhttp)."
	};
	try {
		const res = await fetch(`https://api.github.com/repos/${owner}/${name}/contents/`, { headers: {
			Accept: "application/vnd.github+json",
			"User-Agent": "kotlin-ultra"
		} });
		if (!res.ok) return {
			ok: false,
			error: `GitHub ${res.status} — check the repo is public.`
		};
		const json = await res.json();
		return {
			ok: true,
			repo: `${owner}/${name}`,
			entries: json.slice(0, 40).map((e) => ({
				name: e.name,
				path: e.path,
				type: e.type,
				url: e.html_url,
				downloadUrl: e.download_url
			}))
		};
	} catch {
		return {
			ok: false,
			error: "Could not reach GitHub."
		};
	}
});
var fetchGithubFile_createServerFn_handler = createServerRpc({
	id: "4bb57031461cad3d2b36799667c2cc60bdf67defdd55ddc896ec41cfdb9f8bd7",
	name: "fetchGithubFile",
	filename: "src/lib/ai.ts"
}, (opts) => fetchGithubFile.__executeServer(opts));
var fetchGithubFile = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchGithubFile_createServerFn_handler, async ({ data }) => {
	try {
		const res = await fetch(data.downloadUrl, { headers: { "User-Agent": "kotlin-ultra" } });
		if (!res.ok) return {
			ok: false,
			error: `GitHub file ${res.status}`
		};
		const text = await res.text();
		if (text.length > 2e5) return {
			ok: false,
			error: "File too large to import."
		};
		return {
			ok: true,
			path: data.path,
			content: text
		};
	} catch {
		return {
			ok: false,
			error: "Could not download file."
		};
	}
});
var listGoogleDrive_createServerFn_handler = createServerRpc({
	id: "c21c910ed1408c7fa941feb9aa6fd00feead0f9f2f920a6af2079fbf37fd9a21",
	name: "listGoogleDrive",
	filename: "src/lib/ai.ts"
}, (opts) => listGoogleDrive.__executeServer(opts));
var listGoogleDrive = createServerFn({ method: "POST" }).handler(listGoogleDrive_createServerFn_handler, async () => {
	const { callTool } = await import("./client.server-BP0BGYOf.mjs");
	const result = await callTool(GoogleDriveTools.search, {
		query: "mimeType != 'application/vnd.google-apps.folder'",
		pageSize: 20
	}, { connectorType: ConnectorType.GoogleDrive });
	const names = [];
	const raw = result.data;
	const pushName = (item) => {
		if (item && typeof item === "object" && "name" in item) names.push(String(item.name));
		else if (typeof item === "string") names.push(item);
	};
	if (Array.isArray(raw)) for (const item of raw) pushName(item);
	else if (raw && typeof raw === "object") {
		const rec = raw;
		const list = rec.files ?? rec.items ?? rec.results;
		if (Array.isArray(list)) for (const item of list) pushName(item);
	}
	return {
		ok: result.ok,
		names,
		errorMessage: result.errorMessage ?? null,
		loginRequired: result.loginRequired === true,
		loginUrl: result.loginUrl ?? null,
		pending: result.pending === true
	};
});
//#endregion
export { askGrok_createServerFn_handler, fetchGithubFile_createServerFn_handler, fetchGithubRepo_createServerFn_handler, listGoogleDrive_createServerFn_handler };
