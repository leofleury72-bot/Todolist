import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import TodoAction from "./modules/Todo/TodoAction";
router.get("/api/todos", TodoAction.browse);
router.post("/api/todos", TodoAction.add);
router.put("/api/todos/:id", TodoAction.update);
router.delete("/api/todos/:id", TodoAction.remove);
router.patch("/api/todos/:id", TodoAction.patch);
// Logic to retrieve all todos from the database

/* ************************************************************************* */

export default router;
