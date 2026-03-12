export interface MinimumSystemRequirements {
  os: string
  processor: string
  memory: string
  graphics: string
  storage: string
}

export interface Game {
  id: number
  title: string
  thumbnail: string
  short_description: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
  status?: string
  game_url?: string
  minimum_system_requirements?: MinimumSystemRequirements
  description?: string
  screenshots?: { id: number | string; image: string }[]
}

export interface GameDetail extends Game {
  description: string
  screenshots?: { id: number | string; image: string }[]
}