// Pixel-art style coffee farm scene — used at the bottom of all public pages.
// Pure SVG, no external dependencies.

export default function CoffeeFarmScene() {
  return (
    <div style={{ position: 'relative', lineHeight: 0, overflow: 'hidden' }}>
      {/* Gradient fade from dark page background into the scene */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 160, zIndex: 2,
        background: 'linear-gradient(to bottom, #0E0C0A 0%, rgba(14,12,10,0.55) 55%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <svg
        viewBox="0 0 1440 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%' }}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        {/* ── Sky ─────────────────────────────────────── */}
        <rect width="1440" height="300" fill="#5BA3D0" />

        {/* ── Pixel clouds ────────────────────────────── */}
        <g fill="white" opacity="0.72">
          {/* Cloud 1 */}
          <rect x="80"   y="110" width="80" height="15" />
          <rect x="96"   y="95"  width="48" height="15" />
          <rect x="110"  y="83"  width="24" height="12" />
          {/* Cloud 2 */}
          <rect x="360"  y="102" width="90" height="14" />
          <rect x="378"  y="88"  width="54" height="14" />
          <rect x="396"  y="76"  width="20" height="12" />
          {/* Cloud 3 */}
          <rect x="650"  y="108" width="72" height="14" />
          <rect x="664"  y="94"  width="44" height="14" />
          <rect x="676"  y="82"  width="20" height="12" />
          {/* Cloud 4 */}
          <rect x="1048" y="104" width="88" height="15" />
          <rect x="1066" y="90"  width="52" height="14" />
          <rect x="1082" y="78"  width="24" height="12" />
        </g>

        {/* ── Sun ─────────────────────────────────────── */}
        <circle cx="1195" cy="108" r="58" fill="#F5D140" opacity="0.18" />
        <circle cx="1195" cy="108" r="40" fill="#F5D140" />

        {/* ── Far mountains — light green ─────────────── */}
        <polygon fill="#7DB060"
          points="
            0,300 0,188 40,188 40,165 80,165 80,142 120,142 120,118 160,118
            160,94 200,94 200,78 240,78 240,94 280,94 280,118 320,118
            320,142 360,142 360,165 400,165 400,188 440,188 440,300"
        />
        <polygon fill="#7DB060"
          points="
            540,300 540,188 580,188 580,162 620,162 620,135 660,135
            660,108 700,108 700,85 740,85 740,72 780,72 780,85
            820,85 820,108 860,108 860,135 900,135 900,162 940,162
            940,188 980,188 980,300"
        />
        <polygon fill="#7DB060"
          points="
            1060,300 1060,185 1100,185 1100,160 1140,160 1140,135
            1180,135 1180,108 1220,108 1220,85 1260,85 1260,70
            1300,70 1300,85 1340,85 1340,108 1380,108 1380,135
            1420,135 1420,160 1440,160 1440,300"
        />

        {/* ── Mid mountains — medium green ────────────── */}
        <polygon fill="#4D7F2A"
          points="
            0,300 0,228 40,228 40,208 80,208 80,188 120,188 120,168
            160,168 160,145 200,145 200,125 240,125 240,108 280,108
            280,90 320,90 320,108 360,108 360,128 400,128 400,148
            440,148 440,168 480,168 480,190 520,190 520,210
            560,210 560,228 600,228 600,300"
        />
        <polygon fill="#4D7F2A"
          points="
            700,300 700,230 740,230 740,208 780,208 780,185 820,185
            820,162 860,162 860,138 900,138 900,115 940,115 940,95
            980,95 980,78 1020,78 1020,95 1060,95 1060,115 1100,115
            1100,138 1140,138 1140,162 1180,162 1180,185 1220,185
            1220,208 1260,208 1260,230 1300,230 1300,300"
        />

        {/* ── Foreground ridge — dark green ───────────── */}
        <polygon fill="#2D5215"
          points="
            0,300 0,252 40,252 40,240 80,240 80,228 120,228 120,218
            160,218 160,228 200,228 200,240 240,240 240,252 280,252
            280,240 320,240 320,228 360,228 360,215 400,215 400,203
            440,203 440,192 480,192 480,203 520,203 520,215 560,215
            560,228 600,228 600,240 640,240 640,252 680,252 680,240
            720,240 720,228 760,228 760,215 800,215 800,200 840,200
            840,188 880,188 880,200 920,200 920,215 960,215 960,228
            1000,228 1000,240 1040,240 1040,252 1080,252 1080,240
            1120,240 1120,228 1160,228 1160,215 1200,215 1200,200
            1240,200 1240,188 1280,188 1280,200 1320,200 1320,215
            1360,215 1360,228 1400,228 1400,242 1440,242 1440,300"
        />

        {/* ── Ground strip ────────────────────────────── */}
        <rect x="0" y="265" width="1440" height="35" fill="#1A3A0E" />

        {/* ── Coffee plants ─────────────────────────────
            Each plant uses translate(x, ground_y).
            Trunk goes up, then layered triangle leaf tiers,
            red coffee cherries on lower tier.
        ──────────────────────────────────────────────── */}

        {/* Plant 1 */}
        <g transform="translate(105,258)">
          <rect x="-3" y="-24" width="6" height="24" fill="#1A3010" />
          <polygon points="-18,-8 18,-8 0,-26" fill="#2A5A18" />
          <polygon points="-12,-20 12,-20 0,-34" fill="#3A7A28" />
          <circle cx="-10" cy="-12" r="3.5" fill="#9B1818" />
          <circle cx="10"  cy="-12" r="3.5" fill="#9B1818" />
        </g>

        {/* Plant 2 — tallest */}
        <g transform="translate(235,254)">
          <rect x="-3" y="-30" width="6" height="30" fill="#1A3010" />
          <polygon points="-22,-10 22,-10 0,-30" fill="#2A5A18" />
          <polygon points="-15,-23 15,-23 0,-38" fill="#3A7A28" />
          <polygon points="-8,-34 8,-34 0,-44"  fill="#4A8C38" />
          <circle cx="-12" cy="-15" r="4"   fill="#9B1818" />
          <circle cx="12"  cy="-15" r="4"   fill="#9B1818" />
          <circle cx="0"   cy="-27" r="3"   fill="#B82020" />
        </g>

        {/* Plant 3 — short */}
        <g transform="translate(372,260)">
          <rect x="-2" y="-20" width="5" height="20" fill="#1A3010" />
          <polygon points="-15,-8 15,-8 0,-22"  fill="#2A5A18" />
          <polygon points="-10,-18 10,-18 0,-29" fill="#3A7A28" />
          <circle cx="-8" cy="-12" r="3" fill="#9B1818" />
          <circle cx="8"  cy="-12" r="3" fill="#9B1818" />
        </g>

        {/* Plant cluster 4a + 4b */}
        <g transform="translate(500,260)">
          <rect x="-2" y="-18" width="5" height="18" fill="#1A3010" />
          <polygon points="-14,-7 14,-7 0,-20" fill="#2A5A18" />
          <polygon points="-9,-16 9,-16 0,-26"  fill="#3A7A28" />
        </g>
        <g transform="translate(538,254)">
          <rect x="-3" y="-28" width="6" height="28" fill="#1A3010" />
          <polygon points="-21,-10 21,-10 0,-29" fill="#2A5A18" />
          <polygon points="-14,-23 14,-23 0,-37" fill="#3A7A28" />
          <polygon points="-8,-33 8,-33 0,-43"   fill="#4A8C38" />
          <circle cx="-11" cy="-15" r="3.5" fill="#9B1818" />
          <circle cx="11"  cy="-15" r="3.5" fill="#9B1818" />
          <circle cx="0"   cy="-27" r="3"   fill="#B82020" />
        </g>

        {/* Plant 5 */}
        <g transform="translate(700,258)">
          <rect x="-3" y="-22" width="6" height="22" fill="#1A3010" />
          <polygon points="-17,-9 17,-9 0,-24"   fill="#2A5A18" />
          <polygon points="-11,-20 11,-20 0,-32"  fill="#3A7A28" />
          <circle cx="-9" cy="-13" r="3.5" fill="#9B1818" />
          <circle cx="9"  cy="-13" r="3.5" fill="#9B1818" />
        </g>

        {/* Plant cluster 6a + 6b */}
        <g transform="translate(842,260)">
          <rect x="-2" y="-16" width="5" height="16" fill="#1A3010" />
          <polygon points="-12,-7 12,-7 0,-18" fill="#2A5A18" />
          <polygon points="-8,-14 8,-14 0,-23"  fill="#3A7A28" />
        </g>
        <g transform="translate(876,254)">
          <rect x="-3" y="-28" width="6" height="28" fill="#1A3010" />
          <polygon points="-22,-10 22,-10 0,-30" fill="#2A5A18" />
          <polygon points="-15,-24 15,-24 0,-38" fill="#3A7A28" />
          <polygon points="-9,-34 9,-34 0,-45"   fill="#4A8C38" />
          <circle cx="-12" cy="-15" r="4"   fill="#9B1818" />
          <circle cx="12"  cy="-15" r="4"   fill="#9B1818" />
          <circle cx="0"   cy="-28" r="3.5" fill="#B82020" />
        </g>

        {/* Plant 7 */}
        <g transform="translate(1022,256)">
          <rect x="-3" y="-24" width="6" height="24" fill="#1A3010" />
          <polygon points="-18,-9 18,-9 0,-26"   fill="#2A5A18" />
          <polygon points="-12,-21 12,-21 0,-34"  fill="#3A7A28" />
          <circle cx="-10" cy="-14" r="3.5" fill="#9B1818" />
          <circle cx="10"  cy="-14" r="3.5" fill="#9B1818" />
        </g>

        {/* Plant 8 */}
        <g transform="translate(1162,258)">
          <rect x="-2" y="-20" width="5" height="20" fill="#1A3010" />
          <polygon points="-16,-8 16,-8 0,-22"   fill="#2A5A18" />
          <polygon points="-10,-18 10,-18 0,-30"  fill="#3A7A28" />
          <circle cx="-8" cy="-12" r="3" fill="#9B1818" />
          <circle cx="8"  cy="-12" r="3" fill="#9B1818" />
        </g>

        {/* Plant cluster 9a + 9b */}
        <g transform="translate(1292,260)">
          <rect x="-2" y="-18" width="5" height="18" fill="#1A3010" />
          <polygon points="-14,-7 14,-7 0,-20" fill="#2A5A18" />
          <polygon points="-9,-16 9,-16 0,-26"  fill="#3A7A28" />
        </g>
        <g transform="translate(1326,254)">
          <rect x="-3" y="-26" width="6" height="26" fill="#1A3010" />
          <polygon points="-20,-10 20,-10 0,-28" fill="#2A5A18" />
          <polygon points="-13,-22 13,-22 0,-36" fill="#3A7A28" />
          <polygon points="-7,-32 7,-32 0,-42"   fill="#4A8C38" />
          <circle cx="-10" cy="-15" r="3.5" fill="#9B1818" />
          <circle cx="10"  cy="-15" r="3.5" fill="#9B1818" />
          <circle cx="0"   cy="-26" r="3"   fill="#B82020" />
        </g>

      </svg>
    </div>
  )
}
