export function UltraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="6" className="fill-bg" />
      <path className="fill-fg" d="M4 6h4v20H4zm4 0h6v4l-4 6H8zm0 10h2l4 6v4H8z" />
      <rect x="16" y="6" width="4" height="20" className="fill-accent" />
      <rect x="24" y="6" width="4" height="20" className="fill-accent" />
      <rect x="16" y="22" width="12" height="4" className="fill-accent" />
    </svg>
  );
}
