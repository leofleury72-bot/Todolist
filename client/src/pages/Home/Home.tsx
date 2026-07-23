import { useNavigate } from "react-router";
import AddTodo from "../../components/AddTodo/AddTodo";
import TodoList from "../../components/TodoList/TodoList";
import useLogout from "../../hooks/useLogout";

import "./Home.css";

function Home() {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <section className="home-page">
      <header className="home-page__header">
        <p className="home-page__eyebrow">Organisation personnelle</p>
        <h2 className="home-page__title">Gérez vos tâches simplement</h2>
        <p className="home-page__description">
          Ajoutez vos prochaines actions et gardez une vue claire sur vos
          priorités.
        </p>

        <button
          className="home-page__logout"
          type="button"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </header>

      <div className="home-page__content">
        <aside className="home-page__form-panel">
          <AddTodo />
        </aside>

        <main className="home-page__list-panel">
          <TodoList />
        </main>
      </div>
    </section>
  );
}

export default Home;
