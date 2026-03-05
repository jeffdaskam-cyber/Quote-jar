const PAPER_COLORS = ['#fef9c3','#fde68a','#fed7aa','#fce7f3','#dbeafe','#dcfce7','#ede9fe']

export default function Jar({ onClick, quotes }) {
  const scrollCount = Math.min(quotes.length, 7)

  // Fixed scroll positions so they don't jump around
  const scrollPositions = [
    { x: 78,  y: 198, r: -18, scale: 1.0 },
    { x: 128, y: 192, r:  12, scale: 0.95 },
    { x: 100, y: 210, r:   4, scale: 1.05 },
    { x: 60,  y: 210, r:  22, scale: 0.9 },
    { x: 148, y: 208, r: -10, scale: 0.92 },
    { x: 88,  y: 178, r: -25, scale: 0.85 },
    { x: 136, y: 175, r:  20, scale: 0.88 },
  ]

  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', width: 240, margin: '0 auto' }}
    >
      <svg viewBox="0 0 240 300" width="240" height="300" style={{ display: 'block', overflow: 'visible' }}>
        <defs>

          {/* ── Amber glass gradients ── */}
          <radialGradient id="jarBodyFill" cx="38%" cy="40%" r="65%">
            <stop offset="0%"   stopColor="#fbbf24" stopOpacity="0.82" />
            <stop offset="40%"  stopColor="#d97706" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="0.85" />
          </radialGradient>

          <linearGradient id="jarBodyEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7c2d12" stopOpacity="0.7" />
            <stop offset="12%"  stopColor="#c2550a" stopOpacity="0.5" />
            <stop offset="35%"  stopColor="#fbbf24" stopOpacity="0.1" />
            <stop offset="65%"  stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="88%"  stopColor="#b45309" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.75" />
          </linearGradient>

          {/* Bright inner glow — the warm lit interior */}
          <radialGradient id="innerGlow" cx="42%" cy="35%" r="50%">
            <stop offset="0%"   stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="60%"  stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>

          {/* Left specular highlight */}
          <linearGradient id="leftSpec" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Neck gradient */}
          <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#92400e" stopOpacity="0.8" />
            <stop offset="25%"  stopColor="#d97706" stopOpacity="0.6" />
            <stop offset="55%"  stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="80%"  stopColor="#b45309" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.8" />
          </linearGradient>

          {/* ── Cork gradients ── */}
          <radialGradient id="corkFace" cx="45%" cy="38%" r="60%">
            <stop offset="0%"   stopColor="#e8c97a" />
            <stop offset="50%"  stopColor="#c8a040" />
            <stop offset="100%" stopColor="#8a6820" />
          </radialGradient>
          <linearGradient id="corkSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#d4a830" />
            <stop offset="100%" stopColor="#8a6820" />
          </linearGradient>
          <linearGradient id="corkRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#a07828" />
            <stop offset="100%" stopColor="#6a4e18" />
          </linearGradient>

          {/* ── Rope gradient ── */}
          <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#c8a060" />
            <stop offset="50%"  stopColor="#a07838" />
            <stop offset="100%" stopColor="#c8a060" />
          </linearGradient>

          {/* ── Shadow / drop shadow ── */}
          <filter id="dropShadow" x="-15%" y="-5%" width="130%" height="120%">
            <feDropShadow dx="2" dy="6" stdDeviation="8" floodColor="#7c2d12" floodOpacity="0.35" />
          </filter>

          {/* Clip paths */}
          <clipPath id="bodyClip">
            <path d="M44 100 Q26 112 24 138 L24 258 Q24 278 120 278 Q216 278 216 258 L216 138 Q214 112 196 100 Z" />
          </clipPath>
          <clipPath id="neckClip">
            <path d="M78 62 L68 100 L172 100 L162 62 Z" />
          </clipPath>

          {/* Scroll paper gradient */}
          <linearGradient id="scrollGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="scrollShadow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#d4a860" stopOpacity="0.6" />
            <stop offset="30%"  stopColor="#d4a860" stopOpacity="0" />
            <stop offset="70%"  stopColor="#d4a860" stopOpacity="0" />
            <stop offset="100%" stopColor="#d4a860" stopOpacity="0.5" />
          </linearGradient>

        </defs>

        {/* ═══════════════════════════════ */}
        {/* JAR BODY BASE                  */}
        {/* ═══════════════════════════════ */}

        {/* Main amber body */}
        <path
          d="M44 100 Q26 112 24 138 L24 258 Q24 278 120 278 Q216 278 216 258 L216 138 Q214 112 196 100 Z"
          fill="url(#jarBodyFill)"
          stroke="#92400e" strokeWidth="2.5"
          filter="url(#dropShadow)"
        />
        {/* Edge darkening overlay */}
        <path
          d="M44 100 Q26 112 24 138 L24 258 Q24 278 120 278 Q216 278 216 258 L216 138 Q214 112 196 100 Z"
          fill="url(#jarBodyEdge)"
        />
        {/* Inner warm glow */}
        <path
          d="M44 100 Q26 112 24 138 L24 258 Q24 278 120 278 Q216 278 216 258 L216 138 Q214 112 196 100 Z"
          fill="url(#innerGlow)"
          clipPath="url(#bodyClip)"
        />

        {/* ═══════════════════════════════ */}
        {/* SCROLLS INSIDE JAR             */}
        {/* ═══════════════════════════════ */}
        <g clipPath="url(#bodyClip)">
          {scrollPositions.slice(0, scrollCount).map((pos, i) => (
            <g key={i} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r}) scale(${pos.scale})`}>
              {/* Scroll body */}
              <rect x="-22" y="-10" width="44" height="20" rx="10" fill="url(#scrollGrad)" />
              {/* Left curl shadow */}
              <ellipse cx="-22" cy="0" rx="10" ry="10" fill="#e8c878" />
              <ellipse cx="-22" cy="0" rx="7"  ry="7"  fill="#fef3c7" />
              <ellipse cx="-22" cy="0" rx="4"  ry="4"  fill="#e8c878" />
              {/* Right curl shadow */}
              <ellipse cx="22"  cy="0" rx="10" ry="10" fill="#e8c878" />
              <ellipse cx="22"  cy="0" rx="7"  ry="7"  fill="#fef3c7" />
              <ellipse cx="22"  cy="0" rx="4"  ry="4"  fill="#e8c878" />
              {/* Scroll body shadow overlay */}
              <rect x="-22" y="-10" width="44" height="20" rx="10" fill="url(#scrollShadow)" />
              {/* Top/bottom edge lines */}
              <line x1="-12" y1="-9" x2="12" y2="-9" stroke="#d4a860" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="-12" y1="9"  x2="12" y2="9"  stroke="#d4a860" strokeWidth="0.8" strokeOpacity="0.5" />
            </g>
          ))}

          {/* Left broad glass highlight streak */}
          <path d="M34 108 Q28 125 27 155 L27 240 L46 240 L48 155 Q50 125 58 108 Z"
            fill="url(#leftSpec)" />
          {/* Narrow sharp specular */}
          <path d="M29 120 Q25 138 25 165 L25 220 L32 220 L33 165 Q33 138 38 120 Z"
            fill="white" fillOpacity="0.3" />
          {/* Bubble dots */}
          <circle cx="52"  cy="145" r="3" fill="white" fillOpacity="0.25" />
          <circle cx="185" cy="160" r="2" fill="white" fillOpacity="0.2"  />
          <circle cx="48"  cy="200" r="2" fill="white" fillOpacity="0.2"  />
          <circle cx="190" cy="220" r="3" fill="white" fillOpacity="0.18" />
          <circle cx="178" cy="140" r="2" fill="white" fillOpacity="0.22" />
        </g>

        {/* ═══════════════════════════════ */}
        {/* LABEL                          */}
        {/* ═══════════════════════════════ */}
        <rect x="58" y="148" width="124" height="80" rx="3"
          fill="#fdf6e3" fillOpacity="0.93"
          stroke="#c8a060" strokeWidth="1.2" />
        <rect x="62" y="152" width="116" height="72" rx="2"
          fill="none" stroke="#c8a060" strokeWidth="0.6" strokeOpacity="0.5" />
        <text x="120" y="178" textAnchor="middle"
          fontFamily="'Lora', serif" fontSize="15" fontWeight="700"
          fill="#5c2d0a" letterSpacing="2">THE</text>
        <text x="120" y="198" textAnchor="middle"
          fontFamily="'Lora', serif" fontSize="15" fontWeight="700"
          fill="#5c2d0a" letterSpacing="2">QUOTE</text>
        <text x="120" y="218" textAnchor="middle"
          fontFamily="'Lora', serif" fontSize="15" fontWeight="700"
          fill="#5c2d0a" letterSpacing="2">JAR</text>

        {/* ═══════════════════════════════ */}
        {/* NECK                           */}
        {/* ═══════════════════════════════ */}
        <path d="M78 62 L68 100 L172 100 L162 62 Z"
          fill="#d97706" fillOpacity="0.7"
          stroke="#92400e" strokeWidth="2" />
        <path d="M78 62 L68 100 L172 100 L162 62 Z"
          fill="url(#neckGrad)" />
        {/* Neck left highlight */}
        <path d="M80 65 L72 98 L82 98 L90 65 Z"
          fill="white" fillOpacity="0.22" />

        {/* Neck top rim — where cork sits */}
        <ellipse cx="120" cy="62" rx="42" ry="8"
          fill="#b45309" stroke="#7c2d12" strokeWidth="1.5" />
        <ellipse cx="120" cy="62" rx="36" ry="5"
          fill="#d97706" fillOpacity="0.6" />

        {/* ═══════════════════════════════ */}
        {/* ROPE AROUND NECK               */}
        {/* ═══════════════════════════════ */}
        {/* Rope strands — three horizontal bands */}
        {[95, 100, 105].map((y, i) => (
          <ellipse key={i} cx="120" cy={y} rx="52" ry="5"
            fill="none"
            stroke="url(#ropeGrad)"
            strokeWidth={i === 1 ? 4 : 3}
            strokeOpacity="0.85"
          />
        ))}
        {/* Rope texture lines */}
        {[-40,-28,-16,-4,8,20,32,44].map((x, i) => (
          <line key={i}
            x1={120 + x} y1="91"
            x2={120 + x + 6} y2="109"
            stroke="#8a6020" strokeWidth="1" strokeOpacity="0.35"
          />
        ))}

        {/* ═══════════════════════════════ */}
        {/* CORK                           */}
        {/* ═══════════════════════════════ */}
        {/* Cork plug sitting in neck */}
        <ellipse cx="120" cy="48" rx="38" ry="16"
          fill="url(#corkFace)"
          stroke="#8a6820" strokeWidth="1.5" />
        {/* Cork side (visible below top face) */}
        <path d="M82 48 L80 62 Q80 70 120 70 Q160 70 160 62 L158 48 Q158 58 120 58 Q82 58 82 48 Z"
          fill="url(#corkSide)"
          stroke="#8a6820" strokeWidth="1" />
        {/* Cork rim ring */}
        <ellipse cx="120" cy="62" rx="40" ry="8"
          fill="url(#corkRim)"
          stroke="#6a4e18" strokeWidth="1.2" />
        {/* Cork face texture dots */}
        {[
          [105,42],[118,38],[132,44],[110,50],[126,48],[138,41],[100,47],[122,54]
        ].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="1.8"
            fill="#8a6820" fillOpacity="0.35" />
        ))}
        {/* Cork top highlight */}
        <ellipse cx="112" cy="43" rx="16" ry="7"
          fill="white" fillOpacity="0.22" />

        {/* ═══════════════════════════════ */}
        {/* BODY TOP RIM HIGHLIGHT         */}
        {/* ═══════════════════════════════ */}
        <ellipse cx="120" cy="100" rx="52" ry="7"
          fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.35" />

        {/* Bottom ground shadow */}
        <ellipse cx="122" cy="282" rx="80" ry="10"
          fill="#7c2d12" fillOpacity="0.15" />

      </svg>

      {/* Quote count badge */}
      {quotes.length > 0 && (
        <div style={{
          position: 'absolute', top: 8, right: 0,
          background: '#7c2d12', color: '#fef3c7',
          borderRadius: '50%', width: 30, height: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontFamily: "'Caveat', cursive", fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          border: '2px solid #fef3c7',
        }}>
          {quotes.length > 99 ? '99+' : quotes.length}
        </div>
      )}
    </div>
  )
}
