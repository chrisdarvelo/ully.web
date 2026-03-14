// Coffee plantation scene — footer of all public pages.
// Pure SVG + SMIL animation. No external dependencies, no client JS.

export default function CoffeeFarmScene() {
  return (
    <div style={{ position: 'relative', lineHeight: 0, overflow: 'hidden' }}>
      {/* Page-to-scene fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 160, zIndex: 2,
        background: 'linear-gradient(to bottom, #0E0C0A 0%, rgba(14,12,10,0.55) 55%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%' }}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4A90C0" />
            <stop offset="55%"  stopColor="#5BA3D0" />
            <stop offset="100%" stopColor="#7EC8E8" />
          </linearGradient>

          {/* ── Coffee plant symbol (Upgraded) ───────────────────────────
              Pruned Coffea Arabica shrub. Glossy leaves, white blooms, red cherries.
          ────────────────────────────────────────────────────────────── */}
          <symbol id="coffee-plant" overflow="visible">
            {/* Main stem */}
            <rect x="-2" y="-35" width="4" height="35" fill="#3d2b1f" />
            
            {/* Foliage layers - deep waxy green */}
            <ellipse cx="0" cy="-15" rx="35" ry="12" fill="#14330b" />
            <ellipse cx="0" cy="-25" rx="28" ry="10" fill="#1a4010" />
            <ellipse cx="0" cy="-35" rx="18" ry="8"  fill="#225216" />
            
            {/* Individual glossy leaves */}
            <g fill="#2a631c">
              <path d="M-30,-15 Q-35,-20 -25,-18 Z" />
              <path d="M30,-15 Q35,-20 25,-18 Z" />
              <path d="M-20,-28 Q-25,-32 -15,-30 Z" />
              <path d="M20,-28 Q25,-32 15,-30 Z" />
              <path d="M-10,-38 Q-15,-42 -5,-40 Z" />
              <path d="M10,-38 Q15,-42 5,-40 Z" />
            </g>

            {/* Coffee Snow (White Flowers) */}
            <g fill="#ffffff" opacity="0.9">
              <circle cx="-12" cy="-22" r="1.5" />
              <circle cx="8"   cy="-26" r="1.2" />
              <circle cx="-5"  cy="-32" r="1.5" />
              <circle cx="15"  cy="-18" r="1.2" />
            </g>

            {/* Ripe Coffee Cherries */}
            <g fill="#c41e3a">
              <circle cx="-18" cy="-14" r="2.2" />
              <circle cx="-22" cy="-16" r="2" />
              <circle cx="18"  cy="-14" r="2.2" />
              <circle cx="24"  cy="-12" r="2" />
              <circle cx="0"   cy="-28" r="2.5" />
              <circle cx="-8"  cy="-24" r="2" />
              <circle cx="10"  cy="-22" r="2" />
            </g>
            
            {/* Unripe Green Cherries */}
            <g fill="#7fb041">
              <circle cx="-14" cy="-16" r="1.8" />
              <circle cx="12"  cy="-18" r="1.8" />
              <circle cx="5"   cy="-30" r="1.5" />
            </g>
          </symbol>

          {/* ── Mario Mountain ────────────────────────────────────────── */}
          <symbol id="mario-mountain" overflow="visible">
            {/* Main body - rounded hill shape */}
            <path d="M-60,0 A60,60 0 0,1 60,0 L-60,0 Z" fill="#7DB060" stroke="#3a5a24" strokeWidth="3" />
            {/* Highlight */}
            <path d="M-45,0 A45,45 0 0,1 0,-45 L0,0 Z" fill="#9cd67a" opacity="0.4" />
            {/* Eyes */}
            <rect x="-8" y="-35" width="4" height="12" rx="2" fill="#000000" />
            <rect x="4"  y="-35" width="4" height="12" rx="2" fill="#000000" />
          </symbol>

          {/* ── Seagull ───────────────────────────────────────────────── */}
          <symbol id="seagull" overflow="visible">
            <path d="M-6,0 Q-3,-3 0,0 Q3,-3 6,0" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="d" 
                values="M-6,0 Q-3,-3 0,0 Q3,-3 6,0; M-6,-2 Q-3,1 0,-2 Q3,1 6,-2; M-6,0 Q-3,-3 0,0 Q3,-3 6,0"
                dur="1.2s" repeatCount="indefinite" />
            </path>
          </symbol>
        </defs>

        {/* ── Sky ─────────────────────────────────────────────────── */}
        <rect width="1440" height="320" fill="url(#skyGrad)" />

        {/* ── Sun (Mario Style) ────────────────────────────────────── */}
        <circle cx="900" cy="70" r="40" fill="#F5D140" stroke="#d4973e" strokeWidth="2" />
        <circle cx="890" cy="60" r="8" fill="#ffffff" opacity="0.3" />

        {/* ── Mario Clouds ─────────────────────────────────────────── */}
        <g fill="white" opacity="0.9">
          {/* Cloud 1 */}
          <path d="M100,60 A20,20 0 0,1 140,60 A20,20 0 0,1 180,60 L180,80 L100,80 Z" />
          {/* Cloud 2 */}
          <path d="M400,40 A20,20 0 0,1 440,40 A20,20 0 0,1 480,40 L480,60 L400,60 Z" />
          {/* Cloud 3 */}
          <path d="M750,50 A20,20 0 0,1 790,50 A20,20 0 0,1 830,50 L830,70 L750,70 Z" />
          {/* Cloud 4 */}
          <path d="M1150,30 A20,20 0 0,1 1190,30 A20,20 0 0,1 1230,30 L1230,50 L1150,50 Z" />
        </g>

        {/* ── Mountains (Mario Style) ──────────────────────────────── */}
        <use href="#mario-mountain" x="200"  y="286" transform="scale(1.8)" fill="#5ba3d0" opacity="0.3" />
        <use href="#mario-mountain" x="1100" y="286" transform="scale(1.5)" fill="#5ba3d0" opacity="0.2" />
        
        <g transform="translate(0, 286)">
          <use href="#mario-mountain" x="150"  y="0" transform="scale(1.2)" />
          <use href="#mario-mountain" x="450"  y="0" transform="scale(0.9)" />
          <use href="#mario-mountain" x="750"  y="0" transform="scale(1.4)" />
          <use href="#mario-mountain" x="1050" y="0" transform="scale(1.1)" />
          <use href="#mario-mountain" x="1350" y="0" transform="scale(1.3)" />
        </g>

        {/* ── Seagulls ─────────────────────────────────────────────── */}
        <use href="#seagull" x="300" y="100" />
        <use href="#seagull" x="340" y="120" />
        <use href="#seagull" x="1200" y="80" />

        {/* ── Cessna 150 (Upgraded) ────────────────────────────────── */}
        <g opacity="0.95">
          {/* Fuselage - aerodynamic but pixel-conscious */}
          <path d="M0,0 L80,0 L75,12 L5,12 Z" fill="#F0EDEA" transform="translate(0, 5)" />
          <path d="M0,6 L80,6 L78,12 L5,12 Z" fill="#CC2020" transform="translate(0, 5)" />
          
          {/* High Wing */}
          <rect x="-10" y="0" width="100" height="4" rx="2" fill="#F0EDEA" />
          <rect x="-10" y="0" width="10" height="4" rx="1" fill="#CC2020" />
          <rect x="80"  y="0" width="10" height="4" rx="1" fill="#CC2020" />
          
          {/* Wing Struts */}
          <line x1="15" y1="4" x2="15" y2="12" stroke="#C0BCBA" strokeWidth="2" />
          <line x1="65" y1="4" x2="65" y2="12" stroke="#C0BCBA" strokeWidth="2" />

          {/* Cockpit / Canopy */}
          <path d="M15,0 L45,0 L40,-8 L20,-8 Z" fill="#1A1A1A" />
          <path d="M18,-1 L42,-1 L38,-6 L22,-6 Z" fill="rgba(90,150,210,0.6)" />

          {/* Tail Section - Swept back like a real C150 */}
          <path d="M75,5 L95,5 L100,-15 L85,-15 Z" fill="#F0EDEA" />
          <rect x="95" y="-18" width="6" height="4" fill="#CC2020" /> {/* Tail beacon */}
          
          {/* Horizontal Stabilizer */}
          <rect x="85" y="5" width="20" height="3" fill="#F0EDEA" />

          {/* Engine & Propeller */}
          <rect x="-8" y="4" width="10" height="10" rx="2" fill="#252220" />
          <g transform="translate(-8, 9)">
            <ellipse cx="0" cy="0" rx="2" ry="18" fill="rgba(154,125,82,0.3)">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.1s" repeatCount="indefinite" />
            </ellipse>
            <rect x="-1" y="-2" width="2" height="4" fill="#5A5452" />
          </g>

          {/* Landing Gear (Tricycle) */}
          <rect x="5"  y="17" width="2" height="6" fill="#9A9288" />
          <circle cx="6" cy="23" r="3" fill="#252220" />
          <rect x="50" y="17" width="2" height="6" fill="#9A9288" />
          <circle cx="51" cy="23" r="3" fill="#252220" />
          <rect x="65" y="17" width="2" height="6" fill="#9A9288" />
          <circle cx="66" cy="23" r="3" fill="#252220" />

          <animateTransform
            attributeName="transform"
            type="translate"
            from="1560 60"
            to="-220 60"
            dur="55s"
            repeatCount="indefinite"
          />
        </g>

        {/* ── Ground ───────────────────────────────────────────────── */}
        <rect x="0" y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0" y="286" width="1440" height="4"  fill="#0E2208" opacity="0.4" />

        {/* ── Coffee Plantation Cluster ────────────────────────────── */}
        <g transform="translate(20, 286)">
          {/* Far plants */}
          <use href="#coffee-plant" x="0"   y="-2" transform="scale(0.8)" />
          <use href="#coffee-plant" x="60"  y="2"  transform="scale(0.75)" />
          <use href="#coffee-plant" x="120" y="-1" transform="scale(0.82)" />
          <use href="#coffee-plant" x="180" y="3"  transform="scale(0.78)" />
          <use href="#coffee-plant" x="240" y="-3" transform="scale(0.81)" />
          <use href="#coffee-plant" x="300" y="1"  transform="scale(0.76)" />
          <use href="#coffee-plant" x="360" y="-2" transform="scale(0.79)" />
          
          {/* Mid plants */}
          <use href="#coffee-plant" x="30"  y="8"  transform="scale(0.95)" />
          <use href="#coffee-plant" x="100" y="12" transform="scale(0.9)" />
          <use href="#coffee-plant" x="170" y="10" transform="scale(0.98)" />
          <use href="#coffee-plant" x="240" y="14" transform="scale(0.92)" />
          <use href="#coffee-plant" x="310" y="9"  transform="scale(0.96)" />
          
          {/* Front plants */}
          <use href="#coffee-plant" x="-10" y="22" transform="scale(1.2)" />
          <use href="#coffee-plant" x="80"  y="25" transform="scale(1.15)" />
          <use href="#coffee-plant" x="170" y="20" transform="scale(1.25)" />
          <use href="#coffee-plant" x="260" y="24" transform="scale(1.18)" />
          <use href="#coffee-plant" x="350" y="21" transform="scale(1.22)" />
        </g>

      </svg>
    </div>
  )
}
