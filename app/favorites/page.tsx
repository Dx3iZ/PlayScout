"use client"

import { useFavorites } from "@/store/favorites.store"
import { useGames } from "@/hooks/useGames"
import GameGrid from "@/components/game/GameGrid"
import { Game } from "@/types/game"
import { useMemo } from "react"
export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { data, isLoading } = useGames({ platform: "", sortBy: "" })

  if (isLoading) {
    return <div className="mx-auto p-6 max-w-4xl">Loading...</div>
  }

  if (!data || !Array.isArray(data)) {
    return (
      <div className="mx-auto p-6 max-w-4xl">
        <p className="text-center text-muted-foreground">No favorites data available.</p>
      </div>
    )
  }

  const favoriteList = useMemo(
    () => data.filter((game: Game) => favorites.includes(game.id)),
    [data, favorites]
  )

  return (
    <div className="p-16">
      <h1 className="text-3xl font-bold mb-6">
        Favorite Games
      </h1>

      <GameGrid games={favoriteList} />
    </div>
  )
}