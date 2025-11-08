import React, { useEffect, useMemo, useState } from "react";

const container: React.CSSProperties = {
  padding: "64px 24px",
  display: "grid",
  gap: 16,
  textAlign: "center",
  background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
};

const heading: React.CSSProperties = {
  fontSize: 36,
  lineHeight: 1.2,
  fontWeight: 800,
  color: "#111827",
};

const sub: React.CSSProperties = {
  fontSize: 18,
  color: "#4b5563",
  marginTop: 6,
};

const btn: React.CSSProperties = {
  margin: "16px auto 0",
  display: "inline-block",
  padding: "12px 20px",
  borderRadius: 10,
  background: "#111827",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
};

const TAGLINES = [
  "AI that accelerates your career journey.",
  "Smarter resumes. Faster hires.",
  "Turn experience into opportunity with AI.",
  "Personalized career growth, powered by AI.",
  "From profile to placement—intelligently.",
];

function nextIndex(current: number, length: number) {
  return (current + 1) % length;
}

const Hero: React.FC = () => {
  const [tagline, setTagline] = useState(TAGLINES[0]);

  const initialIndex = useMemo(() => {
    const key = "hero_tagline_index";
    const raw = localStorage.getItem(key);
    let idx = 0;
    if (raw !== null && !Number.isNaN(Number(raw))) {
      idx = Number(raw);
    } else {
      idx = Math.floor(Math.random() * TAGLINES.length);
    }
    const next = nextIndex(idx, TAGLINES.length);
    localStorage.setItem(key, String(next));
    return idx;
  }, []);

  useEffect(() => {
    setTagline(TAGLINES[initialIndex]);
  }, [initialIndex]);

  return (
    <section id="home" style={container}>
      <h1 style={heading}>Mastersolis AI Career Companion</h1>
      <p style={sub}>{tagline}</p>
      <button
        type="button"
        style={btn}
        onClick={() => {
          window.location.href = "/jobs";
        }}
      >
        Explore Careers
      </button>
    </section>
  );
};

export default Hero;
