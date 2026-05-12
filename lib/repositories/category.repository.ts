import Category from "@/models/category.model";
import { connectToDatabase } from "@/lib/mongodb";

export class CategoryRepository {
  static async findAll() {
    await connectToDatabase();
    return Category.find().sort({ name: 1 }).lean();
  }

  static async findById(id: string) {
    await connectToDatabase();
    return Category.findById(id).lean();
  }

  static async create(data: { name: string; slug: string }) {
    await connectToDatabase();
    return Category.create(data);
  }

  static async delete(id: string) {
    await connectToDatabase();
    return Category.findByIdAndDelete(id);
  }
}
