import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { getDb } from "../libs/mongo";
import { requireAuth } from "../middlewares/requireAuth";
import { createItemList, updateItemList } from "../services/itemList.service";
import type { AppVariables } from "../types/hono";
import type { PostDoc } from "../types/post";
import type { Item } from "../types/itemList";

const app = new Hono<{ Variables: AppVariables }>();

app.use("/api/posts", requireAuth);
app.use("/api/posts/*", requireAuth);

app.post("/api/posts", async (c) => {
  const db = await getDb();
  const posts = db.collection<PostDoc>("posts");

  const userId = c.get("userId");
  const body = await c.req.json();

  const description = String(body.description ?? "").trim(); // เปลี่ยนจาก discription เป็น description ด้วยจะดีมากครับ
  const postType = String(body.postType ?? "").trim() as "Carrier" | "Request";
  // เปลี่ยนเป็น postCategory (e)
  const postCategory = String(body.postCategory ?? "").trim(); 
  const rawPostImageUrl = String(body.postImageUrl ?? "").trim();
  const items = Array.isArray(body.items) ? (body.items as Item[]) : [];

  if (!description || !postType || !postCategory) {
    return c.json({ message: "กรอกข้อมูลไม่ครบ" }, 400);
  }

  let itemListID: ObjectId | null = null;
  const postImageUrl: string | null = rawPostImageUrl || null;

  if (items.length > 0) {
    try {
      itemListID = await createItemList(items);
    } catch {
      return c.json({ message: "ข้อมูล items ไม่ถูกต้อง" }, 400);
    }
  }

  const newPost: PostDoc = {
    userId: new ObjectId(userId),
    description,
    itemListID,
    postImageUrl,
    postType,
    postCategory, // ใช้ e
    crateAt: new Date(),
  };

  const result = await posts.insertOne(newPost as any);

  return c.json({
      message: "create post success",
      postId: result.insertedId.toString(),
      post: { _id: result.insertedId.toString(), ...newPost },
    }, 201);
});

// ส่วน Patch และ Feed ให้เปลี่ยน postCatagory -> postCategory ให้หมด
app.patch("/api/posts/:postId", async (c) => {
    const db = await getDb();
    // ... (ส่วนการเช็ค userId และ postId คงเดิม)
    const body = await c.req.json();
    const updateData: any = {};

    if (body.description !== undefined) updateData.description = String(body.description).trim();
    if (body.postCategory !== undefined) updateData.postCategory = String(body.postCategory).trim();
    // ... (ส่วนอื่นๆ คงเดิม)
    await db.collection("posts").updateOne({ _id: new ObjectId(c.req.param("postId")) }, { $set: updateData });
    return c.json({ message: "edit post success" });
});
app.get("/api/feed", async (c) => {
  const db = await getDb();
  const posts = db.collection("posts");

  const feedPosts = await posts.aggregate([
    // 🔹 join user
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    // 🔹 join itemList
    {
      $lookup: {
        from: "itemList",
        localField: "itemListID",
        foreignField: "_id",
        as: "itemList",
      },
    },

    // 🔹 แปลง itemList เป็น object
    {
      $addFields: {
        itemList: { $arrayElemAt: ["$itemList", 0] },
      },
    },

    // 🔹 แยก items ออกมาเลย
    {
      $addFields: {
        items: "$itemList.item",
      },
    },

    // 🔹 เลือก field
    {
      $project: {
        _id: 1,
        discription: 1,
        postImageUrl: 1,
        postType: 1,
        postCategory: 1,
        crateAt: 1,

        "user._id": 1,
        "user.username": 1,
        "user.profileImageUrl": 1,
        "user.ratingAverage": 1,
        "user.ratingCount": 1,

        items: 1,
      },
    },

    // 🔹 เรียงใหม่สุดก่อน
    {
      $sort: {
        crateAt: -1,
      },
    },
  ]).toArray();

  // 🔹 format ObjectId → string
  const formatted = feedPosts.map((post: any) => ({
    ...post,
    _id: post._id.toString(),
    user: {
      ...post.user,
      _id: post.user._id.toString(),
    },
    items: (post.items || []).map((item: any) => ({
      ...item,
    })),
  }));

  return c.json({ posts: formatted });
});

export default app;