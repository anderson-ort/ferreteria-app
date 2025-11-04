import { useEffect } from "react";
import { useSessionStore } from "../store/sessionStore";
import { supabase } from "../lib/infra/supabase/supabase";

export function useAuthListener() {
	const setUser = useSessionStore((state) => state.setUser);
	const clearUser = useSessionStore((state) => state.clearUser);

	useEffect(() => {
		// 1  Chequeo inicial: obtener la sesión actual si existe
		const getInitialSession = async () => {
			const { data } = await supabase.auth.getSession();
			if (data?.session?.user) {
				setUser(data.session.user);
			} else {
				clearUser();
			}
		};

		getInitialSession();

		// 2️ Escuchar los cambios de sesión (login, logout, refresh)
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				if (session?.user) {
					setUser(session.user);
				} else {
					clearUser();
				}
			},
		);

		// 3️ Limpiar listener cuando se desmonta
		return () => listener.subscription.unsubscribe();
	}, [setUser, clearUser]);
}
