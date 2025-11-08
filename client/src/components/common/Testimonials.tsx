import React, { useEffect, useMemo, useState } from "react";

const wrap: React.CSSProperties = {
  padding: "48px 24px",
  maxWidth: 960,
  margin: "0 auto",
};

const title: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 12,
  color: "#111827",
};

const grid: React.CSSProperties = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
};

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
};

const cite: React.CSSProperties = {
  display: "block",
  marginTop: 8,
  color: "#6b7280",
  fontSize: 14,
};

const seedPhrases = [
  "This platform helped me craft a job-winning resume in minutes!",
  "The AI insights were spot-on—my interview callback rate doubled.",
  "Effortless experience and professional results.",
  "From confusion to clarity—landed a role in 2 weeks!",
  "Best tool for tailoring resumes to job descriptions.",
];

const names = ["Aisha", "Rahul", "Maria", "James", "Chen", "Lina"];
const roles = ["Software Engineer", "Product Manager", "Data Analyst", "Designer", "Marketing Lead", "ML Engineer"];

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

const Testimonials: React.FC = () => {
  const [items, setItems] = useState<Array<{ text: string; name: string; role: string }>>([]);

  const seed = useMemo(() => {
    const key = "testimonials_seed";
    const prev = localStorage.getItem(key);
    const n = prev ? Number(prev) : Math.floor(Math.random() * 1000);
    localStorage.setItem(key, String(n + 1));
    return n;
  }, []);

  useEffect(() => {
    const arr = Array.from({ length: 3 }).map((_, i) => ({
      text: pick(seedPhrases, seed + i),
      name: pick(names, seed + i * 3),
      role: pick(roles, seed + i * 7),
    }));
    setItems(arr);
  }, [seed]);

  return (
    <section id="testimonials" style={wrap}>
      <h2 style={title}>What our users say</h2>
      <div style={grid}>
        {items.map((t, i) => (
          <figure key={i} style={card}>
            <blockquote>“{t.text}”</blockquote>
            <figcaption>
              <span style={cite}>— {t.name}, {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
