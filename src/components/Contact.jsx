import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", car: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", email: "", car: "", message: "" });
  };

  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-left">
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">Visit Us or<br />Call Anytime</h2>
            <p className="section-sub">Our team is ready to help you find the perfect vehicle. Walk in or schedule a visit.</p>

            <div className="contact-info">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <div className="info-label">Showroom</div>
                  <div className="info-value">Plot 42, Kalawad Road, Rajkot, Gujarat 360005</div>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <div className="info-label">Call Us</div>
                  <div className="info-value">+91 90030 77777</div>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">⏰</span>
                <div>
                  <div className="info-label">Hours</div>
                  <div className="info-value">Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 4:00 PM</div>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">sales@infinitymotors.in</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <div className="contact-form-card">
              <h3 className="form-title">Book a Test Drive</h3>
              {sent ? (
                <div className="success-msg">
                  ✅ Request sent! We'll call you within 30 minutes.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Arjun Mehta" required />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Interested In</label>
                    <select name="car" value={form.car} onChange={handleChange} required>
                      <option value="">Select a vehicle category</option>
                      <option>Luxury Cars</option>
                      <option>Sports Cars</option>
                      <option>SUVs</option>
                      <option>Electric Vehicles</option>
                      <option>Pre-owned Cars</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message (Optional)</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your requirements..." rows={3} />
                  </div>
                  <button type="submit" className="btn-primary form-submit">
                    Send Request
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
