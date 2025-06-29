"use client"

import type React from "react"

import { useState } from "react"
import { Music, Play, Pause, Heart } from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  youtubeId: string
}

interface TrackListProps {
  tracks: Track[]
  currentTrackIndex: number
  isPlaying: boolean
  onTrackSelect: (index: number) => void
}

export default function TrackList({ tracks, currentTrackIndex, isPlaying, onTrackSelect }: TrackListProps) {
  const [likedTracks, setLikedTracks] = useState<Record<string, boolean>>({})

  const toggleLike = (e: React.MouseEvent, trackId: string) => {
    e.stopPropagation() // Prevent triggering the track selection
    setLikedTracks((prev) => ({
      ...prev,
      [trackId]: !prev[trackId],
    }))
  }

  return (
    <div className="border border-custom-mauve rounded-lg overflow-hidden bg-white">
      <h2 className="text-lg font-semibold p-4 bg-custom-mint text-custom-dark border-b border-custom-mauve">
        Tracklist
      </h2>
      <ul className="divide-y divide-custom-mint">
        {tracks.map((track, index) => (
          <li
            key={track.id}
            className={`p-4 flex items-center gap-3 hover:bg-custom-mint hover:bg-opacity-10 cursor-pointer transition-colors ${
              currentTrackIndex === index ? "bg-custom-mint bg-opacity-20" : ""
            }`}
            onClick={() => onTrackSelect(index)}
          >
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
              {currentTrackIndex === index ? (
                isPlaying ? (
                  <Pause className="w-5 h-5 text-custom-bluegray" />
                ) : (
                  <Play className="w-5 h-5 text-custom-bluegray" />
                )
              ) : (
                <Music className="w-5 h-5 text-custom-mauve" />
              )}
            </div>
            <div className="flex-grow">
              <div className="font-medium text-custom-dark">{track.title}</div>
              <div className="text-sm text-custom-mauve">{track.artist}</div>
            </div>
            <button
              onClick={(e) => toggleLike(e, track.id)}
              className="p-2 rounded-full hover:bg-custom-mint hover:bg-opacity-20 transition-colors"
              aria-label={likedTracks[track.id] ? "Unlike" : "Like"}
            >
              <Heart
                className={`w-5 h-5 ${
                  likedTracks[track.id] ? "fill-custom-pink text-custom-pink" : "text-custom-mauve"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
