"use client"

import { useGames } from "@/hooks/useGames"
import GameGrid from "@/components/game/GameGrid"
import GameGridSkeleton from "@/components/game/GameGridSkeleton"

export default function Home() {
  const { data, isLoading } = useGames({ platform: "", sortBy: "" })

  if (isLoading) return <GameGridSkeleton />
  if (!data || !Array.isArray(data)) return <div>No games found</div>

  return (
    <main className="p-16">
      <GameGrid games={data} />
    </main>
  )
}