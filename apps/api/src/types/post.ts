import { ObjectId } from "mongodb";

export type PostDoc = {
  _id?: ObjectId;
  userId: ObjectId;
  discription: string;
  itemListID: ObjectId | null;
  postImageUrl: string | null;
  postType: "Carrier" | "Request";
  postCatagory: string;
  crateAt: Date;
};