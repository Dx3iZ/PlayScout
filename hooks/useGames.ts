"use client"

import { useQuery } from "@tanstack/react-query"
import { Game } from "@/types/game"

interface QueryParams {
  category?: string
  platform?: string
  sortBy?: string
}

export const useGames = (params: QueryParams = {}) => {
  return useQuery<Game[]>({
    queryKey: ["games", params],
    queryFn: async () => {
      const query = new URLSearchParams()
      if (params.category) query.append("category", params.category)
      if (params.platform) query.append("platform", params.platform)
      if (params.sortBy) query.append("sort-by", params.sortBy)

      const res = await fetch(`/api/games?${query.toString()}`)
      if (!res.ok) throw new Error("Failed to fetch games")
      return res.json()
    },
    placeholderData: (previousData) => previousData, // sayfa geçişlerinde flicker engelle
  })
}