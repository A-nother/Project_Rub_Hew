import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, "../data/users.json");

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string; // hashed password
  registeredAt: string; // ISO timestamp
}

interface Database {
  users: User[];
}

// Ensure data directory exists
function ensureDataDir(): void {
  const dataDir = dirname(DB_PATH);
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

// Initialize database
function initializeDB(): Database {
  ensureDataDir();

  if (!existsSync(DB_PATH)) {
    const initialDB: Database = { users: [] };
    writeFileSync(DB_PATH, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }

  const data = readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data) as Database;
}

// Load database
function loadDB(): Database {
  if (!existsSync(DB_PATH)) {
    return initializeDB();
  }
  const data = readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data) as Database;
}

// Save database
function saveDB(db: Database): void {
  ensureDataDir();
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// Find user by username or email
export function findUser(usernameOrEmail: string): User | undefined {
  const db = loadDB();
  return db.users.find(
    (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
  );
}

// Find user by username
export function findUserByUsername(username: string): User | undefined {
  const db = loadDB();
  return db.users.find((u) => u.username === username);
}

// Find user by email
export function findUserByEmail(email: string): User | undefined {
  const db = loadDB();
  return db.users.find((u) => u.email === email);
}

// Create new user
export function createUser(
  username: string,
  email: string,
  phone: string,
  hashedPassword: string
): User {
  const db = loadDB();
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    username,
    email,
    phone,
    password: hashedPassword,
    registeredAt: new Date().toISOString(),
  };
  db.users.push(user);
  saveDB(db);
  return user;
}

// Get all users (for debugging)
export function getAllUsers(): User[] {
  const db = loadDB();
  return db.users.map((u) => ({
    ...u,
    password: "***", // Don't expose passwords
  }));
}
