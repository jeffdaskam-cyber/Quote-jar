export default function Jar({ onClick, quotes }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        width: 390,
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
    </div>
  )
}
