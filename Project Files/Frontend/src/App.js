import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Common components
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";

// User components
import UserHome from "./components/user/UserHome";
import DoctorList from "./components/user/DoctorList";
import ApplyDoctor from "./components/user/ApplyDoctor";
import BookAppointment from "./components/user/BookAppointment";
import UserAppointments from "./components/user/UserAppointments";

// Admin components
import AdminDashboard from "./components/admin/AdminDashboard";
import ApproveDoctors from "./components/admin/ApproveDoctors";
import AdminAppointments from "./components/admin/AdminAppointments";

// Doctor components
import DoctorDashboard from "./components/doctor/DoctorDashboard";

// Add <FaUserMd size={40} /> inside your cards, etc.

function App() {
  return (
    <Router>
      <Routes>
        {/* Common */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/user/dashboard" element={<UserHome />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/apply-doctor" element={<ApplyDoctor />} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
        <Route path="/user/appointments" element={<UserAppointments />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/approve-doctors" element={<ApproveDoctors />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />

        {/* Doctor */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;