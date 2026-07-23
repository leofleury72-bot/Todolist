import argon2 from "argon2";
import type { RequestHandler } from "express";
import { createAuthToken, setAuthCookie } from "../Auth/Auth";
import UserRepository from "../User/UserRepository";
const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserRepository.readByEmail(email);

  if (!user) {
    res.status(401).json({
      message: "Email ou mot de passe incorrect",
    });

    return;
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    res.status(401).json({
      message: "Email ou mot de passe incorrect",
    });

    return;
  }
  const token = createAuthToken({
    id: user.id,
  });
  setAuthCookie(res, token);
  res.status(200).json({
    message: "Connexion réussie",
    user: {
      id: user.id,
      email: user.email,
    },
  });
};
const logout: RequestHandler = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({
    message: "Déconnexion réussie",
  });
};
export default { login, logout };
