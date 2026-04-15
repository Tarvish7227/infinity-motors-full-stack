import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo footer-logo">
              <span style={{color:'var(--accent)'}}>◆</span>
              <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.5rem',letterSpacing:'0.1em'}}>
                Infinity<span style={{color:'var(--accent)'}}>MOTORS</span>
              </span>
            </a>
            <p className="footer-tagline">
              Gujarat's premier luxury and performance car dealership. Trusted since 2004.
            </p>
            <div className="footer-socials">
              {["Instagram", "Facebook", "YouTube", "WhatsApp"].map(s => (
                <a key={s} href="#" className="social-link">{s[0]}</a>
              ))}
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Inventory</h4>
            <ul>
              {["Luxury Cars", "Sports Cars", "SUVs", "Electric Vehicles", "Pre-owned"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Services</h4>
            <ul>
              {["Finance & EMI", "Trade-In", "Car Sourcing", "Insurance", "Home Delivery"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              {["About Us", "Careers", "Blog", "Press", "Contact"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Infinity Motors. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
