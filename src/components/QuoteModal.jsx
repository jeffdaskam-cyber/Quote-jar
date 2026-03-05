import { useState, useEffect } from 'react'

const PAPER_COLORS = ['#fef9c3','#fde68a','#fed7aa','#fce7f3','#dbeafe','#dcfce7','#ede9fe']

export default function QuoteModal({ quote, onClose }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 10) }, [])

  const color = PAPER_COLORS[Math.abs(quote.id?.charCodeAt(0) ?? 0) % PAPER_COLORS.length]

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div onClick={handleClose} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(120,53,15,0.4)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      transition: 'opacity 0.3s', opacity: visible ? 1 : 0,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: color,
        borderRadius: 6,
        padding: '44px 36px 36px',
        maxWidth: 400,
        width: '100%',
        boxShadow: '4px 8px 40px rgba(0,0,0,0.25)',
        fontFamily: "'Caveat', cursive",
        textAlign: 'center',
        position: 'relative',
        transform: visible ? 'scale(1) rotate(-1deg)' : 'scale(0.85) rotate(-4deg)',
        transition: 'transform 0.35s cubic-bezier(.34,1.4,.64,1)',
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
          width: 16, height: 16, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f87171, #b91c1c)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.35), 0 0 0 2.5px white',
        }} />

        {/* Ruled lines */}
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            position: 'absolute', left: 24, right: 24,
            top: `${28 + i * 24}%`, height: 1,
            background: 'rgba(180,83,9,0.1)'
          }} />
        ))}

        {/* Quote text */}
        <div style={{
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          color: '#451a03',
          lineHeight: 1.45,
          marginBottom: 28,
          position: 'relative', zIndex: 1,
          fontWeight: 500,
        }}>
          "{quote.text}"
        </div>

        {/* Attribution */}
        <div style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          color: '#78350f',
          fontWeight: 700,
          position: 'relative', zIndex: 1,
        }}>
          — {quote.author}
        </div>
      </div>
    </div>
  )
}
