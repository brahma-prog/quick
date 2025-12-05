import React, { useState, useEffect } from 'react';

const COLORS = {
  primary: '#009688',
  mint: '#4DB6AC',
  softbg: '#E0F2F1',
  white: '#FFFFFF',
  darktext: '#124441',
  softtext: '#4F6F6B',
};

const Doctors = ({ onNavigateToLogin }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [bookingSlot, setBookingSlot] = useState(null);

  // RESPONSIVE BREAKPOINTS (work in mobile devtools too)
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    setIsVisible(true);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Hide navbar + background scroll when modal is open
  useEffect(() => {
    if (selectedDoctor) {
      document.body.style.overflow = 'hidden';

      const navbarSelectors = [
        'header',
        'nav',
        '.navbar',
        '[class*="navbar"]',
        '[class*="header"]',
        '[class*="nav"]',
      ];

      navbarSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          if (!element.hasAttribute('data-original-display')) {
            element.setAttribute('data-original-display', element.style.display || '');
          }
          element.style.display = 'none';
        });
      });
    } else {
      document.body.style.overflow = 'unset';

      const elements = document.querySelectorAll('[data-original-display]');
      elements.forEach((element) => {
        const originalDisplay = element.getAttribute('data-original-display');
        element.style.display = originalDisplay;
        element.removeAttribute('data-original-display');
      });
    }
  }, [selectedDoctor]);

  // ---------- STYLES (fully fluid / responsive) ----------
  const styles = {
    doctors: {
      minHeight: '100vh',
      width: '100%',
      background: `linear-gradient(135deg, ${COLORS.softbg} 0%, ${COLORS.white} 50%, ${COLORS.softbg} 100%)`,
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 3rem',
      boxSizing: 'border-box',
    },
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      boxSizing: 'border-box',
    },
    sectionTitle: {
      fontSize: isMobile ? '2.1rem' : isTablet ? '2.6rem' : '3rem',
      lineHeight: 1.1,
      textAlign: 'center',
      marginBottom: '0.75rem',
      color: COLORS.darktext,
      fontWeight: '700',
      letterSpacing: '0.03em',
      wordBreak: 'break-word',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    sectionSubtitle: {
      fontSize: isMobile ? '0.95rem' : isTablet ? '1.05rem' : '1.1rem',
      textAlign: 'center',
      marginBottom: isMobile ? '2.5rem' : '3.5rem',
      color: COLORS.softtext,
      maxWidth: '650px',
      marginInline: 'auto',
      lineHeight: 1.5,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.2s',
    },

    doctorsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? 'repeat(2, minmax(0, 1fr))'
        : 'repeat(3, minmax(0, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },

    doctorCard: {
      padding: isMobile ? '1.4rem' : '1.8rem',
      backgroundColor: COLORS.white,
      borderRadius: '18px',
      boxShadow: '0 10px 30px rgba(18, 68, 65, 0.12)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
      border: `1px solid rgba(79, 111, 107, 0.18)`,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      boxSizing: 'border-box',
    },
    doctorHeaderRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '0.5rem',
      flexWrap: 'wrap',
    },
    doctorImage: {
      width: isMobile ? '70px' : '80px',
      height: isMobile ? '70px' : '80px',
      borderRadius: '50%',
      background: COLORS.softbg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.4rem' : '1.6rem',
      color: COLORS.primary,
      border: `2px solid ${COLORS.mint}`,
      flexShrink: 0,
    },
    doctorHeaderText: {
      textAlign: 'left',
      flex: 1,
      minWidth: '0',
    },
    doctorName: {
      fontSize: isMobile ? '1.05rem' : '1.15rem',
      marginBottom: '0.15rem',
      color: COLORS.darktext,
      fontWeight: '600',
      wordBreak: 'break-word',
    },
    doctorSpecialty: {
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      marginBottom: '0.15rem',
      color: COLORS.primary,
      fontWeight: '500',
    },
    tagRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.35rem',
      marginTop: '0.25rem',
    },
    chip: {
      fontSize: '0.7rem',
      padding: '0.12rem 0.6rem',
      borderRadius: '999px',
      background: COLORS.softbg,
      color: COLORS.softtext,
      border: `1px solid rgba(0, 150, 136, 0.35)`,
      whiteSpace: 'nowrap',
    },
    rating: {
      position: 'absolute',
      top: '0.8rem',
      right: '0.8rem',
      backgroundColor: COLORS.mint,
      color: COLORS.white,
      padding: '0.22rem 0.65rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
    doctorExperience: {
      color: COLORS.softtext,
      fontSize: '0.85rem',
      textAlign: 'left',
    },
    availabilityText: {
      color: COLORS.darktext,
      fontSize: '0.8rem',
      fontWeight: '500',
      textAlign: 'left',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '0.6rem',
      marginTop: '0.75rem',
    },
    viewProfileButton: {
      padding: isMobile ? '0.6rem 1rem' : '0.7rem 1.2rem',
      backgroundColor: COLORS.white,
      color: COLORS.primary,
      border: `1px solid ${COLORS.primary}`,
      borderRadius: '999px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      flex: 1,
      width: '100%',
    },
    bookConsultationButton: {
      padding: isMobile ? '0.6rem 1rem' : '0.7rem 1.2rem',
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      border: 'none',
      borderRadius: '999px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      flex: 1,
      width: '100%',
      boxShadow: '0 8px 18px rgba(0, 150, 136, 0.35)',
    },

    // MODAL
    profileModal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: isMobile ? '0.75rem' : '1.5rem',
      boxSizing: 'border-box',
    },
    profileContent: {
      backgroundColor: COLORS.white,
      padding: isMobile ? '1.4rem' : '2.2rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '100%' : '650px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 25px 50px rgba(18, 68, 65, 0.3)',
      boxSizing: 'border-box',
    },
    closeButton: {
      position: 'absolute',
      top: '0.9rem',
      right: '0.9rem',
      background: COLORS.softbg,
      border: 'none',
      fontSize: '1.4rem',
      cursor: 'pointer',
      color: COLORS.darktext,
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    profileHeader: {
      textAlign: 'center',
      marginBottom: '1.6rem',
    },
    profileImage: {
      width: isMobile ? '100px' : '120px',
      height: isMobile ? '100px' : '120px',
      borderRadius: '50%',
      backgroundColor: COLORS.softbg,
      margin: '0 auto 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.9rem' : '2.2rem',
      color: COLORS.primary,
      border: `3px solid ${COLORS.mint}`,
    },
    profileName: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      marginBottom: '0.2rem',
      color: COLORS.darktext,
      fontWeight: '600',
    },
    profileSpecialty: {
      fontSize: isMobile ? '0.95rem' : '1.05rem',
      marginBottom: '0.5rem',
      color: COLORS.primary,
      fontWeight: '500',
    },
    profileRating: {
      backgroundColor: COLORS.mint,
      color: COLORS.white,
      padding: '0.3rem 0.8rem',
      borderRadius: '999px',
      fontSize: '0.8rem',
      fontWeight: '600',
      display: 'inline-block',
      marginBottom: '0.7rem',
    },
    profileDetails: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '0.9rem',
      marginBottom: '1.6rem',
    },
    detailItem: {
      padding: '0.9rem',
      backgroundColor: COLORS.softbg,
      borderRadius: '10px',
      textAlign: 'left',
      boxSizing: 'border-box',
    },
    detailLabel: {
      fontWeight: '600',
      color: COLORS.darktext,
      marginBottom: '0.25rem',
      fontSize: '0.85rem',
    },
    detailValue: {
      color: COLORS.softtext,
      fontSize: '0.85rem',
      lineHeight: 1.4,
      wordBreak: 'break-word',
    },
    fullWidthDetail: {
      gridColumn: '1 / -1',
    },

    // SLOTS
    slotsSection: {
      margin: '1.6rem 0 1rem',
    },
    slotsHeader: {
      fontSize: isMobile ? '1.02rem' : '1.1rem',
      fontWeight: '600',
      color: COLORS.darktext,
      marginBottom: '0.8rem',
      textAlign: 'left',
    },
    slotsContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? 'repeat(auto-fill, minmax(80px, 1fr))'
        : 'repeat(auto-fill, minmax(90px, 1fr))',
      gap: '0.6rem',
      marginBottom: '1rem',
    },
    slotButton: {
      padding: isMobile ? '0.6rem 0.3rem' : '0.7rem 0.4rem',
      backgroundColor: COLORS.white,
      border: `1px solid rgba(79, 111, 107, 0.25)`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      color: COLORS.softtext,
      boxSizing: 'border-box',
    },
    selectedSlot: {
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      borderColor: COLORS.primary,
    },
    availableSlot: {
      backgroundColor: COLORS.softbg,
      borderColor: COLORS.mint,
      color: COLORS.darktext,
    },
    unavailableSlot: {
      opacity: 0.45,
      cursor: 'not-allowed',
    },
    loadingSlots: {
      textAlign: 'center',
      padding: '1.5rem 0',
      color: COLORS.softtext,
      fontSize: '0.9rem',
    },
    selectedSlotInfo: {
      backgroundColor: COLORS.softbg,
      border: `1px solid ${COLORS.mint}`,
      padding: '0.8rem',
      borderRadius: '10px',
      marginBottom: '0.8rem',
      textAlign: 'center',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      color: COLORS.darktext,
    },

    modalBookConsultationButton: {
      padding: isMobile ? '0.8rem 1.4rem' : '0.9rem 1.8rem',
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      border: 'none',
      borderRadius: '999px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: isMobile ? '0.95rem' : '1rem',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '0.8rem',
      boxShadow: '0 8px 20px rgba(0, 150, 136, 0.35)',
      boxSizing: 'border-box',
    },
    disabledButton: {
      backgroundColor: COLORS.softbg,
      color: COLORS.softtext,
      boxShadow: 'none',
      cursor: 'not-allowed',
      border: `1px solid rgba(79, 111, 107, 0.25)`,
    },
    loginMessage: {
      backgroundColor: COLORS.softbg,
      border: `1px dashed ${COLORS.mint}`,
      padding: '0.9rem',
      borderRadius: '10px',
      marginTop: '0.9rem',
      color: COLORS.softtext,
      textAlign: 'center',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
    },
    loginLink: {
      color: COLORS.primary,
      fontWeight: '600',
      textDecoration: 'underline',
      cursor: 'pointer',
      marginLeft: '0.3rem',
    },

    loginPromptModal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001,
      padding: isMobile ? '0.5rem' : '1rem',
      boxSizing: 'border-box',
      backdropFilter: 'blur(4px)',
    },
    loginPromptContent: {
      backgroundColor: COLORS.white,
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: '16px',
      maxWidth: isMobile ? '92%' : '420px',
      width: '100%',
      boxShadow: '0 20px 40px rgba(18, 68, 65, 0.35)',
      textAlign: 'center',
      boxSizing: 'border-box',
    },
    loginPromptTitle: {
      fontSize: isMobile ? '1.25rem' : '1.4rem',
      color: COLORS.darktext,
      marginBottom: '0.8rem',
      fontWeight: '700',
    },
    loginPromptText: {
      fontSize: isMobile ? '0.95rem' : '1rem',
      color: COLORS.softtext,
      marginBottom: '1.6rem',
      lineHeight: '1.5',
    },
    loginPromptButtons: {
      display: 'flex',
      gap: '0.8rem',
      justifyContent: 'center',
      flexDirection: isMobile ? 'column-reverse' : 'row',
    },
    loginButton: {
      padding: isMobile ? '0.8rem 1.8rem' : '0.9rem 2.1rem',
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      border: 'none',
      borderRadius: '999px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      flex: isMobile ? 1 : 'none',
      boxShadow: '0 8px 20px rgba(0, 150, 136, 0.4)',
    },
    cancelLoginButton: {
      padding: isMobile ? '0.8rem 1.8rem' : '0.9rem 2.1rem',
      backgroundColor: COLORS.softbg,
      color: COLORS.softtext,
      border: `1px solid rgba(79, 111, 107, 0.3)`,
      borderRadius: '999px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      flex: isMobile ? 1 : 'none',
    },
  };

  // -------- DOCTORS (Baby care, Pregnancy, General Physician only) --------
  const doctors = [
    {
      id: 1,
      name: 'Dr. Meera Nair',
      specialty: 'Baby Care Specialist (Pediatrics)',
      serviceType: 'Baby Care',
      experience: '9+ years',
      rating: '4.9',
      initial: 'MN',
      education: 'MBBS, MD - Pediatrics',
      languages: 'English, Hindi, Malayalam',
      consultationFee: '₹600',
      availability: 'Mon–Sat · 9:00 AM – 6:00 PM',
      workingHours: { start: 9, end: 18 },
      about:
        'Dedicated pediatrician focused on newborn and infant care, vaccinations, feeding issues, and growth tracking. Trusted by young parents across India.',
      patients: '4500+ families',
      status: 'Online now',
      nextAvailable: 'Next in 15 mins',
    },
    {
      id: 2,
      name: 'Dr. Aditi Rao',
      specialty: 'Obstetrician & Gynecologist',
      serviceType: 'Pregnancy Care',
      experience: '11+ years',
      rating: '4.8',
      initial: 'AR',
      education: 'MBBS, MS - Obstetrics & Gynecology',
      languages: 'English, Hindi, Telugu',
      consultationFee: '₹750',
      availability: 'Mon–Sat · 10:00 AM – 7:00 PM',
      workingHours: { start: 10, end: 19 },
      about:
        'Specialised in high-risk pregnancies, trimester-wise antenatal care, and counseling for expecting mothers. Helps mothers with diet, tests, and delivery planning.',
      patients: '5000+ mothers',
      status: 'Available today',
      nextAvailable: 'Next in 30 mins',
    },
    {
      id: 3,
      name: 'Dr. Karan Singh',
      specialty: 'General Physician',
      serviceType: 'General Physician',
      experience: '10+ years',
      rating: '4.9',
      initial: 'KS',
      education: 'MBBS, MD - Internal Medicine',
      languages: 'English, Hindi, Punjabi',
      consultationFee: '₹500',
      availability: 'Mon–Sun · 8:00 AM – 9:00 PM',
      workingHours: { start: 8, end: 21 },
      about:
        'Experienced family physician for fever, infections, lifestyle diseases, follow-ups, and long-term health management for the whole family.',
      patients: '7000+ patients',
      status: 'Online now',
      nextAvailable: 'Instant consultation',
    },
    {
      id: 4,
      name: 'Dr. Riya Desai',
      specialty: 'Neonatologist & Baby Care',
      serviceType: 'Baby Care',
      experience: '7+ years',
      rating: '4.8',
      initial: 'RD',
      education: 'MBBS, MD - Pediatrics, Fellowship in Neonatology',
      languages: 'English, Hindi, Gujarati',
      consultationFee: '₹650',
      availability: 'Mon–Fri · 9:00 AM – 5:00 PM',
      workingHours: { start: 9, end: 17 },
      about:
        'Neonatal specialist for premature babies, NICU follow-ups, low-birth-weight babies, and early milestone monitoring.',
      patients: '2500+ babies',
      status: 'Available today',
      nextAvailable: 'Today evening',
    },
    {
      id: 5,
      name: 'Dr. Shalini Verma',
      specialty: 'Pregnancy & Postnatal Care',
      serviceType: 'Pregnancy Care',
      experience: '8+ years',
      rating: '4.7',
      initial: 'SV',
      education: 'MBBS, DNB - Obstetrics & Gynecology',
      languages: 'English, Hindi',
      consultationFee: '₹700',
      availability: 'Tue–Sun · 11:00 AM – 8:00 PM',
      workingHours: { start: 11, end: 20 },
      about:
        'Helps mothers from planning pregnancy to post-delivery recovery, C-section/normal delivery counseling, lactation guidance, and emotional support.',
      patients: '3200+ mothers',
      status: 'Online now',
      nextAvailable: 'Next in 20 mins',
    },
  ];

  // ---------- SLOTS ----------
  const generateHourWiseSlots = (doctor) => {
    const slots = [];
    const startHour = doctor.workingHours.start;
    const endHour = doctor.workingHours.end;

    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(timeString);
    }
    return slots;
  };

  const fetchAvailableSlots = async (doctor) => {
    setLoadingSlots(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const allSlots = generateHourWiseSlots(doctor);
    const available = {};

    allSlots.forEach((slot) => {
      const hour = parseInt(slot.split(':')[0], 10);
      const isPeakHour = hour >= 10 && hour <= 14;
      const availabilityChance = isPeakHour ? 0.6 : 0.8;
      available[slot] = Math.random() > 1 - availabilityChance;
    });

    const availableSlotsList = Object.keys(available).filter((slot) => available[slot]);
    if (availableSlotsList.length < 2) {
      allSlots.slice(0, 2).forEach((slot) => {
        available[slot] = true;
      });
    }

    setAvailableSlots(available);
    setLoadingSlots(false);
  };

  const handleViewProfile = async (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    await fetchAvailableSlots(doctor);
  };

  const handleCloseProfile = () => {
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setAvailableSlots({});
  };

  const handleSlotSelect = (slot) => {
    if (availableSlots[slot]) {
      setSelectedSlot(slot);
    }
  };

  const handleBookConsultation = (doctor = null) => {
    const doctorToBook = doctor || selectedDoctor;
    const doctorName = doctorToBook ? doctorToBook.name : 'the doctor';

    if (!selectedSlot && selectedDoctor) {
      alert('Please select a time slot first to book consultation with ' + doctorName);
      return;
    }

    setBookingDoctor(doctorToBook);
    setBookingSlot(selectedSlot);
    setShowLoginPrompt(true);
  };

  const handleLoginConfirm = () => {
    setShowLoginPrompt(false);
    if (selectedDoctor) {
      handleCloseProfile();
    }
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  const handleLoginCancel = () => {
    setShowLoginPrompt(false);
    setBookingDoctor(null);
    setBookingSlot(null);
  };

  const handleLoginLinkClick = () => {
    if (selectedSlot) {
      handleBookConsultation();
    } else {
      alert('Please select a time slot first to book consultation.');
    }
  };

  const formatSlotTime = (slot) => {
    const [hours] = slot.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${ampm}`;
  };

  const LoginPromptModal = ({ onConfirm, onCancel, doctor, slot }) => {
    const doctorName = doctor ? doctor.name : 'the doctor';
    const slotInfo = slot ? ` at ${formatSlotTime(slot)}` : '';

    return (
      <div style={styles.loginPromptModal} onClick={onCancel}>
        <div style={styles.loginPromptContent} onClick={(e) => e.stopPropagation()}>
          <h2 style={styles.loginPromptTitle}>Login required</h2>
          <p style={styles.loginPromptText}>
            Please login to book consultation with {doctorName}
            {slotInfo} and access your prescriptions, reports, and follow-up reminders.
          </p>
          <div style={styles.loginPromptButtons}>
            <button
              style={styles.cancelLoginButton}
              onClick={onCancel}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COLORS.softbg;
              }}
            >
              Not now
            </button>
            <button
              style={styles.loginButton}
              onClick={onConfirm}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Go to login
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------- RENDER ----------
  return (
    <section style={styles.doctors}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Consult Our Trusted Doctors</h2>
        <p style={styles.sectionSubtitle}>
          Baby care specialists, pregnancy experts, and family physicians – all in one place, ready for
          secure online consultation.
        </p>

        <div style={styles.doctorsGrid}>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              style={styles.doctorCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(18, 68, 65, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(18, 68, 65, 0.12)';
              }}
            >
              <div style={styles.rating}>⭐ {doctor.rating}</div>

              <div style={styles.doctorHeaderRow}>
                <div style={styles.doctorImage}>{doctor.initial}</div>
                <div style={styles.doctorHeaderText}>
                  <h3 style={styles.doctorName}>{doctor.name}</h3>
                  <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
                  <div style={styles.tagRow}>
                    <span style={styles.chip}>{doctor.serviceType}</span>
                    <span style={styles.chip}>{doctor.status}</span>
                    <span style={styles.chip}>{doctor.nextAvailable}</span>
                  </div>
                </div>
              </div>

              <p style={styles.doctorExperience}>Experience: {doctor.experience}</p>
              <p style={styles.availabilityText}>Availability: {doctor.availability}</p>

              <div style={styles.buttonContainer}>
                <button
                  style={styles.viewProfileButton}
                  onClick={() => handleViewProfile(doctor)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = COLORS.primary;
                    e.target.style.color = COLORS.white;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = COLORS.white;
                    e.target.style.color = COLORS.primary;
                  }}
                >
                  View profile
                </button>

                <button
                  style={styles.bookConsultationButton}
                  onClick={() => handleBookConsultation(doctor)}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Book consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Profile Modal */}
        {selectedDoctor && (
          <div style={styles.profileModal} onClick={handleCloseProfile}>
            <div style={styles.profileContent} onClick={(e) => e.stopPropagation()}>
              <button
                style={styles.closeButton}
                onClick={handleCloseProfile}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ×
              </button>

              <div style={styles.profileHeader}>
                <div style={styles.profileImage}>{selectedDoctor.initial}</div>
                <h2 style={styles.profileName}>{selectedDoctor.name}</h2>
                <p style={styles.profileSpecialty}>{selectedDoctor.specialty}</p>
                <div style={styles.profileRating}>⭐ {selectedDoctor.rating} rating</div>
              </div>

              <div style={styles.profileDetails}>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Education</div>
                  <div style={styles.detailValue}>{selectedDoctor.education}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Experience</div>
                  <div style={styles.detailValue}>{selectedDoctor.experience}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Languages</div>
                  <div style={styles.detailValue}>{selectedDoctor.languages}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Consultation fee</div>
                  <div style={styles.detailValue}>{selectedDoctor.consultationFee}</div>
                </div>
                <div style={{ ...styles.detailItem, ...styles.fullWidthDetail }}>
                  <div style={styles.detailLabel}>Availability</div>
                  <div style={styles.detailValue}>{selectedDoctor.availability}</div>
                </div>
                <div style={{ ...styles.detailItem, ...styles.fullWidthDetail }}>
                  <div style={styles.detailLabel}>About</div>
                  <div style={styles.detailValue}>{selectedDoctor.about}</div>
                </div>
              </div>

              <div style={styles.slotsSection}>
                <h3 style={styles.slotsHeader}>Available time slots (today)</h3>

                {loadingSlots ? (
                  <div style={styles.loadingSlots}>Checking live availability…</div>
                ) : (
                  <>
                    {selectedSlot && (
                      <div style={styles.selectedSlotInfo}>
                        <strong>Selected slot:</strong> {formatSlotTime(selectedSlot)}
                      </div>
                    )}

                    <div style={styles.slotsContainer}>
                      {Object.entries(availableSlots).map(([slot, isAvailable]) => (
                        <button
                          key={slot}
                          style={{
                            ...styles.slotButton,
                            ...(selectedSlot === slot && styles.selectedSlot),
                            ...(isAvailable && styles.availableSlot),
                            ...(!isAvailable && styles.unavailableSlot),
                          }}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!isAvailable}
                          onMouseEnter={(e) => {
                            if (isAvailable && selectedSlot !== slot) {
                              e.target.style.transform = 'scale(1.04)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isAvailable && selectedSlot !== slot) {
                              e.target.style.transform = 'scale(1)';
                            }
                          }}
                        >
                          {formatSlotTime(slot)}
                        </button>
                      ))}
                    </div>

                    {Object.keys(availableSlots).length === 0 && !loadingSlots && (
                      <div style={styles.loginMessage}>
                        No slots available for today. Please try another doctor or check again later.
                      </div>
                    )}
                  </>
                )}
              </div>

              <button
                style={{
                  ...styles.modalBookConsultationButton,
                  ...(!selectedSlot && styles.disabledButton),
                }}
                onClick={() => handleBookConsultation(selectedDoctor)}
                disabled={!selectedSlot}
                onMouseEnter={(e) => {
                  if (selectedSlot) {
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSlot) {
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {selectedSlot ? `Book consultation at ${formatSlotTime(selectedSlot)}` : 'Select a time slot'}
              </button>

              <div style={styles.loginMessage}>
                Please
                <span style={styles.loginLink} onClick={handleLoginLinkClick}>
                  login
                </span>
                to confirm your booking.
              </div>
            </div>
          </div>
        )}

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <LoginPromptModal
            onConfirm={handleLoginConfirm}
            onCancel={handleLoginCancel}
            doctor={bookingDoctor}
            slot={bookingSlot}
          />
        )}
      </div>
    </section>
  );
};

export default Doctors;
