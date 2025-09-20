'use client'

import dynamic from 'next/dynamic'

// Dynamically import the map component with no SSR
const MapLeaflet = dynamic(() => import('./MapLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
})

export default MapLeaflet
