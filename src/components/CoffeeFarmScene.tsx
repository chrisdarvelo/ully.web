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

          {/* ── Coffee bush symbol ─────────────────────────────────────────
              Compact wide-dome shrub. Base at (0,0), grows upward (negative y).
              7 stems spread wide. Width ≈ 76px, height ≈ 41px at scale 1.
          ────────────────────────────────────────────────────────────── */}
          <symbol id="bush" overflow="visible">
            <line x1="0"  y1="0"  x2="0"   y2="-23" stroke="#4a2a0a" strokeWidth="2.5"/>
            <line x1="0"  y1="0"  x2="-14" y2="-19" stroke="#4a2a0a" strokeWidth="2.2"/>
            <line x1="0"  y1="0"  x2="14"  y2="-19" stroke="#4a2a0a" strokeWidth="2.2"/>
            <line x1="0"  y1="-2" x2="-28" y2="-14" stroke="#4a2a0a" strokeWidth="2"/>
            <line x1="0"  y1="-2" x2="28"  y2="-14" stroke="#4a2a0a" strokeWidth="2"/>
            <line x1="0"  y1="-4" x2="-38" y2="-11" stroke="#4a2a0a" strokeWidth="1.8"/>
            <line x1="0"  y1="-4" x2="38"  y2="-11" stroke="#4a2a0a" strokeWidth="1.8"/>
            <ellipse cx="0"   cy="-14" rx="38" ry="10" fill="#1a3d14"/>
            <ellipse cx="-24" cy="-13" rx="17" ry="9"  fill="#1e4218"/>
            <ellipse cx="24"  cy="-13" rx="17" ry="9"  fill="#1e4218"/>
            <ellipse cx="0"   cy="-20" rx="32" ry="10" fill="#224820"/>
            <ellipse cx="-16" cy="-23" rx="19" ry="9"  fill="#274d22"/>
            <ellipse cx="16"  cy="-23" rx="19" ry="9"  fill="#274d22"/>
            <ellipse cx="0"   cy="-28" rx="24" ry="10" fill="#2c5226"/>
            <ellipse cx="-8"  cy="-31" rx="15" ry="8"  fill="#305530"/>
            <ellipse cx="8"   cy="-31" rx="15" ry="8"  fill="#305530"/>
            <ellipse cx="0"   cy="-36" rx="14" ry="8"  fill="#3a6030"/>
            <ellipse cx="0"   cy="-41" rx="8"  ry="5"  fill="#446834"/>
            {/* red cherries */}
            <circle cx="-35" cy="-10" r="4"   fill="#4a7a28"/>
            <circle cx="-31" cy="-12" r="3.5" fill="#3d7020"/>
            <circle cx="-37" cy="-13" r="3.5" fill="#5a8a30"/>
            <circle cx="-33" cy="-15" r="3.5" fill="#4a7a28"/>
            <circle cx="-29" cy="-13" r="3"   fill="#3d7020"/>
            <circle cx="-39" cy="-11" r="3"   fill="#4a7a28"/>
            <circle cx="-27" cy="-16" r="3"   fill="#5a8a30"/>
            <circle cx="-22" cy="-19" r="4"   fill="#C84040"/>
            <circle cx="-18" cy="-21" r="3.5" fill="#B82020"/>
            <circle cx="-25" cy="-21" r="3.5" fill="#C84040"/>
            <circle cx="-20" cy="-24" r="3.5" fill="#a82d24"/>
            <circle cx="-16" cy="-18" r="3"   fill="#C84040"/>
            <circle cx="-24" cy="-25" r="3"   fill="#B82020"/>
            <circle cx="-14" cy="-23" r="3"   fill="#C84040"/>
            <circle cx="-4"  cy="-14" r="4"   fill="#C84040"/>
            <circle cx="0"   cy="-13" r="3.5" fill="#e8a840"/>
            <circle cx="4"   cy="-14" r="3.5" fill="#4a7a28"/>
            <circle cx="-2"  cy="-11" r="3"   fill="#C84040"/>
            <circle cx="2"   cy="-11" r="3"   fill="#d4973e"/>
            <circle cx="-6"  cy="-12" r="3"   fill="#B82020"/>
            <circle cx="6"   cy="-12" r="3"   fill="#C84040"/>
            <circle cx="22"  cy="-19" r="4"   fill="#e8a840"/>
            <circle cx="18"  cy="-21" r="3.5" fill="#d4973e"/>
            <circle cx="25"  cy="-21" r="3.5" fill="#C84040"/>
            <circle cx="20"  cy="-24" r="3.5" fill="#B82020"/>
            <circle cx="16"  cy="-18" r="3"   fill="#e8a840"/>
            <circle cx="24"  cy="-25" r="3"   fill="#C84040"/>
            <circle cx="14"  cy="-23" r="3"   fill="#d4973e"/>
            <circle cx="35"  cy="-10" r="4"   fill="#e8a840"/>
            <circle cx="31"  cy="-12" r="3.5" fill="#d4973e"/>
            <circle cx="37"  cy="-13" r="3.5" fill="#c8923c"/>
            <circle cx="33"  cy="-15" r="3.5" fill="#e8a840"/>
            <circle cx="29"  cy="-13" r="3"   fill="#d4973e"/>
            <circle cx="39"  cy="-11" r="3"   fill="#e8a840"/>
            <circle cx="27"  cy="-16" r="3"   fill="#c8923c"/>
            <circle cx="-20" cy="-27" r="3.5" fill="#4a7a28"/>
            <circle cx="-14" cy="-28" r="3.5" fill="#C84040"/>
            <circle cx="-10" cy="-31" r="3"   fill="#4a7a28"/>
            <circle cx="-17" cy="-32" r="3"   fill="#e8a840"/>
            <circle cx="-12" cy="-35" r="3"   fill="#C84040"/>
            <circle cx="-8"  cy="-29" r="3"   fill="#B82020"/>
            <circle cx="20"  cy="-27" r="3.5" fill="#4a7a28"/>
            <circle cx="14"  cy="-28" r="3.5" fill="#C84040"/>
            <circle cx="10"  cy="-31" r="3"   fill="#e8a840"/>
            <circle cx="17"  cy="-32" r="3"   fill="#4a7a28"/>
            <circle cx="12"  cy="-35" r="3"   fill="#C84040"/>
            <circle cx="8"   cy="-29" r="3"   fill="#B82020"/>
            <circle cx="-5"  cy="-15" r="3"   fill="#e8a840"/>
            <circle cx="5"   cy="-15" r="3"   fill="#C84040"/>
            <circle cx="-3"  cy="-32" r="3.5" fill="#4a7a28"/>
            <circle cx="0"   cy="-35" r="3.5" fill="#C84040"/>
            <circle cx="3"   cy="-32" r="3"   fill="#e8a840"/>
            <circle cx="-2"  cy="-39" r="3"   fill="#C84040"/>
            <circle cx="3"   cy="-39" r="3"   fill="#4a7a28"/>
            <circle cx="0"   cy="-42" r="2.5" fill="#e8a840"/>
          </symbol>
        </defs>

        {/* ── Sky ─────────────────────────────────────────────────── */}
        <rect width="1440" height="320" fill="url(#skyGrad)" />

        {/* ── Sun ─────────────────────────────────────────────────── */}
        <circle cx="900" cy="70" r="58" fill="#F5D140" opacity="0.11" />
        <circle cx="900" cy="70" r="40" fill="#F5D140" opacity="0.19" />
        <circle cx="900" cy="70" r="26" fill="#F8E04A" />

        {/* ══════════════════════════════════════════════════════════
            MINECRAFT CLOUDS — pixel-block rectangles, 28×16 per block.
            5 formations, each with a distinct silhouette.
        ══════════════════════════════════════════════════════════ */}

        {/* Cloud 1 — wide irregular formation, upper-left */}
        <g fill="white" opacity="0.88">
          {/* row 1 */}
          <rect x="68"  y="24" width="28" height="16"/>
          <rect x="96"  y="24" width="28" height="16"/>
          <rect x="124" y="24" width="28" height="16"/>
          <rect x="152" y="24" width="28" height="16"/>
          <rect x="180" y="24" width="28" height="16"/>
          {/* row 2 — wider base */}
          <rect x="40"  y="40" width="28" height="16"/>
          <rect x="68"  y="40" width="28" height="16"/>
          <rect x="96"  y="40" width="28" height="16"/>
          <rect x="124" y="40" width="28" height="16"/>
          <rect x="152" y="40" width="28" height="16"/>
          <rect x="180" y="40" width="28" height="16"/>
          <rect x="208" y="40" width="28" height="16"/>
          {/* row 3 — narrow bottom */}
          <rect x="68"  y="56" width="28" height="16"/>
          <rect x="96"  y="56" width="28" height="16"/>
          <rect x="124" y="56" width="28" height="16"/>
          <rect x="152" y="56" width="28" height="16"/>
        </g>

        {/* Cloud 2 — compact vertical tower, center-left */}
        <g fill="white" opacity="0.82">
          {/* row 1 — narrow top */}
          <rect x="398" y="16" width="28" height="16"/>
          <rect x="426" y="16" width="28" height="16"/>
          {/* row 2 — wide middle */}
          <rect x="370" y="32" width="28" height="16"/>
          <rect x="398" y="32" width="28" height="16"/>
          <rect x="426" y="32" width="28" height="16"/>
          <rect x="454" y="32" width="28" height="16"/>
          {/* row 3 — slightly inset bottom */}
          <rect x="384" y="48" width="28" height="16"/>
          <rect x="412" y="48" width="28" height="16"/>
          <rect x="440" y="48" width="28" height="16"/>
        </g>

        {/* Cloud 3 — wide flat stratocumulus bank, upper center */}
        <g fill="white" opacity="0.76">
          {/* row 1 — top, narrower */}
          <rect x="648" y="24" width="28" height="16"/>
          <rect x="676" y="24" width="28" height="16"/>
          <rect x="704" y="24" width="28" height="16"/>
          <rect x="732" y="24" width="28" height="16"/>
          <rect x="760" y="24" width="28" height="16"/>
          <rect x="788" y="24" width="28" height="16"/>
          <rect x="816" y="24" width="28" height="16"/>
          <rect x="844" y="24" width="28" height="16"/>
          {/* row 2 — wider base */}
          <rect x="620" y="40" width="28" height="16"/>
          <rect x="648" y="40" width="28" height="16"/>
          <rect x="676" y="40" width="28" height="16"/>
          <rect x="704" y="40" width="28" height="16"/>
          <rect x="732" y="40" width="28" height="16"/>
          <rect x="760" y="40" width="28" height="16"/>
          <rect x="788" y="40" width="28" height="16"/>
          <rect x="816" y="40" width="28" height="16"/>
          <rect x="844" y="40" width="28" height="16"/>
          <rect x="872" y="40" width="28" height="16"/>
        </g>

        {/* Cloud 4 — tall isolated tower, right-center */}
        <g fill="white" opacity="0.80">
          {/* row 1 — small top */}
          <rect x="1056" y="8"  width="28" height="16"/>
          <rect x="1084" y="8"  width="28" height="16"/>
          {/* row 2 */}
          <rect x="1042" y="24" width="28" height="16"/>
          <rect x="1070" y="24" width="28" height="16"/>
          <rect x="1098" y="24" width="28" height="16"/>
          {/* row 3 — widest */}
          <rect x="1042" y="40" width="28" height="16"/>
          <rect x="1070" y="40" width="28" height="16"/>
          <rect x="1098" y="40" width="28" height="16"/>
          <rect x="1126" y="40" width="28" height="16"/>
          {/* row 4 — bottom, steps back in */}
          <rect x="1056" y="56" width="28" height="16"/>
          <rect x="1084" y="56" width="28" height="16"/>
          <rect x="1112" y="56" width="28" height="16"/>
        </g>

        {/* Cloud 5 — chunky square cluster, far right */}
        <g fill="white" opacity="0.74">
          {/* row 1 */}
          <rect x="1294" y="24" width="28" height="16"/>
          <rect x="1322" y="24" width="28" height="16"/>
          <rect x="1350" y="24" width="28" height="16"/>
          {/* row 2 — widest */}
          <rect x="1280" y="40" width="28" height="16"/>
          <rect x="1308" y="40" width="28" height="16"/>
          <rect x="1336" y="40" width="28" height="16"/>
          <rect x="1364" y="40" width="28" height="16"/>
          <rect x="1392" y="40" width="28" height="16"/>
          {/* row 3 */}
          <rect x="1294" y="56" width="28" height="16"/>
          <rect x="1322" y="56" width="28" height="16"/>
          <rect x="1350" y="56" width="28" height="16"/>
        </g>

        {/* ── Cessna 150 — flies right→left across the sky ────────── */}
        <g opacity="0.92">
          <path d="M2,7 C4,3 14,2 24,2 L64,2 C72,2 78,4 82,7 C78,10 72,12 64,12 L24,12 C14,12 4,11 2,7Z" fill="#DDD4C0" />
          <path d="M16,2 C20,-1 30,-2 42,-2 C52,-2 60,-0.5 64,2Z" fill="#B8B0A0" />
          <path d="M18,2 C22,-0.5 30,-1.5 40,-1.5 C48,-1.5 56,-0.5 60,2Z" fill="rgba(130,185,240,0.62)" />
          <path d="M24,2 L24,1 L-42,-1 L-44,0 L-42,1 L24,2Z"  fill="#CECAB4" />
          <path d="M46,2 L46,1 L108,-1 L110,0 L108,1 L46,2Z" fill="#CCC8B4" />
          <line x1="12"  y1="2"  x2="8"  y2="12" stroke="#A09A84" strokeWidth="1" />
          <line x1="56"  y1="2"  x2="60" y2="12" stroke="#A09A84" strokeWidth="1" />
          <ellipse cx="-2" cy="7" rx="7" ry="6" fill="#9A9080" />
          <ellipse cx="-8" cy="7" rx="1" ry="10" fill="rgba(50,50,50,0.28)" />
          <path d="M78,2 L82,-5 L84,-2 L84,2Z" fill="#CCC8B4" />
          <path d="M76,10 L68,12 L68,13 L76,11Z" fill="#CCC8B4" />
          <path d="M78,10 L86,12 L86,13 L78,11Z" fill="#CCC8B4" />
          <line x1="18" y1="12" x2="15" y2="18" stroke="#6A6050" strokeWidth="1.5" />
          <ellipse cx="14" cy="18" rx="4" ry="2.5" fill="#3C3830" />
          <line x1="54" y1="12" x2="57" y2="18" stroke="#6A6050" strokeWidth="1.5" />
          <ellipse cx="58" cy="18" rx="4" ry="2.5" fill="#3C3830" />
          <line x1="0"  y1="12" x2="-2" y2="17"  stroke="#6A6050" strokeWidth="1.5" />
          <ellipse cx="-3" cy="17" rx="3" ry="2" fill="#3C3830" />
          <rect x="12" y="4" width="54" height="4" fill="#C84040" opacity="0.55" rx="1" />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="1560 52"
            to="-220 52"
            dur="68s"
            repeatCount="indefinite"
          />
        </g>

        {/* ══════════════════════════════════════════════════════════
            MINECRAFT MOUNTAINS — stepped block terrain.
            All paths use only H (horizontal) and V (vertical) segments.
            No curves. Three depth layers, each a distinct color.
        ══════════════════════════════════════════════════════════ */}

        {/* Far mountains — 40px blocks, two prominent peaks */}
        <path fill="#7DB060" d="
          M0,320 V200
          H40  V180
          H80  V160
          H120 V120
          H160 V80
          H200 V100
          H240 V120
          H280 V160
          H320 V180
          H360 V200
          H400 V180
          H440 V160
          H480 V120
          H520 V80
          H560 V100
          H600 V140
          H640 V160
          H680 V180
          H720 V200
          H760 V180
          H800 V200
          H840 V220
          H880 V200
          H920 V220
          H960 V240
          H1000 V220
          H1040 V240
          H1080 V220
          H1120 V240
          H1160 V260
          H1200 V240
          H1240 V260
          H1280 V280
          H1320 V260
          H1360 V280
          H1400 V300
          H1440 V320 Z
        " />

        {/* Mid mountains — 60px blocks, one central peak */}
        <path fill="#4D7F2A" d="
          M0,320 V270
          H60  V250
          H120 V230
          H180 V210
          H240 V190
          H300 V170
          H360 V150
          H420 V170
          H480 V190
          H540 V210
          H600 V230
          H660 V250
          H720 V240
          H780 V230
          H840 V240
          H900 V250
          H960 V260
          H1020 V250
          H1080 V260
          H1140 V270
          H1200 V260
          H1260 V270
          H1320 V278
          H1380 V284
          H1440 V286
          H1460 V320 Z
        " />

        {/* Foreground ridge — 80px blocks, low rolling steps */}
        <path fill="#2D5215" d="
          M0,320 V280
          H80  V270
          H160 V260
          H240 V255
          H320 V260
          H400 V255
          H480 V250
          H560 V255
          H640 V260
          H720 V265
          H800 V260
          H880 V265
          H960 V270
          H1040 V265
          H1120 V270
          H1200 V275
          H1280 V280
          H1360 V284
          H1440 V286
          H1460 V320 Z
        " />

        {/* ── Ground strip ─────────────────────────────────────────── */}
        <rect x="0" y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0" y="286" width="1440" height="3"  fill="#0E2208" opacity="0.6" />

        {/* ══════════════════════════════════════════════════════════
            COFFEE PLANTATION — 30 plants clustered on the LEFT side.
            The right 65% of the scene is open sky and mountains.

            Extra-far row (8):  scale 0.19, y=263, x=8–282
            Back row     (12):  scale 0.29–0.30, y=274–277, x=0–388
            Front row    (10):  scale 0.37–0.39, y=287, x=4–404
        ══════════════════════════════════════════════════════════ */}

        {/* Extra-far row */}
        <use href="#bush" transform="translate(8,   263) scale(0.19)" />
        <use href="#bush" transform="translate(46,  261) scale(0.19)" />
        <use href="#bush" transform="translate(84,  263) scale(0.19)" />
        <use href="#bush" transform="translate(122, 261) scale(0.19)" />
        <use href="#bush" transform="translate(160, 263) scale(0.19)" />
        <use href="#bush" transform="translate(198, 261) scale(0.19)" />
        <use href="#bush" transform="translate(236, 263) scale(0.19)" />
        <use href="#bush" transform="translate(274, 261) scale(0.19)" />

        {/* Back row */}
        <use href="#bush" transform="translate(0,   276) scale(0.29)" />
        <use href="#bush" transform="translate(34,  274) scale(0.30)" />
        <use href="#bush" transform="translate(68,  276) scale(0.29)" />
        <use href="#bush" transform="translate(102, 274) scale(0.30)" />
        <use href="#bush" transform="translate(136, 276) scale(0.29)" />
        <use href="#bush" transform="translate(170, 274) scale(0.30)" />
        <use href="#bush" transform="translate(204, 277) scale(0.29)" />
        <use href="#bush" transform="translate(238, 274) scale(0.30)" />
        <use href="#bush" transform="translate(272, 276) scale(0.29)" />
        <use href="#bush" transform="translate(306, 274) scale(0.30)" />
        <use href="#bush" transform="translate(340, 277) scale(0.29)" />
        <use href="#bush" transform="translate(374, 274) scale(0.30)" />

        {/* Front row */}
        <use href="#bush" transform="translate(4,   287) scale(0.38)" />
        <use href="#bush" transform="translate(48,  287) scale(0.39)" />
        <use href="#bush" transform="translate(92,  287) scale(0.37)" />
        <use href="#bush" transform="translate(136, 287) scale(0.38)" />
        <use href="#bush" transform="translate(180, 287) scale(0.39)" />
        <use href="#bush" transform="translate(224, 287) scale(0.37)" />
        <use href="#bush" transform="translate(268, 287) scale(0.38)" />
        <use href="#bush" transform="translate(312, 287) scale(0.39)" />
        <use href="#bush" transform="translate(356, 287) scale(0.37)" />
        <use href="#bush" transform="translate(400, 287) scale(0.38)" />

      </svg>
    </div>
  )
}
