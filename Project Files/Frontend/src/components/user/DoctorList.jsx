import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Images are stored in Doctors folder in the same directory
const doctorImages = {
  Cardiologist: "card.jpeg",
  Dermatologist: "derm.jpeg",
  Neurologist: "neur.jpeg",
  Pediatrician: "ped.jpeg",
  Psychiatrist: "psy.jpeg",
  Gynecologist: "gyn.jpeg",
  GeneralPhysician: "surg.jpeg",
};

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ specialization: "", location: "" });

  const specializations = [
    "", "Cardiologist", "Dermatologist", "Neurologist",
    "Pediatrician", "Psychiatrist", "Gynecologist", "GeneralPhysician"
  ];
  const locations = ["", "Delhi", "Mumbai", "Hyderabad", "Bangalore", "Chennai", "Lucknow", "Jaipur"];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const query = [];
      if (filters.specialization) query.push(`specialization=${filters.specialization}`);
      if (filters.location) query.push(`location=${filters.location}`);
      const res = await axios.get(`http://localhost:5000/api/doctors?${query.join("&")}`);
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleFilter = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  // Only return the image if a specialization is selected and there is one doctor
  const getImagePath = (specialization) => {
    if (!specialization) return null;
    const fileName = doctorImages[specialization];
    if (!fileName) return null;
    try {
      return require(`./Doctors/${fileName}`);
    } catch {
      return null;
    }
  };

  const styles = {
    page: { padding: "40px", fontFamily: "Poppins, sans-serif", backgroundColor: "#fafafa", minHeight: "100vh" },
    title: { textAlign: "center", fontSize: "30px", marginBottom: "10px" },
    subtitle: { textAlign: "center", fontSize: "16px", marginBottom: "30px", color: "#555" },
    form: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "40px",
    },
    select: {
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      fontSize: "14px",
    },
    button: {
      padding: "10px 16px",
      backgroundColor: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      width: "100%",
      maxWidth: "1000px"
    },
    grid: {
      display: "flex", // <-- horizontal layout!
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      border: "1px solid #eee",
      margin: "0 auto",
      maxWidth: "250px",
      minWidth: "220px",
      minHeight: "220px"
    },
    avatar: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "50%",
      marginBottom: "12px",
    },
    status: {
      color: "#22c55e",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "6px",
      marginTop: "10px"
    },
    name: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "4px",
      color: "#1e293b",
    },
    role: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "10px",
    },
    btn: {
      textDecoration: "none",
      backgroundColor: "#10b981",
      padding: "8px 18px",
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "500",
      fontSize: "15px",
      display: "inline-block",
      marginTop: "18px",
      border: "none",
      cursor: "pointer"
    },
  };

  // Show image only if one doctor with selected specialization
  const shouldShowImage =
    filters.specialization &&
    doctors.length === 1 &&
    doctors[0].specialization === filters.specialization;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Top Doctors to Book</h2>
      <p style={styles.subtitle}>Browse trusted specialists and book instantly.</p>

      <form onSubmit={handleFilter} style={styles.form}>
        <select
          name="specialization"
          value={filters.specialization}
          onChange={handleChange}
          style={styles.select}
        >
          {specializations.map((spec, i) => (
            <option key={i} value={spec}>
              {spec === "" ? "All Specializations" : spec}
            </option>
          ))}
        </select>

        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          style={styles.select}
        >
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc === "" ? "All Locations" : loc}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>Filter</button>
      </form>

      <div style={styles.grid}>
        {doctors.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>No doctors found.</p>
        ) : (
          doctors.map((doc) => (
            <div key={doc._id} style={styles.card}>
              {shouldShowImage && (
                <img
                  src={getImagePath(doc.specialization)}
                  alt={doc.specialization}
                  style={styles.avatar}
                />
              )}
              <div style={styles.status}>● Available</div>
              <div style={styles.name}>Dr. {doc.userId.name}</div>
              <div style={styles.role}>{doc.specialization}</div>
              <Link to={`/book-appointment/${doc._id}`} style={styles.btn}>
                Book Appointment
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}