import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/approve-doctors">Approve Doctor Applications</Link> | <Link to="/admin/appointments">View All Appointments</Link>
    </div>
  );
}