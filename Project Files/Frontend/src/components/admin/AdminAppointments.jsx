import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await axios.get("http://localhost:5000/api/appointments/all", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setAppointments(res.data);
  };

  useEffect(() => { fetchAppointments(); }, []);

  return (
    <div>
      <h2>All Appointments (Admin)</h2>
      <ul>
        {appointments.map((app) => (
          <li key={app._id}>
            User: {app.userId.name} ({app.userId.email})<br />
            Doctor: {app.doctorId.specialization} ({app.doctorId.location})<br />
            Date: {app.date}<br />
            Status: {app.status}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}