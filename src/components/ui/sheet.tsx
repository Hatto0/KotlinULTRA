import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  side = "left",
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  side?: "left" | "right" | "bottom";
  title: string;
  children: ReactNode;
}) {
  const pos =
    side === "left"
      ? "inset-y-0 left-0 w-[min(86vw,20rem)] border-r"
      : side === "right"
        ? "inset-y-0 right-0 w-[min(86vw,22rem)] border-l"
        : "inset-x-0 bottom-0 max-h-[78vh] rounded-t-[var(--radius-xl)] border-t";
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-bg/70 data-[state=open]:animate-[fadeIn_var(--motion-fast)_var(--ease-out)]" />
        <Dialog.Content
          className={cn(
            "fixed z-50 bg-surface text-fg shadow-[var(--shadow-border)] outline-none",
            pos,
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <Dialog.Title className="font-display text-sm font-medium tracking-tight">
              {title}
            </Dialog.Title>
            <Dialog.Close className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-fg">
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <div className="ide-scroll h-[calc(100%-3.25rem)] overflow-auto">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
