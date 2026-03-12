"use client"

import { Game } from "@/types/game"
import { useFavorites } from "@/store/favorites.store"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { BookmarkIcon, BookmarkSlashIcon, CalendarIcon, ComputerDesktopIcon, GlobeAltIcon, SparklesIcon, TrashIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid"
import ZoomImage from "../ui/zoom-image"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import GameDialog from "./GameDialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface Props {
  game: Game
}

export default function GameCard({ game }: Props) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  const isFav = favorites.includes(game.id)

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(game.id)
    } else {
      addFavorite(game.id)
    }
  }

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 group">
      <ZoomImage src={game.thumbnail} alt={game.title}/>

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{game.genre}</Badge>
        </CardAction>
        <CardTitle className="truncate">{game.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex flex-col gap-5">
          <span className="line-clamp-3 h-15">{game.short_description}</span>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-default">{game.platform === "PC (Windows)" ? (
              <>
              <ComputerDesktopIcon /> PC (Windows)
              </>
            ) : (
              <>
              <GlobeAltIcon /> Web Browser
              </>
            )}</Badge>
            <Badge variant="outline" className="cursor-default"><CalendarIcon /> {game.release_date}</Badge>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row flex-wrap justify-between gap-2 w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="grow cursor-pointer">
              <ViewfinderCircleIcon />View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-250 p-8">
            <DialogTitle className="sr-only">{game.title} Details</DialogTitle>
            <DialogDescription className="sr-only">Detailed information about {game.title}</DialogDescription>
            <GameDialog game={game} />
          </DialogContent>
        </Dialog>

        <TooltipProvider>
          <Tooltip>
          {isFav ? (<>
            <TooltipTrigger asChild>
              <Button variant={"destructive"} className="cursor-pointer" size="icon" onClick={toggleFavorite}>
                <BookmarkSlashIcon/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove Favorite</p>
            </TooltipContent>
          </>) : (<>
            <TooltipTrigger asChild>
            <Button variant={"outline"} className="cursor-pointer" size="icon" onClick={toggleFavorite}>
              <BookmarkIcon/>
            </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Favorite</p>
            </TooltipContent>
          </>)}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}