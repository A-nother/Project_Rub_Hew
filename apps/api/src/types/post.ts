import { ObjectId } from "mongodb";

export type PostDoc = {
  _id?: ObjectId;
  userId: ObjectId;
  description: string;
  itemListID: ObjectId;
  postImageUrl: string;
  postType: string;
  postCategory: string;
  createdAt: Date;
  updatedAt?: Date;
};