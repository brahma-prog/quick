import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Navigation items array
  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/doctors", label: "Doctors" },
    { to: "/reviews", label: "Reviews" },
    { to: "/contact", label: "Contact" },
    
  ];

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  // Close mobile menu on resize > mobile
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (window.innerWidth > 980) {
        setOpen(false);
      }
    }
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest('.mobile-drawer-inner') && 
          !e.target.closest('.hamburger')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/" className="brand" onClick={handleNavClick}>
            <div className="logo-image">
              <img src="/Quickmed img.png" alt="QuickMed" />
            </div>
            <div className="brand-text-container">
              <span className="brand-text">QUICKMED</span>
              <span className="tagline">Quick Care • Smarter Health</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end || false}
              onClick={handleNavClick}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
        
          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((s) => !s);
            }}
          >
            {open ? (
              // Close icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="#124441"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="#124441"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer ${open ? "show" : ""}`}
        onClick={handleNavClick}
      >
        <div
          className="mobile-drawer-inner"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end || false}
                onClick={handleNavClick}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mobile-cta">
              <Link
                to="/login"
                className="btn btn-outline"
                onClick={handleNavClick}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary"
                onClick={handleNavClick}
              >
                Signup
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}