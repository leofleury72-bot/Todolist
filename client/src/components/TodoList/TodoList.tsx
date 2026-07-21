import { useTodoContext } from "../../context/TodoContext";
import TodoCard from "../TodoCard/TodoCard";
import "./TodoList.css";

function TodoList() {
  const { todos } = useTodoContext();
  return (
    <section className="todo-list">
      <header className="todo-list__header">
        <div className="todo-list__heading">
          <p className="todo-list__eyebrow">Vue d’ensemble</p>
          <h2 className="todo-list__title">Mes tâches</h2>
        </div>
        <span
          className="todo-list__count"
          aria-label={`${todos.length} tâches`}
        >
          {todos.length}
        </span>
      </header>

      {todos.length === 0 ? (
        <div className="todo-list__empty">
          <p className="todo-list__empty-title">Votre liste est vide</p>
          <p className="todo-list__empty-description">
            Ajoutez une première tâche pour commencer à vous organiser.
          </p>
        </div>
      ) : (
        <div className="todo-list__items">
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TodoList;
