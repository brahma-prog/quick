import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>QuickMed</h4>
          <p>Care you need, when you need it. Fast medicine delivery, doctor consults, subscriptions and baby care support.</p>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/partner-signup">Partner</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>help@quickmed.example</p>
          <p>+91 98765 43210</p>
        </div>

        <div className="footer-col social">
          <h4>Follow</h4>
          <div className="icons">
            <a aria-label="Twitter" href="#" className="icon-svg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M23 4.5c-.8.4-1.6.6-2.5.8  .9-.6 1.6-1.4 1.9-2.4-.8.5-1.7.9-2.7 1.2C18.4 3.7 17.3 3 16 3c-2.2 0-3.9 1.9-3.4 4C9 6.8 6.2 5.1 4 3c-.9 1.6-.4 3.5 1 4.5-.7 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4-.5.1-1.1.1-1.6 0 .5 1.6 2 2.8 3.7 2.8C9 17 6 18 3.5 18.3c2.1 1.3 4.6 2 7.2 2 8.6 0 13.4-7.2 13.4-13.4v-.6c.9-.6 1.6-1.4 2.2-2.3z" fill="#fff"/>
              </svg>
            </a>
            <a aria-label="LinkedIn" href="#" className="icon-svg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="2" fill="#fff" opacity="0.06"/>
                <path d="M6 9h3v9H6zM7.5 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 12h2.5v1.2h.03c.35-.68 1.2-1.4 2.47-1.4 2.64 0 3.13 1.7 3.13 3.9V21h-3v-4.1c0-.98 0-2.24-1.36-2.24-1.36 0-1.57 1.06-1.57 2.15V21h-3V12z" fill="#fff"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} QuickMed. All rights reserved.</span>
      </div>
    </footer>
  );
}
