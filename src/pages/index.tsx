// "use client"
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react"
import {AppBar} from "../components/Appbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Music, LogIn } from 'lucide-react'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { data: session } = useSession()
  console.log(session)
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <header className="mb-8 w-full max-w-4xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold">VotePlay</h1>
          </div>
         <AppBar></AppBar>
        </header>
        
        <main className="text-center max-w-md">
          <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Stream Music Democratically
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Choose songs. Vote for your favorites. The most popular tracks play next.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-full transition-colors duration-300">
            Start Listening
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </main>
        
        <footer className="mt-16 text-sm text-gray-500">
          © 2023 VotePlay. All rights reserved.
        </footer>
      </div>
    )
  }
