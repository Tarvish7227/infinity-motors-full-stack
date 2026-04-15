import React, { useEffect, useRef, useState } from "react";
import "./Stats.css";

const stats = [
  { value: 2500, suffix: "+", label: "Cars Sold" },
  { value: 20, suffix: " Yrs", label: "Experience" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 150, suffix: "+", label: "Premium Brands" },
];

function useCounter(end, duration = 2000, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);
  return count;
}

function StatItem({ value, suffix, label, active }) {
  const count = useCounter(value, 1800, active);
  return (
    <div className="stat-item">
      <div className="stat-value">{count}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
