import React, { useEffect, useState } from "react";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [phoneStatus, setPhoneStatus] = useState("");
  const [currentAnimation, setCurrentAnimation] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // fade-in
    setTimeout(() => setIsVisible(true), 80);

    // rotate animations
    const interval = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % 3);
    }, 4000);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "30-40 min", label: "Avg Delivery Time" },
    { number: "500+", label: "Partner Pharmacies" },
    { number: "100+", label: "Expert Doctors" }
  ];

  const medicalAnimations = [
    {
      title: "Medicine Delivery",
      description:
        "Get your prescribed medicines delivered to your doorstep within 30-40 minutes with real-time tracking",
      image: "truck",
      features: ["Real-time Tracking", "24/7 Service", "Prescription Upload", "Live Updates"]
    },
    {
      title: "Doctor Consultation",
      description:
        "Connect with certified doctors via video call for instant medical advice and e-prescriptions",
      image: "doctor",
      features: ["Instant Booking", "Multiple Specialties", "E-Prescriptions", "Follow-up Care"]
    },
    {
      title: "Emergency Care",
      description:
        "24/7 emergency medical assistance with rapid response teams and GPS-enabled ambulances",
      image: "ambulance",
      features: ["Immediate Response", "Ambulance Service", "GPS Tracking", "Hospital Coordination"]
    }
  ];

  // Validation helpers
  const validateName = name => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name.trim());
  };

  const validateEmail = email => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = phone => {
    const phoneDigits = phone.replace(/\D/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneDigits);
  };

  // input handlers
  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === "name") {
      processedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (field === "phone") {
      processedValue = value.replace(/\D/g, "");
      if (processedValue.length > 0 && /^[6-9]/.test(processedValue)) {
        processedValue = `+91 ${processedValue.slice(0, 10)}`;
      }
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));

    // clear field error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // realtime status for email/phone
    if (field === "email") {
      if (processedValue.trim() === "") {
        setEmailStatus("");
      } else {
        setEmailStatus(validateEmail(processedValue) ? "valid" : "invalid");
      }
    }
    if (field === "phone") {
      const digits = processedValue.replace(/\D/g, "");
      if (!digits) setPhoneStatus("");
      else setPhoneStatus(validatePhone(processedValue) ? "valid" : "invalid");
    }
  };

  const handleFocus = field => {
    document.querySelector(`.contact-form .form-group.${field}`)?.classList.add("focused");
  };
  const handleBlur = field => {
    document.querySelector(`.contact-form .form-group.${field}`)?.classList.remove("focused");

    if (field === "name" && formData.name.trim()) {
      if (!validateName(formData.name)) {
        setErrors(prev => ({ ...prev, name: "Name should contain only alphabets" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!validateName(formData.name)) newErrors.name = "Name should contain only alphabets";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(formData.phone)) newErrors.phone = "Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9";

    if (!formData.service) newErrors.service = "Please select a service";

    if (!formData.message.trim()) newErrors.message = "Please provide details";

    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // scroll to first error
      const firstError = document.querySelector(".contact-form .field-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    // simulate server action
    setTimeout(() => {
      alert("Thank you! We will contact you within 30 minutes for your medicine delivery/consultation.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setEmailStatus("");
      setPhoneStatus("");
      setErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  const handleAnimationChange = index => {
    setCurrentAnimation(index);
  };

  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.round(Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50)),
    left: Math.round(Math.random() * 100),
    top: Math.round(Math.random() * 100),
    delay: +(Math.random() * 5).toFixed(2)
  }));

  const currentAnimationData = medicalAnimations[currentAnimation];

  // compose mailto & gmail compose links (support)
  const supportEmail = "help@quickmed.example";
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    supportEmail
  )}&su=${encodeURIComponent("Forgot password - QuickMed")}&body=${encodeURIComponent("Hi QuickMed support,\n\nI forgot my password. My registered email: ")}`;

  // render small inline animation blocks (truck/doctor/ambulance) using CSS classes
  const renderRealTimeAnimation = () => {
    switch (currentAnimation) {
      case 0:
        return (
          <div className="real-time-animation">
            <div className="delivery-animation">
              <div className="delivery-truck" aria-hidden>🚚</div>
            </div>
            <div className="delivery-path" aria-hidden />
            <div className="delivery-dots" aria-hidden>
              {[...Array(8)].map((_, i) => <div key={i} className="delivery-dot" />)}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="real-time-animation">
            <div className="consultation-animation" aria-hidden>
              <div className="doctor-icon">👨‍⚕️</div>
              <div className="video-waves" />
              <div className="video-waves delay" />
              <div className="video-waves delay2" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="real-time-animation">
            <div className="emergency-animation" aria-hidden>
              <div className="ambulance-icon">🚑</div>
            </div>
            <div className="heartbeat-line" aria-hidden />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className={`contact-section ${isVisible ? "visible" : ""}`} id="contact">
      {/* floating background */}
      <div className="floating-elements" aria-hidden>
        {floatingElements.map(el => (
          <span
            key={el.id}
            className="floating-blob"
            style={{
              width: `${el.size}px`,
              height: `${el.size}px`,
              left: `${el.left}%`,
              top: `${el.top}%`,
              animationDelay: `${el.delay}s`
            }}
          />
        ))}
      </div>

      <div className="contact-container">
        <header className="contact-header">
          <h2 className="contact-title">Get Quick Medical Contact</h2>
          <p className="contact-sub">
            Request medicine delivery or doctor consultation. We'll respond within 30 minutes.
          </p>
        </header>

        <div className="stats-grid">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="stat-card"
              onMouseEnter={e => e.currentTarget.classList.add("lift")}
              onMouseLeave={e => e.currentTarget.classList.remove("lift")}
            >
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="main-grid">
          <div className="form-column">
            <div className="contact-form" role="form" aria-labelledby="contact-form-heading">
              <div className="form-header">
                <h3 id="contact-form-heading" className="form-title">Request Quick Service</h3>
                <p className="form-sub">
                  Fill this form for medicine delivery or doctor consultation. We'll respond within 30 minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className={`form-group name ${errors.name ? "error" : ""}`}>
                    <label>Full Name <span className="required">*</span></label>
                    <input
                      type="text"
                      value={formData.name}
                      placeholder="Enter your full name"
                      onChange={e => handleInputChange("name", e.target.value)}
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                    />
                    {errors.name && <div className="field-error">⚠ {errors.name}</div>}
                  </div>

                  <div className={`form-group email ${errors.email ? "error" : ""}`}>
                    <label>Email <span className="required">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      placeholder="Enter your email"
                      onChange={e => handleInputChange("email", e.target.value)}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                    />
                    {errors.email && <div className="field-error">⚠ {errors.email}</div>}
                    {emailStatus === "valid" && <div className="status valid">✓ Valid email</div>}
                    {emailStatus === "invalid" && formData.email && <div className="status invalid">✗ Invalid email format</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-group phone ${errors.phone ? "error" : ""}`}>
                    <label>Phone <span className="required">*</span></label>
                    <input
                      type="tel"
                      value={formData.phone}
                      placeholder="+91 "
                      onChange={e => handleInputChange("phone", e.target.value)}
                      onFocus={() => handleFocus("phone")}
                      onBlur={() => handleBlur("phone")}
                    />
                    {errors.phone && <div className="field-error">⚠ {errors.phone}</div>}
                    {phoneStatus === "valid" && <div className="status valid">✓ Valid mobile number</div>}
                    {phoneStatus === "invalid" && formData.phone && <div className="status invalid">✗ Invalid mobile number</div>}
                  </div>

                  <div className={`form-group service ${errors.service ? "error" : ""}`}>
                    <label>Service <span className="required">*</span></label>
                    <select
                      value={formData.service}
                      onChange={e => handleInputChange("service", e.target.value)}
                      onFocus={() => handleFocus("service")}
                      onBlur={() => handleBlur("service")}
                    >
                      <option value="">Select service</option>
                      <option value="medicine-delivery">Medicine Delivery</option>
                      <option value="doctor-consultation">Doctor Consultation</option>
                      <option value="both">Both Services</option>
                    </select>
                    {errors.service && <div className="field-error">⚠ {errors.service}</div>}
                  </div>
                </div>

                <div className={`form-group message ${errors.message ? "error" : ""}`}>
                  <label>
                    {formData.service === "medicine-delivery" ? "Medicine Details *" :
                      formData.service === "doctor-consultation" ? "Symptoms Description *" :
                        "Service Details *"}
                  </label>
                  <textarea
                    placeholder={
                      formData.service === "medicine-delivery" ?
                        "Medicine names, prescription details..." :
                        formData.service === "doctor-consultation" ?
                          "Describe your symptoms and concerns..." :
                          "Tell us about the services you need..."
                    }
                    value={formData.message}
                    onChange={e => handleInputChange("message", e.target.value)}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                  />
                  {errors.message && <div className="field-error">⚠ {errors.message}</div>}
                </div>

                <button
                  className={`submit-btn ${isSubmitting ? "disabled" : ""}`}
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Processing Request..." : "Get Quick Service Now"}
                </button>
              </form>
            </div>
          </div>

          {/* animation column */}
          <div className="animation-column">
            <div className="animation-card" role="region" aria-label="Service animations">
              {renderRealTimeAnimation()}

              <div className="animation-content">
                <h3 className="animation-title">{currentAnimationData.title}</h3>
                <p className="animation-desc">{currentAnimationData.description}</p>

                <div className="features-grid">
                  {currentAnimationData.features.map((f, i) => (
                    <div key={i} className="feature-item">{f}</div>
                  ))}
                </div>
              </div>

              <div className="animation-indicators">
                {medicalAnimations.map((_, idx) => (
                  <button
                    key={idx}
                    className={`anim-indicator ${idx === currentAnimation ? "active" : ""}`}
                    onClick={() => handleAnimationChange(idx)}
                    aria-label={`Show ${medicalAnimations[idx].title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* optional: support links block at bottom */}
      <div className="contact-support">
        <a className="mailto" href={`mailto:${supportEmail}?subject=${encodeURIComponent("Support - QuickMed")}`}>
          Email Support
        </a>
        <a className="gmail" href={gmailComposeLink} target="_blank" rel="noreferrer">
          Open in Gmail
        </a>
      </div>
    </section>
  );
};

export default Contact;
