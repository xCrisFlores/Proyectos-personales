import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alta from "./pages/Alta";
import Editar from "./pages/Editar";
import { TaskProvider } from "./TaskContext";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alta" element={<Alta />} />
          <Route path="/editar/:taskId" element={<Editar />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;