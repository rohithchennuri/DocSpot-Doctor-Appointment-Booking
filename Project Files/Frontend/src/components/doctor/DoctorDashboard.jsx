import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAppointments = async () => {
    const res = await axios.get("http://localhost:5000/api/appointments/doctor", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setAppointments(res.data);
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleStatus = async (id, status) => {
    await axios.patch(
      "http://localhost:5000/api/appointments/doctor/update",
      { appointmentId: id, status },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setMessage(`Appointment ${status}`);
    fetchAppointments();
  };

  return (
    <div>
      <h2>Doctor Dashboard - My Appointments</h2>
      {message && <p>{message}</p>}
      <ul>
        {appointments.map((app) => (
          <li key={app._id}>
            Patient: {app.userId.name} ({app.userId.email})<br />
            Date: {app.date}<br />
            Status: {app.status}<br />
            {app.status === "pending" && (
              <button onClick={() => handleStatus(app._id, "scheduled")}>Confirm</button>
            )}
            {app.status === "scheduled" && (
              <button onClick={() => handleStatus(app._id, "completed")}>Mark as Completed</button>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}