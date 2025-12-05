import React, { useState } from "react";

export default function PartnerSignup() {
  const [type, setType] = useState("doctor");

  return (
    <div className="page-section container">
      <h2>Partner With Us</h2>
      <p>Sign up as a Doctor, Vendor (Pharmacy) or Delivery Partner.</p>

      <div className="partner-tabs">
        <button className={type==="doctor"?"active":""} onClick={()=>setType("doctor")}>Doctor</button>
        <button className={type==="vendor"?"active":""} onClick={()=>setType("vendor")}>Vendor / Pharmacy</button>
        <button className={type==="delivery"?"active":""} onClick={()=>setType("delivery")}>Delivery Partner</button>
      </div>

      <form className="partner-form" onSubmit={(e)=>{ e.preventDefault(); alert(`Signed up as ${type} (demo)`); }}>
        <label>
          Full name
          <input required placeholder="Name" />
        </label>

        <label>
          Email
          <input required type="email" placeholder="you@example.com" />
        </label>

        <label>
          Phone
          <input required placeholder="+91 ..." />
        </label>

        <label>
          Documents / Registration No (if vendor)
          <input placeholder="Optional" />
        </label>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
