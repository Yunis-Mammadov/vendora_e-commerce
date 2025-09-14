"use client";

import "@/styles/globals.scss";
import Navbar from "./components/Navbar/Navbar";

import { ReactLenis } from "@/app/utils/lenis"

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
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
