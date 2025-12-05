import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // close mobile menu on resize > mobile
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 980) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/" className="brand" onClick={()=>setOpen(false)}>
            <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden>
              <rect width="24" height="24" rx="6" fill="#009688" />
              <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="brand-text">QuickMed</span>
          </Link>
        </div>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={()=>setOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={()=>setOpen(false)}>About</NavLink>
          <NavLink to="/services" onClick={()=>setOpen(false)}>Services</NavLink>
          <NavLink to="/doctors" onClick={()=>setOpen(false)}>Doctors</NavLink>
          <NavLink to="/reviews" onClick={()=>setOpen(false)}>Reviews</NavLink>
          <NavLink to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink>
          <NavLink to="/partner-signup" onClick={()=>setOpen(false)}>Partner With Us</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/signup" className="btn btn-primary">Signup</Link>
          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? (
              // close icon
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path d="M6 6L18 18M6 18L18 6" stroke="#124441" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // hamburger icon
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#124441" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* mobile dropdown overlay */}
      <div className={`mobile-drawer ${open ? "show" : ""}`} onClick={() => setOpen(false)}>
        <div className="mobile-drawer-inner" onClick={(e)=>e.stopPropagation()}>
          <nav className="mobile-nav">
            <NavLink to="/" end onClick={()=>setOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={()=>setOpen(false)}>About</NavLink>
            <NavLink to="/services" onClick={()=>setOpen(false)}>Services</NavLink>
            <NavLink to="/doctors" onClick={()=>setOpen(false)}>Doctors</NavLink>
            <NavLink to="/reviews" onClick={()=>setOpen(false)}>Reviews</NavLink>
            <NavLink to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink>
            <NavLink to="/partner-signup" onClick={()=>setOpen(false)}>Partner With Us</NavLink>
            <div className="mobile-cta">
              <Link to="/login" className="btn btn-outline" onClick={()=>setOpen(false)}>Login</Link>
              <Link to="/signup" className="btn btn-primary" onClick={()=>setOpen(false)}>Signup</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
