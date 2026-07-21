import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Todo } from "../../types/Todo";
import "./TodoCard.css";
import { useTodoContext } from "../../context/TodoContext";

function TodoCard({ todo }: { todo: Todo }) {
  const { deleteTodo, updateTodo, updateCompletedTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description ?? "",
  );

  const handleSave = async () => {
    await updateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description ?? "");
    setIsEditing(false);
  };

  const handleToggleCompleted = async () => {
    await updateCompletedTodo(todo.id, !todo.is_completed);
  };

  return (
    <article
      className={
        todo.is_completed ? "todo-card todo-card--completed" : "todo-card"
      }
    >
      {isEditing ? (
        <div className="todo-card__edit-form">
          <label className="todo-card__label" htmlFor={`todo-title-${todo.id}`}>
            Titre
          </label>

          <input
            className="todo-card__input"
            id={`todo-title-${todo.id}`}
            type="text"
            value={editedTitle}
            required
            onChange={(event) => setEditedTitle(event.target.value)}
          />

          <label
            className="todo-card__label"
            htmlFor={`todo-description-${todo.id}`}
          >
            Description
          </label>

          <textarea
            className="todo-card__textarea"
            id={`todo-description-${todo.id}`}
            value={editedDescription}
            rows={4}
            onChange={(event) => setEditedDescription(event.target.value)}
          />

          <div className="todo-card__edit-actions">
            <button
              className="todo-card__button todo-card__button--save"
              type="button"
              onClick={handleSave}
            >
              <Check aria-hidden="true" size={16} />
              Enregistrer
            </button>

            <button
              className="todo-card__button todo-card__button--cancel"
              type="button"
              onClick={handleCancel}
            >
              <X aria-hidden="true" size={16} />
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-card__content">
          <div className="todo-card__text">
            <div className="todo-card__header">
              <h3
                className={
                  todo.is_completed
                    ? "todo-card__title todo-card__title--completed"
                    : "todo-card__title"
                }
              >
                {todo.title}
              </h3>

              <input
                className="todo-card__completion-checkbox"
                type="checkbox"
                checked={todo.is_completed}
                aria-label={
                  todo.is_completed
                    ? `Marquer ${todo.title} comme non terminée`
                    : `Marquer ${todo.title} comme terminée`
                }
                onChange={handleToggleCompleted}
              />
            </div>

            <p
              className={
                todo.is_completed
                  ? "todo-card__status todo-card__status--completed"
                  : "todo-card__status todo-card__status--pending"
              }
            >
              {todo.is_completed ? "✔️ Terminée" : "⏳ En cours"}
            </p>

            <p className="todo-card__description">
              {todo.description || "Aucune description"}
            </p>
          </div>

          <div className="todo-card__actions">
            <button
              className="todo-card__button todo-card__button--edit"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              <Pencil aria-hidden="true" size={15} />
              Modifier
            </button>

            <button
              className="todo-card__button todo-card__button--delete"
              type="button"
              aria-label={`Supprimer la tâche ${todo.title}`}
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 aria-hidden="true" size={15} />
              Supprimer
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default TodoCard;
