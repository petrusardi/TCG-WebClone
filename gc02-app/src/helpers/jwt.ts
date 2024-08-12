import jwt from "jsonwebtoken";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_JOSE = new TextEncoder().encode(JWT_SECRET);

export const signToken = (data: Record<string, any>) => {
  return jwt.sign(data, JWT_SECRET);
};

export const verifyToken = async (token: string) => {
  return await jose.jwtVerify<{ _id: string }>(token, JWT_SECRET_JOSE);
};
