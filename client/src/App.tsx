import Home from "./pages/Home/Home";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <main>
        <Home />
      </main>
    </TodoProvider>
  );
}

export default App;
