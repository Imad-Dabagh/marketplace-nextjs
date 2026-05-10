import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-zinc-50">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full border bg-white px-3 py-1 text-sm text-zinc-600">
          Simple marketplace built with Next.js
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Buy and sell products without the clutter
        </h1>

        <p className="mt-5 max-w-xl text-base text-zinc-600 sm:text-lg">
          Browse listings, post your own items, and explore a clean modern
          marketplace experience.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/listings">Browse Listings</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/listings/create">Create Listing</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
