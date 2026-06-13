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
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative bg-white border-b border-zinc-200 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/2 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl mix-blend-multiply"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

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
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 leading-[1.1]"
            >
              Buy and sell <br className="hidden lg:block" /> anything in one place
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-zinc-600 max-w-xl mx-auto lg:mx-0 font-medium"
            >
              Discover great deals, browse trusted listings, and sell items in minutes. Join our growing local community today.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-1">
                <Link href="/listings">Browse Listings</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold bg-white/80 backdrop-blur-sm border-zinc-300 hover:bg-zinc-50 transition-all hover:-translate-y-1">
                <Link href="/listings/create">Sell Item</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md lg:ml-auto group cursor-pointer perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl -m-6 transform rotate-3 blur-2xl z-0 transition-all duration-500 group-hover:rotate-6 group-hover:blur-3xl" />
            
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10 w-full rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/50 bg-white/80 backdrop-blur-md"
            >
              {heroListing ? (
                <div className="p-4 pb-6">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 animate-bounce">
                    Featured
                  </div>
                  <ListingCard listing={heroListing} />
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center p-8 text-center m-4">
                  <p className="text-zinc-500 font-medium">Marketplace is waiting for its first listing</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
