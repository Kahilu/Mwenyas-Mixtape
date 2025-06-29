"use client"

import { useState } from "react"

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const toggleEnvelope = () => {
    setIsOpen(!isOpen)
    if (!hasOpened) {
      setHasOpened(true)
    }
  }

  return (
    <div
      className={`mx-auto max-w-2xl transition-all duration-500 ${
        isOpen ? "envelope-open" : "envelope-closed"
      } ${hasOpened ? "" : "envelope-pulse"}`}
      onClick={toggleEnvelope}
    >
      {/* Envelope */}
      <div
        className={`relative bg-custom-mauve rounded-lg shadow-md overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "h-auto" : "h-32 md:h-40 cursor-pointer"
        }`}
      >
        {/* Envelope flap */}
        <div
          className={`absolute top-0 left-0 w-full h-16 md:h-20 bg-custom-pink z-10 origin-top transition-all duration-700 ease-in-out ${
            isOpen ? "rotate-180 translate-y-full opacity-0" : "rotate-0"
          }`}
          style={{
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        ></div>

        {/* Envelope body */}
        <div
          className={`absolute inset-0 bg-custom-mauve border-2 border-custom-pink rounded-lg transition-all duration-700 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Envelope seal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center">
            <span className="text-white text-xl">💌</span>
          </div>

          {/* Envelope address */}
          <div className="absolute bottom-4 right-4 text-right">
            <p className="text-custom-dark font-reenie text-xl">To: Mwenya</p>
            <p className="text-custom-dark font-reenie text-xl">With Love ❤️</p>
          </div>
        </div>

        {/* Letter content (only visible when open) */}
        <div
          className={`bg-white p-5 text-center transition-all duration-700 ease-in-out ${
            isOpen ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-10"
          }`}
          style={{ transitionDelay: isOpen ? "0.4s" : "0s" }}
        >
          <p className="text-custom-dark leading-relaxed mb-4 font-reenie text-xl">
            This little tape holds pieces of my heart—songs that remind me of you, us, and the moments we've shared.
            Each one is a memory, a feeling, or something I've wanted to say but couldn't put into words.
          </p>
          <p className="text-custom-dark leading-relaxed mb-4 font-reenie text-xl">
            I hope when you listen, you feel how deeply you're loved.
          </p>
          <p className="text-custom-bluegray text-right italic mt-2 font-reenie text-xl">
            With love,
            <br />
            Your Man🌻
          </p>
        </div>
      </div>
    </div>
  )
}
