import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import bannerImg from "./Welcome.png";
import doctorImg from "./doc1.jpeg";
import bookImg from "./book.jpeg";        
import applyImg from "./apply.png";

export default function Home() {
  return (
    <div className="home-main">
      {/* Top Right Login/Register */}
      <div className="nav-btns">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/register" className="btn register-btn">Register</Link>
      </div>

      {/* Banner */}
      <div className="banner-container">
        <img src={bannerImg} alt="DocSpot Banner" className="banner-img" />
        <div className="banner-text">
          <h1>
            Welcome to <span>DocSpot</span>
          </h1>
          <p>Your smart doctor appointment system</p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="features-row">
        <Link to="/doctors" className="feature-card" title="Find Verified Doctors Near You">
          <img src={doctorImg} alt="Find Doctors" className="feature-img" />
          <h2>Find Verified Doctors Near You</h2>
          <p>
            Explore our network of highly qualified and trusted doctors in your city.<br />
            Search by specialization, experience, or location to find the perfect match for your healthcare needs.<br />
            All professionals are verified for your peace of mind.<br />
            Start your journey to better health with just a click.<br />
            Access expert medical care at your convenience.
          </p>
        </Link>

        <Link to="/user/appointments" className="feature-card" title="Book Appointments with Ease">
          <img src={bookImg} alt="Book Appointment" className="feature-img" />
          <h2>Book Appointments with Ease</h2>
          <p>
            Choose your preferred doctor and time slot in a matter of seconds.<br />
            Enjoy a hassle-free booking experience with instant confirmations.<br />
            Manage, reschedule, or cancel appointments effortlessly.<br />
            Receive timely reminders so you never miss your visit.<br />
            Healthcare is now at your fingertips!
          </p>
        </Link>

        <Link to="/apply-doctor" className="feature-card" title="Apply as Doctor">
          <img src={applyImg} alt="Apply as Doctor" className="feature-img" />
          <h2>Are You a Medical Professional?</h2>
          <p>
            Join DocSpot and reach thousands of patients looking for quality care.<br />
            Showcase your expertise and build your reputation in the medical community.<br />
            Flexible management of your profile and appointments.<br />
            Contribute to better healthcare accessibility.<br />
            Apply now and become part of our trusted network!
          </p>
        </Link>
      </div>
    </div>
  );
}
