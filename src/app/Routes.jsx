// En este sector necesitamos organizar las routes y como se van a dirigiendo el usuario
// por ahora enfocaremos en los siguientes puntos:
// - login
// - logout
// - main-dashboard(o pagina principal)
// - para ello necesitamos una dependencia nueva: ReactRouter https://reactrouter.com/start/declarative/installation

import { Routes, Route, Navigate } from "react-router";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Store from "../pages/Store.jsx";
import Dashboard from "../pages/Dashboard.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/store" element={<Store />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes