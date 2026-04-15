import React, { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-grid" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Est. 2004 · Premium Dealership
          </div>

          <h1 className="hero-title">
            Drive Your<br />
            <span className="title-italic">Dream</span> Car<br />
            Today
          </h1>

          <p className="hero-desc">
            Discover our curated collection of luxury and performance vehicles.
            Transparent pricing, expert guidance, and an experience like no other.
          </p>

          <div className="hero-actions">
            <a href="#inventory" className="btn-primary">
              View Inventory
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className="btn-outline">Book Test Drive</a>
          </div>

          <div className="hero-tags">
            {["Luxury", "Sports", "SUV", "Electric", "Pre-owned"].map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="car-showcase">
            <div className="car-glow" />
            <svg className="car-svg" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
              {/* Stylized car silhouette */}
              <defs>
                <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a2a2a"/>
                  <stop offset="100%" stopColor="#1a1a1a"/>
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c8a84b"/>
                  <stop offset="100%" stopColor="#e0c06a"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Car body */}
              <path d="M60,200 L60,175 Q80,140 130,120 L230,100 Q280,85 330,88 L440,92 Q490,95 520,115 L555,140 L565,175 L565,200 Z"
                fill="url(#carGrad)" stroke="#2d2d2d" strokeWidth="1.5"/>

              {/* Roof */}
              <path d="M160,120 Q190,72 250,60 L360,58 Q410,60 440,80 L470,120 Z"
                fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1"/>

              {/* Windows */}
              <path d="M170,118 Q195,76 248,66 L310,64 L310,118 Z"
                fill="#1a3a4a" opacity="0.85" stroke="#2a3a4a" strokeWidth="0.5"/>
              <path d="M318,64 L360,63 Q398,65 425,80 L460,118 L318,118 Z"
                fill="#1a3a4a" opacity="0.85" stroke="#2a3a4a" strokeWidth="0.5"/>

              {/* Window divider */}
              <line x1="312" y1="64" x2="312" y2="120" stroke="#2a2a2a" strokeWidth="6"/>

              {/* Gold accent stripe */}
              <path d="M80,168 L540,168" stroke="url(#accentGrad)" strokeWidth="2" filter="url(#glow)" opacity="0.9"/>

              {/* Wheels */}
              <circle cx="155" cy="200" r="38" fill="#111" stroke="#2a2a2a" strokeWidth="2"/>
              <circle cx="155" cy="200" r="26" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="1"/>
              <circle cx="155" cy="200" r="10" fill="#c8a84b" opacity="0.9"/>
              {[0,60,120,180,240,300].map((deg, i) => (
                <line key={i}
                  x1={155 + 12*Math.cos(deg*Math.PI/180)}
                  y1={200 + 12*Math.sin(deg*Math.PI/180)}
                  x2={155 + 24*Math.cos(deg*Math.PI/180)}
                  y2={200 + 24*Math.sin(deg*Math.PI/180)}
                  stroke="#3a3a3a" strokeWidth="2.5"/>
              ))}

              <circle cx="455" cy="200" r="38" fill="#111" stroke="#2a2a2a" strokeWidth="2"/>
              <circle cx="455" cy="200" r="26" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="1"/>
              <circle cx="455" cy="200" r="10" fill="#c8a84b" opacity="0.9"/>
              {[0,60,120,180,240,300].map((deg, i) => (
                <line key={i}
                  x1={455 + 12*Math.cos(deg*Math.PI/180)}
                  y1={200 + 12*Math.sin(deg*Math.PI/180)}
                  x2={455 + 24*Math.cos(deg*Math.PI/180)}
                  y2={200 + 24*Math.sin(deg*Math.PI/180)}
                  stroke="#3a3a3a" strokeWidth="2.5"/>
              ))}

              {/* Headlight */}
              <path d="M548,145 Q562,152 564,165 L548,163 Z" fill="#c8a84b" opacity="0.9" filter="url(#glow)"/>
              {/* Tail light */}
              <path d="M65,150 Q60,160 61,172 L75,170 Z" fill="#c0392b" opacity="0.8"/>

              {/* Underline / ground shadow */}
              <ellipse cx="310" cy="236" rx="260" ry="8" fill="rgba(200,168,75,0.06)"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
