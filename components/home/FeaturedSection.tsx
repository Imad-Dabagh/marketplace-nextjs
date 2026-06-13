"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/listings/ListingCard";

export default function FeaturedSection({ featuredListings }: { featuredListings: any[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-zinc-50/50 rounded-[100px] -z-10 blur-3xl transform -rotate-2" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col gap-3">
            <motion.h2 variants={itemVariants} className="text-4xl font-extrabold text-zinc-900 tracking-tight">
              Featured Listings
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-zinc-600 max-w-2xl">
              Fresh items handpicked by our community. Find exactly what you're looking for with our top-rated sellers.
            </motion.p>
          </div>
          <motion.div variants={itemVariants}>
            <Button variant="outline" asChild className="hidden sm:flex rounded-full px-6 h-12 text-base font-medium border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 transition-colors">
              <Link href="/listings">View All</Link>
            </Button>
          </motion.div>
        </div>

        {featuredListings.length > 0 ? (
          <motion.div variants={containerVariants} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredListings.map((listing) => (
              <motion.div
                key={listing._id || listing.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="h-full"
              >
                <div className="h-full shadow-lg shadow-zinc-200/50 rounded-2xl bg-white transition-shadow hover:shadow-xl hover:shadow-zinc-300/50">
                  <ListingCard listing={listing} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="flex items-center justify-center py-24 bg-white/50 border-2 border-dashed border-zinc-200 rounded-3xl backdrop-blur-sm">
            <p className="text-zinc-500 font-medium text-lg">No listings available right now.</p>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="mt-12 flex justify-center sm:hidden">
          <Button variant="outline" asChild className="w-full rounded-full h-12 text-base font-medium">
            <Link href="/listings">View All Listings</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
