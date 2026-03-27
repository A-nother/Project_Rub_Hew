import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare passwords
export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate JWT-like token (using randomBytes for simplicity)
export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength (at least 6 characters)
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}
