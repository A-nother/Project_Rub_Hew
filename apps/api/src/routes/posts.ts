import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { getDb } from "../libs/mongo";
import { requireAuth } from "../middlewares/requireAuth";
import type { AppVariables } from "../types/hono";
import type { PostDoc } from "../types/post";

const app = new Hono<{ Variables: AppVariables }>();

app.use("/api/posts", requireAuth);
app.use("/api/posts/*", requireAuth);

app.post("/api/posts", async (c) => {
  const db = await getDb();
  const posts = db.collection<PostDoc>("posts");

  const userId = c.get("userId");

  const body = await c.req.json();

  const description = String(body.description ?? "").trim();
  const itemListID = String(body.itemListID ?? "").trim();
  const postImageUrl = String(body.postImageUrl ?? "").trim();
  const postType = String(body.postType ?? "").trim();
  const postCategory = String(body.postCategory ?? "").trim();

  if (!description || !itemListID || !postType || !postCategory) {
    return c.json({ message: "กรอกข้อมูลไม่ครบ" }, 400);
  }

  if (!ObjectId.isValid(itemListID)) {
    return c.json({ message: "itemListID ไม่ถูกต้อง" }, 400);
  }

  const newPost: PostDoc = {
    userId: new ObjectId(userId),
    description,
    itemListID: new ObjectId(itemListID),
    postImageUrl,
    postType,
    postCategory,
    createdAt: new Date(),
  };

  const result = await posts.insertOne(newPost);

  return c.json(
    {
      message: "create post success",
      postId: result.insertedId.toString(),
      post: {
        _id: result.insertedId,
        ...newPost,
      },
    },
    201
  );
});

export default app;