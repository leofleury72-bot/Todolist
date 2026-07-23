import type { Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthPlayload } from "../../types/auth";

const createAuthToken = (payload: AuthPlayload) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET n'est pas défini");
  }

  return jwt.sign(payload, jwtSecret, {
    expiresIn: "7d",
  });
};

const setAuthCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export { createAuthToken, setAuthCookie };
