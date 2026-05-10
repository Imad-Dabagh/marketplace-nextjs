import ListingCard from "@/components/listings/ListingCard";
import { fakeListings } from "@/data/fakeListings";

export default async function ListingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fakeListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
