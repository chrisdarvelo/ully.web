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
            <rect x="-1.5" y="-48" width="3" height="48" fill="#2d1e14" />

            {/* Foliage Blocks */}
            <rect x="-19" y="-16" width="38" height="10" fill="#0d2607" />
            <rect x="-16" y="-29" width="32" height="10" fill="#113309" />
            <rect x="-11" y="-42" width="22" height="10" fill="#16400c" />
            <rect x="-5"  y="-51" width="10" height="10" fill="#1b4d0f" />

            {/* ── 6 Branches (3 left, 3 right) with red fruits ─────────── */}
            {/* Upper-right */}
            <rect x="10"  y="-38" width="10" height="2" fill="#2d1e14" />
            <rect x="19"  y="-40" width="3"  height="3" fill="#c41e3a" />
            <rect x="19"  y="-37" width="3"  height="3" fill="#c41e3a" />
            {/* Upper-left */}
            <rect x="-20" y="-35" width="10" height="2" fill="#2d1e14" />
            <rect x="-23" y="-37" width="3"  height="3" fill="#c41e3a" />
            <rect x="-23" y="-34" width="3"  height="3" fill="#c41e3a" />
            {/* Mid-right */}
            <rect x="15"  y="-25" width="10" height="2" fill="#2d1e14" />
            <rect x="24"  y="-27" width="3"  height="3" fill="#c41e3a" />
            <rect x="24"  y="-24" width="3"  height="3" fill="#c41e3a" />
            {/* Mid-left */}
            <rect x="-25" y="-22" width="10" height="2" fill="#2d1e14" />
            <rect x="-28" y="-24" width="3"  height="3" fill="#c41e3a" />
            <rect x="-28" y="-21" width="3"  height="3" fill="#c41e3a" />
            {/* Lower-right */}
            <rect x="18"  y="-12" width="10" height="2" fill="#2d1e14" />
            <rect x="27"  y="-14" width="3"  height="3" fill="#c41e3a" />
            <rect x="27"  y="-11" width="3"  height="3" fill="#c41e3a" />
            {/* Lower-left */}
            <rect x="-28" y="-9"  width="10" height="2" fill="#2d1e14" />
            <rect x="-31" y="-11" width="3"  height="3" fill="#c41e3a" />
            <rect x="-31" y="-8"  width="3"  height="3" fill="#c41e3a" />

            {/* Red fruits on foliage */}
            <g fill="#c41e3a">
              <rect x="-3"  y="-50" width="2.5" height="2.5" /><rect x="1.5"  y="-52" width="2.5" height="2.5" />
              <rect x="-4"  y="-44" width="3"   height="3"   /><rect x="2.5"  y="-42" width="3"   height="3"   />
              <rect x="-6"  y="-46" width="2.5" height="2.5" /><rect x="5"    y="-47" width="2.5" height="2.5" />
              <rect x="0"   y="-40" width="3"   height="3"   /><rect x="-8"   y="-36" width="2.5" height="2.5" />
              <rect x="6"   y="-34" width="2.5" height="2.5" /><rect x="-1.5" y="-30" width="3"   height="3"   />
              <rect x="-16" y="-14" width="3"   height="3"   /><rect x="-11"  y="-13" width="3"   height="3"   />
              <rect x="8"   y="-15" width="3"   height="3"   /><rect x="13"   y="-12" width="3"   height="3"   />
              <rect x="-1.5" y="-10" width="3"  height="3"   /><rect x="3"    y="-11" width="3"   height="3"   />
              <rect x="-12" y="-26" width="3"   height="3"   /><rect x="-8"   y="-28" width="3"   height="3"   />
              <rect x="6"   y="-24" width="3"   height="3"   /><rect x="10"   y="-27" width="3"   height="3"   />
              <rect x="-3"  y="-32" width="3"   height="3"   /><rect x="1.5"  y="-30" width="3"   height="3"   />
              <rect x="-17" y="-20" width="3"   height="3"   /><rect x="14"   y="-19" width="2.5" height="2.5" />
              <rect x="-9"  y="-23" width="3"   height="3"   /><rect x="8"    y="-32" width="2.5" height="2.5" />
              <rect x="-13" y="-35" width="3"   height="3"   /><rect x="4"    y="-38" width="2.5" height="2.5" />
              <rect x="-7"  y="-45" width="2.5" height="2.5" /><rect x="-1.5" y="-53" width="2.5" height="2.5" />
              <rect x="3"   y="-49" width="2.5" height="2.5" /><rect x="-5"   y="-42" width="2.5" height="2.5" />
              <rect x="1.5" y="-37" width="2.5" height="2.5" /><rect x="-2.5" y="-47" width="2.5" height="2.5" />
              <rect x="6"   y="-25" width="2.5" height="2.5" /><rect x="-11"  y="-33" width="2.5" height="2.5" />
              <rect x="-14" y="-18" width="2.5" height="2.5" /><rect x="11"   y="-22" width="2.5" height="2.5" />
              <rect x="0"   y="-36" width="2.5" height="2.5" /><rect x="-8"   y="-46" width="2.5" height="2.5" />
              <rect x="12"  y="-16" width="2.5" height="2.5" />
            </g>
          </symbol>

          <symbol id="pixel-mountain" overflow="visible">
            <rect x="-60" y="-20" width="120" height="20" fill="#7DB060" />
            <rect x="-45" y="-40" width="90"  height="20" fill="#7DB060" />
            <rect x="-25" y="-60" width="50"  height="20" fill="#7DB060" />
            <rect x="-45" y="-40" width="10"  height="20" fill="#9cd67a" opacity="0.3" />
            <rect x="-25" y="-60" width="10"  height="20" fill="#9cd67a" opacity="0.3" />
          </symbol>

          <symbol id="seagull" overflow="visible">
            <g fill="white">
              <rect x="-2" y="0" width="4" height="2" />
              <rect x="-6" y="-2" width="4" height="2">
                <animateTransform attributeName="transform" type="translate"
                  values="0 0; 0 -2; 0 0" dur="0.8s" repeatCount="indefinite" />
              </rect>
              <rect x="2" y="-2" width="4" height="2">
                <animateTransform attributeName="transform" type="translate"
                  values="0 0; 0 -2; 0 0" dur="0.8s" repeatCount="indefinite" />
              </rect>
            </g>
          </symbol>
        </defs>

        <rect width="1440" height="320" fill="url(#skyGrad)" />
        <rect x="870" y="40" width="60" height="60" fill="#F5D140" />
        <rect x="880" y="50" width="15" height="15" fill="#ffffff" opacity="0.4" />

        <g fill="white" opacity="0.85">
          <rect x="100" y="60" width="80" height="20" />
          <rect x="120" y="40" width="40" height="20" />
          <rect x="450" y="30" width="100" height="25" />
          <rect x="470" y="15" width="60" height="15" />
          <rect x="800" y="50" width="70" height="20" />
          <rect x="1100" y="40" width="90" height="20" />
          <rect x="1120" y="25" width="50" height="15" />
        </g>

        {/* ── Background Mountains ──────────────────────────────────── */}
        <use href="#pixel-mountain" x="250"  y="286" transform="scale(2.5)"  fill="#5ba3d0" opacity="0.3" />
        <use href="#pixel-mountain" x="1150" y="286" transform="scale(2.2)"  fill="#5ba3d0" opacity="0.2" />
        <use href="#pixel-mountain" x="600"  y="286" transform="scale(3.2)"  fill="#5ba3d0" opacity="0.15" />
        <use href="#pixel-mountain" x="1350" y="286" transform="scale(1.8)"  fill="#5ba3d0" opacity="0.25" />
        <use href="#pixel-mountain" x="50"   y="286" transform="scale(2.0)"  fill="#5ba3d0" opacity="0.2" />
        <use href="#pixel-mountain" x="400"  y="286" transform="scale(2.8)"  fill="#5ba3d0" opacity="0.1" />
        <use href="#pixel-mountain" x="720"  y="286" transform="scale(2.6)"  fill="#5ba3d0" opacity="0.2" />
        <use href="#pixel-mountain" x="950"  y="286" transform="scale(2.0)"  fill="#5ba3d0" opacity="0.25" />

        <g transform="translate(0, 286)">
          <use href="#pixel-mountain" x="150"  y="0" transform="scale(1.8)" />
          <use href="#pixel-mountain" x="480"  y="0" transform="scale(1.5)" />
          <use href="#pixel-mountain" x="800"  y="0" transform="scale(2.2)" />
          <use href="#pixel-mountain" x="1080" y="0" transform="scale(1.6)" />
          <use href="#pixel-mountain" x="1380" y="0" transform="scale(1.9)" />
        </g>

        <use href="#seagull" x="300"  y="100" />
        <use href="#seagull" x="340"  y="120" />
        <use href="#seagull" x="1200" y="80"  />

        {/* ── Cessna ───────────────────────────────────────────────── */}
        <g opacity="0.98">
          <rect x="0" y="10" width="12" height="10" fill="#333" />
          <rect x="12" y="6" width="35" height="16" fill="#F0EDEA" />
          <rect x="47" y="10" width="45" height="10" fill="#F0EDEA" />
          <rect x="12" y="12" width="80" height="4" fill="#CC2020" />
          <rect x="15" y="8"  width="22" height="6" fill="#1A1A1A" />
          <rect x="17" y="9"  width="18" height="4" fill="#5BA3D0" opacity="0.4" />
          <rect x="5"  y="4"  width="55" height="4" fill="#F0EDEA" />
          <rect x="5"  y="4"  width="8"  height="4" fill="#CC2020" />
          <rect x="52" y="4"  width="8"  height="4" fill="#CC2020" />
          <rect x="82" y="4"  width="10" height="6" fill="#F0EDEA" />
          <rect x="86" y="-2" width="8"  height="6" fill="#F0EDEA" />
          <rect x="90" y="-8" width="6"  height="6" fill="#F0EDEA" />
          <rect x="90" y="-8" width="6"  height="2" fill="#CC2020" />
          <rect x="85" y="12" width="12" height="2" fill="#F0EDEA" />
          <g transform="translate(-2, 15)">
            <rect x="-1" y="-12" width="2" height="24" fill="#5A5452" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.1s" repeatCount="indefinite" />
            </rect>
            <rect x="-1" y="-2" width="2" height="4" fill="#333" />
          </g>
          <rect x="10" y="22" width="2" height="6" fill="#9A9288" />
          <rect x="8"  y="28" width="6" height="4" fill="#252220" />
          <rect x="40" y="22" width="2" height="8" fill="#9A9288" />
          <rect x="38" y="30" width="6" height="4" fill="#252220" />
          <animateTransform attributeName="transform" type="translate"
            from="1560 60" to="-250 60" dur="45s" repeatCount="indefinite" />
        </g>

        {/* ── Big mountain behind plantation ───────────────────────── */}
        <use href="#pixel-mountain" x="280" y="286" transform="scale(3.36)" opacity="0.85" />

        {/* ── Ground ───────────────────────────────────────────────── */}
        <rect x="0"   y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0"   y="286" width="1440" height="4"  fill="#0E2208" opacity="0.4" />

        {/*
          ── Coffee Plantation ────────────────────────────────────────
          Layout: groups of 5 trees separated by narrow walking paths (~10-14px).
          3 depth rows (back/mid/front) for perspective.
          Plantation spans ~600px, centered-left in scene.
          Pattern per row:  [5 trees] [path] [5 trees] [path] ...
        */}
        <g transform="translate(80, 286)">

          {/*
            BACK ROW — y=0, scale 0.38–0.47, tree spacing 20px, path gap 12px
            Block = 5×20 + 12 = 112px
            Groups: 0–80 | 92–172 | 184–264 | 276–356 | 368–448 | 460–540
          */}
          {/* G1 */}
          <use href="#coffee-plant" x="0"   y="0" transform="scale(0.44)" />
          <use href="#coffee-plant" x="20"  y="0" transform="scale(0.40)" />
          <use href="#coffee-plant" x="40"  y="0" transform="scale(0.46)" />
          <use href="#coffee-plant" x="60"  y="0" transform="scale(0.41)" />
          <use href="#coffee-plant" x="80"  y="0" transform="scale(0.44)" />
          {/* G2 */}
          <use href="#coffee-plant" x="92"  y="0" transform="scale(0.40)" />
          <use href="#coffee-plant" x="112" y="0" transform="scale(0.47)" />
          <use href="#coffee-plant" x="132" y="0" transform="scale(0.42)" />
          <use href="#coffee-plant" x="152" y="0" transform="scale(0.45)" />
          <use href="#coffee-plant" x="172" y="0" transform="scale(0.38)" />
          {/* G3 */}
          <use href="#coffee-plant" x="184" y="0" transform="scale(0.46)" />
          <use href="#coffee-plant" x="204" y="0" transform="scale(0.41)" />
          <use href="#coffee-plant" x="224" y="0" transform="scale(0.44)" />
          <use href="#coffee-plant" x="244" y="0" transform="scale(0.47)" />
          <use href="#coffee-plant" x="264" y="0" transform="scale(0.40)" />
          {/* G4 */}
          <use href="#coffee-plant" x="276" y="0" transform="scale(0.43)" />
          <use href="#coffee-plant" x="296" y="0" transform="scale(0.46)" />
          <use href="#coffee-plant" x="316" y="0" transform="scale(0.38)" />
          <use href="#coffee-plant" x="336" y="0" transform="scale(0.44)" />
          <use href="#coffee-plant" x="356" y="0" transform="scale(0.41)" />
          {/* G5 */}
          <use href="#coffee-plant" x="368" y="0" transform="scale(0.47)" />
          <use href="#coffee-plant" x="388" y="0" transform="scale(0.42)" />
          <use href="#coffee-plant" x="408" y="0" transform="scale(0.45)" />
          <use href="#coffee-plant" x="428" y="0" transform="scale(0.40)" />
          <use href="#coffee-plant" x="448" y="0" transform="scale(0.44)" />
          {/* G6 */}
          <use href="#coffee-plant" x="460" y="0" transform="scale(0.41)" />
          <use href="#coffee-plant" x="480" y="0" transform="scale(0.46)" />
          <use href="#coffee-plant" x="500" y="0" transform="scale(0.43)" />
          <use href="#coffee-plant" x="520" y="0" transform="scale(0.47)" />
          <use href="#coffee-plant" x="540" y="0" transform="scale(0.38)" />

          {/*
            MIDDLE ROW — y=12, scale 0.50–0.60, tree spacing 32px, path gap 18px
            Block = 5×32 + 18 = 178px
            Groups start offset +10 to stagger with back row
            Groups: 10–138 | 156–284 | 302–430 | 448–576
          */}
          {/* G1 */}
          <use href="#coffee-plant" x="10"  y="12" transform="scale(0.55)" />
          <use href="#coffee-plant" x="42"  y="12" transform="scale(0.50)" />
          <use href="#coffee-plant" x="74"  y="12" transform="scale(0.58)" />
          <use href="#coffee-plant" x="106" y="12" transform="scale(0.53)" />
          <use href="#coffee-plant" x="138" y="12" transform="scale(0.57)" />
          {/* G2 */}
          <use href="#coffee-plant" x="156" y="12" transform="scale(0.51)" />
          <use href="#coffee-plant" x="188" y="12" transform="scale(0.60)" />
          <use href="#coffee-plant" x="220" y="12" transform="scale(0.54)" />
          <use href="#coffee-plant" x="252" y="12" transform="scale(0.56)" />
          <use href="#coffee-plant" x="284" y="12" transform="scale(0.50)" />
          {/* G3 */}
          <use href="#coffee-plant" x="302" y="12" transform="scale(0.58)" />
          <use href="#coffee-plant" x="334" y="12" transform="scale(0.53)" />
          <use href="#coffee-plant" x="366" y="12" transform="scale(0.55)" />
          <use href="#coffee-plant" x="398" y="12" transform="scale(0.60)" />
          <use href="#coffee-plant" x="430" y="12" transform="scale(0.52)" />
          {/* G4 */}
          <use href="#coffee-plant" x="448" y="12" transform="scale(0.57)" />
          <use href="#coffee-plant" x="480" y="12" transform="scale(0.51)" />
          <use href="#coffee-plant" x="512" y="12" transform="scale(0.54)" />
          <use href="#coffee-plant" x="544" y="12" transform="scale(0.58)" />
          <use href="#coffee-plant" x="576" y="12" transform="scale(0.50)" />

          {/*
            FRONT ROW — y=26, scale 0.64–0.74, tree spacing 44px, path gap 26px
            Block = 5×44 + 26 = 246px
            Groups start offset -8
            Groups: -8–168 | 194–370 | 396–572
          */}
          {/* G1 */}
          <use href="#coffee-plant" x="-8"  y="26" transform="scale(0.70)" />
          <use href="#coffee-plant" x="36"  y="26" transform="scale(0.64)" />
          <use href="#coffee-plant" x="80"  y="26" transform="scale(0.73)" />
          <use href="#coffee-plant" x="124" y="26" transform="scale(0.66)" />
          <use href="#coffee-plant" x="168" y="26" transform="scale(0.74)" />
          {/* G2 */}
          <use href="#coffee-plant" x="194" y="26" transform="scale(0.67)" />
          <use href="#coffee-plant" x="238" y="26" transform="scale(0.71)" />
          <use href="#coffee-plant" x="282" y="26" transform="scale(0.64)" />
          <use href="#coffee-plant" x="326" y="26" transform="scale(0.72)" />
          <use href="#coffee-plant" x="370" y="26" transform="scale(0.68)" />
          {/* G3 */}
          <use href="#coffee-plant" x="396" y="26" transform="scale(0.74)" />
          <use href="#coffee-plant" x="440" y="26" transform="scale(0.65)" />
          <use href="#coffee-plant" x="484" y="26" transform="scale(0.70)" />
          <use href="#coffee-plant" x="528" y="26" transform="scale(0.67)" />
          <use href="#coffee-plant" x="572" y="26" transform="scale(0.73)" />

        </g>
      </svg>
    </div>
  )
}
