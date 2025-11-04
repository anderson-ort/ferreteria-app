// En este sector empezamos a realizar la logica de la ruta protegida en donde le indicamos el como se debe ver la ruta
import { Navigate } from "react-router";
import { useSessionStore } from "../store/sessionStore.js";

const ProtectedRoute = ({ children }) => {
	const { user } = useSessionStore(); // de donde sale este session? pues es la que maneja nuestro  supabase y el Zustand(reemplazo de Redux)

	if (!user) return <Navigate to="/login" replace />;
	return children;
};

export default ProtectedRoute;
