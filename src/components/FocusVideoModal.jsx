// src/components/FocusVideoModal.jsx

import React from "react";

const FocusVideoModal = ({ onClose }) => {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh",
      backgroundColor: "rgba(0,0,0,0.90)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{ width: "80%", maxWidth: "560px" }}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1"
          title="Lofi Girl - beats to study/relax to"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "12px" }}
        />
        <button onClick={onClose} style={{
          marginTop: "12px", padding: "8px 24px",
          backgroundColor: "#fff", border: "none",
          borderRadius: "8px", cursor: "pointer", float: "right",
        }}>
          Skip
        </button>
      </div>
    </div>
  );
};

export default FocusVideoModal;