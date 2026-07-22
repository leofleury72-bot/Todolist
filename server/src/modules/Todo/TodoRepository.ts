import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { NewTodo, Todo, UpdateTodo } from "../../types/todo";

class TodoRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM todo ORDER BY created_at DESC",
    );
    return rows as Todo[];
  }
  async create(todo: NewTodo) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO todo (title, description, user_id) VALUES (?, ?, ?)",
      [todo.title, todo.description, todo.userId],
    );
    return result.insertId;
  }
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM todo WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
  async update(id: number, todo: UpdateTodo) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE todo SET title = ?, description = ? WHERE id = ?",
      [todo.title, todo.description, id],
    );
    return result.affectedRows;
  }
  async updateCompleted(id: number, is_completed: boolean) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE todo SET is_completed = ? WHERE id = ?",
      [is_completed, id],
    );
    return result.affectedRows;
  }
}
export default new TodoRepository();
