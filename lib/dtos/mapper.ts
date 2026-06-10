import { CategoryDTO, ListingDTO, UserDTO } from "./index";

type DocumentId = {
  toString(): string;
};

type CategoryDocument = {
  _id: DocumentId;
  name: string;
  slug: string;
};

type UserDocument = {
  _id: DocumentId;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
};

type PopulatedCategory = {
  _id: DocumentId;
  name?: string;
};

type PopulatedUser = {
  _id: DocumentId;
  name: string;
  image?: string;
  createdAt: Date;
};

type ListingDocument = {
  _id: DocumentId;
  title: string;
  price: number;
  description: string;
  condition?: "new" | "like_new" | "good" | "fair";
  location: string;
  categoryId?: DocumentId | PopulatedCategory;
  imageUrls?: string[];
  sellerId: DocumentId | PopulatedUser;
  status: "active" | "sold" | "draft";
  createdAt: Date;
};

function isPopulatedCategory(
  category: DocumentId | PopulatedCategory | undefined
): category is PopulatedCategory {
  return Boolean(category && "_id" in category);
}

function isPopulatedUser(
  user: DocumentId | PopulatedUser | undefined
): user is PopulatedUser {
  return Boolean(user && "name" in user);
}

export class Mapper {
  static toCategoryDTO(doc: CategoryDocument): CategoryDTO {
    return {
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
    };
  }

  static toUserDTO(doc: UserDocument): UserDTO {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      image: doc.image,
      role: doc.role,
    };
  }

  static toListingDTO(doc: ListingDocument): ListingDTO {
    const categoryId = isPopulatedCategory(doc.categoryId)
      ? doc.categoryId._id.toString()
      : doc.categoryId?.toString() || "";

    const sellerId = isPopulatedUser(doc.sellerId)
      ? doc.sellerId._id.toString()
      : doc.sellerId?.toString() || "";

    return {
      id: doc._id.toString(),
      title: doc.title,
      price: doc.price,
      description: doc.description,
      condition: doc.condition || "good",
      location: doc.location,
      categoryId,
      categoryName: isPopulatedCategory(doc.categoryId) ? doc.categoryId.name : undefined,
      imageUrls: doc.imageUrls || [],
      sellerId,
      sellerName: isPopulatedUser(doc.sellerId) ? doc.sellerId.name : undefined,
      sellerImage: isPopulatedUser(doc.sellerId) ? doc.sellerId.image : undefined,
      sellerJoinedAt: isPopulatedUser(doc.sellerId) && doc.sellerId.createdAt ? doc.sellerId.createdAt.toISOString() : undefined,
      status: doc.status,
      createdAt: doc.createdAt.toISOString(),
    };
  }
}
