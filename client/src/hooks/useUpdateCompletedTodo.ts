import ApiFetch from "../hooks/ApiFetch";
const useUpdateCompletedTodo = () => {
  const updateCompletedTodo = async (id: number, is_completed: boolean) => {
    try {
      await ApiFetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_completed }),
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  return { updateCompletedTodo };
};
export default useUpdateCompletedTodo;
