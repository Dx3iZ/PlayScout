"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Props {
  value: string
  onChange: (v: string) => void
}

const sortOptions = [
  { label: "Release Date", value: "release-date" },
  { label: "Alphabetical", value: "alphabetical" },
  { label: "Relevance", value: "relevance" },
]

export default function SortFilter({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v)} defaultValue="all">
      <SelectTrigger className="mx-auto w-full max-w-sm sticky top-35">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent position="popper">
          {sortOptions.map((option) => (
            <SelectItem className="capitalize" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}