import Link from "next/link";

const linkClass =
  "border border-input bg-card px-3 py-2 font-semibold text-brand hover:bg-muted";

export function Pagination({
  page,
  pages,
  total,
  noun,
  params,
}: {
  page: number;
  pages: number;
  total: number;
  noun: string;
  params: Record<string, string>;
}) {
  if (pages <= 1) return null;

  const href = (target: number) =>
    `?${new URLSearchParams({ ...params, page: String(target) })}`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-5 flex items-center justify-between text-sm"
    >
      <span className="text-muted-foreground">
        Page {page} of {pages} · {total} {noun}
      </span>
      <div className="flex gap-2">
        {page > 1 && (
          <Link href={href(page - 1)} className={linkClass}>
            Previous
          </Link>
        )}
        {page < pages && (
          <Link href={href(page + 1)} className={linkClass}>
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}

export const pageSize = 25;

export function pageNumber(param: string | undefined) {
  return Math.max(1, Number.parseInt(param ?? "1", 10) || 1);
}
