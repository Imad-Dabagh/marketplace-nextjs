import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { UserRegistrationSchema } from "../validations/schemas";
import { UserDTO } from "../dtos";
import { Mapper } from "../dtos/mapper";

export class AuthService {
  static async registerUser(data: any): Promise<{ success?: boolean; error?: string }> {
    const result = UserRegistrationSchema.safeParse(data);
    
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    const { name, email, password } = result.data;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    await UserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  }

  static async validateCredentials(email: string, password: string): Promise<UserDTO | null> {
    const user = await UserRepository.findByEmail(email);
    
    if (!user || !user.password) return null;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return null;

    return Mapper.toUserDTO(user);
  }

  static async makeAdmin(email: string): Promise<void> {
    await UserRepository.updateRole(email, "admin");
  }
}
