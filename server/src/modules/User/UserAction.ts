import argon2 from "argon2";
import type { RequestHandler } from "express";
import { createAuthToken, setAuthCookie } from "../Auth/Auth";
import UserRepository from "./UserRepository";

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
    const token = createAuthToken({
      id: userId,
    });

    setAuthCookie(res, token);

    res.status(201).json({
      message: "Compte créé avec succès",
      user: {
        id: userId,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};
const me: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserRepository.readById(req.user?.id);
    if (!user) {
      res.status(404).json({
        message: "Utilisateur introuvable",
      });
      return;
    }
    res.status(200).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export default { register, me };
