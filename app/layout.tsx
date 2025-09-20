import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seattle Access Pilot',
  description: 'Compare 2015 vs 2025 food & pharmacy access and overlay proposed pilot for Seattle.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
            <a href="/" className="font-bold">Seattle Access Pilot</a>
            <a href="/seattle-2015-2025" className="hover:underline">2015 ↔ 2025 Map</a>
            <a href="/pilot" className="hover:underline">Proposed Pilot</a>
            <a href="/examples" className="hover:underline">Examples Elsewhere</a>
            <a href="/ppp" className="hover:underline">PPP & Supply Chain</a>
            <a href="/dashboard" className="hover:underline">Network Dashboard</a>
            <a href="/references" className="hover:underline">References</a>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}