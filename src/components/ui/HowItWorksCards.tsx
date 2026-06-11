const steps = [
  {
    number: "01",
    title: "Upload",
    description: "Artists post short videos showcasing their talent to the world.",
  },
  {
    number: "02",
    title: "Engage",
    description: "Fans like, comment, and share what moves them across the platform.",
  },
  {
    number: "03",
    title: "Bid & Fund",
    description: "Fans place bids or donate directly to the artists they believe in.",
  },
  {
    number: "04",
    title: "Perform",
    description: "Funded artists take the stage and bring the music to life.",
  },
];

export function HowItWorksCards() {
  return (
    <section
      style={{
        padding: "100px 24px",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "16px",
            }}
          >
            How{" "}
            <span style={{ color: "#cfff04" }}>Awksion</span>{" "}
            Works
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1.1rem",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            From discovery to the stage — fan power drives everything.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {steps.map((step) => (
            <HowItWorksCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="hiw-card"
      style={{
        backgroundColor: "#111111",
        border: "1px solid #1f1f1f",
        borderRadius: "16px",
        padding: "36px 28px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-20px) scale(1.06)";
        el.style.boxShadow = "0 20px 60px rgba(207, 255, 4, 0.25)";
        el.style.borderColor = "#cfff04";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
        el.style.borderColor = "#1f1f1f";
      }}
    >
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 900,
          color: "#cfff04",
          lineHeight: 1,
          marginBottom: "20px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {number}
      </div>
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "0.95rem",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
}
