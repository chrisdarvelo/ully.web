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
            
            {/* Foliage Blocks (20% smaller overall) */}
            <rect x="-19" y="-16" width="38" height="10" fill="#0d2607" />
            <rect x="-16" y="-29" width="32" height="10" fill="#113309" />
            <rect x="-11" y="-42" width="22" height="10" fill="#16400c" />
            <rect x="-5"  y="-51" width="10" height="10" fill="#1b4d0f" />

            {/* Masses of Fruits */}
            <g>
              <g fill="#c41e3a">
                <rect x="-3" y="-50" width="2.5" height="2.5" /><rect x="1.5" y="-52" width="2.5" height="2.5" />
                <rect x="-4" y="-44" width="3" height="3" /><rect x="2.5" y="-42" width="3" height="3" />
                <rect x="-6" y="-46" width=\"2.5\" height=\"2.5\" /><rect x=\"5\" y=\"-47\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"0\" y=\"-40\" width=\"3\" height=\"3\" /><rect x=\"-8\" y=\"-36\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"6\" y=\"-34\" width=\"2.5\" height=\"2.5\" /><rect x=\"-1.5\" y=\"-30\" width=\"3\" height=\"3\" />
                <rect x=\"-16\" y=\"-14\" width=\"3\" height=\"3\" /><rect x=\"-11\" y=\"-13\" width=\"3\" height=\"3\" />
                <rect x=\"8\"  y=\"-15\" width=\"3\" height=\"3\" /><rect x=\"13\"  y=\"-12\" width=\"3\" height=\"3\" />
                <rect x=\"-1.5\" y=\"-10\" width=\"3\" height=\"3\" /><rect x=\"3\"   y=\"-11\" width=\"3\" height=\"3\" />
                <rect x=\"-12\" y=\"-26\" width=\"3\" height=\"3\" /><rect x=\"-8\" y=\"-28\" width=\"3\" height=\"3\" />
                <rect x=\"6\"   y=\"-24\" width=\"3\" height=\"3\" /><rect x=\"10\"  y=\"-27\" width=\"3\" height=\"3\" />
                <rect x=\"-3\"  y=\"-32\" width=\"3\" height=\"3\" /><rect x=\"1.5\"   y=\"-30\" width=\"3\" height=\"3\" />
              </g>
              <g fill=\"#e8a840\">
                <rect x=\"-1.5\" y=\"-53\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"3\"  y=\"-49\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"-5\" y=\"-42\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"1.5\"  y=\"-37\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"-2.5\" y=\"-47\" width=\"2.5\" height=\"2.5\" />
              </g>
              <g fill=\"#7fb041\">
                <rect x=\"-14\" y=\"-18\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"11\"  y=\"-22\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"0\"   y=\"-36\" width=\"2.5\" height=\"2.5\" />
                <rect x=\"-8\" y=\"-46\" width=\"2.5\" height=\"2.5\" />
              </g>
            </g>
          </symbol>

          <symbol id=\"pixel-mountain\" overflow=\"visible\">
            <rect x=\"-60\" y=\"-20\" width=\"120\" height=\"20\" fill=\"#7DB060\" />
            <rect x=\"-45\" y=\"-40\" width=\"90\"  height=\"20\" fill=\"#7DB060\" />
            <rect x=\"-25\" y=\"-60\" width=\"50\"  height=\"20\" fill=\"#7DB060\" />
            <rect x=\"-45\" y=\"-40\" width=\"10\"  height=\"20\" fill=\"#9cd67a\" opacity=\"0.3\" />
            <rect x=\"-25\" y=\"-60\" width=\"10\"  height=\"20\" fill=\"#9cd67a\" opacity=\"0.3\" />
            <rect x=\"-8\" y=\"-35\" width=\"4\" height=\"12\" fill=\"#000000\" />
            <rect x=\"4\"  y=\"-35\" width=\"4\" height=\"12\" fill=\"#000000\" />
          </symbol>

          <symbol id=\"seagull\" overflow=\"visible\">
            <g fill=\"white\">
              <rect x=\"-6\" y=\"-2\" width=\"4\" height=\"2\" />
              <rect x=\"-2\" y=\"0\"  width=\"4\" height=\"2\" />
              <rect x=\"2\"  y=\"-2\" width=\"4\" height=\"2\" />
              <animateTransform attributeName=\"transform\" type=\"translate\"
                values=\"0 0; 0 -2; 0 0\" dur=\"0.8s\" repeatCount=\"indefinite\" />
            </g>
          </symbol>
        </defs>

        <rect width=\"1440\" height=\"320\" fill=\"url(#skyGrad)\" />
        <rect x=\"870\" y=\"40\" width=\"60\" height=\"60\" fill=\"#F5D140\" />
        <rect x=\"880\" y=\"50\" width=\"15\" height=\"15\" fill=\"#ffffff\" opacity=\"0.4\" />

        <g fill=\"white\" opacity=\"0.85\">
          <rect x=\"100\" y=\"60\" width=\"80\" height=\"20\" />
          <rect x=\"120\" y=\"40\" width=\"40\" height=\"20\" />
          <rect x=\"450\" y=\"30\" width=\"100\" height=\"25\" />
          <rect x=\"470\" y=\"15\" width=\"60\" height=\"15\" />
          <rect x=\"800\" y=\"50\" width=\"70\" height=\"20\" />
          <rect x=\"1100\" y=\"40\" width=\"90\" height=\"20\" />
          <rect x=\"1120\" y=\"25\" width=\"50\" height=\"15\" />
        </g>

        {/* ── Background Mountains (Massive) ────────────────────────── */}
        <use href=\"#pixel-mountain\" x=\"250\"  y=\"286\" transform=\"scale(2.5)\" fill=\"#5ba3d0\" opacity=\"0.3\" />
        <use href=\"#pixel-mountain\" x=\"1150\" y=\"286\" transform=\"scale(2.2)\" fill=\"#5ba3d0\" opacity=\"0.2\" />
        <use href=\"#pixel-mountain\" x=\"600\"  y=\"286\" transform=\"scale(3.2)\" fill=\"#5ba3d0\" opacity=\"0.15\" />
        <use href=\"#pixel-mountain\" x=\"1350\" y=\"286\" transform=\"scale(1.8)\" fill=\"#5ba3d0\" opacity=\"0.25\" />
        
        {/* Two NEW background mountains behind the trees */}
        <use href=\"#pixel-mountain\" x=\"50\"   y=\"286\" transform=\"scale(2.0)\" fill=\"#5ba3d0\" opacity=\"0.2\" />
        <use href=\"#pixel-mountain\" x=\"400\"  y=\"286\" transform=\"scale(2.8)\" fill=\"#5ba3d0\" opacity=\"0.1\" />
        
        <g transform=\"translate(0, 286)\">
          <use href=\"#pixel-mountain\" x=\"150\"  y=\"0\" transform=\"scale(1.8)\" />
          <use href=\"#pixel-mountain\" x=\"480\"  y=\"0\" transform=\"scale(1.5)\" />
          <use href=\"#pixel-mountain\" x=\"800\"  y=\"0\" transform=\"scale(2.2)\" />
          <use href=\"#pixel-mountain\" x=\"1080\" y=\"0\" transform=\"scale(1.6)\" />
          <use href=\"#pixel-mountain\" x=\"1380\" y=\"0\" transform=\"scale(1.9)\" />
        </g>

        <use href=\"#seagull\" x=\"300\" y=\"100\" />
        <use href=\"#seagull\" x=\"340\" y=\"120\" />
        <use href=\"#seagull\" x=\"1200\" y=\"80\" />

        <g opacity=\"0.98\">
          <rect x=\"0\" y=\"10\" width=\"12\" height=\"10\" fill=\"#333\" />
          <rect x=\"12\" y=\"6\" width=\"35\" height=\"16\" fill=\"#F0EDEA\" />
          <rect x=\"47\" y=\"10\" width=\"45\" height=\"10\" fill=\"#F0EDEA\" />
          <rect x=\"12\" y=\"12\" width=\"80\" height=\"4\" fill=\"#CC2020\" /> 
          <rect x=\"15\" y=\"8\" width=\"22\" height=\"6\" fill=\"#1A1A1A\" />
          <rect x=\"17\" y=\"9\" width=\"18\" height=\"4\" fill=\"#5BA3D0\" opacity=\"0.4\" />
          <rect x=\"5\" y=\"4\" width=\"55\" height=\"4\" fill=\"#F0EDEA\" />
          <rect x=\"5\" y=\"4\" width=\"8\"  height=\"4\" fill=\"#CC2020\" />
          <rect x=\"52\" y=\"4\" width=\"8\"  height=\"4\" fill=\"#CC2020\" />
          <rect x=\"82\" y=\"4\" width=\"10\" height=\"6\" fill=\"#F0EDEA\" />
          <rect x=\"86\" y=\"-2\" width=\"8\" height=\"6\" fill=\"#F0EDEA\" />
          <rect x=\"90\" y=\"-8\" width=\"6\" height=\"6\" fill=\"#F0EDEA\" />
          <rect x=\"90\" y=\"-8\" width=\"6\" height=\"2\" fill=\"#CC2020\" />
          <rect x=\"85\" y=\"12\" width=\"12\" height=\"2\" fill=\"#F0EDEA\" />
          <g transform=\"translate(-2, 15)\">
            <rect x=\"-1\" y=\"-12\" width=\"2\" height=\"24\" fill=\"#5A5452\" opacity=\"0.3\">
              <animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0\" to=\"360\" dur=\"0.1s\" repeatCount=\"indefinite\" />
            </rect>
            <rect x=\"-1\" y=\"-2\" width=\"2\" height=\"4\" fill=\"#333\" />
          </g>
          <rect x=\"10\" y=\"22\" width=\"2\" height=\"6\" fill=\"#9A9288\" />
          <rect x=\"8\"  y=\"28\" width=\"6\" height=\"4\" fill=\"#252220\" />
          <rect x=\"40\" y=\"22\" width=\"2\" height=\"8\" fill=\"#9A9288\" />
          <rect x=\"38\" y=\"30\" width=\"6\" height=\"4\" fill=\"#252220\" />
          <animateTransform
            attributeName=\"transform\"
            type=\"translate\"
            from=\"1560 60\"
            to=\"-250 60\"
            dur=\"45s\"
            repeatCount=\"indefinite\"
          />
        </g>

        {/* ── Ground ───────────────────────────────────────────────── */}
        <rect x=\"0\" y=\"286\" width=\"1440\" height=\"34\" fill=\"#1A3A0E\" /> {/* Entire green ground */}
        <rect x=\"0\" y=\"286\" width=\"650\"  height=\"34\" fill=\"#3d2b1f\" /> {/* Brown ground under trees */}
        <rect x=\"0\" y=\"286\" width=\"1440\" height=\"4\"  fill=\"#0E2208\" opacity=\"0.4\" />

        {/* ── Dense Coffee Plantation (Reduced Size & Separation) ───── */}
        <g transform=\"translate(20, 286)\">
          {/* Back Row - X step 25 (from 40) */}
          <use href=\"#coffee-plant\" x=\"0\"   y=\"0\" transform=\"scale(0.58)\" />
          <use href=\"#coffee-plant\" x=\"25\"  y=\"0\" transform=\"scale(0.52)\" />
          <use href=\"#coffee-plant\" x=\"50\"  y=\"0\" transform=\"scale(0.62)\" />
          <use href=\"#coffee-plant\" x=\"75\"  y=\"0\" transform=\"scale(0.54)\" />
          <use href=\"#coffee-plant\" x=\"100\" y=\"0\" transform=\"scale(0.60)\" />
          <use href=\"#coffee-plant\" x=\"125\" y=\"0\" transform=\"scale(0.50)\" />
          <use href=\"#coffee-plant\" x=\"150\" y=\"0\" transform=\"scale(0.64)\" />
          <use href=\"#coffee-plant\" x=\"175\" y=\"0\" transform=\"scale(0.56)\" />
          <use href=\"#coffee-plant\" x=\"200\" y=\"0\" transform=\"scale(0.59)\" />
          <use href=\"#coffee-plant\" x=\"225\" y=\"0\" transform=\"scale(0.53)\" />
          <use href=\"#coffee-plant\" x=\"250\" y=\"0\" transform=\"scale(0.63)\" />
          <use href=\"#coffee-plant\" x=\"275\" y=\"0\" transform=\"scale(0.55)\" />
          <use href=\"#coffee-plant\" x=\"300\" y=\"0\" transform=\"scale(0.57)\" />
          <use href=\"#coffee-plant\" x=\"325\" y=\"0\" transform=\"scale(0.51)\" />
          <use href=\"#coffee-plant\" x=\"350\" y=\"0\" transform=\"scale(0.61)\" />
          <use href=\"#coffee-plant\" x=\"375\" y=\"0\" transform=\"scale(0.58)\" />
          <use href=\"#coffee-plant\" x=\"400\" y=\"0\" transform=\"scale(0.52)\" />
          <use href=\"#coffee-plant\" x=\"425\" y=\"0\" transform=\"scale(0.62)\" />
          <use href=\"#coffee-plant\" x=\"450\" y=\"0\" transform=\"scale(0.54)\" />
          <use href=\"#coffee-plant\" x=\"475\" y=\"0\" transform=\"scale(0.60)\" />
          <use href=\"#coffee-plant\" x=\"500\" y=\"0\" transform=\"scale(0.50)\" />
          <use href=\"#coffee-plant\" x=\"525\" y=\"0\" transform=\"scale(0.64)\" />
          <use href=\"#coffee-plant\" x=\"550\" y=\"0\" transform=\"scale(0.56)\" />
          <use href=\"#coffee-plant\" x=\"575\" y=\"0\" transform=\"scale(0.59)\" />
          <use href=\"#coffee-plant\" x=\"600\" y=\"0\" transform=\"scale(0.53)\" />

          {/* Middle Row - X step 45 (from 50) */}
          <use href=\"#coffee-plant\" x=\"15\"  y=\"10\" transform=\"scale(0.74)\" />
          <use href=\"#coffee-plant\" x=\"60\"  y=\"10\" transform=\"scale(0.68)\" />
          <use href=\"#coffee-plant\" x=\"105\" y=\"10\" transform=\"scale(0.78)\" />
          <use href=\"#coffee-plant\" x=\"150\" y=\"10\" transform=\"scale(0.70)\" />
          <use href=\"#coffee-plant\" x=\"195\" y=\"10\" transform=\"scale(0.76)\" />
          <use href=\"#coffee-plant\" x=\"240\" y=\"10\" transform=\"scale(0.66)\" />
          <use href=\"#coffee-plant\" x=\"285\" y=\"10\" transform=\"scale(0.80)\" />
          <use href=\"#coffee-plant\" x=\"330\" y=\"10\" transform=\"scale(0.72)\" />
          <use href=\"#coffee-plant\" x=\"375\" y=\"10\" transform=\"scale(0.75)\" />
          <use href=\"#coffee-plant\" x=\"420\" y=\"10\" transform=\"scale(0.69)\" />
          <use href=\"#coffee-plant\" x=\"465\" y=\"10\" transform=\"scale(0.73)\" />
          <use href=\"#coffee-plant\" x=\"510\" y=\"10\" transform=\"scale(0.71)\" />
          <use href=\"#coffee-plant\" x=\"555\" y=\"10\" transform=\"scale(0.72)\" />
          <use href=\"#coffee-plant\" x=\"600\" y=\"10\" transform=\"scale(0.68)\" />

          {/* Front Row - X step 60 (from 70) */}
          <use href=\"#coffee-plant\" x=\"-10\" y=\"25\" transform=\"scale(0.92)\" />
          <use href=\"#coffee-plant\" x=\"50\"  y=\"25\" transform=\"scale(0.84)\" />
          <use href=\"#coffee-plant\" x=\"110\" y=\"25\" transform=\"scale(0.98)\" />
          <use href=\"#coffee-plant\" x=\"170\" y=\"25\" transform=\"scale(0.88)\" />
          <use href=\"#coffee-plant\" x=\"230\" y=\"25\" transform=\"scale(1.00)\" />
          <use href=\"#coffee-plant\" x=\"290\" y=\"25\" transform=\"scale(0.86)\" />
          <use href=\"#coffee-plant\" x=\"350\" y=\"25\" transform=\"scale(0.94)\" />
          <use href=\"#coffee-plant\" x=\"410\" y=\"25\" transform=\"scale(0.90)\" />
          <use href=\"#coffee-plant\" x=\"470\" y=\"25\" transform=\"scale(0.96)\" />
          <use href=\"#coffee-plant\" x=\"530\" y=\"25\" transform=\"scale(0.88)\" />
          <use href=\"#coffee-plant\" x=\"590\" y=\"25\" transform=\"scale(0.92)\" />
        </g>
      </svg>
    </div>
  )
}
