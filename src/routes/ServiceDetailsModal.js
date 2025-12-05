import React, { useEffect } from "react";

export default function ServiceDetailsModal({ service, onClose, onBookService }) {
  useEffect(() => {
    // trap focus and close on ESC
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // basic focus trap (loop inside modal)
        const focusable = modalRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    // prevent background scrolling
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const modalRef = React.useRef(null);

  useEffect(() => {
    // set initial focus inside modal
    setTimeout(() => {
      const firstBtn = modalRef.current?.querySelector("button, a, input, textarea, select");
      if (firstBtn) firstBtn.focus();
    }, 50);
  }, []);

  if (!service) return null;

  const { title, details = {}, features = [], pricing, duration } = service;
  const { overview = "", benefits = [], process = [] } = details;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
      >
        <header className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close details">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6L18 18M6 18L18 6" stroke="#124441" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        <div className="modal-body">
          <div className="modal-left">
            {overview && <p className="modal-overview">{overview}</p>}

            <div className="modal-meta">
              {pricing && (
                <div className="meta-item">
                  <div className="meta-label">Pricing</div>
                  <div className="meta-value">{pricing}</div>
                </div>
              )}
              {duration && (
                <div className="meta-item">
                  <div className="meta-label">Estimated time</div>
                  <div className="meta-value">{duration}</div>
                </div>
              )}
            </div>

            {benefits && benefits.length > 0 && (
              <section className="modal-section">
                <h3 className="modal-section-title">Benefits</h3>
                <ul className="modal-list">
                  {benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </section>
            )}

            {process && process.length > 0 && (
              <section className="modal-section">
                <h3 className="modal-section-title">How it works</h3>
                <ol className="modal-list ordered">
                  {process.map((p, i) => <li key={i}>{p}</li>)}
                </ol>
              </section>
            )}
          </div>

          <aside className="modal-right" aria-hidden>
            <div className="modal-features-card">
              <h4 className="features-head">Key features</h4>
              <ul className="features-list">
                {features.map((f, i) => (
                  <li key={i} className="features-list-item">
                    <span className="dot" aria-hidden>•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="modal-cta">
                
                <button className="btn btn-outline" onClick={onClose}>Close</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
