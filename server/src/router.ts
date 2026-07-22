import express from "express";
import requireAuth from "./modules/Auth/RequireAuth";
import TodoAction from "./modules/Todo/TodoAction";
import UserAction from "./modules/User/UserAction";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.post("/api/login", UserAction.login);
router.post("/api/register", UserAction.register);

router.get("/api/todos", requireAuth, TodoAction.browse);
router.post("/api/todos", requireAuth, TodoAction.add);
router.put("/api/todos/:id", requireAuth, TodoAction.update);
router.delete("/api/todos/:id", requireAuth, TodoAction.remove);
router.patch("/api/todos/:id", requireAuth, TodoAction.patch);
/* ************************************************************************* */

export default router;
