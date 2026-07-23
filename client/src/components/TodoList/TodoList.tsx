import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import TodoCard from "../TodoCard/TodoCard";
import "./TodoList.css";

type TodoTab = "current" | "completed";

function TodoList() {
  const { todos } = useTodoContext();
  const [activeTab, setActiveTab] = useState<TodoTab>("current");

  const currentTodos = todos.filter((todo) => !todo.is_completed);
  const completedTodos = todos.filter((todo) => todo.is_completed);
  const displayedTodos =
    activeTab === "current" ? currentTodos : completedTodos;

  return (
    <section className="todo-list">
      <header className="todo-list__header">
        <div className="todo-list__heading">
          <p className="todo-list__eyebrow">Vue d’ensemble</p>
          <h2 className="todo-list__title">Mes tâches</h2>
        </div>
        <span
          className="todo-list__count"
          aria-label={`${displayedTodos.length} tâches affichées`}
        >
          {displayedTodos.length}
        </span>
      </header>

      <div
        className="todo-list__tabs"
        role="tablist"
        aria-label="Filtrer les tâches"
      >
        <button
          className={`todo-list__tab${activeTab === "current" ? " todo-list__tab--active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "current"}
          aria-controls="todo-list-panel"
          onClick={() => setActiveTab("current")}
        >
          Tâches en cours
          <span className="todo-list__tab-count">{currentTodos.length}</span>
        </button>
        <button
          className={`todo-list__tab${activeTab === "completed" ? " todo-list__tab--active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === "completed"}
          aria-controls="todo-list-panel"
          onClick={() => setActiveTab("completed")}
        >
          Tâches terminées
          <span className="todo-list__tab-count">{completedTodos.length}</span>
        </button>
      </div>

      {displayedTodos.length === 0 ? (
        <div className="todo-list__empty">
          <p className="todo-list__empty-title">
            {activeTab === "current"
              ? "Aucune tâche en cours"
              : "Aucune tâche terminée"}
          </p>
          <p className="todo-list__empty-description">
            {activeTab === "current"
              ? "Ajoutez une tâche ou reprenez une tâche terminée."
              : "Les tâches que vous terminez apparaîtront ici."}
          </p>
        </div>
      ) : (
        <div className="todo-list__items" id="todo-list-panel" role="tabpanel">
          {displayedTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TodoList;
