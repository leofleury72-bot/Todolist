import { useState } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Register/Register";

function App() {
  const [authScreen, setAuthScreen] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  return authScreen === "register" ? (
    <Register
      onLogin={() => setAuthScreen("login")}
      onRegistered={() => navigate("/", { replace: true })}
    />
  ) : (
    <Auth
      onLogin={() => navigate("/", { replace: true })}
      onRegister={() => setAuthScreen("register")}
    />
  );
}

export default App;
