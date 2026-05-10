import { Listing } from "@/types/listings";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card className="overflow-hidden">
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="h-48 w-full object-cover"
      />

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold line-clamp-1">
            {listing.title}
          </h2>

          <p className="text-lg font-bold">${listing.price.toFixed(0)}</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {listing.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{listing.category}</Badge>
          <Badge variant="outline">{listing.location}</Badge>
        </div>

        <p className="text-xs text-muted-foreground">
          Posted {new Date(listing.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
