export type AppVariables = {
  userId: string;
  jwtPayload: {
    sub: string;
    jti: string;
    username: string;
    role: string;
    exp: number;
  };
  authUser: any;
};