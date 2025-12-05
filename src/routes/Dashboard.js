import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "delivery@gmail.com",
    avatar: "https://via.placeholder.com/150",
    phone: "+1 (555) 123-4567",
    membership: "Premium",
    joinDate: "Jan 15, 2024"
  });

  // Mock data for dashboard
  const [stats, setStats] = useState({
    appointments: 3,
    prescriptions: 5,
    orders: 12,
    consultations: 8
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: "Appointment", description: "Consultation with Dr. Smith", date: "Today, 10:30 AM", status: "Upcoming" },
    { id: 2, type: "Prescription", description: "Medicine refill approved", date: "Yesterday, 2:15 PM", status: "Completed" },
    { id: 3, type: "Order", description: "Medicine delivery #ORD-7894", date: "Dec 12, 2024", status: "Delivered" },
    { id: 4, type: "Consultation", description: "Follow-up with Dr. Johnson", date: "Dec 10, 2024", status: "Completed" }
  ]);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, doctor: "Dr. Sarah Wilson", specialty: "Cardiology", date: "Tomorrow, 11:00 AM", location: "Clinic A" },
    { id: 2, doctor: "Dr. Michael Brown", specialty: "Dermatology", date: "Dec 20, 2024, 2:30 PM", location: "Clinic B" }
  ]);

  const handleLogout = () => {
    // Clear user session/token here
    localStorage.removeItem("token");
    navigate("/login");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    header: {
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    logoIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#0d9488",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
    },
    logoText: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#111827",
    },
    userMenu: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    userAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#0d9488",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "600",
      fontSize: "16px",
    },
    userName: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#111827",
    },
    logoutButton: {
      backgroundColor: "transparent",
      border: "1px solid #d1d5db",
      color: "#374151",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    logoutButtonHover: {
      backgroundColor: "#f9fafb",
      borderColor: "#9ca3af",
    },
    mainContent: {
      display: "flex",
      minHeight: "calc(100vh - 73px)",
    },
    sidebar: {
      width: "240px",
      backgroundColor: "#ffffff",
      borderRight: "1px solid #e5e7eb",
      padding: "24px 0",
    },
    sidebarItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 24px",
      color: "#374151",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      borderLeft: "3px solid transparent",
    },
    sidebarItemActive: {
      backgroundColor: "#f0fdfa",
      color: "#0d9488",
      borderLeft: "3px solid #0d9488",
    },
    sidebarItemHover: {
      backgroundColor: "#f9fafb",
    },
    sidebarIcon: {
      width: "20px",
      height: "20px",
    },
    content: {
      flex: 1,
      padding: "24px",
    },
    welcomeSection: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    welcomeTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "8px",
    },
    welcomeText: {
      fontSize: "14px",
      color: "#6b7280",
      lineHeight: "1.5",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
    statCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    statTitle: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "8px",
    },
    statValue: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "4px",
    },
    statChange: {
      fontSize: "12px",
      color: "#10b981",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    sectionsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    sectionCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
    },
    viewAll: {
      fontSize: "14px",
      color: "#0d9488",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "none",
    },
    activityList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    activityItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      paddingBottom: "16px",
      borderBottom: "1px solid #f3f4f6",
    },
    activityIcon: {
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      backgroundColor: "#f0fdfa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#0d9488",
      fontSize: "14px",
    },
    activityContent: {
      flex: 1,
    },
    activityDescription: {
      fontSize: "14px",
      color: "#111827",
      marginBottom: "4px",
    },
    activityMeta: {
      fontSize: "12px",
      color: "#6b7280",
      display: "flex",
      gap: "8px",
    },
    activityStatus: {
      fontSize: "12px",
      fontWeight: "500",
      padding: "2px 8px",
      borderRadius: "12px",
    },
    statusUpcoming: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
    },
    statusCompleted: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
    },
    statusDelivered: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
    },
    appointmentList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    appointmentItem: {
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      padding: "16px",
    },
    appointmentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "12px",
    },
    appointmentDoctor: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#111827",
    },
    appointmentSpecialty: {
      fontSize: "13px",
      color: "#6b7280",
      marginTop: "2px",
    },
    appointmentDetails: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "13px",
      color: "#6b7280",
    },
    actionButton: {
      backgroundColor: "#0d9488",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      marginTop: "12px",
    },
    actionButtonHover: {
      backgroundColor: "#0f766e",
    },
    quickActions: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "12px",
      marginTop: "24px",
    },
    quickAction: {
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    quickActionHover: {
      backgroundColor: "#f0fdfa",
      borderColor: "#0d9488",
    },
    quickActionIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#f0fdfa",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#0d9488",
      fontSize: "16px",
    },
    quickActionText: {
      fontSize: "13px",
      fontWeight: "500",
      color: "#374151",
      textAlign: "center",
    },
    // Mobile styles
    mobileMenuButton: {
      display: "none",
      backgroundColor: "transparent",
      border: "none",
      padding: "8px",
      cursor: "pointer",
    },
    mobileMenuIcon: {
      width: "24px",
      height: "24px",
      color: "#374151",
    },
  };

  // Responsive styles
  const isMobile = window.innerWidth <= 768;
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  if (isMobile) {
    styles.sidebar = {
      ...styles.sidebar,
      position: "fixed",
      top: "73px",
      left: sidebarOpen ? "0" : "-240px",
      bottom: "0",
      zIndex: 100,
      transition: "left 0.3s ease",
    };
    styles.mobileMenuButton.display = "flex";
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg style={styles.mobileMenuIcon} viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={styles.logoIcon}>Q</div>
          <div style={styles.logoText}>QuickMed</div>
        </div>
        
        <div style={styles.userMenu}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={styles.userName}>{user.name}</div>
            </div>
          </div>
          <button
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f9fafb"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <nav>
            <div
              style={{
                ...styles.sidebarItem,
                ...(activeTab === "dashboard" && styles.sidebarItemActive),
              }}
              onClick={() => setActiveTab("dashboard")}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = activeTab === "dashboard" ? "#f0fdfa" : "transparent")}
            >
              <svg style={styles.sidebarIcon} viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Dashboard
            </div>
            
            <div
              style={{
                ...styles.sidebarItem,
                ...(activeTab === "appointments" && styles.sidebarItemActive),
              }}
              onClick={() => setActiveTab("appointments")}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = activeTab === "appointments" ? "#f0fdfa" : "transparent")}
            >
              <svg style={styles.sidebarIcon} viewBox="0 0 24 24" fill="none">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Appointments
            </div>
            
            <div
              style={{
                ...styles.sidebarItem,
                ...(activeTab === "prescriptions" && styles.sidebarItemActive),
              }}
              onClick={() => setActiveTab("prescriptions")}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = activeTab === "prescriptions" ? "#f0fdfa" : "transparent")}
            >
              <svg style={styles.sidebarIcon} viewBox="0 0 24 24" fill="none">
                <path d="M9.172 16.242L12 13.414L14.828 16.242L16.242 14.828L13.414 12L16.242 9.172L14.828 7.758L12 10.586L9.172 7.758L7.758 9.172L10.586 12L7.758 14.828L9.172 16.242Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Prescriptions
            </div>
            
            <div
              style={{
                ...styles.sidebarItem,
                ...(activeTab === "orders" && styles.sidebarItemActive),
              }}
              onClick={() => setActiveTab("orders")}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = activeTab === "orders" ? "#f0fdfa" : "transparent")}
            >
              <svg style={styles.sidebarIcon} viewBox="0 0 24 24" fill="none">
                <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Orders
            </div>
            
            <div
              style={{
                ...styles.sidebarItem,
                ...(activeTab === "consultations" && styles.sidebarItemActive),
              }}
              onClick={() => setActiveTab("consultations")}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = activeTab === "consultations" ? "#f0fdfa" : "transparent")}
            >
              <svg style={styles.sidebarIcon} viewBox="0 0 24 24" fill="none">
                <path d="M17 8H19C20.1046 8 21 8.89543 21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8H7M17 8V6C17 3.79086 15.2091 2 12 2C8.79086 2 7 3.79086 7 6V8M17 8H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Consultations
            </div>
            
            <div
              style={{
                ...styles.sidebarItem,
                ...(activeTab === "profile" && styles.sidebarItemActive),
              }}
              onClick={() => setActiveTab("profile")}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = activeTab === "profile" ? "#f0fdfa" : "transparent")}
            >
              <svg style={styles.sidebarIcon} viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Profile
            </div>
            
            <div
              style={{
                ...styles.sidebarItem,
                ...(activeTab === "settings" && styles.sidebarItemActive),
              }}
              onClick={() => setActiveTab("settings")}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.backgroundColor = activeTab === "settings" ? "#f0fdfa" : "transparent")}
            >
              <svg style={styles.sidebarIcon} viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2662 15.3057 19.1349 15.6102 19.006 15.9134C18.9141 16.1321 18.8232 16.3496 18.7333 16.566C18.5175 17.1068 18.305 17.6422 18.0958 18.172C18.0359 18.3242 17.9762 18.4758 17.9167 18.6268C17.8035 18.9157 17.6906 19.2041 17.578 19.492C17.409 19.935 17.2407 20.3772 17.0733 20.8188C17.0119 20.9787 16.9506 21.1385 16.8893 21.2983C16.7569 21.6601 16.625 22.0214 16.4933 22.382C16.4234 22.5774 16.3536 22.7727 16.2838 22.968C16.1988 23.2055 16.114 23.4428 16.0293 23.68L15.828 24H8.172L7.97067 23.68C7.886 23.4428 7.80117 23.2055 7.71617 22.968C7.64636 22.7727 7.57663 22.5774 7.50667 22.382C7.375 22.0214 7.24314 21.6601 7.11067 21.2983C7.04936 21.1385 6.98807 20.9787 6.92667 20.8188C6.75933 20.3772 6.591 19.935 6.422 19.492C6.30944 19.2041 6.19654 18.9157 6.08333 18.6268C6.02378 18.4758 5.96414 18.3242 5.90417 18.172C5.695 17.6422 5.4825 17.1068 5.26667 16.566C5.17683 16.3496 5.08594 16.1321 4.994 15.9134C4.86506 15.6102 4.73383 15.3057 4.6 15C4.46617 14.6943 4.33494 14.3898 4.206 14.0866C4.11406 13.8679 4.02317 13.6504 3.93333 13.434C3.7175 12.8932 3.505 12.3578 3.29583 11.828C3.23586 11.6758 3.17622 11.5242 3.11667 11.3732C3.00346 11.0843 2.89056 10.7959 2.778 10.508C2.609 10.065 2.44067 9.62283 2.27333 9.18117C2.21193 9.02133 2.15064 8.8615 2.08933 8.70167C1.95686 8.33994 1.825 7.97861 1.69333 7.618C1.62336 7.42261 1.55364 7.22733 1.48383 7.032C1.39883 6.7945 1.314 6.55717 1.22933 6.32L1.028 6H22.972L22.7707 6.32C22.686 6.55717 22.6012 6.7945 22.5162 7.032C22.4464 7.22733 22.3766 7.42261 22.3067 7.618C22.175 7.97861 22.0431 8.33994 21.9107 8.70167C21.8494 8.8615 21.7881 9.02133 21.7267 9.18117C21.5593 9.62283 21.391 10.065 21.222 10.508C21.1094 10.7959 20.9965 11.0843 20.8833 11.3732C20.8238 11.5242 20.7641 11.6758 20.7042 11.828C20.495 12.3578 20.2825 12.8932 20.0667 13.434C19.9768 13.6504 19.8859 13.8679 19.794 14.0866C19.6651 14.3898 19.5338 14.6943 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Settings
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main style={styles.content}>
          {activeTab === "dashboard" && (
            <>
              {/* Welcome Section */}
              <div style={styles.welcomeSection}>
                <h1 style={styles.welcomeTitle}>Welcome back, {user.name}!</h1>
                <p style={styles.welcomeText}>
                  Here's what's happening with your health services today. You have {stats.appointments} upcoming appointments and {stats.orders} active orders.
                </p>
              </div>

              {/* Stats Grid */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statTitle}>Upcoming Appointments</div>
                  <div style={styles.statValue}>{stats.appointments}</div>
                  <div style={styles.statChange}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 9.5V2.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    2 more than last week
                  </div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.statTitle}>Active Prescriptions</div>
                  <div style={styles.statValue}>{stats.prescriptions}</div>
                  <div style={styles.statChange}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 9.5V2.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    1 more than last week
                  </div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.statTitle}>Total Orders</div>
                  <div style={styles.statValue}>{stats.orders}</div>
                  <div style={styles.statChange}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2.5V9.5M6 9.5L3 6.5M6 9.5L9 6.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    3 less than last week
                  </div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.statTitle}>Consultations</div>
                  <div style={styles.statValue}>{stats.consultations}</div>
                  <div style={styles.statChange}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 9.5V2.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    4 more than last week
                  </div>
                </div>
              </div>

              {/* Recent Activity & Upcoming Appointments */}
              <div style={styles.sectionsGrid}>
                {/* Recent Activity */}
                <div style={styles.sectionCard}>
                  <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Recent Activity</h2>
                    <a href="#" style={styles.viewAll}>View All</a>
                  </div>
                  <div style={styles.activityList}>
                    {recentActivity.map((activity) => (
                      <div key={activity.id} style={styles.activityItem}>
                        <div style={styles.activityIcon}>
                          {activity.type.charAt(0)}
                        </div>
                        <div style={styles.activityContent}>
                          <div style={styles.activityDescription}>
                            {activity.description}
                          </div>
                          <div style={styles.activityMeta}>
                            <span>{activity.date}</span>
                            <div style={{
                              ...styles.activityStatus,
                              ...(activity.status === "Upcoming" ? styles.statusUpcoming :
                                activity.status === "Completed" ? styles.statusCompleted :
                                styles.statusDelivered)
                            }}>
                              {activity.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Appointments */}
                <div style={styles.sectionCard}>
                  <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Upcoming Appointments</h2>
                    <a href="#" style={styles.viewAll}>View All</a>
                  </div>
                  <div style={styles.appointmentList}>
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} style={styles.appointmentItem}>
                        <div style={styles.appointmentHeader}>
                          <div>
                            <div style={styles.appointmentDoctor}>{appointment.doctor}</div>
                            <div style={styles.appointmentSpecialty}>{appointment.specialty}</div>
                          </div>
                        </div>
                        <div style={styles.appointmentDetails}>
                          <span>{appointment.date}</span>
                          <span>•</span>
                          <span>{appointment.location}</span>
                        </div>
                        <button
                          style={styles.actionButton}
                          onMouseEnter={(e) => e.target.style.backgroundColor = "#0f766e"}
                          onMouseLeave={(e) => e.target.style.backgroundColor = "#0d9488"}
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={styles.quickActions}>
                <div
                  style={styles.quickAction}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0fdfa"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                  onClick={() => setActiveTab("appointments")}
                >
                  <div style={styles.quickActionIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={styles.quickActionText}>Book Appointment</div>
                </div>
                
                <div
                  style={styles.quickAction}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0fdfa"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                  onClick={() => setActiveTab("orders")}
                >
                  <div style={styles.quickActionIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={styles.quickActionText}>Order Medicine</div>
                </div>
                
                <div
                  style={styles.quickAction}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0fdfa"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                  onClick={() => setActiveTab("prescriptions")}
                >
                  <div style={styles.quickActionIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9.172 16.242L12 13.414L14.828 16.242L16.242 14.828L13.414 12L16.242 9.172L14.828 7.758L12 10.586L9.172 7.758L7.758 9.172L10.586 12L7.758 14.828L9.172 16.242Z" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={styles.quickActionText}>Refill Prescription</div>
                </div>
                
                <div
                  style={styles.quickAction}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0fdfa"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                  onClick={() => setActiveTab("consultations")}
                >
                  <div style={styles.quickActionIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M17 8H19C20.1046 8 21 8.89543 21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8H7M17 8V6C17 3.79086 15.2091 2 12 2C8.79086 2 7 3.79086 7 6V8M17 8H7" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={styles.quickActionText}>Start Consultation</div>
                </div>
              </div>
            </>
          )}

          {activeTab === "appointments" && (
            <div style={styles.welcomeSection}>
              <h1 style={styles.welcomeTitle}>Appointments</h1>
              <p style={styles.welcomeText}>Manage your medical appointments, schedule new ones, and view your appointment history.</p>
            </div>
          )}

          {activeTab === "prescriptions" && (
            <div style={styles.welcomeSection}>
              <h1 style={styles.welcomeTitle}>Prescriptions</h1>
              <p style={styles.welcomeText}>View and manage your prescriptions, request refills, and track medication history.</p>
            </div>
          )}

          {activeTab === "orders" && (
            <div style={styles.welcomeSection}>
              <h1 style={styles.welcomeTitle}>Orders</h1>
              <p style={styles.welcomeText}>Track your medicine orders, view order history, and manage deliveries.</p>
            </div>
          )}

          {activeTab === "consultations" && (
            <div style={styles.welcomeSection}>
              <h1 style={styles.welcomeTitle}>Consultations</h1>
              <p style={styles.welcomeText}>Access your virtual consultations, medical reports, and doctor communications.</p>
            </div>
          )}

          {activeTab === "profile" && (
            <div style={styles.welcomeSection}>
              <h1 style={styles.welcomeTitle}>Profile</h1>
              <p style={styles.welcomeText}>Manage your personal information, health details, and account settings.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div style={styles.welcomeSection}>
              <h1 style={styles.welcomeTitle}>Settings</h1>
              <p style={styles.welcomeText}>Configure your account preferences, notification settings, and security options.</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: "73px",
            left: "240px",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 99,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}