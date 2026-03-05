import { useState, useRef } from 'react'
import { useAuth } from './hooks/useAuth'
import { useQuotes } from './hooks/useQuotes'
import LoginScreen from './components/LoginScreen'
import Jar from './components/Jar'
import FlyingPaper from './components/FlyingPaper'
import QuoteModal from './components/QuoteModal'

const PAPER_COLORS = ['#fef9c3','#fde68a','#fed7aa','#fce7f3','#dbeafe','#dcfce7','#ede9fe']

export default function App() {
  const { user, signIn, logOut, error: authError, loading: authLoading } = useAuth()
  const { quotes, loading: quotesLoading, addQuote, randomQuote } = useQuotes()

  const [author, setAuthor]         = useState('')
  const [text, setText]             = useState('')
  const [animating, setAnimating]   = useState(false)
  const [pendingQuote, setPending]  = useState(null)
  const [shownQuote, setShownQuote] = useState(null)
  const [shake, setShake]           = useState(false)
  const [successFlash, setSuccess]  = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (authLoading) return (
    <div style={{ minHeight: '100vh', background: '#fdf6e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#b45309' }}>loading the jar…</div>
    </div>
  )

  if (!user) return <LoginScreen onSignIn={signIn} error={authError} />

  const handleSubmit = async () => {
    if (!author.trim() || !text.trim() || submitting) return
    const q = { author: author.trim(), text: text.trim() }
    setPending(q)
    setAnimating(true)
  }

  const handleAnimationComplete = async () => {
    if (!pendingQuote) return
    setSubmitting(true)
    try {
      await addQuote({
        author: pendingQuote.author,
        text: pendingQuote.text,
        addedBy: user.uid,
        addedByName: user.displayName || user.email,
      })
    } catch (e) {
      console.error('Failed to save quote:', e)
    } finally {
      setPending(null)
      setAnimating(false)
      setSubmitting(false)
      setAuthor('')
      setText('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 800)
    }
  }

  const handleJarClick = () => {
    if (quotes.length === 0) {
      setShake(true)
      setTimeout(() => setShake(false), 600)
      return
    }
    setShownQuote(randomQuote())
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fdf6e3',
      backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(251,191,36,0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(217,119,6,0.06) 0%, transparent 50%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23d97706' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      `,
      fontFamily: "'Caveat', cursive",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '28px 16px 48px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea { outline: none; }
        input::placeholder, textarea::placeholder { color: #d4a574; opacity: 0.7; }
        @keyframes jarShake { 0%,100%{transform:translateX(0) rotate(0)} 20%{transform:translateX(-6px) rotate(-2deg)} 40%{transform:translateX(6px) rotate(2deg)} 60%{transform:translateX(-4px) rotate(-1deg)} 80%{transform:translateX(4px) rotate(1deg)} }
        @keyframes successPop { 0%{transform:scale(1)} 50%{transform:scale(1.04)} 100%{transform:scale(1)} }
        @keyframes floatIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Header */}
      <div style={{ width: '100%', maxWidth: 720, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, animation: 'floatIn 0.5s ease forwards' }}>
        <div>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(1.8rem,5vw,2.6rem)', color: '#92400e', fontWeight: 600 }}>
            The Quote Jar
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#b45309', marginTop: 2 }}>saving the funny things they say 🫙</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user.photoURL && (
            <img src={user.photoURL} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #d97706' }} />
          )}
          <button onClick={logOut} style={{
            background: 'none', border: '1.5px solid rgba(217,119,6,0.3)', borderRadius: 8,
            padding: '6px 12px', fontFamily: "'Caveat', cursive", fontSize: '0.9rem',
            color: '#92400e', cursor: 'pointer'
          }}>sign out</button>
        </div>
      </div>

      {/* Main layout */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 36, alignItems: 'flex-start',
        justifyContent: 'center', width: '100%', maxWidth: 720,
        animation: 'floatIn 0.6s 0.1s ease both'
      }}>

        {/* JAR */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ animation: shake ? 'jarShake 0.5s ease' : successFlash ? 'successPop 0.4s ease' : 'none' }}>
            <Jar onClick={handleJarClick} quotes={quotes} />
          </div>
          <div style={{ fontSize: 13, color: '#b45309', textAlign: 'center', opacity: 0.75 }}>
            {quotesLoading ? 'loading…' : quotes.length === 0 ? 'jar is empty — add some quotes!' : `${quotes.length} quote${quotes.length !== 1 ? 's' : ''} inside`}
          </div>
        </div>

        {/* FORM */}
        <div style={{
          background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(217,119,6,0.2)', borderRadius: 12,
          padding: '28px 28px 24px', width: '100%', maxWidth: 320,
          boxShadow: '0 4px 24px rgba(146,64,14,0.08)',
        }}>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: '1.15rem', color: '#78350f', marginBottom: 20, fontStyle: 'italic' }}>
            Record a quote
          </h2>

          <label style={{ display: 'block', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#92400e', fontWeight: 600, marginBottom: 5 }}>Who said it?</div>
            <input
              value={author} onChange={e => setAuthor(e.target.value)}
              placeholder="Grandma, Uncle Dave…" maxLength={40}
              style={{ width: '100%', background: '#fffbf0', border: '1.5px solid rgba(217,119,6,0.3)', borderRadius: 8, padding: '10px 14px', fontFamily: "'Caveat', cursive", fontSize: '1.05rem', color: '#451a03' }}
              onFocus={e => e.target.style.borderColor = '#d97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(217,119,6,0.3)'}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: '#92400e', fontWeight: 600, marginBottom: 5 }}>What did they say?</div>
            <textarea
              value={text} onChange={e => setText(e.target.value)}
              placeholder="Type the quote here…" rows={4} maxLength={280}
              style={{ width: '100%', background: '#fffbf0', border: '1.5px solid rgba(217,119,6,0.3)', borderRadius: 8, padding: '10px 14px', fontFamily: "'Caveat', cursive", fontSize: '1.05rem', color: '#451a03', resize: 'vertical', lineHeight: 1.5 }}
              onFocus={e => e.target.style.borderColor = '#d97706'}
              onBlur={e => e.target.style.borderColor = 'rgba(217,119,6,0.3)'}
            />
            <div style={{ textAlign: 'right', fontSize: 11, color: '#d4a574', marginTop: 2 }}>{text.length}/280</div>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!author.trim() || !text.trim() || animating || submitting}
            style={{
              width: '100%',
              background: (!author.trim() || !text.trim() || animating) ? '#e5d5b5' : 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: (!author.trim() || !text.trim() || animating) ? '#a78b6f' : 'white',
              border: 'none', borderRadius: 8, padding: 12,
              fontFamily: "'Caveat', cursive", fontSize: '1.15rem', fontWeight: 700,
              cursor: (!author.trim() || !text.trim() || animating) ? 'default' : 'pointer',
              boxShadow: (!author.trim() || !text.trim() || animating) ? 'none' : '0 3px 12px rgba(217,119,6,0.35)',
              transition: 'all 0.2s',
            }}
          >
            {animating || submitting ? '✉️ adding to jar…' : '🫙 put it in the jar'}
          </button>
        </div>
      </div>

      {/* Recent quotes */}
      {quotes.length > 0 && (
        <div style={{ marginTop: 40, width: '100%', maxWidth: 680 }}>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: '1rem', color: '#92400e', fontStyle: 'italic', marginBottom: 12, textAlign: 'center', opacity: 0.7 }}>
            recent additions
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {quotes.slice(0, 8).map((q, i) => (
              <div key={q.id} style={{
                background: PAPER_COLORS[Math.abs((q.id?.charCodeAt(0) ?? i)) % PAPER_COLORS.length],
                borderRadius: 3, padding: '8px 14px',
                boxShadow: '1px 2px 6px rgba(0,0,0,0.12)',
                transform: `rotate(${[-2,-1,0,1,2,-1.5,1.5,0.5][i % 8]}deg)`,
                fontFamily: "'Caveat', cursive", maxWidth: 200,
                animation: 'floatIn 0.4s ease forwards',
              }}>
                <div style={{ fontSize: 11, color: '#78350f', fontWeight: 700 }}>{q.author}</div>
                <div style={{ fontSize: 13, color: '#451a03', marginTop: 2, lineHeight: 1.3 }}>"{q.text}"</div>
              </div>
            ))}
          </div>
          {quotes.length > 8 && (
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#b45309', opacity: 0.6 }}>
              + {quotes.length - 8} more in the jar
            </div>
          )}
        </div>
      )}

      {/* Animations & modals */}
      {animating && pendingQuote && (
        <FlyingPaper text={pendingQuote.text} author={pendingQuote.author} onComplete={handleAnimationComplete} />
      )}
      {shownQuote && (
        <QuoteModal quote={shownQuote} onClose={() => setShownQuote(null)} />
      )}
    </div>
  )
}
