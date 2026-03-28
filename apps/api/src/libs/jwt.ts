import { sign, verify } from "hono/jwt";

export const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;
const JWT_ALG = "HS256" as const;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

export type AppJwtPayload = {
  sub: string;
  jti: string;
  username: string;
  role: string;
  exp: number;
};

export async function createJwt(payload: {
  userId: string;
  username: string;
  role: string;
  jti: string;
}) {
  const exp = Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN_SECONDS;

  return sign(
    {
      sub: payload.userId,
      username: payload.username,
      role: payload.role,
      jti: payload.jti,
      exp,
    },
    JWT_SECRET,
    JWT_ALG
  );
}

export async function verifyJwt(token: string) {
  return verify(token, JWT_SECRET, JWT_ALG) as Promise<AppJwtPayload>;
}

export const jwtMaxAge = JWT_EXPIRES_IN_SECONDS;