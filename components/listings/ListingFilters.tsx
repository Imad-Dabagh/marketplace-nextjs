"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

import { CategoryDTO } from "@/lib/dtos";

interface ListingFiltersProps {
  categories: CategoryDTO[];
}

export default function ListingFilters({ categories }: ListingFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialQ = searchParams.get("q") || "";
  const initialMinPrice = searchParams.get("minPrice") || "";
  const initialMaxPrice = searchParams.get("maxPrice") || "";

  const [q, setQ] = useState(initialQ);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  const applyFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    startTransition(() => {
      router.push(`/listings?${params.toString()}`);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (q !== initialQ || minPrice !== initialMinPrice || maxPrice !== initialMaxPrice) {
        applyFilters({ q, minPrice, maxPrice });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [q, minPrice, maxPrice, initialQ, initialMinPrice, initialMaxPrice]);

  const handleCategory = (category: string) => {
    applyFilters({ categoryId: category === "all" ? null : category });
  };

  const handleCondition = (condition: string) => {
    applyFilters({ condition: condition === "all" ? null : condition });
  };

  const clearFilters = () => {
    setQ("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/listings");
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
          Clear
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label htmlFor="search" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            id="search"
            placeholder="Search listings..."
            className="pl-10"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Category
        </label>
        <Select
          value={searchParams.get("categoryId") || "all"}
          onValueChange={handleCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Condition
        </label>
        <Select
          value={searchParams.get("condition") || "all"}
          onValueChange={handleCondition}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Condition</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like_new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-zinc-500">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
