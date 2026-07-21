import type { RequestHandler } from "express";
import TodoRepository from "./TodoRepository";

const browse: RequestHandler = async (_req, res, next) => {
  try {
    console.log("La route GET /api/todos a été appelée");

    const todos = await TodoRepository.readAll();

    console.log(todos);

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const insertId = await TodoRepository.create({ title, description });
    res.status(201).json({
      message: "Todo created successfully",
      id: insertId,
    });
  } catch (error) {
    next(error);
  }
};
const remove: RequestHandler = async (req, res, next) => {
  try {
    const todoId = Number(req.params.id);
    const affectedRows = await TodoRepository.delete(todoId);

    if (affectedRows === 0) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};
const update: RequestHandler = async (req, res, next) => {
  console.log("ACTION UPDATE APPELÉE");
  try {
    const { title, description } = req.body;
    const todoId = Number(req.params.id);
    const affectedRows = await TodoRepository.update(todoId, {
      title,
      description,
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.status(200).json({ message: "Todo updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};
const patch: RequestHandler = async (req, res, next) => {
  try {
    const { is_completed } = req.body;
    const todoId = Number(req.params.id);
    const affectedRows = await TodoRepository.updateCompleted(
      todoId,
      is_completed,
    );
    if (affectedRows === 0) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, add, remove, update, patch };
