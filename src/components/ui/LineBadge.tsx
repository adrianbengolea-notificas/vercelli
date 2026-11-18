export function LineBadge({ line }: { line: string }) {
  return (
    <span className="inline-flex min-w-14 items-center justify-center rounded-full bg-evhsa-red px-3 py-1 text-sm font-bold text-white">
      {line}
    </span>
  );
}
