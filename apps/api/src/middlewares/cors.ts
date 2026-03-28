export async function corsMiddleware(c: any, next: any) {
  c.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "http://localhost:3000");
  c.header("Access-Control-Allow-Credentials", "true");
  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    return c.body(null, 204);
  }

  await next();
}