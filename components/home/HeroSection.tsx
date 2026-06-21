"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/listings/ListingCard";

export default function HeroSection({ heroListing }: { heroListing: any }) {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative bg-background border-b border-border overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left Text Side */}
          <motion.div
            className="flex flex-col gap-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
            >
              Buy and sell <br className="hidden lg:block" /> anything in one place
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-medium"
            >
              Discover great deals, browse trusted listings, and sell items in minutes. Join our growing local community today.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                <Link href="/listings">Browse Listings</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
                <Link href="/listings/create">Sell Item</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:ml-auto group cursor-pointer"
          >
            <div className="absolute inset-0 bg-muted/50 rounded-3xl -m-4 transform rotate-2 z-0 transition-transform duration-300 group-hover:rotate-3" />
            
            <motion.div
              className="relative z-10 w-full rounded-2xl shadow-sm border border-border bg-card"
            >
              {heroListing ? (
                <div className="p-4 pb-6">
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-md shadow-sm z-20">
                    Featured
                  </div>
                  <ListingCard listing={heroListing} />
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-2xl bg-muted/30 border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center p-8 text-center m-4">
                  <p className="text-muted-foreground font-medium">Marketplace is waiting for its first listing</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
