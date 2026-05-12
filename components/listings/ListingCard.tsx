import { ListingDTO } from "@/lib/dtos";
import Link from "next/link";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type ListingCardProps = {
  listing: ListingDTO;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const imageUrl = listing.imageUrls[0];
  return (
    <Card className="overflow-hidden transition hover:shadow-md">
      <img
        src={imageUrl}
        alt={listing.title}
        className="h-48 w-full object-cover"
      />

      <CardContent className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="line-clamp-1 text-lg font-semibold">
            {listing.title}
          </h2>

          <p className="text-lg font-bold">${listing.price.toFixed(0)}</p>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {listing.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {listing.categoryName}
          </Badge>

          <Badge variant="outline">{listing.location}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Posted {new Date(listing.createdAt).toLocaleDateString()}
          </p>

          <Button asChild size="sm">
            <Link href={`/listings/${listing.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
