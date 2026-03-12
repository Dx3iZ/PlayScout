import api from "@/utils/api"
import { Game, GameDetail } from "@/types/game"

export const getGames = async (): Promise<Game[]> => {
  const res = await api.get("/games")
  return res.data
}

export const getGameById = async (id: string): Promise<GameDetail | null> => {
  const intId = Number(id)
  if (Number.isNaN(intId)) return null

  try {
    const res = await fetch(`/api/game?id=${encodeURIComponent(intId.toString())}`)
    if (!res.ok) {
      if (res.status === 404) {
        const allGames = await getGames()
        const found = allGames.find((g) => g.id === intId)
        if (found) {
          return {
            id: found.id,
            title: found.title,
            thumbnail: found.thumbnail,
            short_description: found.short_description,
            genre: found.genre,
            platform: found.platform,
            publisher: found.publisher,
            developer: found.developer,
            release_date: found.release_date,
            freetogame_profile_url: found.freetogame_profile_url,
            screenshots: [],
            description: found.short_description,
          } as GameDetail
        }

        return null
      }
      throw new Error("Failed to fetch game")
    }

    const data = await res.json()
    return data as GameDetail
  } catch (error) {
    throw error
  }
}

export const getGamesByCategory = async (category: string) => {
  const res = await api.get(`/games?category=${category}`)
  return res.data
}

export const getGamesByPlatform = async (platform: string) => {
  const res = await api.get(`/games?platform=${platform}`)
  return res.data
}

export const getSortedGames = async (sort: string) => {
  const res = await api.get(`/games?sort-by=${sort}`)
  return res.data
}