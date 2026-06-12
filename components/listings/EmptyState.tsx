import { SearchX } from "lucide-react";

export default function EmptyState() {

  return (
    <div className="flex w-full flex-col items-center justify-center py-24 text-center animate-in fade-in duration-500">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 shadow-sm ring-8 ring-zinc-50">
        <SearchX className="h-10 w-10 text-zinc-400" />
      </div>
      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-900">
        No results found
      </h3>
      <p className="max-w-md text-base text-zinc-500">
        We couldn&apos;t find any listings matching your search.
      </p>
    </div>
  );
}
