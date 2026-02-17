import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ApplyDoctor() {
  const [form, setForm] = useState({
    specialization: "",
    location: "",
    availableSlots: ""
  });

  const [message, setMessage] = useState("");

  // Change page background color on mount
  useEffect(() => {
    document.body.style.backgroundColor = "#e6f2ff"; // light blue
    return () => {
      document.body.style.backgroundColor = null; // reset when component unmounts
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const availableSlots = form.availableSlots
        .split(",")
        .map((slot) => slot.trim());

      await axios.post(
        "http://localhost:5000/api/doctors/apply",
        { ...form, availableSlots },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setMessage("✅ Application submitted successfully! Await admin approval.");
    } catch (err) {
      setMessage("❌ Application failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: "520px",
      margin: "50px auto",
      padding: "25px",
      backgroundColor: "#ffffff", // white card
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "Segoe UI, sans-serif"
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    label: {
      marginTop: "15px",
      fontWeight: "600",
      fontSize: "15px"
    },
    input: {
      padding: "10px",
      marginTop: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px"
    },
    button: {
      marginTop: "25px",
      padding: "12px",
      backgroundColor: "#0077cc",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px"
    },
    message: {
      marginTop: "20px",
      fontWeight: "bold",
      color: "#333"
    }
  };

  return (
    <div style={styles.container}>
      <h2>Apply as a Doctor</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Specialization</label>
        <input
          type="text"
          name="specialization"
          placeholder="e.g. Cardiologist"
          value={form.specialization}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Location</label>
        <input
          type="text"
          name="location"
          placeholder="City or Region"
          value={form.location}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Available Slots</label>
        <input
          type="text"
          name="availableSlots"
          placeholder="e.g. 2025-06-29T10:00, 2025-06-29T11:00"
          value={form.availableSlots}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Submit Application</button>
      </form>
      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
}
