import React, { useState } from "react";
import "./FeaturedCars.css";

const categories = ["All", "Luxury", "Sports", "SUV", "Electric", "Sedan"];

const cars = [
  {
    id: 1,
    name: "Honda City",
    brand: "Honda",
    price: "₹10,00,000",
    category: "Luxury",
    year: 2021,
    mileage: "49,000 km",
    fuel: "Petrol",
    image: "https://i.pinimg.com/736x/34/19/9a/34199aab05a3aa57bfbe82f21d2e92de.jpg",
    badge: "New"
  },
  {
    id: 2,
    name: "Hyundai Creta",
    brand: "Hyundai",
    price: "₹5,00,000",
    category: "SUV",
    year: 2018,
    mileage: "80,000 km",
    fuel: "Diesel",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141115/creta-exterior-right-front-three-quarter.jpeg",
    badge: "Hot"
  },
  {
    id: 3,
    name: "BMW M340i",
    brand: "BMW",
    price: "₹55,00,000",
    category: "Sports",
    year: 2024,
    mileage: "12,000 km",
    fuel: "Petrol",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjmSxt1GYMeG483nFLyF6MaKzokUn9l1KLHQmpnpAzA&s&ec=121585071",
    badge: "Deal"
  },
  {
    id: 4,
    name: "MG ZS EV",
    brand: "MG",
    price: "₹11,00,000",
    category: "Electric",
    year: 2021,
    mileage: "51,000 km",
    fuel: "Electric",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/110437/zs-ev-exterior-right-front-three-quarter-68.jpeg?isig=0&q=80",
    badge: "New"
  },
  {
    id: 5,
    name: "Defender V8",
    brand: "Land Rover",
    price: "₹2,45,00,000",
    category: "Luxury",
    year: 2025,
    mileage: "8,000 km",
    fuel: "Petrol",
    image: "https://www.torquenews.com/sites/default/files/images/I%27d%20Call%20The%20Land%20Rover%27s%202025%20Defender%20130%20The%20British%20Equivalent%20of%20America%27s%20Chevy%20Suburban%2C%20And%20My%201st%20Trip%20Was%20To%20Costco%20To%20Get%20Pizza%20For%20Our%20Church.jpg",
    badge: "New"
  },
  {
    id: 6,
    name: "Skoda Slavia",
    brand: "Skoda",
    price: "₹12,50,000",
    category: "Sedan",
    year: 2024,
    mileage: "59,000 km",
    fuel: "Petrol",
    image: "https://www.team-bhp.com/sites/default/files/pictures2023-09/s1_5.jpeg",
    badge: "New"
  }
];

export default function FeaturedCars() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? cars
      : cars.filter(
          (c) => c.category.toLowerCase() === active.toLowerCase()
        );

  return (
    <section className="cars-section section" id="inventory">
      <div className="container">
        <div className="cars-header">
          <div>
            <p className="section-label">Our Inventory</p>
            <h2 className="section-title">Featured Vehicles</h2>
            <p className="section-sub">
              Handpicked for performance, luxury, and value. Every car is
              certified and ready to drive.
            </p>
          </div>
          <a href="#contact" className="btn-outline">
            View All →
          </a>
        </div>

        <div className="cat-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${active === cat ? "active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cars-grid">
          {filtered.map((car) => (
            <div key={car.id} className="car-card">
              {car.badge && (
                <span className="car-badge">{car.badge}</span>
              )}

              <div className="car-image">
                <img
                  src={car.image}
                  alt={car.name}
                  className="car-img"
                />
              </div>

              <div className="car-info">
                <div className="car-meta">
                  <span className="car-brand">{car.brand}</span>
                  <span className="car-category">{car.category}</span>
                </div>

                <h3 className="car-name">{car.name}</h3>

                <div className="car-specs">
                  <span>📅 {car.year}</span>
                  <span>🛣️ {car.mileage}</span>
                  <span>⛽ {car.fuel}</span>
                </div>

                <div className="car-footer">
                  <div className="car-price">{car.price}</div>
                  <button className="car-btn">Details →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="no-cars">No vehicles found.</p>
        )}
      </div>
    </section>
  );
}