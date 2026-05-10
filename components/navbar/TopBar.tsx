import Link from "next/link";
import { Button } from "../ui/button";

export default function TopBar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          Marketplace
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/listings"
            className="text-sm text-zinc-600 transition hover:text-zinc-900"
          >
            Listings
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-zinc-600 transition hover:text-zinc-900"
          >
            Dashboard
          </Link>

          <Button asChild size="sm">
            <Link href="/listings/create">Create Listing</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
