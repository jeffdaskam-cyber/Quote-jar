const PAPER_COLORS = ['#fef9c3','#fde68a','#fed7aa','#fce7f3','#dbeafe','#dcfce7','#ede9fe']

export default function Jar({ onClick, quotes }) {
  const slipsInJar = quotes.slice(-8)

  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', width: 220, margin: '0 auto' }}
    >
      <svg
        viewBox="0 0 220 280"
        width="220"
        height="280"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Main glass body gradient — left edge dark, center light, right edge dark */}
          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#a8c4b8" stopOpacity="0.55" />
            <stop offset="18%"  stopColor="#d4ede5" stopOpacity="0.35" />
            <stop offset="38%"  stopColor="#f0faf6" stopOpacity="0.15" />
            <stop offset="62%"  stopColor="#e8f5f0" stopOpacity="0.2"  />
            <stop offset="82%"  stopColor="#b8d4ca" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7aa898" stopOpacity="0.65" />
          </linearGradient>

          {/* Neck gradient */}
          <linearGradient id="glassNeck" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#8ab4a8" stopOpacity="0.6" />
            <stop offset="30%"  stopColor="#d0ebe2" stopOpacity="0.25" />
            <stop offset="70%"  stopColor="#c8e5dc" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7aa898" stopOpacity="0.65" />
          </linearGradient>

          {/* Lid gradient */}
          <linearGradient id="lidTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#d4d4d4" />
            <stop offset="40%"  stopColor="#a8a8a8" />
            <stop offset="100%" stopColor="#787878" />
          </linearGradient>
          <linearGradient id="lidSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#686868" />
          </linearGradient>
          <linearGradient id="lidShine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="30%"  stopColor="white" stopOpacity="0.45" />
            <stop offset="60%"  stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Bottom fill for paper slips */}
          <linearGradient id="paperFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f5e6c0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e8d0a0" stopOpacity="0.9" />
          </linearGradient>

          {/* Broad left highlight streak */}
          <linearGradient id="leftHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="40%"  stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Clip paths */}
          <clipPath id="bodyClip">
            <path d="M52 82 Q36 92 34 115 L34 248 Q34 265 110 265 Q186 265 186 248 L186 115 Q184 92 168 82 Z" />
          </clipPath>
          <clipPath id="neckClip">
            <path d="M72 50 L64 82 L156 82 L148 50 Z" />
          </clipPath>

          {/* Drop shadow filter */}
          <filter id="jarShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#4a6e60" floodOpacity="0.25" />
          </filter>

          {/* Glass rim highlight */}
          <radialGradient id="rimHighlight" cx="50%" cy="0%" r="60%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── LID ── */}
        {/* Lid top face — ellipse */}
        <ellipse cx="110" cy="32" rx="54" ry="10" fill="url(#lidTop)" />
        {/* Lid side cylinder */}
        <path d="M56 32 L56 50 Q56 58 110 58 Q164 58 164 50 L164 32 Q164 40 110 40 Q56 40 56 32 Z"
          fill="url(#lidSide)" />
        {/* Lid bottom rim */}
        <ellipse cx="110" cy="50" rx="54" ry="8" fill="#606060" />
        {/* Lid shine */}
        <ellipse cx="110" cy="32" rx="54" ry="10" fill="url(#lidShine)" />
        {/* Lid edge highlight line */}
        <ellipse cx="110" cy="29" rx="46" ry="5" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* ── NECK ── */}
        <path d="M72 50 L64 82 L156 82 L148 50 Z"
          fill="#c8e8e0" fillOpacity="0.3"
          stroke="#7ab8a8" strokeWidth="1.2" strokeOpacity="0.6" />
        {/* Neck glass overlay */}
        <path d="M72 50 L64 82 L156 82 L148 50 Z" fill="url(#glassNeck)" />
        {/* Neck left highlight */}
        <path d="M74 52 L67 80 L74 80 L81 52 Z" fill="white" fillOpacity="0.3" />

        {/* ── JAR BODY ── */}
        {/* Base glass shape */}
        <path d="M52 82 Q36 92 34 115 L34 248 Q34 265 110 265 Q186 265 186 248 L186 115 Q184 92 168 82 Z"
          fill="#cce8df" fillOpacity="0.28"
          stroke="#7ab0a0" strokeWidth="1.5" strokeOpacity="0.5"
          filter="url(#jarShadow)" />

        {/* Paper slips fill at bottom — clipped inside jar */}
        <rect x="34" y="200" width="152" height="65" fill="url(#paperFill)" clipPath="url(#bodyClip)" />

        {/* Glass body color overlay */}
        <path d="M52 82 Q36 92 34 115 L34 248 Q34 265 110 265 Q186 265 186 248 L186 115 Q184 92 168 82 Z"
          fill="url(#glassBody)" />

        {/* Left broad highlight (the main glass streak) */}
        <path d="M52 88 Q40 100 39 118 L39 220 L58 220 L60 118 Q62 100 70 88 Z"
          fill="url(#leftHighlight)" clipPath="url(#bodyClip)" />

        {/* Narrow sharp left specular highlight */}
        <path d="M44 100 Q38 115 37 140 L37 200 L43 200 L45 140 Q46 115 52 100 Z"
          fill="white" fillOpacity="0.35" clipPath="url(#bodyClip)" />

        {/* Right edge darkening */}
        <path d="M168 88 Q180 100 181 118 L181 240 Q175 258 165 262 L165 88 Z"
          fill="#4a8070" fillOpacity="0.12" clipPath="url(#bodyClip)" />

        {/* Bottom ellipse — glass thickness illusion */}
        <ellipse cx="110" cy="253" rx="76" ry="12"
          fill="#a8d0c4" fillOpacity="0.35" />
        <ellipse cx="110" cy="253" rx="68" ry="9"
          fill="#c8e8e0" fillOpacity="0.2" />

        {/* Top opening rim highlight */}
        <ellipse cx="110" cy="82" rx="58" ry="8"
          fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
        <ellipse cx="110" cy="82" rx="58" ry="8"
          fill="url(#rimHighlight)" fillOpacity="0.4" />

        {/* Label — kraft paper style */}
        <rect x="60" y="128" width="100" height="68" rx="3"
          fill="#f5e6c0" fillOpacity="0.88"
          stroke="#c8a060" strokeWidth="1" />
        {/* Label ruled lines */}
        <line x1="68" y1="148" x2="152" y2="148" stroke="#c8a060" strokeWidth="0.5" strokeOpacity="0.5" />
        <line x1="68" y1="162" x2="152" y2="162" stroke="#c8a060" strokeWidth="0.5" strokeOpacity="0.5" />
        <line x1="68" y1="176" x2="152" y2="176" stroke="#c8a060" strokeWidth="0.5" strokeOpacity="0.5" />
        <text x="110" y="146" textAnchor="middle"
          fontFamily="'Lora', serif" fontSize="13" fontWeight="600"
          fill="#7a4a10" letterSpacing="1">QUOTE</text>
        <text x="110" y="164" textAnchor="middle"
          fontFamily="'Lora', serif" fontSize="13" fontWeight="600"
          fill="#7a4a10" letterSpacing="1">JAR</text>
        {/* Label border detail */}
        <rect x="63" y="131" width="94" height="62" rx="2"
          fill="none" stroke="#c8a060" strokeWidth="0.5" strokeOpacity="0.5" />
      </svg>

      {/* Paper slips visible above label / at bottom */}
      <div style={{
        position: 'absolute', bottom: 22, left: 48, right: 48, height: 50,
        overflow: 'hidden', pointerEvents: 'none'
      }}>
        {slipsInJar.map((q, i) => (
          <div key={q.id} style={{
            position: 'absolute',
            bottom: (i % 3) * 6,
            left: `${5 + (i * 14) % 60}%`,
            transform: `rotate(${-25 + i * 13}deg)`,
            transformOrigin: 'bottom center',
          }}>
            <div style={{
              width: 26, height: 16,
              background: PAPER_COLORS[i % PAPER_COLORS.length],
              borderRadius: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
            }} />
          </div>
        ))}
      </div>

      {/* Quote count badge */}
      {quotes.length > 0 && (
        <div style={{
          position: 'absolute', top: 10, right: 2,
          background: '#7a4a10', color: 'white',
          borderRadius: '50%', width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontFamily: "'Caveat', cursive", fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          border: '2px solid white',
        }}>
          {quotes.length > 99 ? '99+' : quotes.length}
        </div>
      )}
    </div>
  )
}
