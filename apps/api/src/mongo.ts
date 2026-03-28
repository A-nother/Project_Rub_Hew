import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.MONGODB_DB_NAME || "rub_hew";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

const client = new MongoClient(MONGODB_URI);
const clientPromise = client.connect();

export async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db(DB_NAME);
}