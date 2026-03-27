export type StoredUser = {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  registeredAt: string;
};

const globalStore = globalThis as typeof globalThis & {
  __rubHewUsers__?: StoredUser[];
};

export const users = globalStore.__rubHewUsers__ ?? [];

if (!globalStore.__rubHewUsers__) {
  globalStore.__rubHewUsers__ = users;
}

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password: string) => password.length >= 6;

export const createToken = () => crypto.randomUUID();
