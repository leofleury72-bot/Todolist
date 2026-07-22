import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "./UserRepository";

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

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Connexion réussie",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};
const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Champs obligatoire",
      });
      return;
    }
    const existing = await UserRepository.readByEmail(email);
    if (existing) {
      res.status(409).json({
        message: "Un compte existe déjà avec cet email",
      });
      return;
    }
    const passwordHash = await argon2.hash(password);
    const userId = await UserRepository.createAccount({
      email,
      passwordHash,
    });

    if (!userId) {
      res.status(500).json({
        message: "Erreur lors de la création du compte",
      });
      return;
    }
    res.status(201).json({
      message: "Compte créé avec succès",
      id: userId,
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register };
