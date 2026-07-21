import type { NewTodo } from "../types/Todo";
import ApiFetch from "./ApiFetch";
const useAddTodo = () => {
  const addTodo = async (todo: NewTodo) => {
    await ApiFetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  };
  return { addTodo };
};

export default useAddTodo;
