import React from "react";
import { Link } from "react-router-dom";
import "./UserHome.css"; // Import the CSS

export default function UserHome() {
  return (
    <div className="user-home">
      <header className="user-header">
        <h2>Welcome to Your Dashboard 🩺</h2>
        <p>Access your health tools and manage appointments</p>
      </header>

      <div className="image-section">
        <img
          src="https://img.freepik.com/free-photo/doctor-writing-about-routine-medical-checkup_23-2149281072.jpg?ga=GA1.1.1530286815.1750937074&semt=ais_hybrid&w=740"
          alt="User Dashboard"
        />
      </div>

      <div className="link-cards">
        <Link to="/doctors" className="card">
          🧑‍⚕️ <span>Find Doctors</span>
        </Link>
        <Link to="/apply-doctor" className="card">
          📋 <span>Apply as Doctor</span>
        </Link>
        {/* <Link to="/user/appointments" className="card">
          📅 <span>My Appointments</span>
        </Link> */}
      </div>
    </div>
  );
}
