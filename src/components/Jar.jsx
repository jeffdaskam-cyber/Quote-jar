const PAPER_COLORS = ['#fef9c3','#fde68a','#fed7aa','#fce7f3','#dbeafe','#dcfce7','#ede9fe']

export default function Jar({ onClick, quotes }) {
  const slipsInJar = quotes.slice(-6)

  return (
    <div onClick={onClick} style={{ cursor: 'pointer', userSelect: 'none', position: 'relative', width: 180, margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: '-12px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <svg viewBox="0 0 180 220" width="180" height="220" style={{ display: 'block', filter: 'drop-shadow(0 8px 24px rgba(120,53,15,0.25))' }}>
        <rect x="44" y="18" width="92" height="22" rx="5" fill="#d97706" />
        <rect x="50" y="22" width="80" height="14" rx="3" fill="#fbbf24" />
        <rect x="54" y="26" width="72" height="6" rx="2" fill="#fde68a" opacity="0.5" />
        <path d="M58 40 L52 62 L128 62 L122 40 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <path d="M52 62 Q40 70 38 90 L38 190 Q38 205 90 205 Q142 205 142 190 L142 90 Q140 70 128 62 Z"
          fill="#fef9e7" stroke="#d97706" strokeWidth="1.5" />
        <path d="M52 62 Q40 70 38 90 L38 190 Q38 205 90 205 Q142 205 142 190 L142 90 Q140 70 128 62 Z"
          fill="url(#jarGrad)" />
        <path d="M58 72 Q52 90 52 130 L62 130 Q62 90 68 72 Z" fill="white" opacity="0.35" />
        <path d="M70 65 Q66 68 64 74 L72 74 Q74 68 78 65 Z" fill="white" opacity="0.4" />
        <rect x="52" y="110" width="76" height="52" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" opacity="0.9" />
        <text x="90" y="130" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="13" fontWeight="700" fill="#92400e">Quote</text>
        <text x="90" y="148" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="13" fontWeight="700" fill="#92400e">Jar</text>
        <text x="90" y="160" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="9" fill="#b45309">✨ tap for a quote ✨</text>
        <rect x="39" y="160" width="102" height="44" fill="#fde68a" opacity="0.3" clipPath="url(#jarClip)" />
        <clipPath id="jarClip">
          <path d="M53 63 Q41 71 39 91 L39 189 Q39 204 90 204 Q141 204 141 189 L141 91 Q139 71 127 63 Z" />
        </clipPath>
        <defs>
          <linearGradient id="jarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(217,119,6,0.08)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(217,119,6,0.12)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Paper slips inside jar */}
      <div style={{ position: 'absolute', bottom: 18, left: 42, right: 42, height: 40, overflow: 'hidden', pointerEvents: 'none' }}>
        {slipsInJar.map((q, i) => (
          <div key={q.id} style={{
            position: 'absolute', bottom: (i % 2) * 8,
            left: `${10 + (i * 12) % 55}%`,
            transform: `rotate(${-20 + i * 14}deg)`, transformOrigin: 'bottom center'
          }}>
            <div style={{
              width: 28, height: 18, background: PAPER_COLORS[i % PAPER_COLORS.length],
              borderRadius: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
            }} />
          </div>
        ))}
      </div>

      {quotes.length > 0 && (
        <div style={{
          position: 'absolute', top: 8, right: -4,
          background: '#d97706', color: 'white', borderRadius: '50%',
          width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontFamily: "'Caveat', cursive", fontWeight: 700,
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}>
          {quotes.length > 99 ? '99+' : quotes.length}
        </div>
      )}
    </div>
  )
}
