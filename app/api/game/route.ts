import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ message: "Missing game id" }, { status: 400 })
  }

  const res = await fetch(`https://www.freetogame.com/api/game?id=${encodeURIComponent(id)}`)
  if (!res.ok) {
    return NextResponse.json({ message: "Failed to fetch game" }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
