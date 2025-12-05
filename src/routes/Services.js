import React, { useState, useEffect } from "react";
import ServiceDetailsModal from "./ServiceDetailsModal"; // make sure this file is present in same folder
import "./services.css";

/**
 * Services.js
 * - Uses CSS in services.css (color variables from :root)
 * - Uses the ServiceDetailsModal component (uploaded)
 *
 * Make sure :root variables are defined in your global CSS:
 * --primary, --mint, --softbg, --white, --darktext, --softtext, --container
 */

export default function Services({ onNavigateToLogin }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // fade-in effect
    setTimeout(() => setIsVisible(true), 80);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const services = [
    {
      title: "Medicine Delivery",
      description: "Get prescribed medicines delivered to your home within 30–40 mins",
      icon: "💊",
      features: ["24/7 Delivery", "Prescription Upload", "Generic Alternatives", "Real-time Tracking"],
      details: {
        overview:
          "Our fast and reliable medicine delivery service ensures you get your prescribed medications without leaving your home. We partner with licensed pharmacies to provide authentic medicines with proper storage and handling.",
        benefits: [
          "Free delivery on orders above 200",
          "Real-time order tracking",
          "Temperature-sensitive packaging",
          "Prescription verification",
          "Insurance claim support",
        ],
        process: [
          "Upload your prescription",
          "Select medicines from verified pharmacies",
          "Choose delivery time slot",
          "Track your order in real-time",
          "Safe and contactless delivery",
        ],
        pricing: "Starting from ₹2.99 delivery fee. Free for emergency medications.",
        duration: "30–40 minutes (target)",
      },
    },
    {
      title: "Online Consultation",
      description: "Video calls with certified doctors and specialists",
      icon: "🩺",
      features: ["Instant Booking", "Multiple Specialties", "E-Prescriptions", "Follow-up Care"],
      details: {
        overview:
          "Connect with board-certified doctors through secure video consultations. Get medical advice, prescriptions, and specialist referrals from the comfort of your home.",
        benefits: [
          "100+ certified doctors",
          "15+ medical specialties",
          "Secure and private sessions",
          "Instant e-prescriptions",
          "Follow-up consultations",
        ],
        process: [
          "Choose your doctor and specialty",
          "Book appointment (instant or scheduled)",
          "Join video call at appointment time",
          "Receive diagnosis and e-prescription",
          "Get specialist referrals if needed",
        ],
        pricing: "Starting from ₹25 per consultation. Insurance accepted.",
        duration: "15–30 minutes per session",
      },
    },
    {
      title: "Emergency Care",
      description: "Immediate medical assistance for urgent health issues",
      icon: "🚑",
      features: ["24/7 Availability", "Ambulance Service", "Emergency Kit", "GPS Tracking"],
      details: {
        overview:
          "24/7 emergency medical support with instant response teams. We provide immediate assistance, ambulance services, and emergency medical guidance.",
        benefits: [
          "Instant response within minutes",
          "GPS-enabled ambulance tracking",
          "Emergency medical guidance",
          "Hospital coordination",
          "Family notification system",
        ],
        process: [
          "Call emergency helpline",
          "Describe emergency situation",
          "Receive immediate first-aid guidance",
          "Ambulance dispatched if needed",
          "Hospital admission coordination",
        ],
        pricing: "Ambulance charges vary by distance.",
        duration: "Immediate response, ~15-minute ETA depending on location",
      },
    },
    {
      title: "Baby Care Products",
      description: "Premium baby essentials and healthcare products",
      icon: "🍼",
      features: ["Organic Products", "Diapers & Wipes", "Baby Skincare", "Feeding Essentials"],
      details: {
        overview:
          "Complete range of certified baby care products including diapers, skincare, feeding essentials, and healthcare items. All products are dermatologically tested and safe for infants.",
        benefits: [
          "100% organic and hypoallergenic options",
          "Dermatologist tested",
          "Age-specific product ranges",
          "Free delivery on bulk orders",
          "Expert baby care guidance",
        ],
        process: [
          "Browse age-appropriate products",
          "Select from trusted brands",
          "Choose delivery schedule",
          "Get expert recommendations",
          "Regular subscription options",
        ],
        pricing: "Products starting low; subscription boxes available.",
        duration: "Same-day delivery available in selected areas",
      },
    },
    {
      title: "PregnancyCare for Women",
      description: "Pre- and postnatal healthcare services",
      icon: "🤰",
      features: ["Prenatal Checkups", "Nutrition Guidance", "Yoga Sessions", "Postnatal Care"],
      details: {
        overview:
          "Specialized healthcare services for expecting and new mothers. Includes medical checkups, nutrition plans, fitness sessions and emotional support.",
        benefits: [
          "Regular prenatal checkups",
          "Personalized nutrition plans",
          "Pregnancy yoga and fitness",
          "Mental wellness support",
          "Postnatal recovery care",
        ],
        process: [
          "Initial pregnancy assessment",
          "Customized care plan",
          "Regular monitoring and checkups",
          "Delivery preparation and support",
          "Postnatal recovery program",
        ],
        pricing: "Packages starting from ₹99/month.",
        duration: "9 months + postnatal support",
      },
    },
    {
      title: "Health Checkups",
      description: "Comprehensive health packages for all ages",
      icon: "📋",
      features: ["Custom Packages", "Doctor Consultation", "Diet Plans", "Annual Tracking"],
      details: {
        overview:
          "Preventive health checkups for different age groups. Comprehensive packages with reports and specialist consultations.",
        benefits: [
          "Age-specific packages",
          "Comprehensive health assessment",
          "Specialist doctor consultation",
          "Personalized diet/exercise plans",
          "Annual health tracking",
        ],
        process: [
          "Choose health package",
          "Complete tests and assessments",
          "Report generation",
          "Specialist consultation",
          "Personalized health plan",
        ],
        pricing: "Packages starting from ₹99.",
        duration: "2–4 hours depending on package",
      },
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  const handleBookNow = () => {
    // require login before booking
    setShowLoginMessage(true);
  };

  const handleLoginRedirect = () => {
    setShowLoginMessage(false);
    closeModal();
    if (onNavigateToLogin) onNavigateToLogin();
  };

  const handleCancelLogin = () => {
    setShowLoginMessage(false);
  };

  // create floating elements
  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.round(Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50)),
    left: Math.round(Math.random() * 100),
    top: Math.round(Math.random() * 100),
    delay: +(Math.random() * 5).toFixed(2),
  }));

  return (
    <section className={`services-section ${isVisible ? "visible" : ""}`}>
      <div className="services-floating" aria-hidden>
        {floatingElements.map((el) => (
          <span
            key={el.id}
            className="services-blob"
            style={{
              width: `${el.size}px`,
              height: `${el.size}px`,
              left: `${el.left}%`,
              top: `${el.top}%`,
              animationDelay: `${el.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <p className="services-sub">Comprehensive healthcare solutions for all your needs</p>

        <div className="services-grid">
          {services.map((s, idx) => (
            <article
              key={idx}
              className="service-card"
              onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
            >
              <div className="service-icon" aria-hidden>
                <span>{s.icon}</span>
              </div>

              <h3 className="service-title-card">{s.title}</h3>
              <p className="service-desc">{s.description}</p>

              <ul className="service-features">
                {s.features.map((f, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-bullet">•</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="service-actions">
                <button className="btn learn-btn" onClick={() => openModal(s)}>
                  Learn More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Details modal uses your uploaded ServiceDetailsModal component (keeps its own inline styles) */}
      {isModalOpen && selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={closeModal}
          onBookService={handleBookNow}
        />
      )}

      {/* Login required message */}
      {showLoginMessage && (
        <>
          <div className="login-overlay" onClick={handleCancelLogin} />
          <div className="login-prompt" role="dialog" aria-modal="true" aria-label="Login required">
            <h3>Login Required</h3>
            <p>Please login to book this service and access all healthcare features.</p>
            <div className="login-actions">
              <button
                className="btn btn-primary"
                onClick={handleLoginRedirect}
              >
                Go to Login
              </button>
              <button className="btn btn-outline" onClick={handleCancelLogin}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
