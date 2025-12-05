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

function evaluatePasswordStrength(password) {
  let strength = 0;
  const messages = [];

  if (password.length >= 8) strength++;
  else messages.push("At least 8 characters");

  if (/[A-Z]/.test(password)) strength++;
  else messages.push("One uppercase letter");

  if (/[a-z]/.test(password)) strength++;
  else messages.push("One lowercase letter");

  if (/[0-9]/.test(password)) strength++;
  else messages.push("One number");

  if (/[^A-Za-z0-9]/.test(password)) strength++;
  else messages.push("One special character");

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["#dc2626", "#ea580c", "#d97706", "#16a34a", "#059669"];

  return {
    score: strength,
    label: labels[strength] || "Very Weak",
    color: colors[strength] || "#dc2626",
    messages: messages.slice(0, 5 - strength),
  };
}

export default function Signup() {
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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [googleUser, setGoogleUser] = useState(null);
  const [googleError, setGoogleError] = useState("");

  // Initialize Google
  useEffect(() => {
    const id = "google-identity-js-signup";
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
      setGoogleError("Google sign-up unavailable");
      return;
    }
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(document.getElementById("google-signup-btn"), {
        theme: "outline",
        size: "large",
        text: "signup_with",
        shape: "rectangular",
      });
    } catch (err) {
      setGoogleError("Failed to initialize Google sign-up");
    }
  }

  function handleCredentialResponse(response) {
  if (!response?.credential) {
    setGoogleError("No credential returned");
    showToast("Google sign-up failed", "error");
    return;
  }
  const payload = parseJwt(response.credential);
  if (!payload) {
    setGoogleError("Unable to parse credential");
    showToast("Google sign-up failed", "error");
    return;
  }

  setGoogleUser({
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  });

  const nameParts = payload.name.split(" ");
  setForm((prev) => ({
    ...prev,
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    email: payload.email,
  }));
  
  // Store Google registered user
  const googleUserData = {
    id: payload.sub,
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    email: payload.email,
    picture: payload.picture,
    registeredAt: new Date().toISOString(),
    googleUser: true,
  };
  
  const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  const userExists = existingUsers.some(user => user.email === payload.email);
  
  if (!userExists) {
    existingUsers.push(googleUserData);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
  }
  
  showToast("Google account registered successfully!", "success");
}
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (form.phone && !/^[\+]?[1-9][\d\-\s]*$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    const passwordStrength = evaluatePasswordStrength(form.password);
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password must be at least 'Fair' strength";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    return newErrors;
  };

  const onSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    Object.values(validationErrors).forEach((error) => {
      showToast(error, "error");
    });
    return;
  }

  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    
    // Store the registered user in localStorage
    const newUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password, // In real app, this would be hashed
      registeredAt: new Date().toISOString(),
    };
    
    // Get existing registered users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if user already exists
    const userExists = existingUsers.some(user => user.email === form.email);
    if (userExists) {
      showToast("User already exists. Please login.", "error");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    
    // Add new user to registered users
    existingUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    
    showToast("Account created successfully! Please login.", "success");
    
    // Clear form
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      newsletter: false,
    });
    
    // Navigate to login after 2 seconds
    setTimeout(() => navigate("/login"), 2000);
  }, 2000);
};
  const passwordStrength = evaluatePasswordStrength(form.password);

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
      maxWidth: "480px",
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
      alignItems: "center",
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
    },
    googleMeta: {
      flex: 1,
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
    nameGroup: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "20px" : "16px",
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
    strengthMeter: {
      marginTop: "12px",
    },
    strengthBar: {
      height: "6px",
      borderRadius: "3px",
      backgroundColor: "#e2e8f0",
      marginBottom: "8px",
      overflow: "hidden",
    },
    strengthFill: {
      height: "100%",
      width: `${(passwordStrength.score / 4) * 100}%`,
      backgroundColor: passwordStrength.color,
      transition: "all 0.3s ease",
    },
    strengthLabel: {
      fontSize: "12px",
      color: passwordStrength.color,
      fontWeight: "600",
      marginBottom: "6px",
    },
    strengthRequirements: {
      fontSize: "11px",
      color: "#64748b",
      marginTop: "4px",
    },
    requirement: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "4px",
    },
    requirementMet: {
      color: "#16a34a",
    },
    requirementUnmet: {
      color: "#dc2626",
    },
    checkboxGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginTop: "8px",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
    },
    checkbox: {
      width: "18px",
      height: "18px",
      borderRadius: "4px",
      border: "2px solid #cbd5e1",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: "2px",
    },
    checkboxChecked: {
      backgroundColor: "#0d9488",
      borderColor: "#0d9488",
    },
    checkboxLabel: {
      fontSize: isMobile ? "13px" : "14px",
      color: "#475569",
      lineHeight: "1.5",
      cursor: "pointer",
    },
    checkboxLink: {
      color: "#0d9488",
      textDecoration: "none",
      fontWeight: "500",
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
      marginTop: "16px",
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
    loginLink: {
      color: "#0d9488",
      fontWeight: "600",
      textDecoration: "none",
      marginLeft: "6px",
      transition: "color 0.2s",
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
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join QuickMed for personalized healthcare services</p>

          {/* Google User Profile */}
          {googleUser ? (
            <div style={styles.googleProfile}>
              <img src={googleUser.picture} alt={googleUser.name} style={styles.googleAvatar} />
              <div style={styles.googleMeta}>
                <div style={styles.googleName}>{googleUser.name}</div>
                <div style={styles.googleEmail}>{googleUser.email}</div>
              </div>
            </div>
          ) : (
            <>
              {/* Google Sign-up Button */}
              <div style={styles.googleButtonWrapper}>
                <div id="google-signup-btn" />
              </div>
              {googleError && <div style={styles.googleError}>{googleError}</div>}

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
                <div style={{ padding: "0 16px", color: "#64748b", fontSize: isMobile ? "13px" : "14px" }}>or</div>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
              </div>
            </>
          )}

          {/* Signup Form */}
          <form style={styles.form} onSubmit={onSubmit} noValidate>
            <div style={styles.nameGroup}>
              <div style={styles.field}>
                <label style={styles.label}>
                  First Name <span style={styles.required}>*</span>
                </label>
                <div
                  style={{
                    ...styles.inputContainer,
                    ...(errors.firstName && styles.inputContainerError),
                  }}
                >
                  <input
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={onChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.firstName && <div style={styles.error}>{errors.firstName}</div>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Last Name <span style={styles.required}>*</span>
                </label>
                <div
                  style={{
                    ...styles.inputContainer,
                    ...(errors.lastName && styles.inputContainerError),
                  }}
                >
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={onChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.lastName && <div style={styles.error}>{errors.lastName}</div>}
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Email Address <span style={styles.required}>*</span>
              </label>
              <div
                style={{
                  ...styles.inputContainer,
                  ...(errors.email && styles.inputContainerError),
                }}
              >
                <input
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={form.email}
                  onChange={onChange}
                  style={styles.input}
                  required
                />
              </div>
              {errors.email && <div style={styles.error}>{errors.email}</div>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Phone Number (Optional)</label>
              <div
                style={{
                  ...styles.inputContainer,
                  ...(errors.phone && styles.inputContainerError),
                }}
              >
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={form.phone}
                  onChange={onChange}
                  style={styles.input}
                />
              </div>
              {errors.phone && <div style={styles.error}>{errors.phone}</div>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Password <span style={styles.required}>*</span>
              </label>
              <div
                style={{
                  ...styles.inputContainer,
                  ...(errors.password && styles.inputContainerError),
                }}
              >
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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

              {form.password && (
                <div style={styles.strengthMeter}>
                  <div style={styles.strengthLabel}>
                    Password Strength: {passwordStrength.label}
                  </div>
                  <div style={styles.strengthBar}>
                    <div style={styles.strengthFill} />
                  </div>
                  {passwordStrength.messages.length > 0 && (
                    <div style={styles.strengthRequirements}>
                      <div style={{ marginBottom: "6px", fontSize: "12px", color: "#475569" }}>
                        Requirements:
                      </div>
                      {passwordStrength.messages.map((msg, index) => (
                        <div key={index} style={styles.requirement}>
                          <span style={{ color: "#dc2626", fontSize: "10px" }}>✗</span>
                          <span style={styles.requirementUnmet}>{msg}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {errors.password && <div style={styles.error}>{errors.password}</div>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Confirm Password <span style={styles.required}>*</span>
              </label>
              <div
                style={{
                  ...styles.inputContainer,
                  ...(errors.confirmPassword && styles.inputContainerError),
                }}
              >
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={onChange}
                  style={styles.input}
                  required
                />
              </div>
              {errors.confirmPassword && <div style={styles.error}>{errors.confirmPassword}</div>}
            </div>

            {/* Terms and Newsletter */}
            <div style={styles.checkboxGroup}>
              <div style={styles.checkboxContainer}>
                <input
                  name="acceptTerms"
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={onChange}
                  style={{ display: "none" }}
                  id="acceptTerms"
                />
                <div
                  style={{
                    ...styles.checkbox,
                    ...(form.acceptTerms && styles.checkboxChecked),
                  }}
                  onClick={() => setForm((prev) => ({ ...prev, acceptTerms: !prev.acceptTerms }))}
                >
                  {form.acceptTerms && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L4 7L9 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label htmlFor="acceptTerms" style={styles.checkboxLabel}>
                  I agree to the{" "}
                  <Link to="/terms" style={styles.checkboxLink}>
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" style={styles.checkboxLink}>
                    Privacy Policy
                  </Link>
                  <span style={styles.required}> *</span>
                </label>
              </div>
              {errors.acceptTerms && <div style={styles.error}>{errors.acceptTerms}</div>}

              <div style={styles.checkboxContainer}>
                <input
                  name="newsletter"
                  type="checkbox"
                  checked={form.newsletter}
                  onChange={onChange}
                  style={{ display: "none" }}
                  id="newsletter"
                />
                <div
                  style={{
                    ...styles.checkbox,
                    ...(form.newsletter && styles.checkboxChecked),
                  }}
                  onClick={() => setForm((prev) => ({ ...prev, newsletter: !prev.newsletter }))}
                >
                  {form.newsletter && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L4 7L9 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label htmlFor="newsletter" style={styles.checkboxLabel}>
                  Subscribe to receive health tips, updates, and special offers (optional)
                </label>
              </div>
            </div>

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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div style={styles.footer}>
            Already have an account?
            <Link
              to="/login"
              style={styles.loginLink}
              onMouseEnter={(e) => (e.target.style.color = "#0f766e")}
              onMouseLeave={(e) => (e.target.style.color = "#0d9488")}
            >
              Sign in here
            </Link>
          </div>
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