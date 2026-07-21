import { useEffect, useState } from "react";
import ApiFetch from "./ApiFetch";
import type { Todo } from "../types/Todo";

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
  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, fetchTodos };
};

export default useTodos;
