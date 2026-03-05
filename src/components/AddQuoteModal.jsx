import { useState, useEffect } from 'react'

// Simple fuzzy similarity score between two strings (0 = different, 1 = identical)
function similarity(a, b) {
  a = a.toLowerCase().trim()
  b = b.toLowerCase().trim()
  if (a === b) return 1
  if (a.length < 3 || b.length < 3) return 0

  // Count matching bigrams
  const bigrams = (str) => {
    const bg = new Set()
    for (let i = 0; i < str.length - 1; i++) bg.add(str.slice(i, i + 2))
    return bg
  }
  const bgA = bigrams(a)
  const bgB = bigrams(b)
  let matches = 0
  bgA.forEach(bg => { if (bgB.has(bg)) matches++ })
  return (2 * matches) / (bgA.size + bgB.size)
}

const SIMILARITY_THRESHOLD = 0.6

export default function AddQuoteModal({ quotes, onSubmit, onClose }) {
  const [author, setAuthor]             = useState('')
  const [text, setText]                 = useState('')
  const [visible, setVisible]           = useState(false)
  const [similarQuotes, setSimilarQuotes] = useState([])

  useEffect(() => { setTimeout(() => setVisible(true), 10) }, [])

  // Check for similar quotes as user types
  useEffect(() => {
    if (text.trim().length < 8) { setSimilarQuotes([]); return }
    const matches = quotes.filter(q => similarity(q.text, text) >= SIMILARITY_THRESHOLD)
    setSimilarQuotes(matches)
  }, [text, quotes])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 250)
  }

  const handleSubmit = () => {
    if (!author.trim() || !text.trim()) return
    onSubmit({ author: author.trim(), text: text.trim() })
  }

  const canSubmit = author.trim() && text.trim()

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(120,53,15,0.3)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        transition: 'opacity 0.25s', opacity: visible ? 1 : 0,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fffbf0',
          border: '1.5px solid rgba(217,119,6,0.2)',
          borderRadius: 14,
          padding: '32px 28px 26px',
          width: '100%', maxWidth: 380,
          boxShadow: '0 8px 40px rgba(120,53,15,0.2)',
          fontFamily: "'Caveat', cursive",
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(12px)',
          transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1), opacity 0.25s',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: '1.3rem', color: '#78350f', fontStyle: 'italic' }}>
            Record a quote
          </h2>
          <button onClick={handleClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.3rem', color: '#b45309', lineHeight: 1, padding: 4,
          }}>✕</button>
        </div>

        {/* Who said it */}
        <label style={{ display: 'block', marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontWeight: 600, marginBottom: 6 }}>Who said it?</div>
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Grandma, Uncle Dave…"
            maxLength={40}
            autoFocus
            style={{
              width: '100%', background: 'white',
              border: '1.5px solid rgba(217,119,6,0.3)', borderRadius: 8,
              padding: '10px 14px', fontFamily: "'Caveat', cursive",
              fontSize: '1.05rem', color: '#451a03',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#d97706'}
            onBlur={e => e.target.style.borderColor = 'rgba(217,119,6,0.3)'}
          />
        </label>

        {/* What did they say */}
        <label style={{ display: 'block', marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontWeight: 600, marginBottom: 6 }}>What did they say?</div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type the quote here…"
            rows={4} maxLength={280}
            style={{
              width: '100%', background: 'white',
              border: `1.5px solid ${similarQuotes.length ? '#f59e0b' : 'rgba(217,119,6,0.3)'}`,
              borderRadius: 8, padding: '10px 14px',
              fontFamily: "'Caveat', cursive", fontSize: '1.05rem',
              color: '#451a03', resize: 'vertical', lineHeight: 1.5,
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = similarQuotes.length ? '#f59e0b' : '#d97706'}
            onBlur={e => e.target.style.borderColor = similarQuotes.length ? '#f59e0b' : 'rgba(217,119,6,0.3)'}
          />
          <div style={{ textAlign: 'right', fontSize: 11, color: '#d4a574', marginTop: 3 }}>{text.length}/280</div>
        </label>

        {/* Similar quotes warning */}
        {similarQuotes.length > 0 && (
          <div style={{
            background: '#fef3c7', border: '1.5px solid #f59e0b',
            borderRadius: 8, padding: '10px 14px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, color: '#92400e', fontWeight: 700, marginBottom: 6 }}>
              ⚠️ Looks like this might already be in the jar:
            </div>
            {similarQuotes.map(q => (
              <div key={q.id} style={{ fontSize: 13, color: '#78350f', marginBottom: 4, lineHeight: 1.4 }}>
                <span style={{ fontWeight: 700 }}>{q.author}:</span> "{q.text}"
              </div>
            ))}
            <div style={{ fontSize: 12, color: '#b45309', marginTop: 6, opacity: 0.8 }}>
              You can still add it if it's different enough!
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%',
            background: canSubmit ? 'linear-gradient(135deg,#f59e0b,#d97706)' : '#e5d5b5',
            color: canSubmit ? 'white' : '#a78b6f',
            border: 'none', borderRadius: 8, padding: '12px',
            fontFamily: "'Caveat', cursive", fontSize: '1.15rem', fontWeight: 700,
            cursor: canSubmit ? 'pointer' : 'default',
            boxShadow: canSubmit ? '0 3px 12px rgba(217,119,6,0.35)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          🫙 put it in the jar
        </button>
      </div>
    </div>
  )
}
