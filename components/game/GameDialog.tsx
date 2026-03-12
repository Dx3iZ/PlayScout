"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { getGameById } from "@/services/games.service"
import { Game, GameDetail } from "@/types/game"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon"
import { GlobeAltIcon, CpuChipIcon, CursorArrowRaysIcon, TagIcon, CalendarIcon, InformationCircleIcon, BookOpenIcon } from "@heroicons/react/24/solid"

interface Props {
  game: Game
}

export default function GameDialog({ game }: Props) {
  const [details, setDetails] = useState<GameDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getGameById(String(game.id))
      .then((response) => {
        if (active) {
          setDetails(response)
          setError(null)
        }
      })
      .catch(() => {
        if (active) setError("Could not load game details")
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [game.id])

  const current: GameDetail = {
    ...game,
    ...details,
    description: details?.description || game.description || game.short_description,
  }

  if (isLoading) {
    return <div className="p-6 text-center">Loading details...</div>
  }

  if (error) {
    return <div className="p-6 text-center text-destructive">{error}</div>
  }

  return (
    <div className="no-scrollbar max-h-[80vh] overflow-y-auto flex flex-col gap-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">{current.title}</h2>
        <p className="text-sm text-muted-foreground">{current.short_description}</p>
        <div className="flex flex-wrap gap-2">
          {current.status && <Badge variant="outline" style={{borderColor: "oklch(0.77 0.20 131)"}}><ChartBarIcon /> Status: {current.status}</Badge>}
          <Badge variant="outline"><TagIcon />Genre: {current.genre}</Badge>
          <Badge variant="outline"><GlobeAltIcon />Platform: {current.platform}</Badge>
          <Badge variant="outline"><CalendarIcon />Release: {current.release_date}</Badge>
        </div>
      </header>

      {(current.screenshots && current.screenshots.length > 0) ? (
        <Carousel>
          <CarouselContent>
            {current.screenshots.map((shot) => (
              <CarouselItem key={shot.id}>
                <div className="relative h-100">
                  <Image
                    src={shot.image}
                    alt={`${current.title} screenshot`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="bg-muted p-6 text-center rounded-xl">No screenshots available.</div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <h3 className="text-lg font-semibold flex gap-2"><BookOpenIcon style={{ width: "18px"}}/>About</h3>
          <p className="text-sm leading-6 text-muted-foreground">{current.description}</p>
        </div>

        <div>
            <h3 className="text-lg font-semibold flex gap-2"><CpuChipIcon style={{ width: "18px"}}/>System Requirements</h3>
            {current.minimum_system_requirements ? (
            <ul className="space-y-1 text-sm">
                <li className="text-md text-muted-foreground"><strong>OS:</strong> {current.minimum_system_requirements.os}</li>
                <li className="text-md text-muted-foreground"><strong>Memory:</strong> {current.minimum_system_requirements.memory}</li>
                <li className="text-md text-muted-foreground"><strong>Graphics:</strong> {current.minimum_system_requirements.graphics}</li>
                <li className="text-md text-muted-foreground"><strong>Storage:</strong> {current.minimum_system_requirements.storage}</li>
                <li className="text-md text-muted-foreground"><strong>Processor:</strong> {current.minimum_system_requirements.processor}</li>
            </ul>
            ) : (
            <p className="text-sm text-muted-foreground">No system requirements available.</p>
            )}
        </div>
      </div>
        <div>
            <h3 className="text-lg font-semibold flex gap-2"><InformationCircleIcon style={{ width: "18px"}}/>Info</h3>
            <ul className="space-y-1 text-sm">
            <li className="text-md text-muted-foreground"><strong>Publisher:</strong> {current.publisher}</li>
            <li className="text-md text-muted-foreground"><strong>Developer:</strong> {current.developer}</li>
            <li className="text-md text-muted-foreground">
                <strong>Game URL:</strong>{" "}
                <a href={current.game_url ?? current.freetogame_profile_url} target="_blank" rel="noreferrer" className="text-primary underline after:content-['_↗']">
                Open
                </a>
            </li>
            <li className="text-md text-muted-foreground">
                <strong>Profile:</strong>{" "}
                <a href={current.freetogame_profile_url} target="_blank" rel="noreferrer" className="text-primary underline after:content-['_↗']">
                Open
                </a>
            </li>
            </ul>
            <Button asChild className="mt-4 w-full">
            <a href={current.game_url ?? current.freetogame_profile_url} target="_blank" rel="noreferrer">
                <CursorArrowRaysIcon /> Visit Game Page
            </a>
            </Button>
        </div>
    </div>
  )
}
