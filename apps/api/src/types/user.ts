import { ObjectId } from "mongodb";

export type UserDoc = {
  _id: ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  profileImageUrl: string;
  ratingAverage: number;
  ratingCount: number;
  role: string;
  isBanned: boolean;
  banReason?: string;
  bannedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};