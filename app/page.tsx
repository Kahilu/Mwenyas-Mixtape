import CassettePlayer from "@/components/cassette-player"
import Envelope from "@/components/envelope"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-custom-mint to-custom-bluegray p-4 md:p-8 flex flex-col items-center pb-16">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-custom-dark text-center mb-8 mt-4 animate-fadeIn">
          🎈🎉Happy Birthday Love!🥳🎈
        </h1>

        {/* Envelope component replaces the message div */}
        <div className="mb-8 animate-fadeIn">
          <Envelope />
        </div>

        <CassettePlayer />

        {/* Attribution footer outside the cassette player container */}
        <div
          className="text-center text-sm text-white mt-8 pt-4 opacity-80 animate-fadeIn"
          style={{ animationDelay: "1.2s" }}
        >
          Designed &amp; Developed by Kahilu Phiri as a heartfelt gift to Mwenya Chitambala — copywritten with love,
          sealed with kisses. 💌
        </div>
      </div>
    </main>
  )
}
