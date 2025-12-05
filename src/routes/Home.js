import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Medicines delivered within <span className="accent">30–40 minutes</span></h1>
            <p>Fast delivery, trusted pharmacies, and instant doctor consultations — video, clinic or home visits. Subscriptions for pregnancy & baby care available.</p>
            <div className="hero-cta">
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
              <Link to="/services" className="btn btn-outline">Our Services</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="card">
              <h3>QuickMed Promise</h3>
              <ul>
                <li>Validated prescriptions</li>
                <li>Nearest verified vendor</li>
                <li>Real-time tracking</li>
                <li>Doctor consults & subscriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="section about-section">
        <h2>About Us</h2>
        <p>QuickMed connects patients, doctors, pharmacies and delivery teams in a single platform for fast medication delivery, consultations, and subscription care — designed for families, chronic patients and new mothers.</p>
        <Link to="/about" className="link-more">Learn more</Link>
      </div>

      <div id="services" className="section services-section">
        <h2>Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Medicine Delivery</h3>
            <p>Order medicines and get them at your doorstep within 30–40 minutes.</p>
          </div>
          <div className="service-card">
            <h3>Doctor Consultations</h3>
            <p>Video consults, clinic visits, or home visits — book as required.</p>
          </div>
          <div className="service-card">
            <h3>Subscriptions</h3>
            <p>Pregnancy and baby-care subscription plans for scheduled care and reminders.</p>
          </div>
          <div className="service-card">
            <h3>Prescription Management</h3>
            <p>Upload prescriptions and enable AutoPay for recurring meds.</p>
          </div>
        </div>
      </div>

      <div id="doctors" className="section doctors-section">
        <h2>Doctors</h2>
        <p>Find trusted doctors for general and specialized consultations. Book online or request a home visit.</p>
        <Link to="/doctors" className="link-more">View doctors</Link>
      </div>

      <div id="reviews" className="section reviews-section">
        <h2>Reviews</h2>
        <div className="review-list">
          <blockquote>
            “Fast delivery and the doctor consult was very helpful. Subscribed to the pregnancy plan — highly recommended.”
            <cite>— Ananya</cite>
          </blockquote>
          <blockquote>
            “Prescription handling and tracking worked perfectly. The delivery person was professional.”
            <cite>— Rohit</cite>
          </blockquote>
        </div>
      </div>

      <div id="contact" className="section contact-section">
        <h2>Contact</h2>
        <p>Need help? Reach out for support, vendor partnerships or career enquiries.</p>
        <a className="link-more" href="mailto:help@quickmed.example">help@quickmed.example</a>
      </div>
    </section>
  );
}
