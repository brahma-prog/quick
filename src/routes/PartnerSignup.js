import React, { useState } from "react";
import "./PartnerSignup.css";

export default function PartnerSignup() {
  const [type, setType] = useState("doctor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    specialty: "",
    pharmacyName: "",
    licenseNumber: "",
    vehicleType: "",
    experience: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data based on partner type
    let submissionData = {
      type,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    // Add type-specific data
    if (type === "doctor") {
      submissionData.specialty = formData.specialty;
      submissionData.licenseNumber = formData.licenseNumber;
    } else if (type === "vendor") {
      submissionData.pharmacyName = formData.pharmacyName;
      submissionData.licenseNumber = formData.licenseNumber;
    } else if (type === "delivery") {
      submissionData.vehicleType = formData.vehicleType;
      submissionData.experience = formData.experience;
    }

    console.log("Form submitted:", submissionData);
    alert(`Successfully registered as ${type}! We'll contact you soon.`);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      document: "",
      specialty: "",
      pharmacyName: "",
      licenseNumber: "",
      vehicleType: "",
      experience: ""
    });
  };

  return (
    <div className="page-section container partner-signup-container">
      <div className="partner-header">
        <h2>Partner With Us</h2>
        <p className="subtitle">Join our healthcare network and expand your reach. Sign up as a Doctor, Vendor (Pharmacy) or Delivery Partner.</p>
      </div>

      <div className="partner-tabs-container">
        <div className="partner-tabs">
          <button 
            className={`partner-tab ${type==="doctor"?"active":""}`} 
            onClick={()=>setType("doctor")}
          >
            <div className="tab-icon">🩺</div>
            <div className="tab-content">
              <div className="tab-title">Doctor</div>
              <div className="tab-desc">Medical Professionals</div>
            </div>
          </button>
          
          <button 
            className={`partner-tab ${type==="vendor"?"active":""}`} 
            onClick={()=>setType("vendor")}
          >
            <div className="tab-icon">🏥</div>
            <div className="tab-content">
              <div className="tab-title">Vendor / Pharmacy</div>
              <div className="tab-desc">Medical Suppliers</div>
            </div>
          </button>
          
          <button 
            className={`partner-tab ${type==="delivery"?"active":""}`} 
            onClick={()=>setType("delivery")}
          >
            <div className="tab-icon">🚚</div>
            <div className="tab-content">
              <div className="tab-title">Delivery Partner</div>
              <div className="tab-desc">Logistics & Delivery</div>
            </div>
          </button>
        </div>
        
        <div className="tab-indicator">
          <div className={`indicator-dot ${type==="doctor"?"active":""}`}></div>
          <div className={`indicator-dot ${type==="vendor"?"active":""}`}></div>
          <div className={`indicator-dot ${type==="delivery"?"active":""}`}></div>
        </div>
      </div>

      <div className="partner-form-container">
        <div className="form-header">
          <h3>{type === "doctor" ? "Doctor Registration" : 
               type === "vendor" ? "Vendor/Pharmacy Registration" : 
               "Delivery Partner Registration"}</h3>
          <p className="form-subtitle">
            {type === "doctor" ? "Join our network of medical professionals" : 
             type === "vendor" ? "Connect your pharmacy with patients in need" : 
             "Deliver healthcare essentials to doorsteps"}
          </p>
        </div>

        <form className="partner-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>Basic Information</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Full name *
                  <input 
                    required 
                    placeholder="Enter your full name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              <div className="form-group">
                <label>
                  Email *
                  <input 
                    required 
                    type="email" 
                    placeholder="you@example.com" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              <div className="form-group">
                <label>
                  Phone *
                  <input 
                    required 
                    placeholder="+91 ..." 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>{type === "doctor" ? "Professional Details" : 
                 type === "vendor" ? "Business Details" : 
                 "Delivery Details"}</h4>
            
            {type === "doctor" && (
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Medical Specialty *
                    <select 
                      required 
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                    >
                      <option value="">Select specialty</option>
                      <option value="general">General Physician</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                
                <div className="form-group">
                  <label>
                    Medical License Number *
                    <input 
                      required 
                      placeholder="Enter your license number"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            )}
            
            {type === "vendor" && (
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Pharmacy/Business Name *
                    <input 
                      required 
                      placeholder="Enter business name"
                      name="pharmacyName"
                      value={formData.pharmacyName}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                
                <div className="form-group">
                  <label>
                    Business License Number *
                    <input 
                      required 
                      placeholder="Enter license number"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            )}
            
            {type === "delivery" && (
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Vehicle Type *
                    <select 
                      required 
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                    >
                      <option value="">Select vehicle</option>
                      <option value="bike">Motorcycle/Scooter</option>
                      <option value="car">Car</option>
                      <option value="bicycle">Bicycle</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                
                <div className="form-group">
                  <label>
                    Delivery Experience (Years) *
                    <input 
                      required 
                      type="number" 
                      min="0"
                      placeholder="Years of experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            )}
            
            <div className="form-group full-width">
              <label>
                Additional Documents / Registration No
                <textarea 
                  placeholder="Add any additional information or document numbers here..."
                  rows="3"
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="form-footer">
            <p className="form-note">
              By registering, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
            </p>
            <button type="submit" className="btn btn-primary">
              Register as {type === "doctor" ? "Doctor" : 
                         type === "vendor" ? "Vendor" : 
                         "Delivery Partner"}
            </button>
          </div>
        </form>
        
        <div className="partner-benefits">
          <h4>Benefits of Partnering with Us</h4>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h5>Expand Your Reach</h5>
              <p>Connect with thousands of patients and customers in your area.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h5>Business Growth</h5>
              <p>Increase your revenue with our streamlined platform and support.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🛡️</div>
              <h5>Secure & Reliable</h5>
              <p>Verified users and secure transactions for peace of mind.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}