import { Hono } from "hono";
import { corsMiddleware } from "./middlewares/cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";

const app = new Hono();

app.use("*", corsMiddleware);

app.route("/", authRoutes);
app.route("/", userRoutes);
app.route("/", postRoutes);

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log("🚀 API running at http://localhost:4000");