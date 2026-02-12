import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Exercises from "./pages/Exercises"
import Plans from "./pages/Plans"
import Schedule from "./pages/Schedule"
import MainLayout from "./layouts/MainLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App