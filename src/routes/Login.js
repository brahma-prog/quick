import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function Login() {
  const navigate = useNavigate();
  
  // Toast state
  const [toasts, setToasts] = useState([]);
  
  // Show toast function
  const showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };
  
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  // Form state
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStep, setResetStep] = useState(1);
  const [otpTimer, setOtpTimer] = useState(0);
  const [googleUser, setGoogleUser] = useState(null);
  const [googleError, setGoogleError] = useState("");

  // OTP timer
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Initialize Google
  useEffect(() => {
    const id = "google-identity-js";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.id = id;
      document.head.appendChild(script);
      script.onload = () => initGoogle();
    } else {
      initGoogle();
    }
  }, []);

  function initGoogle() {
    if (!window.google?.accounts?.id || !GOOGLE_CLIENT_ID) {
      setGoogleError("Google sign-in unavailable");
      return;
    }
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(document.getElementById("google-signin-btn"), {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
      });
    } catch (err) {
      setGoogleError("Failed to initialize Google sign-in");
    }
  }

  function handleCredentialResponse(response) {
    if (!response?.credential) {
      setGoogleError("No credential returned");
      return;
    }
    const payload = parseJwt(response.credential);
    if (!payload) {
      setGoogleError("Unable to parse credential");
      return;
    }

    // Check if user exists
    const userExists = Math.random() > 0.5;
    if (!userExists) {
      setGoogleError("Account not found. Please sign up first.");
      showToast("Account not found. Please sign up first.", "error");
      setTimeout(() => navigate("/signup"), 2000);
      return;
    }

    setGoogleUser({
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });
    showToast("Successfully signed in with Google!", "success");
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const sendOtp = () => {
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setError("Please enter a valid email address");
      showToast("Please enter a valid email address", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetStep(2);
      setOtpTimer(300);
      showToast("OTP sent to your email", "success");
    }, 1500);
  };

  const verifyOtp = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete OTP");
      showToast("Please enter the complete OTP", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetStep(3);
      setError("");
      showToast("OTP verified successfully", "success");
    }, 1500);
  };

  const resetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields");
      showToast("Please enter both password fields", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      showToast("Passwords do not match", "error");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      showToast("Password must be at least 8 characters", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Password reset successfully! Please login.", "success");
      setShowForgotPassword(false);
      setResetStep(1);
      setForgotEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
    }, 1500);
  };

 const onSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  setError("");

  if (!form.email || !form.password) {
    setError("Please fill in all required fields");
    showToast("Please fill in all required fields", "error");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(form.email)) {
    setError("Please enter a valid email address");
    showToast("Please enter a valid email address", "error");
    return;
  }

  setLoading(true);
  
  // Simulate API call to check if user exists
  setTimeout(() => {
    // Check in registered users
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const user = existingUsers.find(user => user.email === form.email);
    
    if (!user) {
      setLoading(false);
      setError("Account not found. Please register first.");
      showToast("Account not found. Please register first.", "error");
      setTimeout(() => navigate("/signup"), 1500);
      return;
    }
    
    // Check password (in real app, this would be hashed comparison)
    // For demo, we'll accept any password with at least 6 characters
    const isValidPassword = form.password.length >= 6;
    
    if (!isValidPassword) {
      setLoading(false);
      setError("Invalid password. Password must be at least 6 characters.");
      showToast("Invalid password. Please try again.", "error");
      return;
    }
    
    // If everything is valid
    setLoading(false);
    showToast("Successfully logged in!", "success");
    
    // Store authentication token and user info
    localStorage.setItem("token", "demo_token_" + Date.now());
    localStorage.setItem("currentUser", JSON.stringify({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      id: user.id || `user_${Date.now()}`,
      picture: user.picture,
      registered: true
    }));
    
    // Navigate to dashboard
    navigate("/dashboard");
  }, 1500);
};
  const handleLogoutGoogle = () => {
    window.google?.accounts?.id?.disableAutoSelect?.();
    setGoogleUser(null);
    showToast("Signed out from Google", "success");
  };

  // Responsive styles
  const isMobile = window.innerWidth <= 480;
  
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8fafc",
      padding: "20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: isMobile ? "32px 24px" : "40px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e2e8f0",
      width: "100%",
      maxWidth: "440px",
      margin: "0 auto",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "32px",
      gap: "12px",
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#0d9488",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#0f172a",
    },
    title: {
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px",
      textAlign: "center",
    },
    subtitle: {
      fontSize: isMobile ? "13px" : "14px",
      color: "#64748b",
      marginBottom: "32px",
      textAlign: "center",
      lineHeight: "1.5",
    },
    googleProfile: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "stretch" : "center",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f8fafc",
      borderRadius: "10px",
      marginBottom: "24px",
      border: "1px solid #e2e8f0",
    },
    googleAvatar: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      objectFit: "cover",
      alignSelf: isMobile ? "center" : "auto",
    },
    googleMeta: {
      flex: 1,
      textAlign: isMobile ? "center" : "left",
    },
    googleName: {
      fontWeight: "600",
      color: "#0f172a",
      fontSize: "16px",
      marginBottom: "4px",
    },
    googleEmail: {
      color: "#64748b",
      fontSize: "14px",
    },
    googleActions: {
      display: "flex",
      gap: "8px",
      width: isMobile ? "100%" : "auto",
    },
    googleButtonWrapper: {
      marginBottom: "24px",
      display: "flex",
      justifyContent: "center",
    },
    googleError: {
      color: "#dc2626",
      fontSize: isMobile ? "13px" : "14px",
      marginBottom: "16px",
      textAlign: "center",
      padding: "8px 12px",
      backgroundColor: "#fef2f2",
      borderRadius: "6px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "500",
      color: "#475569",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    required: {
      color: "#dc2626",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      padding: "0 16px",
      transition: "all 0.2s",
      backgroundColor: "#ffffff",
    },
    inputContainerError: {
      borderColor: "#dc2626",
    },
    input: {
      flex: 1,
      border: "none",
      padding: isMobile ? "12px 8px" : "14px 8px",
      fontSize: isMobile ? "14px" : "15px",
      outline: "none",
      backgroundColor: "transparent",
      color: "#0f172a",
    },
    passwordToggle: {
      backgroundColor: "transparent",
      border: "none",
      color: "#64748b",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "500",
      cursor: "pointer",
      padding: "8px",
      minWidth: "50px",
    },
    error: {
      color: "#dc2626",
      fontSize: "13px",
      marginTop: "4px",
    },
    rememberContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      marginTop: "8px",
      marginBottom: "8px",
      gap: isMobile ? "12px" : "0",
    },
    remember: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: isMobile ? "13px" : "14px",
      color: "#475569",
      cursor: "pointer",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      borderRadius: "4px",
      border: "2px solid #cbd5e1",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    forgotLink: {
      color: "#0d9488",
      textDecoration: "none",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    submitButton: {
      backgroundColor: "#0d9488",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: isMobile ? "14px" : "16px",
      fontSize: isMobile ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      marginTop: "12px",
      width: "100%",
    },
    submitButtonLoading: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    footer: {
      textAlign: "center",
      marginTop: "32px",
      color: "#64748b",
      fontSize: isMobile ? "13px" : "14px",
      paddingTop: "24px",
      borderTop: "1px solid #e2e8f0",
    },
    signupLink: {
      color: "#0d9488",
      fontWeight: "600",
      textDecoration: "none",
      marginLeft: "6px",
      transition: "color 0.2s",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: isMobile ? "24px" : "32px",
      width: "100%",
      maxWidth: isMobile ? "320px" : "440px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    },
    modalTitle: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "16px",
      textAlign: "center",
    },
    modalText: {
      color: "#64748b",
      fontSize: isMobile ? "13px" : "14px",
      marginBottom: "24px",
      textAlign: "center",
      lineHeight: "1.5",
    },
    otpContainer: {
      display: "flex",
      gap: isMobile ? "8px" : "12px",
      justifyContent: "center",
      margin: "24px 0",
    },
    otpInput: {
      width: isMobile ? "40px" : "48px",
      height: isMobile ? "48px" : "56px",
      textAlign: "center",
      fontSize: isMobile ? "18px" : "20px",
      border: "2px solid #cbd5e1",
      borderRadius: "8px",
      outline: "none",
      transition: "all 0.2s",
      color: "#0f172a",
      fontWeight: "500",
    },
    timer: {
      textAlign: "center",
      color: "#dc2626",
      fontSize: isMobile ? "13px" : "14px",
      margin: "16px 0",
      fontWeight: "500",
    },
    buttonGroup: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "12px",
      marginTop: "24px",
    },
    secondaryButton: {
      backgroundColor: "transparent",
      border: "1px solid #cbd5e1",
      color: "#475569",
      padding: isMobile ? "12px" : "14px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      flex: 1,
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    primaryButton: {
      backgroundColor: "#0d9488",
      color: "white",
      border: "none",
      padding: isMobile ? "12px" : "14px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      flex: 1,
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    resendLink: {
      color: "#0d9488",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: isMobile ? "13px" : "14px",
      textDecoration: "none",
      textAlign: "center",
      display: "block",
      marginTop: "12px",
    },
    // Toast container styles
    toastContainer: {
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxWidth: "400px",
    },
    toast: {
      backgroundColor: "#10b981",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      animation: "slideIn 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    },
    toastError: {
      backgroundColor: "#ef4444",
    },
    toastWarning: {
      backgroundColor: "#f59e0b",
    },
    toastInfo: {
      backgroundColor: "#3b82f6",
    },
    toastClose: {
      background: "transparent",
      border: "none",
      color: "white",
      cursor: "pointer",
      padding: "4px",
      fontSize: "18px",
      lineHeight: "1",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoIcon}>Q</div>
            <div style={styles.logoText}>QuickMed</div>
          </div>

          {/* Title */}
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your account to continue</p>

          {/* Google User Profile */}
          {googleUser ? (
            <div style={styles.googleProfile}>
              <img src={googleUser.picture} alt={googleUser.name} style={styles.googleAvatar} />
              <div style={styles.googleMeta}>
                <div style={styles.googleName}>{googleUser.name}</div>
                <div style={styles.googleEmail}>{googleUser.email}</div>
              </div>
              <div style={styles.googleActions}>
                <button
                  onClick={handleLogoutGoogle}
                  style={{
                    ...styles.secondaryButton,
                    padding: isMobile ? "10px" : "8px 16px",
                  }}
                >
                  Sign out
                </button>
                <button
                  onClick={() => {
                    showToast(`Welcome ${googleUser.name}!`, "success");
                    navigate("/dashboard");
                  }}
                  style={{
                    ...styles.primaryButton,
                    padding: isMobile ? "10px" : "8px 16px",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Google Sign-in Button */}
              <div style={styles.googleButtonWrapper}>
                <div id="google-signin-btn" />
              </div>
              {googleError && <div style={styles.googleError}>{googleError}</div>}

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
                <div style={{ padding: "0 16px", color: "#64748b", fontSize: isMobile ? "13px" : "14px" }}>or</div>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
              </div>

              {/* Login Form */}
              <form style={styles.form} onSubmit={onSubmit} noValidate>
                <div style={styles.field}>
                  <label style={styles.label}>
                    Email Address <span style={styles.required}>*</span>
                  </label>
                  <div
                    style={{
                      ...styles.inputContainer,
                      ...(submitted && !form.email && styles.inputContainerError),
                    }}
                  >
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  {submitted && !form.email && <div style={styles.error}>Email is required</div>}
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>
                    Password <span style={styles.required}>*</span>
                  </label>
                  <div
                    style={{
                      ...styles.inputContainer,
                      ...(submitted && !form.password && styles.inputContainerError),
                    }}
                  >
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={onChange}
                      style={styles.input}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={styles.passwordToggle}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {submitted && !form.password && <div style={styles.error}>Password is required</div>}
                </div>

                <div style={styles.rememberContainer}>
                  <label style={styles.remember}>
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={onChange}
                      style={{ display: "none" }}
                    />
                    <div
                      style={{
                        ...styles.checkbox,
                        ...(form.remember && {
                          backgroundColor: "#0d9488",
                          borderColor: "#0d9488",
                        }),
                      }}
                    >
                      {form.remember && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    Remember me
                  </label>
                  <span
                    style={styles.forgotLink}
                    onClick={() => setShowForgotPassword(true)}
                    onMouseEnter={(e) => (e.target.style.color = "#0f766e")}
                    onMouseLeave={(e) => (e.target.style.color = "#0d9488")}
                  >
                    Forgot password?
                  </span>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.submitButton,
                    ...(loading && styles.submitButtonLoading),
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = "#0f766e")}
                  onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = "#0d9488")}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Sign Up Link */}
              <div style={styles.footer}>
                Don't have an account?
                <Link
                  to="/signup"
                  style={styles.signupLink}
                  onMouseEnter={(e) => (e.target.style.color = "#0f766e")}
                  onMouseLeave={(e) => (e.target.style.color = "#0d9488")}
                >
                  Sign up here
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast Container */}
      {toasts.length > 0 && (
        <div style={styles.toastContainer}>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              style={{
                ...styles.toast,
                ...(toast.type === "error" && styles.toastError),
                ...(toast.type === "warning" && styles.toastWarning),
                ...(toast.type === "info" && styles.toastInfo),
              }}
            >
              <div style={{ flex: 1 }}>{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                style={styles.toastClose}
                aria-label="Close toast"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div style={styles.modalOverlay} onClick={() => !loading && setShowForgotPassword(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Reset Password</h3>

            {resetStep === 1 && (
              <>
                <p style={styles.modalText}>
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>
                <div style={styles.field}>
                  <label style={styles.label}>Email Address</label>
                  <div style={styles.inputContainer}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  style={{
                    ...styles.primaryButton,
                    ...(loading && styles.buttonDisabled),
                    marginTop: "8px",
                  }}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {resetStep === 2 && (
              <>
                <p style={styles.modalText}>
                  Enter the 6-digit OTP sent to <strong>{forgotEmail}</strong>
                </p>
                <div style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      style={styles.otpInput}
                    />
                  ))}
                </div>
                {otpTimer > 0 ? (
                  <div style={styles.timer}>
                    OTP expires in: {Math.floor(otpTimer / 60)}:
                    {(otpTimer % 60).toString().padStart(2, "0")}
                  </div>
                ) : (
                  <span
                    style={styles.resendLink}
                    onClick={() => {
                      setOtpTimer(300);
                      showToast("New OTP sent!", "success");
                    }}
                  >
                    Resend OTP
                  </span>
                )}
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => {
                      setResetStep(1);
                      setOtp(["", "", "", "", "", ""]);
                    }}
                    disabled={loading}
                    style={styles.secondaryButton}
                  >
                    Back
                  </button>
                  <button
                    onClick={verifyOtp}
                    disabled={loading}
                    style={{
                      ...styles.primaryButton,
                      ...(loading && styles.buttonDisabled),
                    }}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </>
            )}

            {resetStep === 3 && (
              <>
                <p style={styles.modalText}>Create your new password</p>
                <div style={styles.field}>
                  <label style={styles.label}>New Password</label>
                  <div style={styles.inputContainer}>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  {newPassword && newPassword.length < 8 && (
                    <div style={{ ...styles.error, fontSize: isMobile ? "11px" : "12px" }}>
                      Password must be at least 8 characters
                    </div>
                  )}
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Confirm Password</label>
                  <div style={styles.inputContainer}>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <div style={{ ...styles.error, fontSize: isMobile ? "11px" : "12px" }}>
                      Passwords do not match
                    </div>
                  )}
                </div>
                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => setResetStep(2)}
                    disabled={loading}
                    style={styles.secondaryButton}
                  >
                    Back
                  </button>
                  <button
                    onClick={resetPassword}
                    disabled={loading}
                    style={{
                      ...styles.primaryButton,
                      ...(loading && styles.buttonDisabled),
                    }}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </>
            )}

            {error && <div style={{ ...styles.error, marginTop: "16px", textAlign: "center" }}>{error}</div>}
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}