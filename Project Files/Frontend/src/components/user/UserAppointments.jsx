import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserAppointments.css"; // Import the CSS

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/user", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setAppointments(res.data);
    } catch (err) {
      setMessage("❌ Failed to fetch appointments.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setMessage("✅ Appointment cancelled!");
      fetchAppointments();
    } catch (err) {
      setMessage("❌ Failed to cancel appointment.");
    }
  };

  return (
    <div
      className="appointments-container"
      style={{ background: "#fff", minHeight: "100vh", padding: "30px 0" }}
    >
      <h2 className="title">📅 My Appointments</h2>
      {message && <p className="message">{message}</p>}

      {appointments.length === 0 ? (
        <p className="no-data">No appointments found.</p>
      ) : (
        <div className="appointment-list">
          {appointments.map((app) => (
            <div key={app._id} className="appointment-card">
              <p>
                <strong>Doctor:</strong>{" "}
                {app.doctorId?.userId?.name ||
                  app.doctorId?.name ||
                  "Unknown"}
              </p>
              <p>
                <strong>Date:</strong> {new Date(app.date).toLocaleString()}
              </p>
              <p className={`status ${app.status}`}>Status: {app.status}</p>
              {app.status === "pending" && (
                <button
                  onClick={() => handleCancel(app._id)}
                  className="cancel-btn"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}