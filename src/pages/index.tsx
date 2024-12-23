// "use client"
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react"
import {AppBar} from "../components/Appbar"
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
    <>
    <AppBar></AppBar>
    <h1>HYW</h1>
    </>
    
  );
}
