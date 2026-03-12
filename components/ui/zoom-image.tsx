"use client"

import Image from "next/image"

interface ZoomImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function ZoomImage({
  src,
  alt,
  width = 400,
  height = 250,
}: ZoomImageProps) {
  return (
    <div className="relative overflow-hidden group">
      <Image
        src={new URL(src).searchParams.get("g") || src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        className="transition-transform duration-500 group-hover:scale-110 object-cover"
      />

      {/* Gradient Overlay */}
      <div
        className="
        pointer-events-none
        absolute 
        bottom-0 
        left-0 
        w-full 
        h-24
        bg-linear-to-t
        from-[#171717]
        via-[#171717]/60
        to-transparent
      "
      />
    </div>
  )
}