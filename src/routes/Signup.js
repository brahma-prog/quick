import React from "react";
export default function Signup() {
  return (
    <div className="page-section container">
      <h2>Patient Signup</h2>
      <form className="auth-form" onSubmit={(e)=>{ e.preventDefault(); alert("Signup demo"); }}>
        <label>Name<input required/></label>
        <label>Email<input type="email" required/></label>
        <label>Password<input type="password" required/></label>

        <label>
          I am signing up as:
          <select>
            <option>Patient</option>
          </select>
        </label>

        <button className="btn btn-primary">Create account</button>
      </form>
    </div>
  );
}
