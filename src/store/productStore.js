import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductsStore = create(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: "products-session",       storage: {
        getItem: (name) => {
          const stored = sessionStorage.getItem(name);
          return stored ? JSON.parse(stored) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
