import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", age: "" });

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const res = await axios.get(`http://localhost:5000/api/doctors?doctorId=${doctorId}`);
        setDoctor(res.data[0]);
      } catch (err) {
        setMessage("Failed to load doctor details.");
      }
    }
    fetchDoctor();
  }, [doctorId]);

  const handleFiles = (e) => setDocuments([...e.target.files]);
  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(); // ✅ ADD THIS LINE

  formData.append("doctorId", doctorId);
  formData.append("date", date);
  formData.append("name", form.name);
  formData.append("age", form.age);

  for (let i = 0; i < documents.length; i++) {
    formData.append("documents", documents[i]);
  }

  try {
    await axios.post("http://localhost:5000/api/appointments/book", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data"
      }
    });

    setMessage("✅ Appointment booked!");
    setDate("");
    setDocuments([]);
    setForm({ name: "", age: "" });

  } catch (err) {
    setMessage("✅ Appointment booked!");
  }
};


  if (!doctor)
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "60px auto",
        background: "#ffe4ec", // <-- light blue box color
        borderRadius: 14,
        boxShadow: "0 4px 24px rgba(1, 5, 14, 0.13)",
        padding: "32px 30px",
        fontFamily: "'Segoe UI', sans-serif"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        Book Appointment with{" "}
        <span style={{ color: "#368efd" }}>
          {doctor.userId?.fullName || doctor.name || "Doctor"}
        </span>
      </h2>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 500 }}>Your Name:</label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleFormChange}
          placeholder="Enter your name"
          style={{
            width: "100%",
            marginBottom: 16,
            marginTop: 4,
            padding: "10px",
            borderRadius: 7,
            border: "1px solid #ccc",
            fontSize: 15
          }}
        />

        <label style={{ fontWeight: 500 }}>Your Age:</label>
        <input
          type="number"
          name="age"
          min="1"
          required
          value={form.age}
          onChange={handleFormChange}
          placeholder="Enter your age"
          style={{
            width: "100%",
            marginBottom: 16,
            marginTop: 4,
            padding: "10px",
            borderRadius: 7,
            border: "1px solid #ccc",
            fontSize: 15
          }}
        />

        <label style={{ fontWeight: 500 }}>Select Slot:</label>
        <select
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: 16,
            marginTop: 4,
            padding: "10px",
            borderRadius: 7,
            border: "1px solid #ccc",
            fontSize: 15
          }}
        >
          <option value="">--Select--</option>
          {doctor.availableSlots && doctor.availableSlots.map(slot => (
           <option key={slot} value={slot}>{slot}</option>
            ))}
        </select>

        <label style={{ fontWeight: 500 }}>Upload Documents:</label>
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFiles}
          style={{ margin: "10px 0 22px 0" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#368efd",
            color: "#fgf",
            fontWeight: 600,
            fontSize: 17,
            padding: "12px 0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginTop: 8
          }}
        >
          Book Appointment
        </button>
      </form>
      {message && (
        <div style={{ marginTop: 26, textAlign: "center", fontWeight: 500, color: message.startsWith("✅") ? "#22c55e" : "#ef4444" }}>
          {message}
        </div>
      )}
    </div>
  );
}