"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { SearchIcon } from "../icons"
import { Field } from "../ui/field"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "../ui/input-group"

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitial = useRef(true)

  const searchQuery = value ?? searchParams.get("search") ?? ""
  const [search, setSearch] = useState(searchQuery)

  const handleSearch = () => {
    const value = search.trim()

    const params = new URLSearchParams(searchParams)

    if (!value) {
      params.delete("search")
      router.push(`/?${params.toString()}`)
      return
    }

    params.set("search", value)
    router.push(`/?${params.toString()}`)
  }

  const debounced = useDebounce(search.trim(), 500)

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false
      return
    }

    const params = new URLSearchParams(searchParams)
    const activeSearch = searchParams.get("search") || ""

    if (debounced === activeSearch) return

    if (!debounced) {
      params.delete("search")
      router.push(`/?${params.toString()}`)
      return
    }

    params.set("search", debounced)
    router.push(`/?${params.toString()}`)
  }, [debounced, router, searchParams])

  return (
    <Field orientation="horizontal">
      <InputGroup className="px-2 py-6">
        <InputGroupInput type="search"
        placeholder="Search games..."
        value={search}
        
        onChange={(e) => {
          const nextSearch = e.target.value
          setSearch(nextSearch)
          const normalized = nextSearch.trim()
          onChange?.(normalized ? nextSearch : "")
        }} />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary" onClick={handleSearch}>Search</InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}