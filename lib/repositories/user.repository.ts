import User from "@/models/user.model";
import { connectToDatabase } from "@/lib/mongodb";

export class UserRepository {
  static async findByEmail(email: string) {
    await connectToDatabase();
    return User.findOne({ email }).lean();
  }

  static async findById(id: string) {
    await connectToDatabase();
    return User.findById(id).lean();
  }

  static async create(data: any) {
    await connectToDatabase();
    const user = new User(data);
    return user.save();
  }

  static async updateRole(email: string, role: string) {
    await connectToDatabase();
    return User.findOneAndUpdate({ email }, { role }, { returnDocument: 'after' }).lean();
  }

  static async updateImage(id: string, imageUrl: string) {
    await connectToDatabase();
    return User.findByIdAndUpdate(id, { image: imageUrl }, { returnDocument: 'after' }).lean();
  }
}
