import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./routes/Home";
import About from "./routes/About";
import Services from "./routes/Services";
import Doctors from "./routes/Doctors";
import Reviews from "./routes/Reviews";
import Contact from "./routes/Contact";
import PartnerSignup from "./routes/PartnerSignup";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-scrollable">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partner-signup" element={<PartnerSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
