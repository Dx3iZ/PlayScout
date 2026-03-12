import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const category = url.searchParams.get("category")
  const platform = url.searchParams.get("platform")
  const sortBy = url.searchParams.get("sort-by")

  let apiUrl = "https://www.freetogame.com/api/games"

  const params = new URLSearchParams()
  if (category) params.append("category", category)
  if (platform) params.append("platform", platform)
  if (sortBy) params.append("sort-by", sortBy)

  if (Array.from(params).length > 0) {
    apiUrl += `?${params.toString()}`
  }

  const res = await fetch(apiUrl)
  const data = await res.json()
  return NextResponse.json(data)
}