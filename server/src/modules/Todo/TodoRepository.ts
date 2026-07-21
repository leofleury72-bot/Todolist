import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Todo } from "../../types/todo";
export type NewTodo = {
  title: string;
  description: string;
};
class TodoRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM todo ORDER BY created_at DESC",
    );
    return rows as Todo[];
  }
  async create(todo: NewTodo) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO todo (title, description) VALUES (?, ?)",
      [todo.title, todo.description],
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
  async update(id: number, todo: NewTodo) {
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
