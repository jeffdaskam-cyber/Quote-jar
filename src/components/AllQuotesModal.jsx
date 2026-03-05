import { useState, useEffect, useMemo } from 'react'

const PAPER_COLORS = ['#fef9c3','#fde68a','#fed7aa','#fce7f3','#dbeafe','#dcfce7','#ede9fe']

export default function AllQuotesModal({ quotes, currentUserId, onDelete, onClose }) {
  const [visible, setVisible]         = useState(false)
  const [filterPerson, setFilter]     = useState('All')
  const [confirmDelete, setConfirm]   = useState(null) // quote id pending delete

  useEffect(() => { setTimeout(() => setVisible(true), 10) }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 250)
  }

  // Unique sorted list of people for filter
  const people = useMemo(() => {
    const names = [...new Set(quotes.map(q => q.author))].sort()
    return ['All', ...names]
  }, [quotes])

  // Sort alphabetically by author, then by date within same author
  const filtered = useMemo(() => {
    const list = filterPerson === 'All' ? quotes : quotes.filter(q => q.author === filterPerson)
    return [...list].sort((a, b) => {
      const authorCmp = a.author.localeCompare(b.author)
      if (authorCmp !== 0) return authorCmp
      // Within same author, newest first
      const aTime = a.createdAt?.toMillis?.() ?? 0
      const bTime = b.createdAt?.toMillis?.() ?? 0
      return bTime - aTime
    })
  }, [quotes, filterPerson])

  const handleDelete = async (quote) => {
    if (confirmDelete === quote.id) {
      await onDelete(quote.id)
      setConfirm(null)
    } else {
      setConfirm(quote.id)
    }
  }

  const formatDate = (ts) => {
    if (!ts?.toDate) return null
    return ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(120,53,15,0.3)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'stretch', justifyContent: 'center',
        transition: 'opacity 0.25s', opacity: visible ? 1 : 0,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fdf6e3',
          width: '100%', maxWidth: 560,
          display: 'flex', flexDirection: 'column',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)',
          boxShadow: '-8px 0 40px rgba(120,53,15,0.15)',
          marginLeft: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(217,119,6,0.15)',
          background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: '1.3rem', color: '#78350f', fontStyle: 'italic' }}>
              All Quotes
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: '0.95rem', color: '#b45309', fontStyle: 'normal', marginLeft: 10 }}>
                ({filtered.length}{filterPerson !== 'All' ? ` from ${filterPerson}` : ''})
              </span>
            </h2>
            <button onClick={handleClose} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '1.3rem', color: '#b45309', lineHeight: 1, padding: 4,
            }}>✕</button>
          </div>

          {/* Person filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {people.map(person => (
              <button
                key={person}
                onClick={() => setFilter(person)}
                style={{
                  background: filterPerson === person ? '#d97706' : 'rgba(217,119,6,0.1)',
                  color: filterPerson === person ? 'white' : '#92400e',
                  border: filterPerson === person ? 'none' : '1px solid rgba(217,119,6,0.25)',
                  borderRadius: 20, padding: '4px 14px',
                  fontFamily: "'Caveat', cursive", fontSize: '0.95rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {person}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes list */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 24px 32px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#b45309', opacity: 0.6, marginTop: 48, fontSize: '1.1rem', fontFamily: "'Caveat', cursive" }}>
              No quotes yet from {filterPerson}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map((q, i) => {
                const color = PAPER_COLORS[Math.abs((q.id?.charCodeAt(0) ?? i)) % PAPER_COLORS.length]
                const isOwn = q.addedBy === currentUserId
                const awaitingConfirm = confirmDelete === q.id
                const date = formatDate(q.createdAt)

                return (
                  <div
                    key={q.id}
                    style={{
                      background: color,
                      borderRadius: 6,
                      padding: '14px 16px',
                      boxShadow: '1px 2px 8px rgba(0,0,0,0.1)',
                      fontFamily: "'Caveat', cursive",
                      position: 'relative',
                      transition: 'transform 0.15s',
                    }}
                  >
                    <div style={{ fontSize: '1.1rem', color: '#78350f', fontWeight: 700, marginBottom: 6 }}>
                      {q.author}
                    </div>
                    <div style={{ fontSize: '1.25rem', color: '#451a03', lineHeight: 1.45, marginBottom: 6, whiteSpace: 'normal' }}>
                      "{q.text}"
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                      <div style={{ fontSize: 11, color: '#b45309', opacity: 0.65 }}>
                        {date && <span>{date}</span>}
                        {q.addedByName && <span> · added by {q.addedByName}</span>}
                      </div>
                      {isOwn && (
                        <button
                          onClick={() => handleDelete(q)}
                          style={{
                            background: awaitingConfirm ? '#dc2626' : 'rgba(0,0,0,0.08)',
                            color: awaitingConfirm ? 'white' : '#92400e',
                            border: 'none', borderRadius: 6,
                            padding: '3px 10px',
                            fontFamily: "'Caveat', cursive", fontSize: '0.85rem',
                            cursor: 'pointer', transition: 'all 0.15s',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {awaitingConfirm ? 'tap again to delete' : '🗑 delete'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
