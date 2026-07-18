import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Quaotz home">
      <span className="brandMark" aria-hidden="true">
        Q
      </span>
      {!compact && <span className="brandName">quaotz</span>}
    </Link>
  );
}
