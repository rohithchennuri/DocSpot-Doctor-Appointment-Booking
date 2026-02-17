import React from "react";

export default function Notification({ message, type }) {
  if (!message) return null;
  return (
    <div style={{
      padding: "10px",
      margin: "10px 0",
      color: type === "error" ? "red" : "green",
      border: `1px solid ${type === "error" ? "red" : "green"}`
    }}>
      {message}
    </div>
  );
}