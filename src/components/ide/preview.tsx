import { useMemo } from "react";
import { documentForFile, previewKindFor } from "@/lib/webkit";
import { languageOf, useIde, type DeviceId } from "@/store/ide";
import { cn } from "@/lib/utils";

const FRAMES: Record<DeviceId, { w: number; h: number; r: string; label: string }> = {
  "iphone-16": { w: 320, h: 692, r: "2.4rem", label: "iPhone 16" },
  "ipad-mini": { w: 420, h: 640, r: "1.4rem", label: "iPad mini" },
  "pixel-9": { w: 320, h: 692, r: "1.8rem", label: "Pixel 9" },
  fold: { w: 380, h: 640, r: "1.2rem", label: "Pixel Fold" },
};

export function PreviewPane() {
  const files = useIde((s) => s.files);
  const activePath = useIde((s) => s.activePath);
  const device = useIde((s) => s.device);
  const setDevice = useIde((s) => s.setDevice);
  const target = useIde((s) => s.target);
  const file = files[activePath];
  const language = languageOf(activePath);
  const kind = previewKindFor(activePath, language);
  const srcDoc = useMemo(
    () => documentForFile(activePath, file?.content ?? "", language),
    [activePath, file?.content, language],
  );
  const frame = FRAMES[device];
  const devices: DeviceId[] =
    target === "ios" ? ["iphone-16", "ipad-mini"] : ["pixel-9", "fold"];

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-border px-3">
        <span className="truncate text-xs text-muted">
          Virtualized WebKit · {kind === "ios" ? "SwiftUI" : kind === "android" ? "Compose" : kind === "web" ? "HTML" : "source"}
        </span>
        <div className="flex gap-1">
          {devices.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              className={cn(
                "h-7 rounded-full px-2.5 text-2xs",
                device === id ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated",
              )}
            >
              {FRAMES[id].label}
            </button>
          ))}
        </div>
      </div>
      <div className="ide-scroll flex min-h-0 flex-1 items-start justify-center overflow-auto p-6">
        <div
          className="relative shrink-0 bg-elevated p-2 shadow-[var(--shadow-border)]"
          style={{ width: frame.w + 16, borderRadius: frame.r }}
        >
          <div className="mx-auto mb-2 h-4 w-20 rounded-full bg-border" />
          <iframe
            title="WebKit preview"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="block bg-bg"
            style={{
              width: frame.w,
              height: frame.h,
              border: 0,
              borderRadius: `calc(${frame.r} - 8px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
