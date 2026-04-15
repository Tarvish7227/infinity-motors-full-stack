import React from "react";
import "./Services.css";

const services = [
  {
    icon: "🔍",
    title: "Car Sourcing",
    desc: "Can't find your dream car? We'll source it for you from our national network of dealers and auctions.",
  },
  {
    icon: "💰",
    title: "Finance & EMI",
    desc: "Flexible financing options with competitive interest rates. Get pre-approved in under 30 minutes.",
  },
  {
    icon: "📋",
    title: "Trade-In",
    desc: "Get the best value for your existing vehicle. Instant evaluation with no hidden deductions.",
  },
  {
    icon: "🛡️",
    title: "Warranty & Insurance",
    desc: "Comprehensive warranty plans and insurance packages tailored to your needs and budget.",
  },
  {
    icon: "🔧",
    title: "Service & Maintenance",
    desc: "State-of-the-art service center staffed by certified technicians for all makes and models.",
  },
  {
    icon: "🚗",
    title: "Home Delivery",
    desc: "Your car delivered to your doorstep, fully inspected and ready to drive. Anywhere in India.",
  },
];

export default function Services() {
  return (
    <section className="services-section section" id="services">
      <div className="container">
        <div className="services-header">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Complete Auto Solutions</h2>
          <p className="section-sub">From purchase to maintenance, we handle every aspect of your automotive journey.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
