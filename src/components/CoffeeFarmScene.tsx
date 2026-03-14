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
              Compact, wide-dome shrub — coffee plants grow as bushy
              1–2 m tall shrubs, not trees. Much wider than tall.
              Base at local (0,0). Bush grows upward (negative y).
              7 stems spread wide from the base.
              Total height at scale 1.0 ≈ 41px. Width ≈ 76px.
              Front row:     scale 0.38 → ~16px tall
              Back row:      scale 0.29 → ~12px tall
              Extra-far row: scale 0.19 → ~8px tall (distant mounds)
          ────────────────────────────────────────────────────────────── */}
          <symbol id="bush" overflow="visible">
            {/* 7 stems spreading wide from base — bushy base, not single trunk */}
            <line x1="0"  y1="0"  x2="0"   y2="-23" stroke="#4a2a0a" strokeWidth="2.5"/>
            <line x1="0"  y1="0"  x2="-14" y2="-19" stroke="#4a2a0a" strokeWidth="2.2"/>
            <line x1="0"  y1="0"  x2="14"  y2="-19" stroke="#4a2a0a" strokeWidth="2.2"/>
            <line x1="0"  y1="-2" x2="-28" y2="-14" stroke="#4a2a0a" strokeWidth="2"/>
            <line x1="0"  y1="-2" x2="28"  y2="-14" stroke="#4a2a0a" strokeWidth="2"/>
            <line x1="0"  y1="-4" x2="-38" y2="-11" stroke="#4a2a0a" strokeWidth="1.8"/>
            <line x1="0"  y1="-4" x2="38"  y2="-11" stroke="#4a2a0a" strokeWidth="1.8"/>

            {/* Wide dome canopy — much wider than tall, rounded mound */}
            {/* Base spread — very wide */}
            <ellipse cx="0"   cy="-14" rx="38" ry="10" fill="#1a3d14"/>
            <ellipse cx="-24" cy="-13" rx="17" ry="9"  fill="#1e4218"/>
            <ellipse cx="24"  cy="-13" rx="17" ry="9"  fill="#1e4218"/>
            {/* Mid layer */}
            <ellipse cx="0"   cy="-20" rx="32" ry="10" fill="#224820"/>
            <ellipse cx="-16" cy="-23" rx="19" ry="9"  fill="#274d22"/>
            <ellipse cx="16"  cy="-23" rx="19" ry="9"  fill="#274d22"/>
            {/* Upper dome */}
            <ellipse cx="0"   cy="-28" rx="24" ry="10" fill="#2c5226"/>
            <ellipse cx="-8"  cy="-31" rx="15" ry="8"  fill="#305530"/>
            <ellipse cx="8"   cy="-31" rx="15" ry="8"  fill="#305530"/>
            {/* Top cap */}
            <ellipse cx="0"   cy="-36" rx="14" ry="8"  fill="#3a6030"/>
            <ellipse cx="0"   cy="-41" rx="8"  ry="5"  fill="#446834"/>

            {/* ── ~70 coffee cherries: red, yellow/amber, green ── */}

            {/* Far-left spread — unripe green */}
            <circle cx="-35" cy="-10" r="4"   fill="#4a7a28"/>
            <circle cx="-31" cy="-12" r="3.5" fill="#3d7020"/>
            <circle cx="-37" cy="-13" r="3.5" fill="#5a8a30"/>
            <circle cx="-33" cy="-15" r="3.5" fill="#4a7a28"/>
            <circle cx="-29" cy="-13" r="3"   fill="#3d7020"/>
            <circle cx="-39" cy="-11" r="3"   fill="#4a7a28"/>
            <circle cx="-27" cy="-16" r="3"   fill="#5a8a30"/>

            {/* Left branch — ripe red */}
            <circle cx="-22" cy="-19" r="4"   fill="#C84040"/>
            <circle cx="-18" cy="-21" r="3.5" fill="#B82020"/>
            <circle cx="-25" cy="-21" r="3.5" fill="#C84040"/>
            <circle cx="-20" cy="-24" r="3.5" fill="#a82d24"/>
            <circle cx="-16" cy="-18" r="3"   fill="#C84040"/>
            <circle cx="-24" cy="-25" r="3"   fill="#B82020"/>
            <circle cx="-14" cy="-23" r="3"   fill="#C84040"/>

            {/* Center-low cluster — mixed all three colors */}
            <circle cx="-4"  cy="-14" r="4"   fill="#C84040"/>
            <circle cx="0"   cy="-13" r="3.5" fill="#e8a840"/>
            <circle cx="4"   cy="-14" r="3.5" fill="#4a7a28"/>
            <circle cx="-2"  cy="-11" r="3"   fill="#C84040"/>
            <circle cx="2"   cy="-11" r="3"   fill="#d4973e"/>
            <circle cx="-6"  cy="-12" r="3"   fill="#B82020"/>
            <circle cx="6"   cy="-12" r="3"   fill="#C84040"/>

            {/* Right branch — yellow/amber ripening */}
            <circle cx="22"  cy="-19" r="4"   fill="#e8a840"/>
            <circle cx="18"  cy="-21" r="3.5" fill="#d4973e"/>
            <circle cx="25"  cy="-21" r="3.5" fill="#C84040"/>
            <circle cx="20"  cy="-24" r="3.5" fill="#B82020"/>
            <circle cx="16"  cy="-18" r="3"   fill="#e8a840"/>
            <circle cx="24"  cy="-25" r="3"   fill="#C84040"/>
            <circle cx="14"  cy="-23" r="3"   fill="#d4973e"/>

            {/* Far-right spread — yellow/amber */}
            <circle cx="35"  cy="-10" r="4"   fill="#e8a840"/>
            <circle cx="31"  cy="-12" r="3.5" fill="#d4973e"/>
            <circle cx="37"  cy="-13" r="3.5" fill="#c8923c"/>
            <circle cx="33"  cy="-15" r="3.5" fill="#e8a840"/>
            <circle cx="29"  cy="-13" r="3"   fill="#d4973e"/>
            <circle cx="39"  cy="-11" r="3"   fill="#e8a840"/>
            <circle cx="27"  cy="-16" r="3"   fill="#c8923c"/>

            {/* Mid-left upper — red and green mix */}
            <circle cx="-20" cy="-27" r="3.5" fill="#4a7a28"/>
            <circle cx="-14" cy="-28" r="3.5" fill="#C84040"/>
            <circle cx="-10" cy="-31" r="3"   fill="#4a7a28"/>
            <circle cx="-17" cy="-32" r="3"   fill="#e8a840"/>
            <circle cx="-12" cy="-35" r="3"   fill="#C84040"/>
            <circle cx="-8"  cy="-29" r="3"   fill="#B82020"/>

            {/* Mid-right upper — red and yellow mix */}
            <circle cx="20"  cy="-27" r="3.5" fill="#4a7a28"/>
            <circle cx="14"  cy="-28" r="3.5" fill="#C84040"/>
            <circle cx="10"  cy="-31" r="3"   fill="#e8a840"/>
            <circle cx="17"  cy="-32" r="3"   fill="#4a7a28"/>
            <circle cx="12"  cy="-35" r="3"   fill="#C84040"/>
            <circle cx="8"   cy="-29" r="3"   fill="#B82020"/>

            {/* Center upper — all three colors */}
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
        <circle cx="680" cy="74" r="58" fill="#F5D140" opacity="0.11" />
        <circle cx="680" cy="74" r="40" fill="#F5D140" opacity="0.19" />
        <circle cx="680" cy="74" r="26" fill="#F8E04A" />

        {/* ── Clouds — 5 distinctly shaped formations ──────────────── */}

        {/* Cloud 1 — large cumulonimbus anvil, upper-left
            Flat base, multiple rising towers. Wide footprint. */}
        <g fill="white" opacity="0.82">
          <ellipse cx="128" cy="52" rx="92"  ry="13" />
          <ellipse cx="72"  cy="42" rx="38"  ry="22" />
          <ellipse cx="124" cy="34" rx="48"  ry="26" />
          <ellipse cx="178" cy="40" rx="36"  ry="20" />
          <ellipse cx="106" cy="22" rx="30"  ry="18" />
          <ellipse cx="148" cy="19" rx="26"  ry="16" />
          <ellipse cx="58"  cy="48" rx="24"  ry="14" />
          <ellipse cx="204" cy="46" rx="28"  ry="13" />
          <ellipse cx="126" cy="10" rx="18"  ry="12" />
        </g>

        {/* Cloud 2 — compact tall cumulus tower, center-left
            Narrow at base, tall rounded top — cauliflower silhouette. */}
        <g fill="white" opacity="0.78">
          <ellipse cx="400" cy="44" rx="26"  ry="13" />
          <ellipse cx="386" cy="34" rx="20"  ry="16" />
          <ellipse cx="414" cy="32" rx="22"  ry="17" />
          <ellipse cx="398" cy="22" rx="18"  ry="14" />
          <ellipse cx="384" cy="16" rx="14"  ry="11" />
          <ellipse cx="412" cy="14" rx="15"  ry="12" />
          <ellipse cx="399" cy="8"  rx="11"  ry="10" />
        </g>

        {/* Cloud 3 — wide stratocumulus bank, upper center
            Multiple rounded lumps in a row, each with real volume. */}
        <g fill="white" opacity="0.72">
          <ellipse cx="726" cy="40" rx="58"  ry="14" />
          <ellipse cx="684" cy="30" rx="30"  ry="18" />
          <ellipse cx="722" cy="26" rx="34"  ry="20" />
          <ellipse cx="764" cy="29" rx="30"  ry="17" />
          <ellipse cx="700" cy="18" rx="22"  ry="14" />
          <ellipse cx="744" cy="15" rx="24"  ry="15" />
          <ellipse cx="656" cy="38" rx="20"  ry="13" />
          <ellipse cx="793" cy="36" rx="22"  ry="13" />
        </g>

        {/* Cloud 4 — tall isolated tower cumulus, right-center
            Single imposing column, rises higher than the others. */}
        <g fill="white" opacity="0.75">
          <ellipse cx="1062" cy="58" rx="32"  ry="12" />
          <ellipse cx="1044" cy="47" rx="22"  ry="16" />
          <ellipse cx="1074" cy="44" rx="25"  ry="18" />
          <ellipse cx="1056" cy="33" rx="20"  ry="16" />
          <ellipse cx="1070" cy="22" rx="17"  ry="14" />
          <ellipse cx="1052" cy="13" rx="14"  ry="12" />
          <ellipse cx="1064" cy="6"  rx="10"  ry="9"  />
          <ellipse cx="1088" cy="52" rx="20"  ry="12" />
        </g>

        {/* Cloud 5 — puffball cluster, far right
            Round globular lumps — clearly different from the tall tower. */}
        <g fill="white" opacity="0.70">
          <ellipse cx="1318" cy="46" rx="28"  ry="14" />
          <ellipse cx="1348" cy="42" rx="26"  ry="15" />
          <ellipse cx="1374" cy="48" rx="20"  ry="12" />
          <ellipse cx="1326" cy="33" rx="22"  ry="15" />
          <ellipse cx="1354" cy="30" rx="24"  ry="16" />
          <ellipse cx="1378" cy="36" rx="18"  ry="13" />
          <ellipse cx="1340" cy="22" rx="18"  ry="13" />
          <ellipse cx="1364" cy="20" rx="16"  ry="12" />
        </g>

        {/* ── Cessna 150 ─────────────────────────────────────────────
            Side view facing left (nose at local x≈-10).
            Flies right→left across the sky.
            SMIL animateTransform — no JS required.
        ─────────────────────────────────────────────────────────── */}
        <g opacity="0.92">
          {/* fuselage */}
          <path d="M2,7 C4,3 14,2 24,2 L64,2 C72,2 78,4 82,7 C78,10 72,12 64,12 L24,12 C14,12 4,11 2,7Z" fill="#DDD4C0" />
          {/* cockpit window */}
          <path d="M16,2 C20,-1 30,-2 42,-2 C52,-2 60,-0.5 64,2Z" fill="#B8B0A0" />
          <path d="M18,2 C22,-0.5 30,-1.5 40,-1.5 C48,-1.5 56,-0.5 60,2Z" fill="rgba(130,185,240,0.62)" />
          {/* HIGH WING — left extends out, right extends out, hallmark of Cessna 150 */}
          <path d="M24,2 L24,1 L-42,-1 L-44,0 L-42,1 L24,2Z"   fill="#CECAB4" />
          <path d="M46,2 L46,1 L108,-1 L110,0 L108,1 L46,2Z"   fill="#CCC8B4" />
          {/* wing struts */}
          <line x1="12"  y1="2"  x2="8"  y2="12" stroke="#A09A84" strokeWidth="1" />
          <line x1="56"  y1="2"  x2="60" y2="12" stroke="#A09A84" strokeWidth="1" />
          {/* engine cowl */}
          <ellipse cx="-2" cy="7" rx="7" ry="6" fill="#9A9080" />
          {/* propeller spinning disc */}
          <ellipse cx="-8" cy="7" rx="1" ry="10" fill="rgba(50,50,50,0.28)" />
          {/* vertical tail fin */}
          <path d="M78,2 L82,-5 L84,-2 L84,2Z" fill="#CCC8B4" />
          {/* horizontal stabilizer */}
          <path d="M76,10 L68,12 L68,13 L76,11Z" fill="#CCC8B4" />
          <path d="M78,10 L86,12 L86,13 L78,11Z" fill="#CCC8B4" />
          {/* fixed tricycle gear — Cessna 150 hallmark */}
          <line x1="18" y1="12" x2="15" y2="18" stroke="#6A6050" strokeWidth="1.5" />
          <ellipse cx="14" cy="18" rx="4" ry="2.5" fill="#3C3830" />
          <line x1="54" y1="12" x2="57" y2="18" stroke="#6A6050" strokeWidth="1.5" />
          <ellipse cx="58" cy="18" rx="4" ry="2.5" fill="#3C3830" />
          <line x1="0"  y1="12" x2="-2" y2="17"  stroke="#6A6050" strokeWidth="1.5" />
          <ellipse cx="-3" cy="17" rx="3" ry="2" fill="#3C3830" />
          {/* registration stripe */}
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

        {/* ── Far mountains — smooth organic profile, hazy green ──── */}
        <path fill="#7DB060" d="
          M -20,320 L -20,194
          C  28,188  58,165 100,158
          C 142,151 172,170 212,173
          C 252,176 284,150 326,142
          C 368,134 396,152 436,147
          C 476,142 506,120 548,114
          C 572,109 588,122 608,127
          C 628,132 648,108 668,103
          C 688,98  708,112 728,107
          C 748,102 768,120 806,124
          C 844,128 874,110 914,117
          C 954,124 984,142 1022,147
          C 1060,152 1092,132 1132,127
          C 1172,122 1204,144 1244,150
          C 1284,156 1312,140 1352,147
          C 1392,154 1424,170 1460,180
          L 1460,320 Z
        " />
        {/* far mountain ridge shadow — adds depth/texture */}
        <path fill="#5A8840" opacity="0.26" d="
          M 490,120 C 528,110 562,114 600,127
          C 638,140 658,104 700,110
          C 724,114 742,130 764,132
          C 786,134 808,117 836,122
          C 864,127 892,142 924,147
          L 924,320 L 490,320 Z
        " />
        {/* additional far range ridge on right — different height */}
        <path fill="#6A9C50" opacity="0.20" d="
          M 1080,130 C 1110,120 1148,126 1180,134
          C 1212,142 1240,128 1270,135
          C 1300,142 1330,150 1360,154
          L 1360,320 L 1080,320 Z
        " />

        {/* ── Mid mountains — greener, taller, varied widths ──────── */}
        <path fill="#4D7F2A" d="
          M -20,320 L -20,242
          C  18,236  48,222  80,214
          C 112,206 144,220 174,217
          C 204,214 234,197 270,187
          C 306,177 334,192 364,190
          C 394,188 414,170 446,160
          C 470,152 496,164 524,168
          C 552,172 580,150 612,142
          C 636,135 652,150 674,154
          C 696,158 716,142 742,137
          C 766,132 792,150 824,157
          C 856,164 884,147 918,140
          C 946,134 972,152 1004,160
          C 1036,168 1064,150 1098,144
          C 1128,138 1158,157 1194,164
          C 1230,171 1260,154 1295,160
          C 1330,166 1362,180 1402,188
          C 1422,192 1442,198 1460,202
          L 1460,320 Z
        " />
        {/* mid mountain dark ridge texture */}
        <path fill="#2D5A12" opacity="0.28" d="
          M 576,150 C 608,138 642,154 664,160
          C 686,166 708,144 734,140
          C 758,136 780,154 804,162
          C 826,170 848,152 874,146
          C 898,140 920,157 944,164
          L 944,320 L 576,320 Z
        " />
        {/* second mid texture ridge — right half */}
        <path fill="#1E4A0A" opacity="0.22" d="
          M 1050,148 C 1080,138 1112,156 1140,165
          C 1168,174 1196,158 1228,164
          C 1258,170 1290,182 1320,188
          L 1320,320 L 1050,320 Z
        " />

        {/* ── Foreground ridge — closest hills, darkest ───────────── */}
        <path fill="#2D5215" d="
          M -20,320 L -20,270
          C  14,264  38,256  64,252
          C  90,248 114,260 140,258
          C 166,256 190,246 216,240
          C 242,234 268,244 294,242
          C 320,240 340,230 366,224
          C 392,218 412,228 438,226
          C 464,224 484,214 510,210
          C 526,207 544,216 562,220
          C 580,224 598,212 618,207
          C 638,202 658,212 678,218
          C 698,224 718,210 742,206
          C 762,202 784,214 808,220
          C 832,226 858,214 882,210
          C 906,206 928,217 952,222
          C 976,227 996,215 1022,212
          C 1048,209 1068,220 1092,225
          C 1116,230 1142,218 1168,214
          C 1194,210 1218,224 1246,230
          C 1270,236 1296,224 1322,230
          C 1348,236 1378,250 1408,257
          C 1428,262 1446,267 1460,270
          L 1460,320 Z
        " />
        {/* foreground ridge mid-tone texture */}
        <path fill="#1E3C0E" opacity="0.42" d="
          M 450,214 C 484,208 518,218 544,224
          C 570,230 592,214 618,208
          C 644,202 666,216 686,222
          C 706,228 724,212 746,208
          C 766,205 786,218 810,224
          L 810,320 L 450,320 Z
        " />

        {/* ── Ground strip ─────────────────────────────────────────── */}
        <rect x="0" y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0" y="286" width="1440" height="3"  fill="#0E2208" opacity="0.6" />

        {/* ══════════════════════════════════════════════════════════
            COFFEE PLANTATION — 50 plants total
            Compact, low dome-shaped coffee bushes. Much wider than
            tall — realistic coffee plant proportions.

            Extra-far row (16): scale 0.19, y=263  — distant mounds on ridge
            Back row     (18): scale 0.29–0.30, y=275–278
            Front row    (16): scale 0.37–0.39, y=287
        ══════════════════════════════════════════════════════════ */}

        {/* Extra-far row — 16 tiny bushes on the distant ridge */}
        <use href="#bush" transform="translate(0,   263) scale(0.19)" />
        <use href="#bush" transform="translate(90,  261) scale(0.19)" />
        <use href="#bush" transform="translate(180, 263) scale(0.19)" />
        <use href="#bush" transform="translate(270, 261) scale(0.19)" />
        <use href="#bush" transform="translate(360, 263) scale(0.19)" />
        <use href="#bush" transform="translate(450, 261) scale(0.19)" />
        <use href="#bush" transform="translate(540, 263) scale(0.19)" />
        <use href="#bush" transform="translate(630, 261) scale(0.19)" />
        <use href="#bush" transform="translate(720, 263) scale(0.19)" />
        <use href="#bush" transform="translate(810, 261) scale(0.19)" />
        <use href="#bush" transform="translate(900, 263) scale(0.19)" />
        <use href="#bush" transform="translate(990, 261) scale(0.19)" />
        <use href="#bush" transform="translate(1080,263) scale(0.19)" />
        <use href="#bush" transform="translate(1170,261) scale(0.19)" />
        <use href="#bush" transform="translate(1260,263) scale(0.19)" />
        <use href="#bush" transform="translate(1350,261) scale(0.19)" />

        {/* Back row — 18 bushes */}
        <use href="#bush" transform="translate(0,   276) scale(0.29)" />
        <use href="#bush" transform="translate(80,  274) scale(0.30)" />
        <use href="#bush" transform="translate(160, 276) scale(0.29)" />
        <use href="#bush" transform="translate(240, 274) scale(0.30)" />
        <use href="#bush" transform="translate(320, 276) scale(0.29)" />
        <use href="#bush" transform="translate(400, 274) scale(0.30)" />
        <use href="#bush" transform="translate(480, 276) scale(0.29)" />
        <use href="#bush" transform="translate(560, 274) scale(0.30)" />
        <use href="#bush" transform="translate(640, 277) scale(0.29)" />
        <use href="#bush" transform="translate(720, 274) scale(0.30)" />
        <use href="#bush" transform="translate(800, 276) scale(0.29)" />
        <use href="#bush" transform="translate(880, 274) scale(0.30)" />
        <use href="#bush" transform="translate(960, 276) scale(0.29)" />
        <use href="#bush" transform="translate(1040,274) scale(0.30)" />
        <use href="#bush" transform="translate(1120,277) scale(0.29)" />
        <use href="#bush" transform="translate(1200,274) scale(0.30)" />
        <use href="#bush" transform="translate(1280,276) scale(0.29)" />
        <use href="#bush" transform="translate(1360,274) scale(0.30)" />

        {/* Front row — 16 bushes */}
        <use href="#bush" transform="translate(22,  287) scale(0.38)" />
        <use href="#bush" transform="translate(112, 287) scale(0.39)" />
        <use href="#bush" transform="translate(202, 287) scale(0.37)" />
        <use href="#bush" transform="translate(292, 287) scale(0.38)" />
        <use href="#bush" transform="translate(382, 287) scale(0.39)" />
        <use href="#bush" transform="translate(472, 287) scale(0.38)" />
        <use href="#bush" transform="translate(562, 287) scale(0.37)" />
        <use href="#bush" transform="translate(652, 287) scale(0.39)" />
        <use href="#bush" transform="translate(742, 287) scale(0.38)" />
        <use href="#bush" transform="translate(832, 287) scale(0.39)" />
        <use href="#bush" transform="translate(922, 287) scale(0.37)" />
        <use href="#bush" transform="translate(1012,287) scale(0.38)" />
        <use href="#bush" transform="translate(1102,287) scale(0.39)" />
        <use href="#bush" transform="translate(1192,287) scale(0.37)" />
        <use href="#bush" transform="translate(1282,287) scale(0.38)" />
        <use href="#bush" transform="translate(1372,287) scale(0.39)" />

      </svg>
    </div>
  )
}
