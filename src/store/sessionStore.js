// esta es la que se encarga de manejar la sesion glopbal del usuario con zustand
// libreria: https://zustand-demo.pmnd.rs/

import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { useProductsStore } from "./productStore";

const storeUserSession = set => ({
	user: null,
	setUser: user => set({ user }),
	updateUserProfile: updates => set(state => ({ user: state.user ? { ...state.user, ...updates } : null })),
	clearUser: () => {
		set({ user: null })
	},
}
)

export const useSessionStore = create(
	persist(
		storeUserSession, { name: "user-session" }
	)
)

