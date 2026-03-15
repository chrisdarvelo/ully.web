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

          {/* ── Varied Low-Poly Mountains ─────────────────────────── */}
          <symbol id="mtn-1" overflow="visible">
            <polygon points="-100,0 -20,-120 20,-120 100,0" fill="#228B22" />
            <polygon points="-100,0 -20,-120 0,-120 0,0" fill="#004400" opacity="0.25" />
            <rect x="-15" y="-100" width="4" height="4" fill="#90EE90" opacity="0.1" />
            <rect x="20" y="-40" width="6" height="6" fill="#004400" opacity="0.1" />
          </symbol>

          <symbol id="mtn-2" overflow="visible">
            <polygon points="-80,0 0,-140 80,0" fill="#228B22" />
            <polygon points="-80,0 0,-140 0,0" fill="#004400" opacity="0.3" />
            <rect x="-10" y="-110" width="5" height="5" fill="#90EE90" opacity="0.15" />
            <rect x="30" y="-30" width="8" height="4" fill="#004400" opacity="0.1" />
          </symbol>

          <symbol id="mtn-3" overflow="visible">
            <polygon points="-120,0 -60,-80 -20,-50 40,-110 120,0" fill="#228B22" />
            <polygon points="-120,0 -60,-80 -20,-50 0,-70 0,0" fill="#004400" opacity="0.25" />
            <rect x="-40" y="-60" width="6" height="6" fill="#90EE90" opacity="0.1" />
            <rect x="50" y="-40" width="10" height="5" fill="#004400" opacity="0.15" />
          </symbol>

          {/* ── Variant A — Coffee Tree ────────────── */}
          <symbol id="cp-a" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            <g fill="#c41e3a">
              <rect x="19" y="-12" width="2.5" height="2.5" /><rect x="19" y="-9" width="2.5" height="2.5" />
              <rect x="-30" y="-22" width="2.5" height="2.5" /><rect x="-30" y="-19" width="2.5" height="2.5" />
              <rect x="-3"  y="-52" width="2" height="2" /><rect x="2"   y="-50" width="2" height="2" />
              <rect x="-10" y="-44" width="2.5" height="2.5" /><rect x="7"   y="-43" width="2.5" height="2.5" />
              <rect x="-15" y="-33" width="2.5" height="2.5" /><rect x="13"  y="-35" width="2.5" height="2.5" />
              <rect x="-18" y="-27" width="2.5" height="2.5" /><rect x="14"  y="-28" width="2.5" height="2.5" />
              <rect x="-14" y="-20" width="2.5" height="2.5" /><rect x="8"   y="-19" width="2.5" height="2.5" />
              <rect x="-8"  y="-9"  width="2.5" height="2.5" /><rect x="5"   y="-8"  width="2.5" height="2.5" />
              {/* Extra fruits */}
              <rect x="-5" y="-53" width="2" height="2" /><rect x="5" y="-51" width="2" height="2" /><rect x="-12" y="-45" width="2.5" height="2.5" />
              <rect x="10" y="-46" width="2.5" height="2.5" /><rect x="-16" y="-40" width="2" height="2" /><rect x="14" y="-42" width="2.5" height="2.5" />
              <rect x="-4" y="-38" width="2.5" height="2.5" /><rect x="2" y="-35" width="2.5" height="2.5" /><rect x="-19" y="-32" width="2.5" height="2.5" />
              <rect x="17" y="-33" width="2.5" height="2.5" /><rect x="-12" y="-28" width="2.5" height="2.5" /><rect x="9" y="-29" width="2" height="2" />
              <rect x="-6" y="-25" width="2.5" height="2.5" /><rect x="4" y="-26" width="2.5" height="2.5" /><rect x="-15" y="-22" width="2.5" height="2.5" />
              <rect x="13" y="-23" width="2.5" height="2.5" /><rect x="-9" y="-18" width="2.5" height="2.5" /><rect x="6" y="-19" width="2.5" height="2.5" />
              <rect x="-3" y="-15" width="2.5" height="2.5" /><rect x="2" y="-14" width="2.5" height="2.5" /><rect x="-8" y="-11" width="2.5" height="2.5" />
              <rect x="7" y="-10" width="2.5" height="2.5" /><rect x="-14" y="-37" width="2.5" height="2.5" /><rect x="11" y="-38" width="2.5" height="2.5" />
              <rect x="-2" y="-42" width="2.5" height="2.5" /><rect x="5" y="-44" width="2.5" height="2.5" /><rect x="-18" y="-14" width="2.5" height="2.5" />
              <rect x="15" y="-15" width="2.5" height="2.5" /><rect x="-11" y="-31" width="2.5" height="2.5" /><rect x="8" y="-32" width="2.5" height="2.5" />
              <rect x="-5" y="-48" width="2" height="2" /><rect x="3" y="-49" width="2" height="2" /><rect x="-13" y="-26" width="2.5" height="2.5" />
              <rect x="12" y="-27" width="2.5" height="2.5" /><rect x="-7" y="-21" width="2.5" height="2.5" /><rect x="5" y="-22" width="2.5" height="2.5" />
              <rect x="-10" y="-16" width="2.5" height="2.5" /><rect x="9" y="-17" width="2.5" height="2.5" /><rect x="-1" y="-10" width="2.5" height="2.5" />
              <rect x="4" y="-9" width="2.5" height="2.5" /><rect x="-6" y="-41" width="2.5" height="2.5" /><rect x="7" y="-42" width="2.5" height="2.5" />
              <rect x="-15" y="-12" width="2.5" height="2.5" /><rect x="14" y="-13" width="2.5" height="2.5" /><rect x="-12" y="-50" width="2" height="2" />
              <rect x="10" y="-51" width="2" height="2" /><rect x="-19" y="-22" width="2.5" height="2.5" /><rect x="17" y="-23" width="2.5" height="2.5" /><rect x="-8" y="-35" width="2.5" height="2.5" /><rect x="6" y="-36" width="2.5" height="2.5" />
            </g>
          </symbol>

          {/* ── Variant B — Coffee Tree ────────────── */}
          <symbol id="cp-b" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            <g fill="#c41e3a">
              <rect x="27" y="-19" width="2.5" height="2.5" /><rect x="-31" y="-26" width="2.5" height="2.5" />
              <rect x="2"   y="-50" width="2" height="2" /><rect x="-5"  y="-46" width="2" height="2" />
              <rect x="12"  y="-45" width="2" height="2" /><rect x="-8"  y="-34" width="2.5" height="2.5" />
              <rect x="5"   y="-32" width="2.5" height="2.5" /><rect x="0"   y="-38" width="2.5" height="2.5" />
              <rect x="-10" y="-25" width="2.5" height="2.5" /><rect x="3"   y="-26" width="2.5" height="2.5" />
              <rect x="-6"  y="-18" width="2.5" height="2.5" /><rect x="-2"  y="-11" width="2.5" height="2.5" />
              {/* Extra fruits */}
              <rect x="-4" y="-53" width="2" height="2" /><rect x="6" y="-52" width="2" height="2" /><rect x="-11" y="-48" width="2.5" height="2.5" />
              <rect x="9" y="-49" width="2" height="2" /><rect x="-15" y="-42" width="2.5" height="2.5" /><rect x="13" y="-43" width="2.5" height="2.5" />
              <rect x="-5" y="-39" width="2.5" height="2.5" /><rect x="3" y="-40" width="2.5" height="2.5" /><rect x="-20" y="-34" width="2.5" height="2.5" />
              <rect x="18" y="-35" width="2.5" height="2.5" /><rect x="-12" y="-30" width="2.5" height="2.5" /><rect x="10" y="-31" width="2.5" height="2.5" />
              <rect x="-7" y="-27" width="2.5" height="2.5" /><rect x="5" y="-28" width="2.5" height="2.5" /><rect x="-16" y="-22" width="2.5" height="2.5" />
              <rect x="14" y="-23" width="2.5" height="2.5" /><rect x="-9" y="-19" width="2.5" height="2.5" /><rect x="7" y="-20" width="2.5" height="2.5" />
              <rect x="-4" y="-15" width="2.5" height="2.5" /><rect x="3" y="-14" width="2.5" height="2.5" /><rect x="-8" y="-11" width="2.5" height="2.5" />
              <rect x="6" y="-10" width="2.5" height="2.5" /><rect x="-14" y="-38" width="2.5" height="2.5" /><rect x="11" y="-39" width="2.5" height="2.5" />
              <rect x="-3" y="-43" width="2.5" height="2.5" /><rect x="5" y="-45" width="2.5" height="2.5" /><rect x="-18" y="-15" width="2.5" height="2.5" />
              <rect x="15" y="-16" width="2.5" height="2.5" /><rect x="-11" y="-32" width="2.5" height="2.5" /><rect x="9" y="-33" width="2.5" height="2.5" />
              <rect x="-6" y="-47" width="2" height="2" /><rect x="4" y="-48" width="2" height="2" /><rect x="-13" y="-27" width="2.5" height="2.5" />
              <rect x="12" y="-28" width="2.5" height="2.5" /><rect x="-7" y="-22" width="2.5" height="2.5" /><rect x="5" y="-23" width="2.5" height="2.5" />
              <rect x="-10" y="-17" width="2.5" height="2.5" /><rect x="9" y="-18" width="2.5" height="2.5" /><rect x="-2" y="-11" width="2.5" height="2.5" />
              <rect x="5" y="-10" width="2.5" height="2.5" /><rect x="-7" y="-40" width="2.5" height="2.5" /><rect x="8" y="-41" width="2.5" height="2.5" />
              <rect x="-15" y="-13" width="2.5" height="2.5" /><rect x="14" y="-14" width="2.5" height="2.5" /><rect x="-12" y="-49" width="2" height="2" />
              <rect x="10" y="-50" width="2" height="2" /><rect x="-19" y="-23" width="2.5" height="2.5" /><rect x="17" y="-24" width="2.5" height="2.5" /><rect x="-8" y="-36" width="2.5" height="2.5" /><rect x="6" y="-37" width="2.5" height="2.5" />
            </g>
          </symbol>

          {/* ── Variant C — Coffee Tree ────────────── */}
          <symbol id="cp-c" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            <g fill="#c41e3a">
              <rect x="23" y="-14" width="2.5" height="2.5" /><rect x="-34" y="-25" width="2.5" height="2.5" />
              <rect x="-3"  y="-52" width="2" height="2" /><rect x="7"   y="-43" width="2.5" height="2.5" />
              <rect x="-10" y="-44" width="2.5" height="2.5" /><rect x="-15" y="-33" width="2.5" height="2.5" />
              <rect x="13"  y="-35" width="2.5" height="2.5" /><rect x="-4"  y="-30" width="2" height="2" />
              <rect x="-14" y="-20" width="2.5" height="2.5" /><rect x="8"   y="-19" width="2.5" height="2.5" />
              <rect x="-8"  y="-9"  width="2.5" height="2.5" /><rect x="5"   y="-8"  width="2.5" height="2.5" />
              <rect x="-2"  y="-11" width="2.5" height="2.5" />
              {/* Extra fruits */}
              <rect x="-5" y="-54" width="2" height="2" /><rect x="5" y="-53" width="2" height="2" /><rect x="-12" y="-49" width="2.5" height="2.5" />
              <rect x="9" y="-50" width="2" height="2" /><rect x="-15" y="-43" width="2.5" height="2.5" /><rect x="13" y="-44" width="2.5" height="2.5" />
              <rect x="-6" y="-40" width="2.5" height="2.5" /><rect x="4" y="-41" width="2.5" height="2.5" /><rect x="-20" y="-35" width="2.5" height="2.5" />
              <rect x="18" y="-36" width="2.5" height="2.5" /><rect x="-12" y="-31" width="2.5" height="2.5" /><rect x="10" y="-32" width="2.5" height="2.5" />
              <rect x="-7" y="-28" width="2.5" height="2.5" /><rect x="5" y="-29" width="2.5" height="2.5" /><rect x="-16" y="-23" width="2.5" height="2.5" />
              <rect x="14" y="-24" width="2.5" height="2.5" /><rect x="-9" y="-20" width="2.5" height="2.5" /><rect x="7" y="-21" width="2.5" height="2.5" />
              <rect x="-4" y="-16" width="2.5" height="2.5" /><rect x="3" y="-15" width="2.5" height="2.5" /><rect x="-8" y="-12" width="2.5" height="2.5" />
              <rect x="6" y="-11" width="2.5" height="2.5" /><rect x="-14" y="-39" width="2.5" height="2.5" /><rect x="11" y="-40" width="2.5" height="2.5" />
              <rect x="-3" y="-44" width="2.5" height="2.5" /><rect x="5" y="-46" width="2.5" height="2.5" /><rect x="-18" y="-16" width="2.5" height="2.5" />
              <rect x="15" y="-17" width="2.5" height="2.5" /><rect x="-11" y="-33" width="2.5" height="2.5" /><rect x="9" y="-34" width="2.5" height="2.5" />
              <rect x="-6" y="-48" width="2" height="2" /><rect x="4" y="-49" width="2" height="2" /><rect x="-13" y="-28" width="2.5" height="2.5" />
              <rect x="12" y="-29" width="2.5" height="2.5" /><rect x="-7" y="-23" width="2.5" height="2.5" /><rect x="5" y="-24" width="2.5" height="2.5" />
              <rect x="-10" y="-18" width="2.5" height="2.5" /><rect x="9" y="-19" width="2.5" height="2.5" /><rect x="-2" y="-12" width="2.5" height="2.5" />
              <rect x="5" y="-11" width="2.5" height="2.5" /><rect x="-7" y="-41" width="2.5" height="2.5" /><rect x="8" y="-42" width="2.5" height="2.5" />
              <rect x="-15" y="-14" width="2.5" height="2.5" /><rect x="14" y="-15" width="2.5" height="2.5" /><rect x="-12" y="-50" width="2" height="2" />
              <rect x="10" y="-51" width="2" height="2" /><rect x="-19" y="-24" width="2.5" height="2.5" /><rect x="17" y="-25" width="2.5" height="2.5" /><rect x="-8" y="-37" width="2.5" height="2.5" /><rect x="6" y="-38" width="2.5" height="2.5" />
            </g>
          </symbol>

          {/* ── Variant D — Coffee Tree ────────────── */}
          <symbol id="cp-d" overflow="visible">
            <rect x="-1.5" y="-44" width="3"  height="44" fill="#2d1e14" />
            <rect x="-11"  y="-12" width="22" height="10" fill="#0d2607" />
            <rect x="-18"  y="-24" width="36" height="12" fill="#0e2b08" />
            <rect x="-21"  y="-36" width="42" height="12" fill="#113309" />
            <rect x="-17"  y="-47" width="34" height="11" fill="#16400c" />
            <rect x="-9"   y="-54" width="18" height="7"  fill="#1b4d0f" />
            <g fill="#c41e3a">
              <rect x="18" y="-10" width="2.5" height="2.5" /><rect x="-21" y="-12" width="2.5" height="2.5" />
              <rect x="-3"  y="-52" width="2" height="2" /><rect x="2"   y="-50" width="2" height="2" />
              <rect x="-10" y="-44" width="2.5" height="2.5" /><rect x="7"   y="-43" width="2.5" height="2.5" />
              <rect x="-5"  y="-46" width="2" height="2" /><rect x="0"   y="-38" width="2.5" height="2.5" />
              <rect x="-10" y="-25" width="2.5" height="2.5" /><rect x="3"   y="-26" width="2.5" height="2.5" />
              <rect x="-6"  y="-18" width="2.5" height="2.5" /><rect x="-2"  y="-11" width="2.5" height="2.5" />
              {/* Extra fruits */}
              <rect x="-3" y="-53" width="2" height="2" /><rect x="4" y="-52" width="2" height="2" /><rect x="-10" y="-47" width="2.5" height="2.5" />
              <rect x="8" y="-48" width="2" height="2" /><rect x="-14" y="-41" width="2.5" height="2.5" /><rect x="12" y="-42" width="2.5" height="2.5" />
              <rect x="-4" y="-38" width="2.5" height="2.5" /><rect x="2" y="-39" width="2.5" height="2.5" /><rect x="-19" y="-33" width="2.5" height="2.5" />
              <rect x="17" y="-34" width="2.5" height="2.5" /><rect x="-11" y="-29" width="2.5" height="2.5" /><rect x="9" y="-30" width="2.5" height="2.5" />
              <rect x="-6" y="-26" width="2.5" height="2.5" /><rect x="4" y="-27" width="2.5" height="2.5" /><rect x="-15" y="-21" width="2.5" height="2.5" />
              <rect x="13" y="-22" width="2.5" height="2.5" /><rect x="-8" y="-18" width="2.5" height="2.5" /><rect x="6" y="-19" width="2.5" height="2.5" />
              <rect x="-3" y="-14" width="2.5" height="2.5" /><rect x="2" y="-13" width="2.5" height="2.5" /><rect x="-7" y="-10" width="2.5" height="2.5" />
              <rect x="5" y="-9" width="2.5" height="2.5" /><rect x="-13" y="-37" width="2.5" height="2.5" /><rect x="10" y="-38" width="2.5" height="2.5" />
              <rect x="-2" y="-42" width="2.5" height="2.5" /><rect x="4" y="-44" width="2.5" height="2.5" /><rect x="-17" y="-14" width="2.5" height="2.5" />
              <rect x="14" y="-15" width="2.5" height="2.5" /><rect x="-10" y="-31" width="2.5" height="2.5" /><rect x="8" y="-32" width="2.5" height="2.5" />
              <rect x="-5" y="-46" width="2" height="2" /><rect x="3" y="-47" width="2" height="2" /><rect x="-12" y="-26" width="2.5" height="2.5" />
              <rect x="11" y="-27" width="2.5" height="2.5" /><rect x="-6" y="-21" width="2.5" height="2.5" /><rect x="4" y="-22" width="2.5" height="2.5" />
              <rect x="-9" y="-16" width="2.5" height="2.5" /><rect x="8" y="-17" width="2.5" height="2.5" /><rect x="-1" y="-10" width="2.5" height="2.5" />
              <rect x="4" y="-8" width="2.5" height="2.5" /><rect x="-6" y="-40" width="2.5" height="2.5" /><rect x="7" y="-41" width="2.5" height="2.5" />
              <rect x="-14" y="-12" width="2.5" height="2.5" /><rect x="13" y="-13" width="2.5" height="2.5" /><rect x="-11" y="-48" width="2" height="2" />
              <rect x="9" y="-49" width="2" height="2" /><rect x="-18" y="-22" width="2.5" height="2.5" /><rect x="16" y="-23" width="2.5" height="2.5" /><rect x="-7" y="-34" width="2.5" height="2.5" /><rect x="5" y="-35" width="2.5" height="2.5" />
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
          <rect x="855"  y="70" width="30"  height="10" opacity="0.9" />
          <rect x="865"  y="65" width="15"  height="5"  opacity="0.9" />
        </g>

        {/* ── Varied Background Mountains ────────────────────────── */}
        <use href="#mtn-1" x="250"  y="286" transform="scale(2.5)" opacity="0.4" />
        <use href="#mtn-2" x="1150" y="286" transform="scale(2.2)" opacity="0.35" />
        <use href="#mtn-3" x="600"  y="286" transform="scale(3.2)" opacity="0.25" />
        <use href="#mtn-1" x="1350" y="286" transform="scale(1.8)" opacity="0.45" />
        <use href="#mtn-2" x="50"   y="286" transform="scale(2.0)" opacity="0.35" />
        <use href="#mtn-3" x="400"  y="286" transform="scale(2.8)" opacity="0.2" />
        <use href="#mtn-1" x="720"  y="286" transform="scale(2.6)" opacity="0.35" />
        <use href="#mtn-2" x="950"  y="286" transform="scale(2.0)" opacity="0.4" />
        <use href="#mtn-3" x="100"  y="286" transform="scale(2.3)" opacity="0.38" />
        <use href="#mtn-1" x="1300" y="286" transform="scale(2.1)" opacity="0.32" />

        <g transform="translate(0, 286)">
          <use href="#mtn-2" x="150"  y="0" transform="scale(1.8)" />
          <use href="#mtn-1" x="480"  y="0" transform="scale(1.5)" />
          <use href="#mtn-3" x="800"  y="0" transform="scale(2.2)" />
          <use href="#mtn-2" x="1080" y="0" transform="scale(1.6)" />
          <use href="#mtn-1" x="1380" y="0" transform="scale(1.9)" />
        </g>

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

        {/* The Largest Mountain - Increased by 10% (3.36 -> 3.7) */}
        <use href="#mtn-2" x="280" y="286" transform="scale(3.7)" opacity="0.95" />

        <rect x="0" y="286" width="1440" height="34" fill="#1A3A0E" />
        <rect x="0" y="286" width="1440" height="4"  fill="#0E2208" opacity="0.4" />

        {/* Horizontal dirt paths between rows */}
        <rect x="0" y="290" width="1440" height="5" fill="#2A1408" opacity="0.40" />
        <rect x="0" y="300" width="1440" height="5" fill="#2A1408" opacity="0.40" />

        <g transform="translate(0, 286)">
          {[120, 320, 520, 720, 920, 1120, 1320].map((center, gi) => (
            <g key={`group-${gi}`}>
              <use href="#cp-a" x={center - 36} y="0" transform="scale(0.42)" />
              <use href="#cp-b" x={center - 18} y="0" transform="scale(0.38)" />
              <use href="#cp-c" x={center}      y="0" transform="scale(0.44)" />
              <use href="#cp-d" x={center + 18} y="0" transform="scale(0.40)" />
              <use href="#cp-a" x={center + 36} y="0" transform="scale(0.43)" />
              <use href="#cp-c" x={center - 52} y="14" transform="scale(0.52)" />
              <use href="#cp-d" x={center - 26} y="14" transform="scale(0.48)" />
              <use href="#cp-a" x={center}      y="14" transform="scale(0.55)" />
              <use href="#cp-b" x={center + 26} y="14" transform="scale(0.50)" />
              <use href="#cp-c" x={center + 52} y="14" transform="scale(0.53)" />
              <use href="#cp-d" x={center - 68} y="26" transform="scale(0.67)" />
              <use href="#cp-b" x={center - 34} y="26" transform="scale(0.62)" />
              <use href="#cp-a" x={center}      y="26" transform="scale(0.69)" />
              <use href="#cp-c" x={center + 34} y="26" transform="scale(0.65)" />
              <use href="#cp-d" x={center + 68} y="26" transform="scale(0.66)" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

