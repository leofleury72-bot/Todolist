import { useState } from "react";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<"login" | "register">("login");
  return isAuthenticated ? (
    <TodoProvider>
      <main>
        <Home />
      </main>
    </TodoProvider>
  ) : authScreen === "register" ? (
    <Register
      onLogin={() => setAuthScreen("login")}
      onRegistered={() => setIsAuthenticated(true)}
    />
  ) : (
    <Auth
      onLogin={() => setIsAuthenticated(true)}
      onRegister={() => setAuthScreen("register")}
    />
  );
}

export default App;
