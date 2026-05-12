import Listing from "@/models/listing.model";
import { connectToDatabase } from "@/lib/mongodb";

export interface ListingFilter {
  q?: string;
  categoryId?: string;
  sellerId?: string;
}

export class ListingRepository {
  static async find(filter: ListingFilter = {}) {
    await connectToDatabase();
    const query: any = {};

    if (filter.q) {
      query.title = { $regex: filter.q, $options: "i" };
    }

    if (filter.categoryId && filter.categoryId !== "all") {
      query.categoryId = filter.categoryId;
    }

    if (filter.sellerId) {
      query.sellerId = filter.sellerId;
    }

    return Listing.find(query).populate("categoryId").sort({ createdAt: -1 }).lean();
  }

  static async findById(id: string) {
    await connectToDatabase();
    return Listing.findById(id).populate("categoryId").lean();
  }

  static async create(data: any) {
    await connectToDatabase();
    return Listing.create(data);
  }

  static async delete(id: string) {
    await connectToDatabase();
    return Listing.findByIdAndDelete(id);
  }
}
