"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/listings/ListingCard";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Search,
  TrendingUp,
  Package,
} from "lucide-react";

export default function HeroSection({ heroListing }: { heroListing: any }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 18 },
    },
  };

  const floatVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const trustBadges = [
    { icon: ShieldCheck, label: "Verified Sellers" },
    { icon: Zap, label: "Instant Listings" },
    { icon: Users, label: "Local Community" },
  ];

  return (
    <section className="relative overflow-hidden bg-background min-h-[92vh] flex items-center">
      {/* ── Animated gradient mesh background ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient blob */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary gradient blob */}
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Subtle accent blob top-right */}
        <motion.div
          className="absolute top-[10%] right-[15%] w-[30vw] h-[30vw] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />


      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ─── Left: Text Content ─── */}
          <motion.div
            className="flex flex-col gap-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pill badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live Marketplace
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]"
            >
              Find your next{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  great deal
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-3 w-full rounded-full bg-primary/15 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <br className="hidden sm:block" />
              in one place
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Discover trusted listings from local sellers. Buy, sell, and
              connect with your community — all in minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 mt-2 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300"
              >
                <Link href="/listings" className="inline-flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse Listings
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 px-8 text-base font-semibold rounded-xl border-border/80 hover:bg-accent/50 transition-colors duration-300"
              >
                <Link href="/listings/create" className="inline-flex items-center gap-2">
                  Start Selling
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 mt-4 justify-center lg:justify-start"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <badge.icon className="h-4 w-4 text-primary/70" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right: Featured Listing Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:ml-auto group"
          >
            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-blue-500/10 to-indigo-500/20 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Decorative tilted background card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-2xl -m-3 border border-primary/10"
              animate={{ rotate: [2, 3, 2] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main card container */}
            <motion.div
              className="relative z-10 w-full rounded-2xl shadow-2xl shadow-black/10 border border-border/60 bg-card overflow-hidden"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {heroListing ? (
                <div className="relative">
                  {/* "Featured" ribbon */}
                  <div className="absolute -top-0 -right-0 z-20">
                    <div className="bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-lg">
                      ✦ Featured
                    </div>
                  </div>
                  <div className="p-4 pb-5">
                    <ListingCard listing={heroListing} />
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/5 to-indigo-500/5 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-8 text-center m-4 gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-lg">
                      Be the first seller
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      The marketplace is waiting for its first listing
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline" className="mt-2 rounded-lg">
                    <Link href="/listings/create">Create Listing</Link>
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
