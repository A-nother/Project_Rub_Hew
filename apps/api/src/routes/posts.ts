import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { getDb } from "../libs/mongo";
import { requireAuth } from "../middlewares/requireAuth";
import { createItemList } from "../services/itemList.service";
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

  const discription = String(body.discription ?? "").trim();
  const postType = String(body.postType ?? "").trim() as "Carrier" | "Request";
  const postCatagory = String(body.postCatagory ?? "").trim();
  const rawPostImageUrl = body.postImageUrl;

  if (!discription || !postType || !postCatagory) {
    return c.json({ message: "กรอกข้อมูลไม่ครบ" }, 400);
  }

  if (postType !== "Carrier" && postType !== "Request") {
    return c.json({ message: "postType ไม่ถูกต้อง" }, 400);
  }

  let itemListID: ObjectId | null = null;
  let postImageUrl: string | null = null;

  if (postType === "Carrier") {
    const items = Array.isArray(body.items) ? (body.items as Item[]) : [];

    if (!items.length) {
      return c.json({ message: "Carrier ต้องมี items" }, 400);
    }

    try {
      itemListID = await createItemList(items);
    } catch (error) {
      return c.json({ message: "ข้อมูล items ไม่ถูกต้อง" }, 400);
    }
  }

  if (postType === "Request") {
    const imageUrl = String(rawPostImageUrl ?? "").trim();

    if (!imageUrl) {
      return c.json({ message: "Request ต้องมี postImageUrl" }, 400);
    }

    postImageUrl = imageUrl;
  }

  const newPost: PostDoc = {
    userId: new ObjectId(userId),
    discription,
    itemListID,
    postImageUrl,
    postType,
    postCatagory,
    crateAt: new Date(),
  };

  const result = await posts.insertOne(newPost);

  return c.json(
    {
      message: "create post success",
      postId: result.insertedId.toString(),
      post: {
        _id: result.insertedId.toString(),
        ...newPost,
      },
    },
    201
  );
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
        postCatagory: 1,
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