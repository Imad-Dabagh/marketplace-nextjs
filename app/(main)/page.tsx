import { ListingService } from "@/lib/services/listing.service";
import { CategoryService } from "@/lib/services/category.service";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import StatsSection from "@/components/home/StatsSection";
export default async function Home() {
  // Fetch data
  const [allListings, categories] = await Promise.all([
    ListingService.getListings(),
    CategoryService.getAllCategories(),
  ]);

  // Calculate statistics
  const activeListings = allListings.filter((l) => l.status === "active");
  const featuredListings = activeListings.slice(0, 8);
  const heroListing = activeListings[0]; // Showcase listing

  const uniqueSellers = new Set(activeListings.map((l) => l.sellerId)).size;

  // Calculate new listings this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newListingsThisWeek = activeListings.filter(
    (l) => new Date(l.createdAt) > oneWeekAgo
  ).length;



  return (
    <main className="bg-zinc-50 min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection heroListing={heroListing} />

      {/* 2. Featured Listings */}
      <FeaturedSection featuredListings={featuredListings} />

      {/* 3. Statistics Section */}
      <StatsSection
        activeListingsCount={activeListings.length}
        uniqueSellersCount={uniqueSellers}
        categoriesCount={categories.length}
        newListingsThisWeekCount={newListingsThisWeek}
      />
    </main>
  );
}
