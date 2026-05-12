import ListingCard from "@/components/listings/ListingCard";
import ListingFilters from "@/components/listings/ListingFilters";
import { ListingService } from "@/lib/services/listing.service";
import { CategoryService } from "@/lib/services/category.service";

type ListingsPageProps = {
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
  }>;
};

export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const { q, categoryId } = await searchParams;

  const [listings, categories] = await Promise.all([
    ListingService.getListings({ q, categoryId }),
    CategoryService.getAllCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Browse Listings
        </h1>
        <p className="text-zinc-600">
          Find exactly what you&apos;re looking for in our curated marketplace.
        </p>
      </div>

      <ListingFilters
        categories={categories}
      />

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-zinc-900">No listings found</p>
          <p className="text-zinc-600">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
