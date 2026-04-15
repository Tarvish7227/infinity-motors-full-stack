import React, { useState } from "react";
import "./Navbar.css";

const links = ["Home", "Inventory", "Services", "About", "Contact"];

export default function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">Infinity<span className="logo-accent">MOTORS</span></span>
        </a>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#contact" className="btn-primary nav-cta">Book Test Drive</a>
          <button className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
