import { useState } from "react";
import type { Todo } from "../types/Todo";
import ApiFetch from "./ApiFetch";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const data = await ApiFetch("/api/todos");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  fetchTodos();

  return { todos, fetchTodos };
};

export default useTodos;
