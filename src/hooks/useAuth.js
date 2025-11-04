import { useNavigate } from "react-router";
import { useSessionStore } from "../store/sessionStore";
import { supabase } from "../lib/infra/supabase/supabase";
import { useProductsStore } from "../store/productStore";
import { useState } from "react";

export function useAuth() {
	const setUser = useSessionStore((state) => state.setUser);
	const clearUser = useSessionStore((state) => state.clearUser);
	const clearProducts = useProductsStore(state => state.clearProducts)

	const [error, setError] = useState('')

	const navigate = useNavigate();

	const login = async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error("Error al iniciar sesión:", error.message);
			setError(error.message);
			return;
		}

		setUser(data.user);
		navigate("/dashboard");
	};

	const signup = async (email, password) => {

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.error("Error al registrarse:", error.message);
			setError(error.message);
			return;
		}

		if (data.user) {
			setUser(data.user);
			navigate("/dashboard");
		}
	};

	const logout = async () => {
		await supabase.auth.signOut();
		clearUser();
		clearProducts()
		navigate("/login");
	};

	return {
		login,
		signup,
		logout,
		error
	};
}
