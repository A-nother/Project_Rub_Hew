import { ObjectId } from "mongodb";

export type PostDoc = {
  _id?: ObjectId;
  userId: ObjectId;
  description: string;
  itemListID: ObjectId | null;
  postImageUrl: string | null;
  postType: "Carrier" | "Request";
  postCategory: string;
  crateAt: Date;
};