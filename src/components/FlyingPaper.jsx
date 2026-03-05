import { useState, useEffect } from 'react'

const PAPER_COLORS = ['#fef9c3','#fde68a','#fed7aa','#fce7f3','#dbeafe','#dcfce7','#ede9fe']

export default function FlyingPaper({ text, author, onComplete }) {
  const [phase, setPhase] = useState(0)
  const color = PAPER_COLORS[Math.floor(Math.random() * PAPER_COLORS.length)]

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1000)
    const t3 = setTimeout(() => onComplete(), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const styles = [
    { transform: 'translateX(-50%) translateY(0) rotate(-5deg) scale(1)', opacity: 1 },
    { transform: 'translateX(-50%) translateY(-20px) rotate(5deg) scale(0.7)', opacity: 1 },
    { transform: 'translateX(-50%) translateY(80px) rotate(10deg) scale(0.4)', opacity: 0 },
  ]

  return (
    <div style={{
      position: 'fixed', left: '50%', top: '38%',
      zIndex: 1000, pointerEvents: 'none',
      transition: 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s ease',
      ...styles[phase]
    }}>
      <div style={{
        background: color, borderRadius: 3,
        padding: '12px 18px', boxShadow: '2px 4px 12px rgba(0,0,0,0.25)',
        fontFamily: "'Caveat', cursive", minWidth: 160, maxWidth: 220, textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '33%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.06)' }} />
        <div style={{ position: 'absolute', top: '66%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.06)' }} />
        <div style={{ fontSize: 11, color: '#78350f', fontWeight: 700, marginBottom: 4 }}>— {author}</div>
        <div style={{ fontSize: 14, color: '#451a03', lineHeight: 1.4 }}>{text}</div>
      </div>
    </div>
  )
}
