import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ApproveDoctors() {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPending = async () => {
    const res = await axios.get("http://localhost:5000/api/doctors/pending", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setPendingDoctors(res.data);
  };

  useEffect(() => { fetchPending(); }, []);

  const handleAction = async (doctorId, status) => {
    await axios.post(
      "http://localhost:5000/api/doctors/approve",
      { doctorId, status },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setMessage(`Doctor ${status}`);
    fetchPending();
  };

  return (
    <div>
      <h2>Pending Doctor Applications</h2>
      {message && <p>{message}</p>}
      {pendingDoctors.length === 0 && <p>No pending doctors.</p>}
      <ul>
        {pendingDoctors.map((doc) => (
          <li key={doc._id}>
            <b>{doc.userId.name}</b> ({doc.userId.email})<br/>
            Specialization: {doc.specialization} <br/>
            Location: {doc.location} <br/>
            Slots: {doc.availableSlots.join(", ")} <br/>
            <button onClick={() => handleAction(doc._id, "approved")}>Approve</button>
            <button onClick={() => handleAction(doc._id, "rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}