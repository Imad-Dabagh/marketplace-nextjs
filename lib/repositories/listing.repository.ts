import Listing from "@/models/listing.model";
import { connectToDatabase } from "@/lib/mongodb";
import { ListingInput } from "@/lib/validations/schemas";

export interface ListingFilter {
  q?: string;
  categoryId?: string;
  sellerId?: string;
  status?: string;
}

type ListingCreateData = ListingInput & {
  sellerId: string;
  status: "active" | "sold" | "draft";
};

type ListingUpdateData = Partial<ListingInput> & {
  status?: "active" | "sold" | "draft";
};

export class ListingRepository {
  static async find(filter: ListingFilter = {}) {
    await connectToDatabase();
    const query: Record<string, unknown> = {};

    if (filter.q) {
      query.title = { $regex: filter.q, $options: "i" };
    }

    if (filter.categoryId && filter.categoryId !== "all") {
      query.categoryId = filter.categoryId;
    }

    if (filter.sellerId) {
      query.sellerId = filter.sellerId;
    }

    if (filter.status && filter.status !== "all") {
      query.status = filter.status;
    }

    return Listing.find(query)
      .populate("categoryId")
      .populate("sellerId", "name image createdAt")
      .sort({ createdAt: -1 })
      .lean();
  }

  static async findById(id: string) {
    await connectToDatabase();
    return Listing.findById(id)
      .populate("categoryId")
      .populate("sellerId", "name image createdAt")
      .lean();
  }

  static async create(data: ListingCreateData) {
    await connectToDatabase();
    return Listing.create(data);
  }

  static async delete(id: string) {
    await connectToDatabase();
    return Listing.findByIdAndDelete(id);
  }

  static async updateStatus(id: string, status: "active" | "sold" | "draft") {
    await connectToDatabase();
    return Listing.findByIdAndUpdate(id, { status }, { new: true }).lean();
  }

  static async update(id: string, data: ListingUpdateData) {
    await connectToDatabase();
    return Listing.findByIdAndUpdate(id, data, { new: true })
      .populate("categoryId")
      .lean();
  }
}
