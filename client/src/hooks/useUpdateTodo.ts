import type { NewTodo } from "../types/Todo";
import ApiFetch from "./ApiFetch";
const useUpdateTodo = () => {
  const updateTodo = async (id: number, updatedTodo: NewTodo) => {
    try {
      await ApiFetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  return { updateTodo };
};
export default useUpdateTodo;
