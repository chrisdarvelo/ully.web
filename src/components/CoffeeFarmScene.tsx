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

          {/* ── Coffee plant symbol — Minecraft style, small & square ── */}
          <symbol id="coffee-plant" overflow="visible">
            {/* Short blocky trunk */}
            <rect x="-4" y="-22" width="8" height="22" fill="#4A2912" />
            <rect x="-4" y="-22" width="4" height="6" fill="#5E3418" />
            <rect x="0"  y="-16" width="4" height="6" fill="#5E3418" />
            <rect x="-4" y="-10" width="4" height="6" fill="#5E3418" />
            <rect x="0"  y="-4"  width="4" height="6" fill="#5E3418" />

            {/* Square leaf canopy block */}
            <rect x="-16" y="-42" width="32" height="22" fill="#1B5C0A" />
            {/* Leaf pixel texture */}
            <rect x="-16" y="-42" width="8"  height="8"  fill="#236E0C" />
            <rect x="-6"  y="-42" width="6"  height="6"  fill="#145006" />
            <rect x="2"   y="-42" width="8"  height="8"  fill="#1E6608" />
            <rect x="-14" y="-32" width="6"  height="7"  fill="#145006" />
            <rect x="-5"  y="-34" width="8"  height="8"  fill="#236E0C" />
            <rect x="7"   y="-32" width="7"  height="7"  fill="#1E6608" />
            {/* Bottom shadow edge */}
            <rect x="-16" y="-22" width="32" height="3" fill="#0A2E04" opacity="0.5" />

            {/* Cherry clusters — left vine */}
            <rect x="-10" y="-19" width="3" height="3" fill="#C41E3A" />
            <rect x="-7"  y="-19" width="3" height="3" fill="#A01830" />
            <rect x="-10" y="-12" width="3" height="3" fill="#A01830" />
            <rect x="-7"  y="-12" width="3" height="3" fill="#C41E3A" />
            <rect x="-10" y="-5"  width="3" height="3" fill="#C41E3A" />

            {/* Cherry clusters — right vine */}
            <rect x="4"  y="-17" width="3" height="3" fill="#C41E3A" />
            <rect x="7"  y="-17" width="3" height="3" fill="#A01830" />
            <rect x="4"  y="-10" width="3" height="3" fill="#A01830" />
            <rect x="7"  y="-10" width="3" height="3" fill="#C41E3A" />
            <rect x="4"  y="-3"  width="3" height="3" fill="#C41E3A" />
          </symbol>

          <symbol id="mario-mountain" overflow="visible">
            <path d="M-60,0 A60,60 0 0,1 60,0 L-60,0 Z" fill="#7DB060" stroke="#3a5a24" strokeWidth="3" />
            <path d="M-45,0 A45,45 0 0,1 0,-45 L0,0 Z" fill="#9cd67a" opacity="0.4" />
            <rect x="-8" y="-35" width="4" height="12" rx="2" fill="#000000" />
            <rect x="4"  y="-35" width="4" height="12" rx="2" fill="#000000" />
          </symbol>

          <symbol id="seagull" overflow="visible">
            <path d="M-6,0 Q-3,-3 0,0 Q3,-3 6,0" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="d" 
                values="M-6,0 Q-3,-3 0,0 Q3,-3 6,0; M-6,-2 Q-3,1 0,-2 Q3,1 6,-2; M-6,0 Q-3,-3 0,0 Q3,-3 6,0"
                dur="1.5s" repeatCount="indefinite" />
            </path>
          </symbol>
        </defs>

        <rect width="1440" height="320" fill="url(#skyGrad)" />
        <circle cx="900" cy="70" r="40" fill="#F5D140" stroke="#d4973e" strokeWidth="2" />
        <circle cx="890" cy="60" r="8" fill="#ffffff" opacity="0.3" />

        <g fill="white" opacity="0.9">
          <path d="M100,60 A20,20 0 0,1 140,60 A20,20 0 0,1 180,60 L180,80 L100,80 Z" />
          <path d="M400,40 A20,20 0 0,1 440,40 A20,20 0 0,1 480,40 L480,60 L400,60 Z" />
          <path d="M750,50 A20,20 0 0,1 790,50 A20,20 0 0,1 830,50 L830,70 L750,70 Z" />
          <path d="M1150,30 A20,20 0 0,1 1190,30 A20,20 0 0,1 1230,30 L1230,50 L1150,50 Z" />
        </g>

        <use href="#mario-mountain" x="200"  y="286" transform="scale(1.8)" fill="#5ba3d0" opacity="0.3" />
        <use href="#mario-mountain" x="1100" y="286" transform="scale(1.5)" fill="#5ba3d0" opacity="0.2" />
        
        <g transform="translate(0, 286)">
          <use href="#mario-mountain" x="150"  y="0" transform="scale(1.2)" />
          <use href="#mario-mountain" x="450"  y="0" transform="scale(0.9)" />
          <use href="#mario-mountain" x="750"  y="0" transform="scale(1.4)" />
          <use href="#mario-mountain" x="1050" y="0" transform="scale(1.1)" />
          <use href="#mario-mountain" x="1350" y="0" transform="scale(1.3)" />
        </g>

        <use href="#seagull" x="300" y="100" />
        <use href="#seagull" x="340" y="120" />
        <use href="#seagull" x="1200" y="80" />

        <g opacity="0.95">
          {/* High Wing — flush on fuselage roof at y=0 */}
          <rect x="-15" y="-3" width="112" height="5" rx="2" fill="#F0EDEA" />
          <rect x="-15" y="-3" width="13" height="5" rx="1" fill="#CC2020" />
          <rect x="84"  y="-3" width="13" height="5" rx="1" fill="#CC2020" />

          {/* Cockpit / Canopy */}
          <path d="M16,-3 L48,-3 L43,-13 L21,-13 Z" fill="#1A1A1A" />
          <path d="M19,-4 L45,-4 L41,-11 L23,-11 Z" fill="rgba(90,150,210,0.6)" />

          {/* Wing Struts — front at x=23, rear at x=56 */}
          <line x1="23" y1="2" x2="23" y2="12" stroke="#C0BCBA" strokeWidth="1.5" />
          <line x1="56" y1="2" x2="56" y2="12" stroke="#C0BCBA" strokeWidth="1.5" />

          {/* Fuselage */}
          <path d="M0,0 L80,0 L75,12 L5,12 Z" fill="#F0EDEA" />
          <path d="M0,6 L80,6 L78,12 L5,12 Z" fill="#CC2020" />

          {/* Tail Fin */}
          <path d="M75,0 L93,0 L99,-18 L83,-18 Z" fill="#F0EDEA" />
          <rect x="93" y="-21" width="7" height="5" fill="#CC2020" />
          {/* Horizontal Stabilizer */}
          <rect x="81" y="8" width="22" height="4" fill="#F0EDEA" />

          {/* Engine Cowl */}
          <rect x="-10" y="1" width="12" height="10" rx="2" fill="#252220" />
          {/* Propeller */}
          <g transform="translate(-10, 6)">
            <ellipse cx="0" cy="0" rx="2" ry="16" fill="rgba(154,125,82,0.3)">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.1s" repeatCount="indefinite" />
            </ellipse>
            <rect x="-1" y="-2" width="2" height="4" fill="#5A5452" />
          </g>

          {/* Landing Gear — nose under nose, mains under strut attach points */}
          <rect x="4"  y="12" width="2" height="7" fill="#9A9288" />
          <circle cx="5"  cy="19" r="3" fill="#252220" />
          <rect x="22" y="12" width="2" height="7" fill="#9A9288" />
          <circle cx="23" cy="19" r="3" fill="#252220" />
          <rect x="55" y="12" width="2" height="7" fill="#9A9288" />
          <circle cx="56" cy="19" r="3" fill="#252220" />

          <animateTransform
            attributeName="transform"
            type="translate"
            from="1560 60"
            to="-220 60"
            dur="55s"
            repeatCount="indefinite"
          />
        </g>

        <rect x="0" y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0" y="286" width="1440" height="4"  fill="#0E2208" opacity="0.4" />

        <g transform="translate(20, 286)">
          <use href="#coffee-plant" x="0"   y="-10" transform="scale(0.7)" />
          <use href="#coffee-plant" x="60"  y="-8"  transform="scale(0.7)" />
          <use href="#coffee-plant" x="120" y="-11" transform="scale(0.7)" />
          <use href="#coffee-plant" x="180" y="-9"  transform="scale(0.7)" />
          <use href="#coffee-plant" x="240" y="-12" transform="scale(0.7)" />
          <use href="#coffee-plant" x="300" y="-10" transform="scale(0.7)" />
          <use href="#coffee-plant" x="360" y="-13" transform="scale(0.7)" />
          <use href="#coffee-plant" x="420" y="-11" transform="scale(0.7)" />
          <use href="#coffee-plant" x="480" y="-14" transform="scale(0.7)" />
          
          <use href="#coffee-plant" x="30"  y="2"   transform="scale(0.9)" />
          <use href="#coffee-plant" x="100" y="5"   transform="scale(0.9)" />
          <use href="#coffee-plant" x="170" y="3"   transform="scale(0.9)" />
          <use href="#coffee-plant" x="240" y="6"   transform="scale(0.9)" />
          <use href="#coffee-plant" x="310" y="4"   transform="scale(0.9)" />
          <use href="#coffee-plant" x="380" y="7"   transform="scale(0.9)" />
          <use href="#coffee-plant" x="450" y="5"   transform="scale(0.9)" />
          
          <use href="#coffee-plant" x="-10" y="18"  transform="scale(1.1)" />
          <use href="#coffee-plant" x="80"  y="22"  transform="scale(1.1)" />
          <use href="#coffee-plant" x="170" y="20"  transform="scale(1.1)" />
          <use href="#coffee-plant" x="260" y="24"  transform="scale(1.1)" />
          <use href="#coffee-plant" x="350" y="22"  transform="scale(1.1)" />
          <use href="#coffee-plant" x="440" y="26"  transform="scale(1.1)" />
        </g>

      </svg>
    </div>
  )
}
