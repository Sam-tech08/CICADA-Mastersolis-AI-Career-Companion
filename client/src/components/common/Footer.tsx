import React from "react";

const wrap: React.CSSProperties = {
  borderTop: "1px solid #e5e7eb",
  padding: "48px 40px 32px",
  background: "#ffffff",
  color: "#374151",
  fontSize: "14px",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.03)",
};

const grid: React.CSSProperties = {
  display: "grid",
  gap: 48,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  maxWidth: 1200,
  margin: "0 auto 32px",
};

const h: React.CSSProperties = { fontWeight: 700, marginBottom: 16, color: "#111827", fontSize: "17px", letterSpacing: "-0.3px" };
const link: React.CSSProperties = { color: "#6b7280", textDecoration: "none", display: "block", marginBottom: 10, transition: "color 0.2s ease", fontSize: "14px", lineHeight: "1.5" };

const Footer: React.FC = () => {
  return (
    <footer style={wrap}>
      <div style={grid}>
        <div>
          <div style={h}>Mastersolis</div>
          <p style={{ margin: 0, lineHeight: 1.6, color: "#6b7280" }}>AI-powered tools to accelerate careers.</p>
        </div>
        <div>
          <div style={h}>Quick Links</div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <a href="#about" style={link} onMouseEnter={(e) => e.currentTarget.style.color = "#111827"} onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}>About</a>
            <a href="#services" style={link} onMouseEnter={(e) => e.currentTarget.style.color = "#111827"} onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}>Services</a>
            <a href="#projects" style={link} onMouseEnter={(e) => e.currentTarget.style.color = "#111827"} onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}>Projects</a>
            <a href="#blog" style={link} onMouseEnter={(e) => e.currentTarget.style.color = "#111827"} onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}>Blog</a>
            <a href="#careers" style={link} onMouseEnter={(e) => e.currentTarget.style.color = "#111827"} onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}>Careers</a>
            <a href="#contact" style={link} onMouseEnter={(e) => e.currentTarget.style.color = "#111827"} onMouseLeave={(e) => e.currentTarget.style.color = "#6b7280"}>Contact</a>
          </nav>
        </div>
        <div id="contact">
          <div style={h}>Contact</div>
          <div style={{ marginBottom: 8, color: "#6b7280" }}>Email: hello@mastersolis.ai</div>
          <div style={{ color: "#6b7280" }}>Phone: +00 000 000 0000</div>
        </div>
      </div>
      <div style={{ marginTop: 0, paddingTop: 24, borderTop: "1px solid #e5e7eb", textAlign: "center", fontSize: 13, color: "#9ca3af", letterSpacing: "0.3px" }}>© {new Date().getFullYear()} Mastersolis. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
