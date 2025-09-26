import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lake City Access Map',
  description: 'Enhanced service area analysis for grocery and pharmacy access in Lake City, Seattle.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
            <a href="/" className="font-bold">Lake City Access Map</a>
            <a href="/enhanced-map.html" className="hover:underline">Map Analysis</a>
            <a href="/solutions.html" className="hover:underline">Solutions</a>
            <a href="/references.html" className="hover:underline">References</a>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}