export default function Jar({ onClick, quotes }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        width: 260,
        margin: "0 auto",
      }}
    >
      <img
        src="/jar-app.png"
        alt="The Quote Jar"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: "drop-shadow(0 8px 20px rgba(120,53,15,0.3))",
        }}
        draggable={false}
      />
      {quotes.length > 0 && (
        <div style={{
          position: "absolute",
          top: 12, right: 8,
          background: "#7c2d12",
          color: "#fef3c7",
          borderRadius: "50%",
          width: 32, height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontFamily: "'Caveat', cursive",
          fontWeight: 700,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          border: "2px solid #fef3c7",
        }}>
          {quotes.length > 99 ? "99+" : quotes.length}
        </div>
      )}
    </div>
  )
}
