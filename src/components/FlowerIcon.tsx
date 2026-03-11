interface FlowerIconProps {
  size?: number
  color?: string
  glow?: boolean
}

const PETALS = [0, 60, 120, 180, 240, 300]
const STAMENS = [30, 90, 150, 210, 270, 330]
const PETAL_PATH = 'M100,100 C115,98 108,60 108,35 C108,15 104,8 100,5 C96,8 92,15 92,35 C92,60 85,98 100,100 Z'
const STAMEN_PATH = 'M100,100 Q102,85 100,68 L103,64 L100,58 L97,64 L100,68'

export default function FlowerIcon({ size = 28, color = '#FFFFFF', glow = false }: FlowerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      style={glow ? { filter: 'drop-shadow(0 0 6px rgba(200,146,60,0.7))' } : undefined}
    >
      {PETALS.map(angle => (
        <g key={angle} transform={`rotate(${angle}, 100, 100)`}>
          <path d={PETAL_PATH} fill={color} fillOpacity="0.92" />
          <path d="M100,100 L100,60" stroke="#F5B041" strokeWidth="0.6" strokeOpacity="0.35" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="100" cy="100" r="15" fill="rgba(0,0,0,0.25)" />
      {STAMENS.map(angle => (
        <g key={angle} transform={`rotate(${angle}, 100, 100)`}>
          <path d={STAMEN_PATH} fill="#F5B041" fillOpacity="0.9" />
        </g>
      ))}
      <circle cx="100" cy="100" r="4.2" fill="rgba(0,0,0,0.65)" />
      <circle cx="100" cy="100" r="2.5" fill="#000" />
    </svg>
  )
}
