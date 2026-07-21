import { useState } from "react";
import type { NewTodo } from "../../types/Todo";
import "./AddTodo.css";
import { useTodoContext } from "../../context/TodoContext";

function AddTodo() {
  const { addTodo } = useTodoContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: NewTodo = {
      title,
      description,
    };

    await addTodo(newTodo);

    setTitle("");
    setDescription("");
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <div className="add-todo__header">
        <p className="add-todo__eyebrow">Nouvelle tâche</p>
        <h2 className="add-todo__title">Que devez-vous faire ?</h2>
      </div>

      <div className="add-todo__field">
        <label className="add-todo__label" htmlFor="title">
          Titre
        </label>
        <input
          className="add-todo__input"
          id="title"
          type="text"
          value={title}
          placeholder="Ex. Préparer la réunion"
          required
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="add-todo__field">
        <label className="add-todo__label" htmlFor="description">
          Description
          <span className="add-todo__optional">Optionnelle</span>
        </label>
        <textarea
          className="add-todo__textarea"
          id="description"
          value={description}
          placeholder="Ajoutez quelques détails utiles..."
          rows={5}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <button className="add-todo__submit" type="submit">
        Ajouter la tâche
      </button>
    </form>
  );
}

export default AddTodo;
