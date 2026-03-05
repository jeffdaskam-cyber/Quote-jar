export default function LoginScreen({ onSignIn, error }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#fdf6e3',
      backgroundImage: `radial-gradient(circle at 30% 30%, rgba(251,191,36,0.1) 0%, transparent 50%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Caveat', cursive",
      padding: 24,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,600;1,400&display=swap');`}</style>

      {/* Jar icon */}
      <svg viewBox="0 0 120 140" width="100" height="100" style={{ marginBottom: 16 }}>
        <rect x="28" y="10" width="64" height="16" rx="4" fill="#d97706" />
        <rect x="33" y="13" width="54" height="9" rx="2" fill="#fbbf24" />
        <path d="M38 26 L33 42 L87 42 L82 26 Z" fill="#fef9e7" stroke="#d97706" strokeWidth="1.5" />
        <path d="M33 42 Q24 48 23 60 L23 125 Q23 134 60 134 Q97 134 97 125 L97 60 Q96 48 87 42 Z" fill="#fef9e7" stroke="#d97706" strokeWidth="1.5" />
        <path d="M40 50 Q35 60 35 85 L43 85 Q43 60 48 50 Z" fill="white" opacity="0.35" />
        <text x="60" y="95" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="11" fill="#92400e" fontWeight="700">Quote</text>
        <text x="60" y="110" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="11" fill="#92400e" fontWeight="700">Jar</text>
      </svg>

      <h1 style={{
        fontFamily: "'Lora', serif",
        fontSize: '2.4rem',
        color: '#92400e',
        fontWeight: 600,
        marginBottom: 8,
        textAlign: 'center',
      }}>The Quote Jar</h1>

      <p style={{ color: '#b45309', fontSize: '1.1rem', marginBottom: 36, textAlign: 'center' }}>
        saving the funny things they say 🫙
      </p>

      <button
        onClick={onSignIn}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'white',
          border: '1.5px solid rgba(217,119,6,0.3)',
          borderRadius: 10,
          padding: '12px 24px',
          cursor: 'pointer',
          fontFamily: "'Caveat', cursive",
          fontSize: '1.15rem',
          color: '#451a03',
          fontWeight: 700,
          boxShadow: '0 3px 12px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
        onMouseOver={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseOut={e => { e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Sign in with Google
      </button>

      {error && (
        <p style={{ color: '#dc2626', marginTop: 16, fontSize: '0.95rem', textAlign: 'center' }}>
          {error}
        </p>
      )}

      <p style={{ marginTop: 28, fontSize: '0.85rem', color: '#b45309', opacity: 0.6, textAlign: 'center', maxWidth: 280 }}>
        Sign in to add quotes and pull one out of the jar. Your family's quotes are shared across all members.
      </p>
    </div>
  )
}
