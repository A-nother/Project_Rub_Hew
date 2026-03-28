import { ObjectId } from "mongodb";

export type Item = {
  itemName: string;
  itemImageUrl: string;
  itemPrice: number;
};

export type ItemListDoc = {
  _id?: ObjectId;
  item: Item[];
};