"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Toggle } from "../ui/toggle"
import { ScrollArea } from "../ui/scroll-area"

interface Props {
  value: string[]
  onChange: (v: string[]) => void
}

// Örnek kategoriler
const categories = [
  {"tag": "genre", "name": "mmorpg"},
  {"tag": "genre", "name": "shooter"},
  {"tag": "genre", "name": "strategy"},
  {"tag": "genre", "name": "moba"},
  {"tag": "genre", "name": "racing"},
  {"tag": "genre", "name": "sports"},
  {"tag": "genre", "name": "social"},
  {"tag": "tags", "name": "sandbox"},
  {"tag": "tags", "name": "open-world"},
  {"tag": "tags", "name": "survival"},
  {"tag": "combat", "name": "pvp"},
  {"tag": "combat", "name": "pve"},
  {"tag": "tags", "name": "pixel"},
  {"tag": "tags", "name": "voxel"},
  {"tag": "tags", "name": "zombie"},
  {"tag": "gameplay", "name": "turn-based"},
  {"tag": "gameplay", "name": "real-time"},
  {"tag": "tags", "name": "first-person"},
  {"tag": "tags", "name": "third-person"},
  {"tag": "tags", "name": "top-down"},
  {"tag": "tags", "name": "tank"},
  {"tag": "tags", "name": "space"},
  {"tag": "tags", "name": "sailing"},
  {"tag": "tags", "name": "side-scroller"},
  {"tag": "tags", "name": "superhero"},
  {"tag": "tags", "name": "permadeath"},
  {"tag": "genre", "name": "card"},
  {"tag": "genre", "name": "battle-royale"},
  {"tag": "genre", "name": "mmo"},
  {"tag": "tags", "name": "mmofps"},
  {"tag": "tags", "name": "mmotps"},
  {"tag": "graphics", "name": "3d"},
  {"tag": "graphics", "name": "2d"},
  {"tag": "setting", "name": "anime"},
  {"tag": "setting", "name": "fantasy"},
  {"tag": "setting", "name": "sci-fi"},
  {"tag": "genre", "name": "fighting"},
  {"tag": "tags", "name": "action-rpg"},
  {"tag": "tags", "name": "action"},
  {"tag": "setting", "name": "military"},
  {"tag": "tags", "name": "martial-arts"},
  {"tag": "tags", "name": "flight"},
  {"tag": "tags", "name": "low-spec"},
  {"tag": "setting", "name": "horror"},
  {"tag": "tags", "name": "mmorts"}
]

export default function CategoryFilter({ value, onChange }: Props) {
  const selectedSet = useMemo(() => new Set(value), [value])

  const toggleCategory = (category: string) => {
    if (selectedSet.has(category)) {
      onChange(value.filter((c) => c !== category))
    } else {
      onChange([...value, category])
    }
  }

  const sortedCategories = useMemo(() => {
    const ordering = ["tags", "genre", "combat", "gameplay", "graphics", "setting"]
    const grouped = categories.reduce<Record<string, {tag: string; name: string}[]>>((acc, item) => {
      if (!acc[item.tag]) acc[item.tag] = []
      acc[item.tag].push(item)
      return acc
    }, {})

    Object.keys(grouped).forEach((tag) => {
      grouped[tag].sort((a, b) => a.name.localeCompare(b.name))
    })

    return ordering
      .filter((tag) => grouped[tag])
      .flatMap((tag) => grouped[tag])
  }, [])

  const categoriesByTag = useMemo(() => {
    const data: Record<string, {tag: string; name: string}[]> = {}
    for (const cat of sortedCategories) {
      if (!data[cat.tag]) data[cat.tag] = []
      data[cat.tag].push(cat)
    }
    return data
  }, [sortedCategories])

  function formatCategory(name: string) {
    const map: Record<string, string> = {
      rpg: "RPG",
      mmo: "MMO",
      fps: "FPS",
      tps: "TPS",
      pvp: "PvP",
      pve: "PvE",
      rts: "RTS",
      "2d": "2D",
      "3d": "3D",
      mmorpg: "MMORPG",
      mmotps: "MMOTPS",
      mmofps: "MMOFPS",
      mmorts: "MMORTS",
    }

    return name
      .toLowerCase()
      .split("-")
      .map((word) => map[word] || word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ").replace("Sci Fi", "Sci-Fi")
  }

  return (
    <Card size="sm" className="mx-auto w-full max-w-sm p-2 sticky top-46">
      <CardHeader>
        <CardTitle>Category Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full scrollarea">
            {Object.entries(categoriesByTag).map(([tag, entries]) => (
              <div key={tag} className="border rounded-md p-5 grid flex-col w-full">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{tag}</h3>
                <div className="flex flex-wrap">
                  {entries.map((category) => (
                    <Toggle
                      key={`${category.tag}-${category.name}`}
                      variant={"outline"}
                      pressed={selectedSet.has(category.name)}
                      onPressedChange={() => toggleCategory(category.name)}
                      className="text-left"
                      aria-label={`Filter by ${category.name}`}
                    >
                      {formatCategory(category.name)}
                    </Toggle>
                  ))}
                </div>
              </div>
            ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}