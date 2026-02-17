import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/doctor", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setAppointments(res.data);
    } catch (err) {
      setMessage("Failed to fetch appointments.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}`,
        { status },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setMessage(`Appointment ${status}!`);
      fetchAppointments();
    } catch (err) {
      setMessage("Failed to update appointment.");
    }
  };

  return (
    <div>
      <h2>My Appointments</h2>
      {message && <p>{message}</p>}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((app) => (
              <tr key={app._id}>
                <td>{app.patientName || app.userId}</td>
                <td>{app.date}</td>
                <td>{app.status}</td>
                <td>
                  {app.status === "pending" && (
                    <>
                      <button onClick={() => updateStatus(app._id, "approved")}>Approve</button>
                      <button onClick={() => updateStatus(app._id, "rejected")}>Reject</button>
                    </>
                  )}
                  {app.status !== "pending" && "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}