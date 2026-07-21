import ApiFetch from "./ApiFetch";
const useDeleteTodo = () => {
  const deleteTodo = async (id: number) => {
    try {
      await ApiFetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return {
    deleteTodo,
  };
};

export default useDeleteTodo;
