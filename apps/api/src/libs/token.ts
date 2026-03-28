export async function hashToken(token: string) {
  return await Bun.password.hash(token);
}

export async function verifyTokenHash(token: string, hash: string) {
  return await Bun.password.verify(token, hash);
}