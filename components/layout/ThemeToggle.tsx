"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { ComputerDesktopIcon, SunIcon } from "@heroicons/react/24/solid"
import { MoonIcon } from "@heroicons/react/24/solid"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button className="border px-3 py-1 rounded opacity-0 pointer-events-none" aria-hidden="true">
        Loading...
      </button>
    )
  }

  const cycleTheme = () => {
    if (theme === "system") return setTheme("dark")
    if (theme === "dark") return setTheme("light")
    return setTheme("system")
  }

  return (
    <Button variant="outline"
      onClick={cycleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="cursor-pointer"
    >
      {theme === "system" ? (
        <>
          <ComputerDesktopIcon/> System ({resolvedTheme?.charAt(0).toUpperCase() + resolvedTheme?.slice(1)})
        </>
      ) : theme === "dark" ? (
        <>
        <MoonIcon/>Dark
        </>
      ) : (
        <>
        <SunIcon/>Ligth
        </>
      )}
    </Button>
  )
}