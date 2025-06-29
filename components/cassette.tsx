"use client"

import { useEffect, useRef } from "react"

interface CassetteProps {
  isPlaying: boolean
  title?: string
}

export default function Cassette({ isPlaying, title = "Couple Playlist" }: CassetteProps) {
  const leftReelRef = useRef<HTMLDivElement>(null)
  const rightReelRef = useRef<HTMLDivElement>(null)

  // Animation for cassette reels
  useEffect(() => {
    if (!leftReelRef.current || !rightReelRef.current) return

    let animationId: number

    const animate = () => {
      if (isPlaying) {
        if (leftReelRef.current && rightReelRef.current) {
          leftReelRef.current.style.transform = `rotate(${(Date.now() / 30) % 360}deg)`
          rightReelRef.current.style.transform = `rotate(${(Date.now() / 30) % 360}deg)`
        }
        animationId = requestAnimationFrame(animate)
      }
    }

    if (isPlaying) {
      animate()
    }

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying])

  return (
    <div className="relative mx-auto w-full max-w-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Cassette outer case */}
      <div className="bg-custom-mauve rounded-lg shadow-lg p-4 relative">
        {/* Screws */}
        <div className="absolute top-3 left-3 w-3 h-3 bg-custom-dark rounded-full"></div>
        <div className="absolute top-3 right-3 w-3 h-3 bg-custom-dark rounded-full"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 bg-custom-dark rounded-full"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 bg-custom-dark rounded-full"></div>

        {/* Cassette inner */}
        <div className="bg-white bg-opacity-90 rounded p-3 relative">
          {/* Label area */}
          <div className="h-16 flex items-center justify-center mb-2 relative">
            {/* Side label */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-custom-bluegray font-bold">D-M21</div>

            {/* Title */}
            <div className="text-center text-custom-bluegray font-bold text-2xl font-reenie">{title}</div>

            {/* Side label */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-custom-dark font-bold">Zero®</div>

            {/* Red line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-custom-pink"></div>
          </div>

          {/* Tape and reels area */}
          <div className="relative h-20 flex justify-between items-center">
            {/* Left reel */}
            <div
              className="relative w-14 h-14 bg-custom-mint rounded-full border-4 border-custom-mauve overflow-hidden"
              ref={leftReelRef}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              {/* Add visible spokes to make rotation more obvious */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-0.5 w-1 h-1/2 bg-custom-bluegray"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-0.5 w-1 h-1/2 bg-custom-bluegray"></div>
                <div className="absolute left-0 top-1/2 -translate-y-0.5 w-1/2 h-1 bg-custom-bluegray"></div>
                <div className="absolute right-0 top-1/2 -translate-y-0.5 w-1/2 h-1 bg-custom-bluegray"></div>
              </div>
            </div>

            {/* Tape */}
            <div className="h-1 bg-custom-dark flex-grow mx-2"></div>

            {/* Right reel */}
            <div
              className="relative w-14 h-14 bg-custom-mint rounded-full border-4 border-custom-mauve overflow-hidden"
              ref={rightReelRef}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              {/* Add visible spokes to make rotation more obvious */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-0.5 w-1 h-1/2 bg-custom-bluegray"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-0.5 w-1 h-1/2 bg-custom-bluegray"></div>
                <div className="absolute left-0 top-1/2 -translate-y-0.5 w-1/2 h-1 bg-custom-bluegray"></div>
                <div className="absolute right-0 top-1/2 -translate-y-0.5 w-1/2 h-1 bg-custom-bluegray"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom part with holes */}
        <div className="h-10 mt-2 flex justify-center items-center gap-4">
          <div className="w-6 h-2 bg-custom-dark rounded"></div>
          <div className="w-2 h-2 bg-custom-dark rounded-full"></div>
          <div className="w-6 h-2 bg-custom-dark rounded"></div>
          <div className="w-2 h-2 bg-custom-dark rounded-full"></div>
          <div className="w-6 h-2 bg-custom-dark rounded"></div>
        </div>
      </div>
    </div>
  )
}
