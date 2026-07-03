import ListingCard from "@/components/listings/ListingCard";
import ListingFilters from "@/components/listings/ListingFilters";
import EmptyState from "@/components/listings/EmptyState";
import { ListingService } from "@/lib/services/listing.service";
import { CategoryService } from "@/lib/services/category.service";

type ListingsPageProps = {
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    condition?: string;
  }>;
};

export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const { q, categoryId, minPrice, maxPrice, condition } = await searchParams;

  const [listings, categories] = await Promise.all([
    ListingService.getListings({ q, categoryId, minPrice, maxPrice, condition }),
    CategoryService.getAllCategories(),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 flex-1">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Browse Listings
        </h1>
        <p className="text-zinc-600">
          Find exactly what you&apos;re looking for in our curated marketplace.
        </p>
      </div>

      <div className="flex w-full flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-64 shrink-0 sticky top-8">
          <ListingFilters categories={categories} />
        </div>

        <div className="flex-1 min-w-0">
          {listings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
