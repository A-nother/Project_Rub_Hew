import { ObjectId } from "mongodb";
import { getDb } from "../libs/mongo";
import type { Item, ItemListDoc } from "../types/itemList";

export async function createItemList(items: Item[]) {
  const db = await getDb();
  const itemLists = db.collection<ItemListDoc>("itemList");

  // 🔥 ไม่ต้อง throw แล้ว
  if (!items.length) {
    return null; // ✅ return null แทน
  }

  const sanitizedItems = items.map((item) => ({
    itemName: String(item.itemName ?? "").trim(),
    itemImageUrl: String(item.itemImageUrl ?? "").trim(),
    itemPrice: Number(item.itemPrice ?? 0),
  }));

  // 🔥 กรอง item ที่ไม่ครบออก (สำคัญมาก)
  const validItems = sanitizedItems.filter(
    (item) => item.itemName && item.itemImageUrl && item.itemPrice > 0
  );

  if (!validItems.length) {
    return null; // ✅ ไม่มี item ที่ valid → ไม่ต้องสร้าง
  }

  const result = await itemLists.insertOne({
    item: validItems,
  });

  return result.insertedId;
}

export async function updateItemList(itemListID: string, items: Item[]) {
  const db = await getDb();
  const itemLists = db.collection<ItemListDoc>("itemList");

  const sanitizedItems = items.map((item) => ({
    itemName: String(item.itemName ?? "").trim(),
    itemImageUrl: String(item.itemImageUrl ?? "").trim(),
    itemPrice: Number(item.itemPrice ?? 0),
  }));

  for (const item of sanitizedItems) {
    if (!item.itemName || !item.itemImageUrl || item.itemPrice <= 0) {
      throw new Error("invalid item data");
    }
  }

  await itemLists.updateOne(
    { _id: new ObjectId(itemListID) },
    {
      $set: {
        item: sanitizedItems,
      },
    }
  );
}