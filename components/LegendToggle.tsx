'use client'

interface LegendToggleProps {
  selected: '2015' | '2025' | 'pilot'
  onSelect: (selection: '2015' | '2025' | 'pilot') => void
  className?: string
}

export default function LegendToggle({ selected, onSelect, className = '' }: LegendToggleProps) {
  const buttons = [
    { key: '2015' as const, label: '2015 Access' },
    { key: '2025' as const, label: '2025 Access' },
    { key: 'pilot' as const, label: 'Proposed Pilot' },
  ]

  return (
    <div className={`flex gap-2 ${className}`}>
      {buttons.map((button) => (
        <button
          key={button.key}
          onClick={() => onSelect(button.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selected === button.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
