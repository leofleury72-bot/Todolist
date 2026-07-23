import { type ReactNode, createContext, useContext } from "react";
import useAddTodo from "../hooks/useAddTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useTodos from "../hooks/useTodos";
import useUpdateCompletedTodo from "../hooks/useUpdateCompletedTodo";
import useUpdateTodo from "../hooks/useUpdateTodo";
import type { NewTodo, Todo } from "../types/Todo";

type TodoContextValue = {
  todos: Todo[];
  deleteTodo: (id: number) => Promise<void>;
  addTodo: (todo: NewTodo) => Promise<void>;
  updateTodo: (id: number, updateTodo: NewTodo) => Promise<void>;
  updateCompletedTodo: (id: number, is_completed: boolean) => Promise<void>;
};

type TodoProviderProps = {
  children: ReactNode;
};
const TodoContext = createContext<TodoContextValue | null>(null);

function TodoProvider({ children }: TodoProviderProps) {
  const { todos, fetchTodos } = useTodos();
  const { addTodo: addTodoApi } = useAddTodo();
  const { deleteTodo: deleteTodoApi } = useDeleteTodo();
  const { updateTodo: updateTodoApi } = useUpdateTodo();
  const { updateCompletedTodo: updateCompletedTodoApi } =
    useUpdateCompletedTodo();
  async function addTodo(todo: NewTodo) {
    await addTodoApi(todo);
    await fetchTodos();
  }
  async function deleteTodo(id: number) {
    await deleteTodoApi(id);
    await fetchTodos();
  }
  async function updateTodo(id: number, updateTodo: NewTodo) {
    await updateTodoApi(id, updateTodo);
    await fetchTodos();
  }
  async function updateCompletedTodo(id: number, is_completed: boolean) {
    await updateCompletedTodoApi(id, is_completed);
    await fetchTodos();
  }
  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, updateTodo, updateCompletedTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }

  return context;
}

export { TodoProvider, useTodoContext };
