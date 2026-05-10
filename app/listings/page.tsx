import ListingCard from "@/components/listings/ListingCard";
import { connectToDatabase } from "@/lib/mongodb";
import Listing from "@/models/listing.model";

export default async function ListingsPage() {
  await connectToDatabase();
  const listings = await Listing.find().lean();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing: any) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
