import { ListingDTO } from "@/lib/dtos";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

type ListingCardProps = {
  listing: ListingDTO;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const imageUrl = listing.imageUrls[0] || "/placeholder-image.jpg";
  const detailHref = `/listings/${listing.id}`;
  const postedDate = new Date(listing.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={detailHref} className="group block h-full">
      <Card className="h-full overflow-hidden border-zinc-200 bg-white p-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg focus-within:border-primary/40">
        <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
          <Image
            src={imageUrl}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge className="bg-white/95 text-zinc-900 shadow-sm hover:bg-white">
              {listing.categoryName || "Uncategorized"}
            </Badge>
            <Badge variant="outline" className="bg-zinc-900/10 backdrop-blur-sm text-zinc-900 border-none capitalize">
              {listing.condition?.replace("_", " ") || "Used"}
            </Badge>
          </div>
        </div>

        <CardContent className="flex min-h-56 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 text-base font-semibold leading-snug text-zinc-950 transition-colors group-hover:text-primary">
              {listing.title.length > 25
                ? listing.title.slice(0, 25) + "..."
                : listing.title}
            </h2>

            <p className="shrink-0 text-lg font-bold text-zinc-950">
              ${listing.price.toLocaleString()}
            </p>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
            {listing.description}
          </p>

          <div className="mt-4 grid gap-2 text-xs text-zinc-500">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
              <span className="truncate">{listing.location}</span>
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-zinc-400" />
              Posted {postedDate}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between border-t pt-4">
            <Badge variant="outline">{listing.status}</Badge>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              View details
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
