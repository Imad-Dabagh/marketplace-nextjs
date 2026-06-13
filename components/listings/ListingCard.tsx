import { ListingDTO } from "@/lib/dtos";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, MapPin, Sparkles } from "lucide-react";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

type ListingCardProps = {
  listing: ListingDTO;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const imageUrl = listing.imageUrls[0] || "/placeholder-image.jpg";
  const detailHref = `/listings/${listing.id}`;
  const conditionLabel = (listing.condition || "good").replace("_", " ");
  const imageCount = listing.imageUrls.length;
  const isUnavailable = listing.status !== "active";

  return (
    <Link
      href={detailHref}
      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
    >
      <Card className="h-full gap-0 overflow-hidden border border-zinc-200 bg-white p-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
        <div className="relative aspect-[5/4] overflow-hidden bg-zinc-100">
          <Image
            src={imageUrl}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {isUnavailable && (
              <Badge className="bg-zinc-950 text-white hover:bg-zinc-950">
                {listing.status}
              </Badge>
            )}
            <Badge className="bg-white/95 text-zinc-900 shadow-sm hover:bg-white capitalize">
              {conditionLabel}
            </Badge>
          </div>

          {imageCount > 1 && (
            <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Camera className="h-3.5 w-3.5" />
              {imageCount}
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-14">
            <p className="truncate text-xl font-bold text-white drop-shadow-sm">
              ${listing.price.toLocaleString()}
            </p>
          </div>
        </div>

        <CardContent className="flex min-h-52 flex-col p-4">
          <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
            <span className="truncate font-medium text-primary">
              {listing.categoryName || "Uncategorized"}
            </span>
            <span className="flex min-w-0 items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              <span className="truncate">{listing.location}</span>
            </span>
          </div>

          <h2 className="mt-3 line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-zinc-950 transition-colors group-hover:text-primary">
            {listing.title}
          </h2>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
            {listing.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4">
            {listing.sellerName ? (
              <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600">
                {listing.sellerImage ? (
                  <Image 
                    src={listing.sellerImage} 
                    alt={listing.sellerName} 
                    width={20} 
                    height={20} 
                    className="rounded-full object-cover h-5 w-5"
                  />
                ) : (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {listing.sellerName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="truncate max-w-[120px]">{listing.sellerName}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Marketplace pick
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
