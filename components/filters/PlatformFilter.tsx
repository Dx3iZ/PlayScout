"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Props {
  value: string
  onChange: (v: string) => void
}

const platforms = ["pc", "browser", "all"]

export default function PlatformFilter({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v)} defaultValue="all">
      <SelectTrigger className="mx-auto w-full max-w-sm sticky top-[95px]">
        <SelectValue placeholder="All Platforms" />
      </SelectTrigger>
      <SelectContent position="popper">
        {platforms.map((c) => (
          <SelectItem className="capitalize" key={c} value={c}>
            {c.replace("pc", "PC (windows)").replace("browser", "Web Browser").replace("all", "All Platforms")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}