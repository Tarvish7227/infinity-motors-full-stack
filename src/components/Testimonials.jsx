import React, { useState } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Business Owner, Ahmedabad",
    text: "Infinity Motors made buying my Phantom a seamless experience. The team was knowledgeable, patient, and helped me secure the best finance deal. Absolutely world-class service.",
    rating: 5,
    car: "BMW 5-Series",
  },
  {
    name: "Mahek Arora",
    role: "Lawyer, Surat",
    text: "I was nervous about trading in my old car, but Infinity gave me a fair price instantly. The Mercedes EQS they recommended has been perfect for my commute. Couldn't be happier!",
    rating: 5,
    car: "Mercedes EQS",
  },
  {
    name: "Rohan Kapoor",
    role: "Software Engineer, Pune",
    text: "The test drive experience was incredible. No pressure, great knowledge about every technical spec. Got my Virtus in 3 days with home delivery. 10/10.",
    rating: 5,
    car: "Volkswagen Virtus",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="testimonials-section section" id="about">
      <div className="container">
        <div className="testimonials-inner">
          <div className="testimonials-left">
            <p className="section-label">Client Stories</p>
            <h2 className="section-title">What Our<br />Clients Say</h2>
            <p className="section-sub">Real stories from real customers who found their perfect car at Infinity Motors.</p>
            <div className="t-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`t-dot ${i === active ? "active" : ""}`} onClick={() => setActive(i)} />
              ))}
            </div>
          </div>

          <div className="testimonials-right">
            <div className="t-card" key={active}>
              <div className="t-stars">
                {"★".repeat(t.rating)}
              </div>
              <blockquote className="t-quote">"{t.text}"</blockquote>
              <div className="t-author">
                <div className="t-avatar">{t.name[0]}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
                <div className="t-car-badge">🚗 {t.car}</div>
              </div>
            </div>

            <div className="t-nav">
              <button onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}>←</button>
              <span>{active + 1} / {testimonials.length}</span>
              <button onClick={() => setActive((active + 1) % testimonials.length)}>→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
