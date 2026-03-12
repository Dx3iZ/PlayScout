import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { Button } from "../ui/button"
import Image from "next/image"
import { GitHubIcon } from "../icons"

export default function Navbar() {
  return (
    <nav className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">

      <div className="p-4 px-18 flex justify-between items-center">

        <Link href="/" className="font-bold text-xl flex gap-2 items-center">
          <Image width="48" height="48" src="https://img.icons8.com/glassmorphism/48/planet.png" alt="planet"/>PlayScout
        </Link>

        <div className="flex gap-4 items-center">
          <Button variant="ghost" asChild className="cursor-pointer">
            <Link href="/favorites">
              <SparklesIcon/> Favorites
            </Link>
          </Button>

          <ThemeToggle />

          <Button variant={"secondary"} size={"icon"} className="cursor-pointer">
            <Link href="https://github.com/Dx3iZ" target="_blank" rel="noreferrer"><GitHubIcon/></Link></Button>
        </div>

      </div>

    </nav>
  )
}