"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesStore {
  favorites: number[]
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({
          favorites: Array.from(new Set([...state.favorites, id])),
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== id),
        })),
    }),
    {
      name: "playcount-favorites",
      getStorage: () => localStorage,
    }
  )
)