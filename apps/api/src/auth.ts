// For now, we'll use simple string comparison for testing
// In production, use bcryptjs properly

const passwordCache = new Map<string, string>();

// Hash password (simplified for testing)
export async function hashPassword(password: string): Promise<string> {
  // For now, just return the password as-is for testing
  // In production, this should use bcryptjs
  return password;
}

// Compare passwords
export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  // For now, just do string comparison for testing
  return password === hash;
}

// Generate token
export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
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
