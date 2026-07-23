import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import ApiFetch from "../../hooks/ApiFetch";
import "../Auth/Auth.css";
import "./Register.css";

type RegisterProps = {
  onLogin: () => void;
  onRegistered: () => void;
};

const decorations = ["✅", "🎯", "📝", "✏️", "📌", "🗓️", "⏰", "💡", "🔔"];

function Register({ onLogin, onRegistered }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      await ApiFetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      await ApiFetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      onRegistered();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Impossible de créer le compte pour le moment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-page register-page">
      <div className="auth-page__glow" aria-hidden="true" />
      <div className="auth-page__decorations" aria-hidden="true">
        {decorations.map((decoration, index) => (
          <span
            key={decoration}
            className={`auth-page__decoration auth-page__decoration--${index + 1}`}
          >
            {decoration}
          </span>
        ))}
      </div>

      <div className="auth-card">
        <div className="auth-card__logo" aria-hidden="true">
          ✨
        </div>
        <h1>Crée ton compte</h1>
        <p className="auth-card__subtitle">Commence à organiser tes tâches</p>

        <div className="auth-card__tabs" aria-label="Choix du formulaire">
          <button type="button" className="auth-card__tab" onClick={onLogin}>
            🔑 Connexion
          </button>
          <button
            type="button"
            className="auth-card__tab auth-card__tab--active"
          >
            ✨ Inscription
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__field">
            <span className="sr-only">Email</span>
            <Mail size={21} aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              autoComplete="email"
              required
            />
          </label>

          <label className="auth-form__field">
            <span className="sr-only">Mot de passe</span>
            <LockKeyhole size={21} aria-hidden="true" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="auth-form__visibility"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={
                showPassword
                  ? "Masquer les mots de passe"
                  : "Afficher les mots de passe"
              }
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </label>

          <label className="auth-form__field">
            <span className="sr-only">Confirmer le mot de passe</span>
            <LockKeyhole size={21} aria-hidden="true" />
            <input
              type={showPassword ? "text" : "password"}
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              placeholder="Confirmer le mot de passe"
              autoComplete="new-password"
              required
            />
          </label>

          {error && (
            <p className="auth-form__error" role="alert">
              {error}
            </p>
          )}
          <button
            className="auth-form__submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="auth-form__spinner" size={22} />
            ) : (
              "✨"
            )}
            {isLoading ? "Création et connexion…" : "Créer mon compte"}
          </button>
        </form>

        <p className="auth-card__signup">
          Déjà un compte ?{" "}
          <button type="button" onClick={onLogin}>
            Connecte-toi 🔑
          </button>
        </p>
      </div>
    </section>
  );
}

export default Register;
