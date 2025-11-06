import { BrowserRouter } from "react-router";
import "./App.css";

import { useAuthListener } from "../hooks/useAuthListener";
import AppRoutes from "./Routes";

const App = () => {
	// Supabase maneja internamente una sesión del usuario (guarda un token en localStorage y lo refresca automáticamente).
	useAuthListener();
	
	const base = import.meta.env.PUBLIC_BASE_PATH || "/";

	return (
		<BrowserRouter  basename={base}>
			<AppRoutes />
		</BrowserRouter>
	);
};

export default App;
