"use client";

import "@/styles/globals.scss";
import Navbar from "./components/Navbar/Navbar";
import localFont from 'next/font/local'

import { ReactLenis } from "@/app/utils/lenis"


const quilon = localFont({
  src: [
    {
      path: "../public/fonts/Quilon-Medium.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Quilon-Medium.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en" className={quilon.variable}>
      <ReactLenis root>
        <body>
          <Navbar />
          <main className="snap-root">
            {children}
          </main>
        </body>
      </ReactLenis>
    </html>
  );
}
