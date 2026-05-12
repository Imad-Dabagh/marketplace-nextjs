import { CategoryRepository } from "../repositories/category.repository";
import { Mapper } from "../dtos/mapper";
import { CategoryDTO } from "../dtos";

export class CategoryService {
  static async getAllCategories(): Promise<CategoryDTO[]> {
    const categories = await CategoryRepository.findAll();
    return categories.map(Mapper.toCategoryDTO);
  }

  static async createCategory(name: string): Promise<CategoryDTO> {
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const category = await CategoryRepository.create({ name, slug });
    return Mapper.toCategoryDTO(category);
  }

  static async deleteCategory(id: string): Promise<void> {
    await CategoryRepository.delete(id);
  }
}
