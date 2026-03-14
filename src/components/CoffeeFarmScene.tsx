// Coffee plantation scene — footer of all public pages.
// Pure SVG SMIL animation. Minecraft/8-bit aesthetic. No curves.

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

          {/* ── Minecraft Coffee Plant Symbol ─────────────────────────── */}
          <symbol id="coffee-plant" overflow="visible">
            {/* Trunk */}
            <rect x="-2" y="-60" width="4" height="60" fill="#2d1e14" />
            
            {/* Foliage Blocks */}
            <rect x="-24" y="-20" width="48" height="12" fill="#0d2607" />
            <rect x="-20" y="-36" width="40" height="12" fill="#113309" />
            <rect x="-14" y="-52" width="28" height="12" fill="#16400c" />
            <rect x="-6"  y="-64" width="12" height="12" fill="#1b4d0f" />

            {/* Masses of Fruits (Small Squares) */}
            <g fill="#c41e3a">
              <rect x="-20" y="-18" width="4" height="4" /><rect x="-14" y="-16" width="4" height="4" />
              <rect x="10"  y="-19" width="4" height="4" /><rect x="16"  y="-15" width="4" height="4" />
              <rect x="-2"  y="-12" width="4" height="4" /><rect x="4"   y="-14" width="4" height="4" />
              <rect x="-15" y="-32" width="4" height="4" /><rect x="-10" y="-35" width="4" height="4" />
              <rect x="8"   y="-30" width="4" height="4" /><rect x="12"  y="-34" width="4" height="4" />
              <rect x="-4"  y="-40" width="4" height="4" /><rect x="2"   y="-38" width="4" height="4" />
              <rect x="-8"  y="-48" width="4" height="4" /><rect x="4"   y="-50" width="4" height="4" />
              <rect x="-2"  y="-58" width="4" height="4" />
              <rect x="-18" y="-22" width="3" height="3" fill="#7fb041" />
              <rect x="14"  y="-28" width="3" height="3" fill="#7fb041" />
              <rect x="0"   y="-45" width="3" height="3" fill="#7fb041" />
            </g>
          </symbol>

          {/* ── Blocky Mario Mountain Symbol ─────────────────────────── */}
          <symbol id="pixel-mountain" overflow="visible">
            <rect x="-60" y="-20" width="120" height="20" fill="#7DB060" />
            <rect x="-45" y="-40" width="90"  height="20" fill="#7DB060" />
            <rect x="-25" y="-60" width="50"  height="20" fill="#7DB060" />
            <rect x="-45" y="-40" width="10"  height="20" fill="#9cd67a" opacity="0.3" />
            <rect x="-25" y="-60" width="10"  height="20" fill="#9cd67a" opacity="0.3" />
            {/* Eyes */}
            <rect x="-8" y="-35" width="4" height="12" fill="#000000" />
            <rect x="4"  y="-35" width="4" height="12" fill="#000000" />
          </symbol>

          {/* ── Blocky Seagull ────────────────────────────────────────── */}
          <symbol id="seagull" overflow="visible">
            <g fill="white">
              <rect x="-6" y="-2" width="4" height="2" />
              <rect x="-2" y="0"  width="4" height="2" />
              <rect x="2"  y="-2" width="4" height="2" />
              <animateTransform attributeName="transform" type="translate"
                values="0 0; 0 -2; 0 0" dur="0.8s" repeatCount="indefinite" />
            </g>
          </symbol>
        </defs>

        {/* ── Sky ─────────────────────────────────────────────────── */}
        <rect width="1440" height="320" fill="url(#skyGrad)" />

        {/* ── Sun ─────────────────────────────────────────────────── */}
        <rect x="870" y="40" width="60" height="60" fill="#F5D140" />
        <rect x="880" y="50" width="15" height="15" fill="#ffffff" opacity="0.4" />

        {/* ── Pixel Clouds ─────────────────────────────────────────── */}
        <g fill="white" opacity="0.85">
          <rect x="100" y="60" width="80" height="20" />
          <rect x="120" y="40" width="40" height="20" />
          <rect x="450" y="30" width="100" height="25" />
          <rect x="470" y="15" width="60" height="15" />
          <rect x="800" y="50" width="70" height="20" />
          <rect x="1100" y="40" width="90" height="20" />
          <rect x="1120" y="25" width="50" height="15" />
        </g>

        {/* ── Background Mountains ─────────────────────────────────── */}
        <use href="#pixel-mountain" x="250"  y="286" transform="scale(1.8)" fill="#5ba3d0" opacity="0.3" />
        <use href="#pixel-mountain" x="1150" y="286" transform="scale(1.5)" fill="#5ba3d0" opacity="0.2" />
        <use href="#pixel-mountain" x="600"  y="286" transform="scale(2.2)" fill="#5ba3d0" opacity="0.15" />
        <use href="#pixel-mountain" x="1350" y="286" transform="scale(1.3)" fill="#5ba3d0" opacity="0.25" />
        
        <g transform="translate(0, 286)">
          <use href="#pixel-mountain" x="150"  y="0" transform="scale(1.2)" />
          <use href="#pixel-mountain" x="480"  y="0" transform="scale(1.0)" />
          <use href="#pixel-mountain" x="800"  y="0" transform="scale(1.4)" />
          <use href="#pixel-mountain" x="1080" y="0" transform="scale(1.1)" />
          <use href="#pixel-mountain" x="1380" y="0" transform="scale(1.3)" />
        </g>

        {/* ── Birds ────────────────────────────────────────────────── */}
        <use href="#seagull" x="300" y="100" />
        <use href="#seagull" x="340" y="120" />
        <use href="#seagull" x="1200" y="80" />

        {/* ── Minecraft Cessna 150 ──────────────────────────────────── */}
        <g opacity="0.98">
          {/* Fuselage Body */}
          <rect x="0" y="10" width="12" height="10" fill="#333" /> {/* Engine Cowl */}
          <rect x="12" y="6" width="35" height="16" fill="#F0EDEA" /> {/* Cabin */}
          <rect x="47" y="10" width="45" height="10" fill="#F0EDEA" /> {/* Rear Body */}
          
          {/* Red Stripe */}
          <rect x="12" y="12" width="80" height="4" fill="#CC2020" /> 
          
          {/* Cockpit Windows */}
          <rect x="15" y="8" width="22" height="6" fill="#1A1A1A" />
          <rect x="17" y="9" width="18" height="4" fill="#5BA3D0" opacity="0.4" />

          {/* High Wing */}
          <rect x="5" y="4" width="55" height="4" fill="#F0EDEA" />
          <rect x="5" y="4" width="8"  height="4" fill="#CC2020" /> {/* Tip */}
          <rect x="52" y="4" width="8"  height="4" fill="#CC2020" /> {/* Tip */}
          
          {/* Tail Fin */}
          <rect x="82" y="4" width="10" height="6" fill="#F0EDEA" />
          <rect x="86" y="-2" width="8" height="6" fill="#F0EDEA" />
          <rect x="90" y="-8" width="6" height="6" fill="#F0EDEA" />
          <rect x="90" y="-8" width="6" height="2" fill="#CC2020" />

          {/* Stabilizer */}
          <rect x="85" y="12" width="12" height="2" fill="#F0EDEA" />

          {/* Propeller */}
          <g transform="translate(-2, 15)">
            <rect x="-1" y="-12" width="2" height="24" fill="#5A5452" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.1s" repeatCount="indefinite" />
            </rect>
            <rect x="-1" y="-2" width="2" height="4" fill="#333" />
          </g>

          {/* Landing Gear */}
          <rect x="10" y="22" width="2" height="6" fill="#9A9288" />
          <rect x="8"  y="28" width="6" height="4" fill="#252220" />
          <rect x="40" y="22" width="2" height="8" fill="#9A9288" />
          <rect x="38" y="30" width="6" height="4" fill="#252220" />

          <animateTransform
            attributeName="transform"
            type="translate"
            from="1560 60"
            to="-250 60"
            dur="45s"
            repeatCount="indefinite"
          />
        </g>

        {/* ── Ground ───────────────────────────────────────────────── */}
        <rect x="0" y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0" y="286" width="1440" height="4"  fill="#0E2208" opacity="0.4" />

        {/* ── Dense Coffee Plantation ──────────────────────────────── */}
        <g transform="translate(20, 286)">
          {/* Back Row */}
          <use href="#coffee-plant" x="0"   y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="40"  y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="80"  y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="120" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="160" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="200" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="240" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="280" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="320" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="360" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="400" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="440" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="480" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="520" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="560" y="0" transform="scale(0.7)" />
          <use href="#coffee-plant" x="600" y="0" transform="scale(0.7)" />

          {/* Middle Row */}
          <use href="#coffee-plant" x="20"  y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="70"  y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="120" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="170" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="220" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="270" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="320" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="370" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="420" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="470" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="520" y="10" transform="scale(0.9)" />
          <use href="#coffee-plant" x="570" y="10" transform="scale(0.9)" />

          {/* Front Row */}
          <use href="#coffee-plant" x="-10" y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="60"  y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="130" y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="200" y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="270" y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="340" y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="410" y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="480" y="25" transform="scale(1.1)" />
          <use href="#coffee-plant" x="550" y="25" transform="scale(1.1)" />
        </g>
      </svg>
    </div>
  )
}
