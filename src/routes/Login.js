import React from "react";
export default function Login() {
  return (
    <div className="page-section container">
      <h2>Patient Login</h2>
      <form className="auth-form" onSubmit={(e)=>{ e.preventDefault(); alert("Login demo"); }}>
        <label>Email<input type="email" required/></label>
        <label>Password<input type="password" required/></label>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
