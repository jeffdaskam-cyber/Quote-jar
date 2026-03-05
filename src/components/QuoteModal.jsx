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

  const dateStr = quote.createdAt?.toDate
    ? quote.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div onClick={handleClose} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(120,53,15,0.35)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.3s', opacity: visible ? 1 : 0,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: color, borderRadius: 4,
        padding: '36px 40px', maxWidth: 360, width: '90%',
        boxShadow: '4px 8px 32px rgba(0,0,0,0.3)',
        fontFamily: "'Caveat', cursive", textAlign: 'center',
        position: 'relative',
        transform: visible ? 'scale(1) rotate(-1deg)' : 'scale(0.8) rotate(-5deg)',
        transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s',
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          width: 14, height: 14, borderRadius: '50%',
          background: '#ef4444', boxShadow: '0 2px 6px rgba(0,0,0,0.3), 0 0 0 2px white',
        }} />
        {/* Ruled lines */}
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            position: 'absolute', left: 20, right: 20,
            top: `${30 + i * 22}%`, height: 1, background: 'rgba(180,83,9,0.12)'
          }} />
        ))}
        <div style={{ fontSize: 13, color: '#92400e', fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>✨ from the jar ✨</div>
        <div style={{ fontSize: 24, color: '#451a03', lineHeight: 1.4, marginBottom: 20, position: 'relative', zIndex: 1 }}>
          "{quote.text}"
        </div>
        <div style={{ fontSize: 18, color: '#78350f', fontWeight: 700 }}>— {quote.author}</div>
        {dateStr && (
          <div style={{ fontSize: 11, color: '#b45309', marginTop: 8, opacity: 0.7 }}>{dateStr}</div>
        )}
        {quote.addedByName && (
          <div style={{ fontSize: 11, color: '#b45309', opacity: 0.6, marginTop: 4 }}>added by {quote.addedByName}</div>
        )}
        <div style={{ marginTop: 24, fontSize: 12, color: '#b45309' }}>tap anywhere to close</div>
      </div>
    </div>
  )
}
