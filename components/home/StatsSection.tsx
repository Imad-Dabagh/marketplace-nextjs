"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Users, Grid as GridIcon, TrendingUp } from "lucide-react";

interface StatsProps {
  activeListingsCount: number;
  uniqueSellersCount: number;
  categoriesCount: number;
  newListingsThisWeekCount: number;
}

export default function StatsSection({
  activeListingsCount,
  uniqueSellersCount,
  categoriesCount,
  newListingsThisWeekCount,
}: StatsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const stats = [
    {
      label: "Total Listings",
      value: activeListingsCount,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
      borderColor: "border-blue-100",
      shadowColor: "hover:shadow-blue-500/20",
    },
    {
      label: "Active Sellers",
      value: uniqueSellersCount,
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
      borderColor: "border-emerald-100",
      shadowColor: "hover:shadow-emerald-500/20",
    },
    {
      label: "Categories",
      value: categoriesCount,
      icon: GridIcon,
      color: "bg-purple-50 text-purple-600",
      borderColor: "border-purple-100",
      shadowColor: "hover:shadow-purple-500/20",
    },
    {
      label: "New This Week",
      value: `+${newListingsThisWeekCount}`,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
      borderColor: "border-orange-100",
      shadowColor: "hover:shadow-orange-500/20",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-zinc-200">
      <div className="absolute inset-0 bg-zinc-50/50 z-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={cardVariants} whileHover={{ y: -8 }}>
                <Card className={`bg-white border ${stat.borderColor} shadow-sm transition-all duration-300 ${stat.shadowColor} rounded-3xl overflow-hidden`}>
                  <CardContent className="py-12 px-6 flex flex-col items-center text-center gap-5 relative">
                    {/* Subtle background glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 ${stat.color.split(" ")[0]}`} />
                    
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stat.color} mb-2 shadow-sm`}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>
                    <div className="flex flex-col gap-2">
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        className="text-5xl font-extrabold text-zinc-900 tracking-tight"
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
