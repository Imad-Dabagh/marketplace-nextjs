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

type ListingDocument = {
  _id: DocumentId;
  title: string;
  price: number;
  description: string;
  location: string;
  categoryId?: DocumentId | PopulatedCategory;
  imageUrls?: string[];
  sellerId: string;
  status: "active" | "sold" | "draft";
  createdAt: Date;
};

function isPopulatedCategory(
  category: DocumentId | PopulatedCategory | undefined
): category is PopulatedCategory {
  return Boolean(category && "_id" in category);
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

    return {
      id: doc._id.toString(),
      title: doc.title,
      price: doc.price,
      description: doc.description,
      location: doc.location,
      categoryId,
      categoryName: isPopulatedCategory(doc.categoryId) ? doc.categoryId.name : undefined,
      imageUrls: doc.imageUrls || [],
      sellerId: doc.sellerId,
      status: doc.status,
      createdAt: doc.createdAt.toISOString(),
    };
  }
}
