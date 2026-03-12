import { useState } from "react"
import { Game } from "@/types/game"
import GameCard from "./GameCard"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import CategoryFilter from "../filters/CategoryFilter"
import PlatformFilter from "../filters/PlatformFilter"
import SortFilter from "../filters/SortFilter"
import SearchBar from "../filters/SearchBar"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import { ArrowUpRightIcon } from "@hugeicons/core-free-icons"
import { Button } from "../ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../ui/pagination"

interface Props {
  games: Game[] | null | undefined
}

export default function GameGrid({ games }: Props) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string[]>([])
  const [platform, setPlatform] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 24

  if (!Array.isArray(games) || games.length === 0) {
    return (
      <Card className="mx-auto max-w-lg mt-6 border border-dashed border-muted bg-muted/30 p-6">
        <CardContent>
          <CardTitle className="text-lg">No games match your filters</CardTitle>
          <CardDescription>
            Sorry, we could not find anything. Try changing the search keyword or selecting another category/platform.
          </CardDescription>
        </CardContent>
      </Card>
    )
  }

  const filteredByCategory = category.length
    ? games.filter((game) =>
        category.some((cat) =>
          game.genre.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : games

  const filteredByPlatform = platform && platform !== "all"
    ? filteredByCategory.filter((game) =>
        game.platform.toLowerCase().includes(platform.toLowerCase())
      )
    : filteredByCategory

  const searched = filteredByPlatform.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = (() => {
    if (sortBy === "release-date") {
      return [...searched].sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date))
    }
    if (sortBy === "alphabetical") {
      return [...searched].sort((a, b) => a.title.localeCompare(b.title))
    }
    return searched
  })()

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage))
  const start = (page - 1) * perPage
  const paginatedGames = sorted.slice(start, start + perPage)

  return (
    <div className="flex flex-col gap-6">
      <SearchBar value={search} onChange={setSearch}/>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 mx-auto w-full max-w-88">
          <PlatformFilter value={platform} onChange={setPlatform} />
          <SortFilter value={sortBy} onChange={setSortBy} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
        {sorted.length === 0 ? (
          <>
          <Empty className="border border-dashed border-muted bg-muted/30">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                a
              </EmptyMedia>
              <EmptyTitle>No Projects Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any projects yet. Get started by creating
                your first project.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button>Create Project</Button>
              <Button variant="outline">Import Project</Button>
            </EmptyContent>
          </Empty>
          </>
        ) : (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {paginatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          </>
        )}
      </div>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setPage(i + 1)} isActive={page === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}