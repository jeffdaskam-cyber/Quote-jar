import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useQuotes } from './hooks/useQuotes'
import LoginScreen from './components/LoginScreen'
import Jar from './components/Jar'
import FlyingPaper from './components/FlyingPaper'
import QuoteModal from './components/QuoteModal'
import AddQuoteModal from './components/AddQuoteModal'
import AllQuotesModal from './components/AllQuotesModal'

export default function App() {
  const { user, signIn, logOut, error: authError, loading: authLoading } = useAuth()
  const { quotes, loading: quotesLoading, addQuote, deleteQuote, randomQuote } = useQuotes()

  const [animating, setAnimating]       = useState(false)
  const [pendingQuote, setPending]      = useState(null)
  const [shownQuote, setShownQuote]     = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAllModal, setShowAllModal] = useState(false)
  const [shake, setShake]               = useState(false)
  const [successFlash, setSuccess]      = useState(false)
  const [submitting, setSubmitting]     = useState(false)

  if (authLoading) return (
    <div style={{ minHeight: '100vh', background: '#fdf6e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#b45309' }}>loading the jar…</div>
    </div>
  )

  if (!user) return <LoginScreen onSignIn={signIn} error={authError} />

  const handleAddQuote = async ({ author, text }) => {
    setPending({ author, text })
    setShowAddModal(false)
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '0',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea { outline: none; }
        input::placeholder, textarea::placeholder { color: #d4a574; opacity: 0.7; }
        @keyframes jarShake { 0%,100%{transform:translateX(0) rotate(0)} 20%{transform:translateX(-6px) rotate(-2deg)} 40%{transform:translateX(6px) rotate(2deg)} 60%{transform:translateX(-4px) rotate(-1deg)} 80%{transform:translateX(4px) rotate(1deg)} }
        @keyframes successPop { 0%{transform:scale(1)} 50%{transform:scale(1.06)} 100%{transform:scale(1)} }
        @keyframes floatIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px',
        background: 'rgba(253,246,227,0.9)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(217,119,6,0.1)',
        zIndex: 100,
      }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: '1.4rem', color: '#92400e', fontWeight: 600 }}>
          The Quote Jar
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user.photoURL && (
            <img src={user.photoURL} alt="" style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #d97706' }} />
          )}
          <button onClick={logOut} style={{
            background: 'none', border: '1.5px solid rgba(217,119,6,0.3)', borderRadius: 8,
            padding: '5px 11px', fontFamily: "'Caveat', cursive", fontSize: '0.9rem',
            color: '#92400e', cursor: 'pointer'
          }}>sign out</button>
        </div>
      </div>

      {/* Main scrollable area — jar + hint, centered vertically */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70,
        paddingBottom: 120,
        gap: 24,
        animation: 'floatIn 0.6s ease forwards',
        width: '100%',
      }}>

        {/* Hint text — large */}
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
          color: '#92400e',
          fontStyle: 'italic',
          textAlign: 'center',
          opacity: 0.85,
          padding: '0 24px',
          lineHeight: 1.3,
        }}>
          Tap the jar to see a quote
        </p>

        {/* Jar */}
        <div style={{ animation: shake ? 'jarShake 0.5s ease' : successFlash ? 'successPop 0.4s ease' : 'none' }}>
          <Jar onClick={handleJarClick} quotes={quotes} />
        </div>

        {/* Quote count */}
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem', color: '#b45309', opacity: 0.65, textAlign: 'center' }}>
          {quotesLoading ? 'loading…' : quotes.length === 0
            ? 'the jar is empty!'
            : `${quotes.length} quote${quotes.length !== 1 ? 's' : ''} inside`}
        </div>
      </div>

      {/* Bottom button bar — fixed */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: 'flex', gap: 0,
        background: 'rgba(253,246,227,0.95)', backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(217,119,6,0.15)',
        zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        <ActionButton
          primary
          onClick={() => setShowAddModal(true)}
          disabled={animating || submitting}
          style={{ borderRadius: 0, flex: 1, borderRight: '1px solid rgba(217,119,6,0.15)' }}
        >
          {animating || submitting ? 'adding…' : 'Add a Quote'}
        </ActionButton>
        <ActionButton
          onClick={() => setShowAllModal(true)}
          style={{ borderRadius: 0, flex: 1 }}
        >
          All Quotes
        </ActionButton>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddQuoteModal quotes={quotes} onSubmit={handleAddQuote} onClose={() => setShowAddModal(false)} />
      )}
      {showAllModal && (
        <AllQuotesModal quotes={quotes} currentUserId={user.uid} onDelete={deleteQuote} onClose={() => setShowAllModal(false)} />
      )}
      {animating && pendingQuote && (
        <FlyingPaper text={pendingQuote.text} author={pendingQuote.author} onComplete={handleAnimationComplete} />
      )}
      {shownQuote && (
        <QuoteModal quote={shownQuote} onClose={() => setShownQuote(null)} />
      )}
    </div>
  )
}

function ActionButton({ onClick, children, primary, disabled, style }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: primary
          ? (disabled ? '#e5d5b5' : hover ? 'linear-gradient(135deg,#fbbf24,#d97706)' : 'linear-gradient(135deg,#f59e0b,#d97706)')
          : (hover ? 'rgba(217,119,6,0.08)' : 'transparent'),
        color: primary ? (disabled ? '#a78b6f' : 'white') : '#92400e',
        border: 'none',
        padding: '18px 12px',
        fontFamily: "'Lora', serif",
        fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
        fontWeight: 600,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.18s',
        letterSpacing: '0.01em',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
