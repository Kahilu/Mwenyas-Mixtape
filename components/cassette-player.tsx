"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import Cassette from "@/components/cassette"
import TrackList from "@/components/track-list"

// Songs provided by the user
const tracks = [
  {
    id: "1",
    title: "I'm With You",
    artist: "Matthew Mole",
    youtubeId: "SbykTwJ398Q",
  },
  {
    id: "2",
    title: "Heaven Sent",
    artist: "Keyshia Cole",
    youtubeId: "POkQXeTv7-4",
  },
  {
    id: "3",
    title: "Mr & Mrs",
    artist: "Yo Maps",
    youtubeId: "O_N7NhDjSAw",
  },
  {
    id: "4",
    title: "Wrong or Right",
    artist: "Blxst",
    youtubeId: "JeAXnZmh31Q",
  },
  {
    id: "5",
    title: "Couple Song",
    artist: "Kahilu x Mwenya",
    youtubeId: "9j05wfm2my8",
  },
]

export default function CassettePlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)

  // Set isLoaded to true after a short delay to trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Initialize YouTube player
  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: tracks[currentTrackIndex].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
      setPlayer(newPlayer)
    }

    return () => {
      // Clean up
      if (player) {
        player.destroy()
      }
    }
  }, [])

  const onPlayerReady = (event: any) => {
    // Player is ready
    console.log("Player ready")
  }

  const onPlayerStateChange = (event: any) => {
    // When video ends, play next track
    if (event.data === window.YT.PlayerState.ENDED) {
      playNextTrack()
    }

    // Update playing state based on player state
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
  }

  const playTrack = (index: number) => {
    if (player) {
      setCurrentTrackIndex(index)
      player.loadVideoById(tracks[index].youtubeId)
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playPreviousTrack = () => {
    const newIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1
    playTrack(newIndex)
  }

  const playNextTrack = () => {
    const newIndex = currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1
    playTrack(newIndex)
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-xl p-8 md:p-10 w-full transition-all duration-1000 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Hidden YouTube player */}
      <div id="youtube-player" ref={playerRef} className="hidden"></div>

      {/* Cassette visualization */}
      <div
        className={`mb-10 transition-all duration-1000 delay-300 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Cassette isPlaying={isPlaying} title="Couple Playlist" />
      </div>

      {/* Controls */}
      <div
        className={`flex justify-center gap-6 mb-10 transition-all duration-1000 delay-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button
          onClick={playPreviousTrack}
          className="p-3 bg-custom-mint rounded-full hover:bg-opacity-80 transition-colors"
          aria-label="Previous track"
        >
          <SkipBack className="w-6 h-6 text-custom-dark" />
        </button>
        <button
          onClick={togglePlayPause}
          className="p-3 bg-custom-bluegray rounded-full hover:bg-opacity-80 transition-colors text-white"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={playNextTrack}
          className="p-3 bg-custom-mint rounded-full hover:bg-opacity-80 transition-colors"
          aria-label="Next track"
        >
          <SkipForward className="w-6 h-6 text-custom-dark" />
        </button>
      </div>

      {/* Track list */}
      <div
        className={`transition-all duration-1000 delay-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <TrackList
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          onTrackSelect={playTrack}
        />
      </div>
    </div>
  )
}

// Add type definition for the YouTube API
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}
