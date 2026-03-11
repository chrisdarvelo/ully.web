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
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%' }}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        {/* ── Sky ─────────────────────────────────────────────────── */}
        <rect width="1440" height="320" fill="#5BA3D0" />

        {/* ── Sea — distant strip behind far mountains ─────────────── */}
        <rect x="0" y="64" width="1440" height="20" fill="#3A8CC8" opacity="0.55" />
        <rect x="0" y="64" width="1440" height="3"  fill="#6ACAE8" opacity="0.35" />

        {/* ── Sun — centered ───────────────────────────────────────── */}
        <circle cx="720" cy="88" r="64" fill="#F5D140" opacity="0.13" />
        <circle cx="720" cy="88" r="44" fill="#F5D140" opacity="0.22" />
        <circle cx="720" cy="88" r="28" fill="#F8E04A" />

        {/* ── Seagulls near sun ────────────────────────────────────── */}
        {/* Seagull 1 — left of sun, mid-high */}
        <path d="M658,70 Q664,63 670,70" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M670,70 Q676,63 682,70" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Seagull 2 — right of sun, higher */}
        <path d="M755,56 Q762,49 769,56" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M769,56 Q776,49 783,56" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Seagull 3 — above sun, center-left */}
        <path d="M700,44 Q707,37 714,44" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M714,44 Q721,37 728,44" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />

        {/* ── Clouds — varied heights ───────────────────────────────── */}
        <g fill="white" opacity="0.74">
          {/* Cloud 1 — high left */}
          <rect x="55"   y="38"  width="78" height="14" />
          <rect x="71"   y="26"  width="46" height="14" />
          <rect x="85"   y="16"  width="22" height="12" />
          {/* Cloud 2 — mid left, lower */}
          <rect x="310"  y="72"  width="88" height="14" />
          <rect x="328"  y="59"  width="52" height="14" />
          <rect x="344"  y="48"  width="22" height="12" />
          {/* Cloud 3 — high center-left */}
          <rect x="545"  y="28"  width="70" height="13" />
          <rect x="559"  y="17"  width="42" height="13" />
          <rect x="571"  y="8"   width="20" height="11" />
          {/* Cloud 4 — lower center-right */}
          <rect x="880"  y="76"  width="86" height="14" />
          <rect x="898"  y="63"  width="50" height="14" />
          <rect x="914"  y="52"  width="24" height="12" />
          {/* Cloud 5 — high far right */}
          <rect x="1195" y="38"  width="74" height="13" />
          <rect x="1209" y="27"  width="46" height="13" />
          <rect x="1221" y="17"  width="22" height="11" />
          {/* Cloud 6 — mid right */}
          <rect x="1045" y="58"  width="62" height="12" />
          <rect x="1057" y="48"  width="38" height="12" />
        </g>

        {/* ── Far mountains — light green ──────────────────────────── */}
        <polygon fill="#7DB060"
          points="0,320 0,200 40,200 40,176 80,176 80,152 120,152 120,128
                  160,128 160,104 200,104 200,88 240,88 240,104 280,104 280,128
                  320,128 320,152 360,152 360,176 400,176 400,200 440,200 440,320"
        />
        <polygon fill="#5A8A42" opacity="0.38"
          points="200,88 240,88 240,104 280,104 280,128 320,128 320,152
                  360,152 360,176 400,176 400,200 440,200 440,320 400,320"
        />
        <polygon fill="#7DB060"
          points="540,320 540,200 580,200 580,172 620,172 620,145 660,145
                  660,118 700,118 700,94 740,94 740,80 780,80 780,94
                  820,94 820,118 860,118 860,145 900,145 900,172 940,172
                  940,200 980,200 980,320"
        />
        <polygon fill="#5A8A42" opacity="0.38"
          points="740,80 780,80 780,94 820,94 820,118 860,118 860,145
                  900,145 900,172 940,172 940,200 980,200 980,320 940,320"
        />
        <polygon fill="#7DB060"
          points="1060,320 1060,196 1100,196 1100,171 1140,171 1140,146
                  1180,146 1180,119 1220,119 1220,96 1260,96 1260,80
                  1300,80 1300,96 1340,96 1340,119 1380,119 1380,146
                  1420,146 1420,171 1440,171 1440,320"
        />
        <polygon fill="#5A8A42" opacity="0.38"
          points="1260,80 1300,80 1300,96 1340,96 1340,119 1380,119
                  1380,146 1420,146 1420,171 1440,171 1440,320 1400,320"
        />

        {/* ── Mid mountains — medium green ─────────────────────────── */}
        <polygon fill="#4D7F2A"
          points="0,320 0,242 40,242 40,222 80,222 80,202 120,202 120,182
                  160,182 160,159 200,159 200,139 240,139 240,122 280,122
                  280,104 320,104 320,122 360,122 360,142 400,142 400,162
                  440,162 440,182 480,182 480,204 520,204 520,224
                  560,224 560,242 600,242 600,320"
        />
        <polygon fill="#2D5A12" opacity="0.32"
          points="280,104 320,104 320,122 360,122 360,142 400,142 400,162
                  440,162 440,182 480,182 480,204 520,204 520,224
                  560,224 560,242 600,242 600,320 560,320"
        />
        <polygon fill="#4D7F2A"
          points="700,320 700,244 740,244 740,222 780,222 780,199 820,199
                  820,176 860,176 860,152 900,152 900,129 940,129 940,109
                  980,109 980,92 1020,92 1020,75 1060,75 1060,92 1100,92
                  1100,109 1140,109 1140,129 1180,129 1180,152 1220,152
                  1220,176 1260,176 1260,199 1300,199 1300,222 1340,222
                  1340,244 1380,244 1380,320"
        />
        <polygon fill="#2D5A12" opacity="0.32"
          points="1020,75 1060,75 1060,92 1100,92 1100,109 1140,109
                  1140,129 1180,129 1180,152 1220,152 1220,176 1260,176
                  1260,199 1300,199 1300,222 1340,222 1340,244 1380,244
                  1380,320 1340,320"
        />

        {/* ── Foreground ridge ─────────────────────────────────────── */}
        <polygon fill="#2D5215"
          points="0,320 0,266 40,266 40,254 80,254 80,242 120,242 120,232
                  160,232 160,242 200,242 200,254 240,254 240,266 280,266
                  280,254 320,254 320,242 360,242 360,229 400,229 400,217
                  440,217 440,206 480,206 480,217 520,217 520,229 560,229
                  560,242 600,242 600,254 640,254 640,266 680,266 680,254
                  720,254 720,242 760,242 760,229 800,229 800,214 840,214
                  840,202 880,202 880,214 920,214 920,229 960,229 960,242
                  1000,242 1000,254 1040,254 1040,266 1080,266 1080,254
                  1120,254 1120,242 1160,242 1160,229 1200,229 1200,214
                  1240,214 1240,202 1280,202 1280,214 1320,214 1320,229
                  1360,229 1360,242 1400,242 1400,256 1440,256 1440,320"
        />

        {/* ── Trail / road toward mountain ─────────────────────────── */}
        {/* Road surface — winding from bottom center toward mid mountain */}
        <polygon fill="#1E4010" opacity="0.75"
          points="688,320 752,320 746,295 738,275 728,257 720,242 714,229 716,217 722,208
                  718,208 712,217 708,229 700,242 692,257 682,275 674,295"
        />
        {/* Road edge shadow */}
        <polygon fill="#0A1A06" opacity="0.45"
          points="746,295 752,295 744,275 734,257 726,242 720,229 722,217 718,208
                  716,208 714,217 716,229 720,242 728,257 738,275"
        />

        {/* ── Ground strip ─────────────────────────────────────────── */}
        <rect x="0" y="282" width="1440" height="38" fill="#1A3A0E" />
        <rect x="0" y="282" width="1440" height="4"  fill="#0E2208" opacity="0.5" />

        {/* ══════════════════════════════════════════════════════════
            COFFEE PLANTS — bushy/organic (ellipse-based, not triangles)
            Left side: L1–L10 (x ≈ 50–620)
            Right side: R1–R5 (x ≈ 860–1400)
        ══════════════════════════════════════════════════════════ */}

        {/* ── Left side plants ─────────────────────────────────────── */}

        {/* L1 */}
        <g transform="translate(55,278)">
          <rect x="-2" y="-22" width="5" height="22" fill="#0E2208" />
          <ellipse cx="-8" cy="-18" rx="11" ry="8"  fill="#2A5A18" />
          <ellipse cx="8"  cy="-18" rx="11" ry="8"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-26" rx="13" ry="9"  fill="#3A7A28" />
          <ellipse cx="-5" cy="-32" rx="9"  ry="6"  fill="#3A7A28" />
          <ellipse cx="5"  cy="-32" rx="9"  ry="6"  fill="#4A8C38" />
          <circle cx="-9"  cy="-16" r="2.5" fill="#C84040" />
          <circle cx="9"   cy="-16" r="2.5" fill="#B82020" />
          <circle cx="-4"  cy="-26" r="2"   fill="#D4A020" />
          <circle cx="4"   cy="-31" r="1.8" fill="#C84040" />
        </g>

        {/* L2 — tall */}
        <g transform="translate(112,272)">
          <rect x="-3" y="-30" width="6" height="30" fill="#0E2208" />
          <ellipse cx="-10" cy="-16" rx="14" ry="10" fill="#2A5A18" />
          <ellipse cx="10"  cy="-16" rx="14" ry="10" fill="#2A5A18" />
          <ellipse cx="0"   cy="-24" rx="16" ry="11" fill="#3A7A28" />
          <ellipse cx="-7"  cy="-32" rx="11" ry="8"  fill="#3A7A28" />
          <ellipse cx="7"   cy="-32" rx="11" ry="8"  fill="#3A7A28" />
          <ellipse cx="0"   cy="-40" rx="12" ry="8"  fill="#4A8C38" />
          <circle cx="-12"  cy="-14" r="3"   fill="#C84040" />
          <circle cx="12"   cy="-14" r="3"   fill="#B82020" />
          <circle cx="-5"   cy="-25" r="2.5" fill="#D4A020" />
          <circle cx="5"    cy="-25" r="2.5" fill="#C84040" />
          <circle cx="-7"   cy="-33" r="2"   fill="#B82020" />
          <circle cx="0"    cy="-39" r="2"   fill="#D4A020" />
        </g>

        {/* L3 */}
        <g transform="translate(174,276)">
          <rect x="-2" y="-20" width="5" height="20" fill="#0E2208" />
          <ellipse cx="-7" cy="-20" rx="11" ry="8"  fill="#2A5A18" />
          <ellipse cx="7"  cy="-20" rx="11" ry="8"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-27" rx="13" ry="9"  fill="#3A7A28" />
          <ellipse cx="0"  cy="-34" rx="9"  ry="6"  fill="#4A8C38" />
          <circle cx="-8"  cy="-18" r="2.5" fill="#B82020" />
          <circle cx="8"   cy="-18" r="2.5" fill="#D4A020" />
          <circle cx="0"   cy="-27" r="2"   fill="#C84040" />
        </g>

        {/* L4 */}
        <g transform="translate(228,274)">
          <rect x="-3" y="-26" width="6" height="26" fill="#0E2208" />
          <ellipse cx="-9" cy="-18" rx="13" ry="9"  fill="#2A5A18" />
          <ellipse cx="9"  cy="-18" rx="13" ry="9"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-26" rx="15" ry="10" fill="#3A7A28" />
          <ellipse cx="-5" cy="-33" rx="10" ry="7"  fill="#3A7A28" />
          <ellipse cx="5"  cy="-33" rx="10" ry="7"  fill="#4A8C38" />
          <circle cx="-10" cy="-16" r="2.5" fill="#C84040" />
          <circle cx="10"  cy="-16" r="2.5" fill="#D4A020" />
          <circle cx="-3"  cy="-26" r="2"   fill="#B82020" />
          <circle cx="4"   cy="-32" r="2"   fill="#C84040" />
          <circle cx="-6"  cy="-33" r="1.8" fill="#D4A020" />
        </g>

        {/* L5 — short */}
        <g transform="translate(278,279)">
          <rect x="-2" y="-16" width="4" height="16" fill="#0E2208" />
          <ellipse cx="-6" cy="-18" rx="10" ry="7"  fill="#2A5A18" />
          <ellipse cx="6"  cy="-18" rx="10" ry="7"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-24" rx="12" ry="8"  fill="#3A7A28" />
          <circle cx="-7"  cy="-16" r="2"   fill="#D4A020" />
          <circle cx="7"   cy="-16" r="2"   fill="#C84040" />
          <circle cx="0"   cy="-23" r="1.8" fill="#B82020" />
        </g>

        {/* L6 */}
        <g transform="translate(330,273)">
          <rect x="-2" y="-24" width="5" height="24" fill="#0E2208" />
          <ellipse cx="-8" cy="-18" rx="12" ry="9"  fill="#2A5A18" />
          <ellipse cx="8"  cy="-18" rx="12" ry="9"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-26" rx="14" ry="10" fill="#3A7A28" />
          <ellipse cx="0"  cy="-34" rx="10" ry="7"  fill="#4A8C38" />
          <circle cx="-9"  cy="-16" r="2.5" fill="#B82020" />
          <circle cx="9"   cy="-16" r="2.5" fill="#D4A020" />
          <circle cx="3"   cy="-26" r="2"   fill="#C84040" />
          <circle cx="-3"  cy="-33" r="2"   fill="#D4A020" />
        </g>

        {/* L7 — tallest */}
        <g transform="translate(390,269)">
          <rect x="-3" y="-34" width="6" height="34" fill="#0E2208" />
          <ellipse cx="-11" cy="-18" rx="15" ry="10" fill="#2A5A18" />
          <ellipse cx="11"  cy="-18" rx="15" ry="10" fill="#2A5A18" />
          <ellipse cx="0"   cy="-26" rx="17" ry="12" fill="#3A7A28" />
          <ellipse cx="-7"  cy="-34" rx="12" ry="8"  fill="#3A7A28" />
          <ellipse cx="7"   cy="-34" rx="12" ry="8"  fill="#3A7A28" />
          <ellipse cx="0"   cy="-42" rx="12" ry="8"  fill="#4A8C38" />
          <circle cx="-13"  cy="-16" r="3"   fill="#C84040" />
          <circle cx="13"   cy="-16" r="3"   fill="#D4A020" />
          <circle cx="-5"   cy="-27" r="2.5" fill="#B82020" />
          <circle cx="5"    cy="-27" r="2.5" fill="#C84040" />
          <circle cx="-7"   cy="-35" r="2"   fill="#D4A020" />
          <circle cx="7"    cy="-35" r="2"   fill="#B82020" />
          <circle cx="0"    cy="-41" r="2"   fill="#C84040" />
        </g>

        {/* L8 */}
        <g transform="translate(453,275)">
          <rect x="-2" y="-22" width="5" height="22" fill="#0E2208" />
          <ellipse cx="-7" cy="-20" rx="12" ry="8"  fill="#2A5A18" />
          <ellipse cx="7"  cy="-20" rx="12" ry="8"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-28" rx="14" ry="9"  fill="#3A7A28" />
          <ellipse cx="-4" cy="-34" rx="9"  ry="6"  fill="#4A8C38" />
          <ellipse cx="4"  cy="-34" rx="9"  ry="6"  fill="#4A8C38" />
          <circle cx="-8"  cy="-18" r="2.5" fill="#D4A020" />
          <circle cx="8"   cy="-18" r="2.5" fill="#C84040" />
          <circle cx="-3"  cy="-27" r="2"   fill="#B82020" />
          <circle cx="4"   cy="-27" r="2"   fill="#D4A020" />
        </g>

        {/* L9 — short background filler */}
        <g transform="translate(506,278)">
          <rect x="-2" y="-18" width="4" height="18" fill="#0E2208" />
          <ellipse cx="-6" cy="-20" rx="10" ry="7"  fill="#2A5A18" />
          <ellipse cx="6"  cy="-20" rx="10" ry="7"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-26" rx="12" ry="8"  fill="#3A7A28" />
          <circle cx="-6"  cy="-18" r="2"   fill="#C84040" />
          <circle cx="6"   cy="-18" r="2"   fill="#D4A020" />
          <circle cx="0"   cy="-25" r="1.8" fill="#B82020" />
        </g>

        {/* L10 — near trail */}
        <g transform="translate(562,272)">
          <rect x="-3" y="-26" width="6" height="26" fill="#0E2208" />
          <ellipse cx="-9" cy="-18" rx="13" ry="9"  fill="#2A5A18" />
          <ellipse cx="9"  cy="-18" rx="13" ry="9"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-26" rx="15" ry="10" fill="#3A7A28" />
          <ellipse cx="-5" cy="-34" rx="10" ry="7"  fill="#3A7A28" />
          <ellipse cx="5"  cy="-34" rx="10" ry="7"  fill="#4A8C38" />
          <circle cx="-10" cy="-16" r="2.5" fill="#B82020" />
          <circle cx="10"  cy="-16" r="2.5" fill="#D4A020" />
          <circle cx="0"   cy="-25" r="2.5" fill="#C84040" />
          <circle cx="-4"  cy="-33" r="2"   fill="#D4A020" />
          <circle cx="5"   cy="-33" r="2"   fill="#B82020" />
        </g>

        {/* ── Right side plants ────────────────────────────────────── */}

        {/* R1 */}
        <g transform="translate(865,276)">
          <rect x="-2" y="-20" width="5" height="20" fill="#0E2208" />
          <ellipse cx="-7" cy="-22" rx="12" ry="8"  fill="#2A5A18" />
          <ellipse cx="7"  cy="-22" rx="12" ry="8"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-29" rx="14" ry="9"  fill="#3A7A28" />
          <ellipse cx="0"  cy="-36" rx="9"  ry="6"  fill="#4A8C38" />
          <circle cx="-8"  cy="-20" r="2.5" fill="#C84040" />
          <circle cx="8"   cy="-20" r="2.5" fill="#D4A020" />
          <circle cx="0"   cy="-29" r="2"   fill="#B82020" />
          <circle cx="-3"  cy="-35" r="1.8" fill="#C84040" />
        </g>

        {/* R2 — tall */}
        <g transform="translate(995,270)">
          <rect x="-3" y="-30" width="6" height="30" fill="#0E2208" />
          <ellipse cx="-10" cy="-16" rx="14" ry="10" fill="#2A5A18" />
          <ellipse cx="10"  cy="-16" rx="14" ry="10" fill="#2A5A18" />
          <ellipse cx="0"   cy="-24" rx="16" ry="11" fill="#3A7A28" />
          <ellipse cx="-6"  cy="-32" rx="11" ry="8"  fill="#3A7A28" />
          <ellipse cx="6"   cy="-32" rx="11" ry="8"  fill="#4A8C38" />
          <circle cx="-11"  cy="-14" r="3"   fill="#D4A020" />
          <circle cx="11"   cy="-14" r="3"   fill="#C84040" />
          <circle cx="-4"   cy="-25" r="2.5" fill="#B82020" />
          <circle cx="5"    cy="-25" r="2.5" fill="#D4A020" />
          <circle cx="0"    cy="-31" r="2"   fill="#C84040" />
          <circle cx="-6"   cy="-33" r="1.8" fill="#B82020" />
        </g>

        {/* R3 */}
        <g transform="translate(1110,273)">
          <rect x="-2" y="-24" width="5" height="24" fill="#0E2208" />
          <ellipse cx="-8" cy="-20" rx="12" ry="9"  fill="#2A5A18" />
          <ellipse cx="8"  cy="-20" rx="12" ry="9"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-28" rx="14" ry="10" fill="#3A7A28" />
          <ellipse cx="-4" cy="-36" rx="9"  ry="6"  fill="#4A8C38" />
          <ellipse cx="4"  cy="-36" rx="9"  ry="6"  fill="#4A8C38" />
          <circle cx="-9"  cy="-18" r="2.5" fill="#C84040" />
          <circle cx="9"   cy="-18" r="2.5" fill="#D4A020" />
          <circle cx="3"   cy="-28" r="2"   fill="#B82020" />
          <circle cx="-3"  cy="-35" r="2"   fill="#C84040" />
        </g>

        {/* R4 — short */}
        <g transform="translate(1248,277)">
          <rect x="-2" y="-18" width="4" height="18" fill="#0E2208" />
          <ellipse cx="-6" cy="-20" rx="11" ry="8"  fill="#2A5A18" />
          <ellipse cx="6"  cy="-20" rx="11" ry="8"  fill="#2A5A18" />
          <ellipse cx="0"  cy="-27" rx="13" ry="9"  fill="#3A7A28" />
          <circle cx="-7"  cy="-18" r="2.5" fill="#D4A020" />
          <circle cx="7"   cy="-18" r="2.5" fill="#C84040" />
          <circle cx="0"   cy="-26" r="2"   fill="#B82020" />
        </g>

        {/* R5 — tall */}
        <g transform="translate(1375,271)">
          <rect x="-3" y="-28" width="6" height="28" fill="#0E2208" />
          <ellipse cx="-10" cy="-16" rx="14" ry="10" fill="#2A5A18" />
          <ellipse cx="10"  cy="-16" rx="14" ry="10" fill="#2A5A18" />
          <ellipse cx="0"   cy="-24" rx="16" ry="11" fill="#3A7A28" />
          <ellipse cx="-6"  cy="-32" rx="10" ry="7"  fill="#3A7A28" />
          <ellipse cx="6"   cy="-32" rx="10" ry="7"  fill="#4A8C38" />
          <circle cx="-11"  cy="-14" r="3"   fill="#C84040" />
          <circle cx="11"   cy="-14" r="3"   fill="#D4A020" />
          <circle cx="-4"   cy="-25" r="2.5" fill="#C84040" />
          <circle cx="5"    cy="-25" r="2.5" fill="#B82020" />
          <circle cx="0"    cy="-31" r="2"   fill="#D4A020" />
          <circle cx="6"    cy="-33" r="1.8" fill="#C84040" />
        </g>

      </svg>
    </div>
  )
}
