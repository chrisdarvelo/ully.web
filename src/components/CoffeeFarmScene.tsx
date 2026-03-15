// Coffee plantation scene — footer of all public pages.
// Pure SVG SMIL animation. Minecraft/8-bit aesthetic. No curves.
//
// 4 tree variants (a/b/c/d) — randomised branch layouts, oval/bushy foliage.
// Fruit size: 2.5×2.5 (standard) and 2×2 (small). Branches have 4–5 fruits each.

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

          {/*
            Shared foliage shape — oval/bushy, widest in mid layer:
              Trunk:  x=-1.5  y=-44  w=3   h=44
              L1:     x=-11   y=-12  w=22  h=10  (bottom, narrower)
              L2:     x=-18   y=-24  w=36  h=12
              L3:     x=-21   y=-36  w=42  h=12  ← widest
              L4:     x=-17   y=-47  w=34  h=11
              L5:     x=-9    y=-54  w=18  h=7   (top cap)
            Foliage edge (branch attachment x) per height:
              y≈-8  → ±11    y≈-18 → ±18    y≈-30 → ±21
              y≈-42 → ±17    y≈-51 → ±9
            Fruit sizes: standard=2.5×2.5, small=2×2
          */}

          {/* ── Variant A — 6 branches, alternating sides ────────────── */}
          <symbol id="cp-a" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            {/* Branch R1 — bottom right */}
            <rect x="10"  y="-9"  width="10" height="2" fill="#2d1e14" />
            <rect x="19"  y="-12" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="19"  y="-9"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="19"  y="-6"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="22"  y="-11" width="2"   height="2"   fill="#c41e3a" />
            <rect x="22"  y="-7"  width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L1 — low-mid left */}
            <rect x="-27" y="-19" width="10" height="2" fill="#2d1e14" />
            <rect x="-30" y="-22" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-30" y="-19" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-30" y="-16" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-33" y="-21" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-33" y="-17" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R2 — mid right */}
            <rect x="20"  y="-28" width="11" height="2" fill="#2d1e14" />
            <rect x="30"  y="-31" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="30"  y="-28" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="30"  y="-25" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="33"  y="-30" width="2"   height="2"   fill="#c41e3a" />
            <rect x="33"  y="-26" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L2 — mid left */}
            <rect x="-30" y="-31" width="10" height="2" fill="#2d1e14" />
            <rect x="-33" y="-34" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-33" y="-31" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-33" y="-28" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-36" y="-33" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R3 — upper right */}
            <rect x="16"  y="-41" width="10" height="2" fill="#2d1e14" />
            <rect x="25"  y="-44" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="25"  y="-41" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="25"  y="-38" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="28"  y="-43" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L3 — upper left */}
            <rect x="-25" y="-43" width="9"  height="2" fill="#2d1e14" />
            <rect x="-28" y="-46" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-28" y="-43" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-28" y="-40" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-45" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-31" y="-41" width="2"   height="2"   fill="#c41e3a" />
            {/* Foliage fruits */}
            <g fill="#c41e3a">
              <rect x="-3"  y="-52" width="2" height="2" /><rect x="2"   y="-50" width="2" height="2" />
              <rect x="-10" y="-44" width="2.5" height="2.5" /><rect x="7"   y="-43" width="2.5" height="2.5" />
              <rect x="-15" y="-33" width="2.5" height="2.5" /><rect x="13"  y="-35" width="2.5" height="2.5" />
              <rect x="-18" y="-27" width="2.5" height="2.5" /><rect x="14"  y="-28" width="2.5" height="2.5" />
              <rect x="-14" y="-20" width="2.5" height="2.5" /><rect x="8"   y="-19" width="2.5" height="2.5" />
              <rect x="-8"  y="-9"  width="2.5" height="2.5" /><rect x="5"   y="-8"  width="2.5" height="2.5" />
            </g>
          </symbol>

          {/* ── Variant B — 7 branches, left-heavy, varied heights ───── */}
          <symbol id="cp-b" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            {/* Branch L1 — very low left */}
            <rect x="-20" y="-7"  width="10" height="2" fill="#2d1e14" />
            <rect x="-23" y="-10" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-23" y="-7"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-23" y="-4"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-20" y="-11" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-20" y="-4"  width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R1 — low-mid right */}
            <rect x="17"  y="-16" width="11" height="2" fill="#2d1e14" />
            <rect x="27"  y="-19" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="27"  y="-16" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="27"  y="-13" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="30"  y="-18" width="2"   height="2"   fill="#c41e3a" />
            <rect x="30"  y="-14" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L2 — mid left */}
            <rect x="-28" y="-23" width="9"  height="2" fill="#2d1e14" />
            <rect x="-31" y="-26" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-23" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-20" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-34" y="-25" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-34" y="-21" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R2 — mid right */}
            <rect x="19"  y="-33" width="11" height="2" fill="#2d1e14" />
            <rect x="29"  y="-36" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="29"  y="-33" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="29"  y="-30" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="32"  y="-35" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L3 — upper-mid left */}
            <rect x="-26" y="-38" width="9"  height="2" fill="#2d1e14" />
            <rect x="-29" y="-41" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-29" y="-38" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-29" y="-35" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-32" y="-40" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-32" y="-36" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R3 — upper right */}
            <rect x="15"  y="-44" width="10" height="2" fill="#2d1e14" />
            <rect x="24"  y="-47" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="24"  y="-44" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="24"  y="-41" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="27"  y="-46" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L4 — top left */}
            <rect x="-16" y="-49" width="8"  height="2" fill="#2d1e14" />
            <rect x="-19" y="-52" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-19" y="-49" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-19" y="-46" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-22" y="-51" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-22" y="-47" width="2"   height="2"   fill="#c41e3a" />
            {/* Foliage fruits */}
            <g fill="#c41e3a">
              <rect x="2"   y="-50" width="2" height="2" /><rect x="-5"  y="-46" width="2" height="2" />
              <rect x="12"  y="-45" width="2" height="2" /><rect x="-8"  y="-34" width="2.5" height="2.5" />
              <rect x="5"   y="-32" width="2.5" height="2.5" /><rect x="0"   y="-38" width="2.5" height="2.5" />
              <rect x="-10" y="-25" width="2.5" height="2.5" /><rect x="3"   y="-26" width="2.5" height="2.5" />
              <rect x="-6"  y="-18" width="2.5" height="2.5" /><rect x="-2"  y="-11" width="2.5" height="2.5" />
            </g>
          </symbol>

          {/* ── Variant C — 5 branches, longer reach, right-heavy ────── */}
          <symbol id="cp-c" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            {/* Branch R1 — low right, long */}
            <rect x="10"  y="-11" width="14" height="2" fill="#2d1e14" />
            <rect x="23"  y="-14" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="23"  y="-11" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="23"  y="-8"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="20"  y="-15" width="2"   height="2"   fill="#c41e3a" />
            <rect x="26"  y="-13" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L1 — low-mid left, long */}
            <rect x="-31" y="-22" width="13" height="2" fill="#2d1e14" />
            <rect x="-34" y="-25" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-34" y="-22" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-34" y="-19" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-37" y="-24" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-37" y="-20" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R2 — mid right, long */}
            <rect x="20"  y="-32" width="13" height="2" fill="#2d1e14" />
            <rect x="32"  y="-35" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="32"  y="-32" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="32"  y="-29" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="29"  y="-36" width="2"   height="2"   fill="#c41e3a" />
            <rect x="35"  y="-31" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L2 — upper left, long */}
            <rect x="-28" y="-40" width="12" height="2" fill="#2d1e14" />
            <rect x="-31" y="-43" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-40" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-37" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-34" y="-42" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-34" y="-38" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R3 — upper right */}
            <rect x="16"  y="-46" width="10" height="2" fill="#2d1e14" />
            <rect x="25"  y="-49" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="25"  y="-46" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="25"  y="-43" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="22"  y="-50" width="2"   height="2"   fill="#c41e3a" />
            <rect x="28"  y="-45" width="2"   height="2"   fill="#c41e3a" />
            {/* Foliage fruits */}
            <g fill="#c41e3a">
              <rect x="-3"  y="-52" width="2" height="2" /><rect x="7"   y="-43" width="2.5" height="2.5" />
              <rect x="-10" y="-44" width="2.5" height="2.5" /><rect x="-15" y="-33" width="2.5" height="2.5" />
              <rect x="13"  y="-35" width="2.5" height="2.5" /><rect x="-4"  y="-30" width="2" height="2" />
              <rect x="-14" y="-20" width="2.5" height="2.5" /><rect x="8"   y="-19" width="2.5" height="2.5" />
              <rect x="-8"  y="-9"  width="2.5" height="2.5" /><rect x="5"   y="-8"  width="2.5" height="2.5" />
              <rect x="-2"  y="-11" width="2.5" height="2.5" />
            </g>
          </symbol>

          {/* ── Variant D — 8 branches, short and dense, symmetric ───── */}
          <symbol id="cp-d" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            {/* Branch R1 — bottom right */}
            <rect x="10"  y="-7"  width="9"  height="2" fill="#2d1e14" />
            <rect x="18"  y="-10" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="18"  y="-7"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="18"  y="-4"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="21"  y="-9"  width="2"   height="2"   fill="#c41e3a" />
            <rect x="21"  y="-5"  width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L1 — bottom left */}
            <rect x="-18" y="-9"  width="9"  height="2" fill="#2d1e14" />
            <rect x="-21" y="-12" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-21" y="-9"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-21" y="-6"  width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-24" y="-11" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R2 — low-mid right */}
            <rect x="17"  y="-18" width="9"  height="2" fill="#2d1e14" />
            <rect x="25"  y="-21" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="25"  y="-18" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="25"  y="-15" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="22"  y="-22" width="2"   height="2"   fill="#c41e3a" />
            <rect x="28"  y="-17" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L2 — low-mid left */}
            <rect x="-25" y="-20" width="9"  height="2" fill="#2d1e14" />
            <rect x="-28" y="-23" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-28" y="-20" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-28" y="-17" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-22" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-31" y="-18" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R3 — mid right */}
            <rect x="20"  y="-29" width="9"  height="2" fill="#2d1e14" />
            <rect x="28"  y="-32" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="28"  y="-29" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="28"  y="-26" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="31"  y="-31" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L3 — mid left */}
            <rect x="-28" y="-31" width="9"  height="2" fill="#2d1e14" />
            <rect x="-31" y="-34" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-31" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-31" y="-28" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-34" y="-33" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-34" y="-29" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch R4 — upper right */}
            <rect x="16"  y="-40" width="9"  height="2" fill="#2d1e14" />
            <rect x="24"  y="-43" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="24"  y="-40" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="24"  y="-37" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="27"  y="-42" width="2"   height="2"   fill="#c41e3a" />
            {/* Branch L4 — upper left */}
            <rect x="-24" y="-43" width="9"  height="2" fill="#2d1e14" />
            <rect x="-27" y="-46" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-27" y="-43" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-27" y="-40" width="2.5" height="2.5" fill="#c41e3a" />
            <rect x="-30" y="-45" width="2"   height="2"   fill="#c41e3a" />
            <rect x="-30" y="-41" width="2"   height="2"   fill="#c41e3a" />
            {/* Foliage fruits */}
            <g fill="#c41e3a">
              <rect x="-3"  y="-52" width="2" height="2" /><rect x="2"   y="-50" width="2" height="2" />
              <rect x="-10" y="-44" width="2.5" height="2.5" /><rect x="7"   y="-43" width="2.5" height="2.5" />
              <rect x="-5"  y="-46" width="2" height="2" /><rect x="0"   y="-38" width="2.5" height="2.5" />
              <rect x="-10" y="-25" width="2.5" height="2.5" /><rect x="3"   y="-26" width="2.5" height="2.5" />
              <rect x="-6"  y="-18" width="2.5" height="2.5" /><rect x="-2"  y="-11" width="2.5" height="2.5" />
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
          <rect x="100"  y="60" width="80"  height="20" />
          <rect x="120"  y="40" width="40"  height="20" />
          <rect x="450"  y="30" width="100" height="25" />
          <rect x="470"  y="15" width="60"  height="15" />
          <rect x="800"  y="50" width="70"  height="20" />
          <rect x="1100" y="40" width="90"  height="20" />
          <rect x="1120" y="25" width="50"  height="15" />
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
          <rect x="0"  y="10" width="12" height="10" fill="#333" />
          <rect x="12" y="6"  width="35" height="16" fill="#F0EDEA" />
          <rect x="47" y="10" width="45" height="10" fill="#F0EDEA" />
          <rect x="12" y="12" width="80" height="4"  fill="#CC2020" />
          <rect x="15" y="8"  width="22" height="6"  fill="#1A1A1A" />
          <rect x="17" y="9"  width="18" height="4"  fill="#5BA3D0" opacity="0.4" />
          <rect x="5"  y="4"  width="55" height="4"  fill="#F0EDEA" />
          <rect x="5"  y="4"  width="8"  height="4"  fill="#CC2020" />
          <rect x="52" y="4"  width="8"  height="4"  fill="#CC2020" />
          <rect x="82" y="4"  width="10" height="6"  fill="#F0EDEA" />
          <rect x="86" y="-2" width="8"  height="6"  fill="#F0EDEA" />
          <rect x="90" y="-8" width="6"  height="6"  fill="#F0EDEA" />
          <rect x="90" y="-8" width="6"  height="2"  fill="#CC2020" />
          <rect x="85" y="12" width="12" height="2"  fill="#F0EDEA" />
          <g transform="translate(-2, 15)">
            <rect x="-1" y="-12" width="2" height="24" fill="#5A5452" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.1s" repeatCount="indefinite" />
            </rect>
            <rect x="-1" y="-2" width="2" height="4" fill="#333" />
          </g>
          <rect x="10" y="22" width="2" height="6"  fill="#9A9288" />
          <rect x="8"  y="28" width="6" height="4"  fill="#252220" />
          <rect x="40" y="22" width="2" height="8"  fill="#9A9288" />
          <rect x="38" y="30" width="6" height="4"  fill="#252220" />
          <animateTransform attributeName="transform" type="translate"
            from="1560 60" to="-250 60" dur="45s" repeatCount="indefinite" />
        </g>

        <use href="#pixel-mountain" x="280" y="286" transform="scale(3.36)" opacity="0.85" />

        <rect x="0" y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0" y="286" width="1440" height="4"  fill="#0E2208" opacity="0.4" />

        {/*
          ── Coffee Plantation ─────────────────────────────────────────
          Layout: 3 continuous rows of trees, horizontal paths between rows.
          Each row is a dense unbroken line — no gaps within a row.
          Path strips (dirt color) drawn between rows to show walking lanes.
          Variants a/b/c/d rotated so no two adjacent trees match.

          Row 1 (back):  y=0,  scale 0.36–0.44, spacing 18px
          — path —
          Row 2 (mid):   y=18, scale 0.48–0.56, spacing 28px
          — path —
          Row 3 (front): y=32, scale 0.62–0.70, spacing 40px
        */}

        {/* Dirt path strips between rows */}
        <rect x="72" y="288" width="580" height="5"  fill="#3A2010" opacity="0.55" />
        <rect x="72" y="298" width="580" height="5"  fill="#3A2010" opacity="0.55" />

        <g transform="translate(80, 286)">

          {/* ── ROW 1 — back, y=0, 32 trees, spacing 18px ─────────── */}
          <use href="#cp-a" x="0"   y="0" transform="scale(0.42)" />
          <use href="#cp-b" x="18"  y="0" transform="scale(0.38)" />
          <use href="#cp-c" x="36"  y="0" transform="scale(0.44)" />
          <use href="#cp-d" x="54"  y="0" transform="scale(0.39)" />
          <use href="#cp-a" x="72"  y="0" transform="scale(0.42)" />
          <use href="#cp-c" x="90"  y="0" transform="scale(0.38)" />
          <use href="#cp-d" x="108" y="0" transform="scale(0.44)" />
          <use href="#cp-b" x="126" y="0" transform="scale(0.40)" />
          <use href="#cp-a" x="144" y="0" transform="scale(0.43)" />
          <use href="#cp-c" x="162" y="0" transform="scale(0.36)" />
          <use href="#cp-b" x="180" y="0" transform="scale(0.44)" />
          <use href="#cp-d" x="198" y="0" transform="scale(0.39)" />
          <use href="#cp-a" x="216" y="0" transform="scale(0.42)" />
          <use href="#cp-c" x="234" y="0" transform="scale(0.45)" />
          <use href="#cp-b" x="252" y="0" transform="scale(0.38)" />
          <use href="#cp-d" x="270" y="0" transform="scale(0.41)" />
          <use href="#cp-a" x="288" y="0" transform="scale(0.44)" />
          <use href="#cp-b" x="306" y="0" transform="scale(0.36)" />
          <use href="#cp-c" x="324" y="0" transform="scale(0.42)" />
          <use href="#cp-d" x="342" y="0" transform="scale(0.39)" />
          <use href="#cp-c" x="360" y="0" transform="scale(0.45)" />
          <use href="#cp-b" x="378" y="0" transform="scale(0.40)" />
          <use href="#cp-d" x="396" y="0" transform="scale(0.43)" />
          <use href="#cp-a" x="414" y="0" transform="scale(0.38)" />
          <use href="#cp-c" x="432" y="0" transform="scale(0.42)" />
          <use href="#cp-a" x="450" y="0" transform="scale(0.39)" />
          <use href="#cp-d" x="468" y="0" transform="scale(0.44)" />
          <use href="#cp-c" x="486" y="0" transform="scale(0.41)" />
          <use href="#cp-b" x="504" y="0" transform="scale(0.45)" />
          <use href="#cp-a" x="522" y="0" transform="scale(0.36)" />
          <use href="#cp-d" x="540" y="0" transform="scale(0.43)" />
          <use href="#cp-b" x="558" y="0" transform="scale(0.40)" />

          {/* ── ROW 2 — mid, y=18, 22 trees, spacing 28px ─────────── */}
          <use href="#cp-b" x="4"   y="18" transform="scale(0.52)" />
          <use href="#cp-c" x="32"  y="18" transform="scale(0.48)" />
          <use href="#cp-d" x="60"  y="18" transform="scale(0.55)" />
          <use href="#cp-a" x="88"  y="18" transform="scale(0.50)" />
          <use href="#cp-b" x="116" y="18" transform="scale(0.54)" />
          <use href="#cp-d" x="144" y="18" transform="scale(0.48)" />
          <use href="#cp-a" x="172" y="18" transform="scale(0.56)" />
          <use href="#cp-c" x="200" y="18" transform="scale(0.51)" />
          <use href="#cp-b" x="228" y="18" transform="scale(0.53)" />
          <use href="#cp-d" x="256" y="18" transform="scale(0.48)" />
          <use href="#cp-a" x="284" y="18" transform="scale(0.55)" />
          <use href="#cp-c" x="312" y="18" transform="scale(0.50)" />
          <use href="#cp-b" x="340" y="18" transform="scale(0.52)" />
          <use href="#cp-d" x="368" y="18" transform="scale(0.56)" />
          <use href="#cp-a" x="396" y="18" transform="scale(0.49)" />
          <use href="#cp-c" x="424" y="18" transform="scale(0.54)" />
          <use href="#cp-b" x="452" y="18" transform="scale(0.48)" />
          <use href="#cp-a" x="480" y="18" transform="scale(0.51)" />
          <use href="#cp-d" x="508" y="18" transform="scale(0.55)" />
          <use href="#cp-c" x="536" y="18" transform="scale(0.48)" />
          <use href="#cp-a" x="564" y="18" transform="scale(0.53)" />
          <use href="#cp-d" x="592" y="18" transform="scale(0.50)" />

          {/* ── ROW 3 — front, y=32, 16 trees, spacing 40px ───────── */}
          <use href="#cp-d" x="-4"  y="32" transform="scale(0.67)" />
          <use href="#cp-a" x="36"  y="32" transform="scale(0.62)" />
          <use href="#cp-b" x="76"  y="32" transform="scale(0.69)" />
          <use href="#cp-c" x="116" y="32" transform="scale(0.63)" />
          <use href="#cp-d" x="156" y="32" transform="scale(0.70)" />
          <use href="#cp-b" x="196" y="32" transform="scale(0.64)" />
          <use href="#cp-a" x="236" y="32" transform="scale(0.67)" />
          <use href="#cp-d" x="276" y="32" transform="scale(0.62)" />
          <use href="#cp-c" x="316" y="32" transform="scale(0.68)" />
          <use href="#cp-b" x="356" y="32" transform="scale(0.65)" />
          <use href="#cp-a" x="396" y="32" transform="scale(0.70)" />
          <use href="#cp-d" x="436" y="32" transform="scale(0.63)" />
          <use href="#cp-b" x="476" y="32" transform="scale(0.67)" />
          <use href="#cp-c" x="516" y="32" transform="scale(0.64)" />
          <use href="#cp-a" x="556" y="32" transform="scale(0.69)" />
          <use href="#cp-d" x="596" y="32" transform="scale(0.62)" />

        </g>
      </svg>
    </div>
  )
}
