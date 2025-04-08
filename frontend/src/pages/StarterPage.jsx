import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const StarterPage = () => {
  return (
    <div className="vh-100 d-flex flex-column">
    {/* Header */}
    <header className="py-3 border-bottom d-flex mt-1 align-items-center justify-content-center">
      {/* Logo with Text */}
      <img
        src="https://img.icons8.com/?size=100&id=Utu32Z-yKkor&format=png&color=40C057" // Replace with your logo URL
        alt="Logo"
        className="me-2"
        style={{ width: "27px", height: "27px" }}
      />
      <h3 className="fw-bold m-0">Classroom</h3>
    </header>

    {/* Main Content */}
    <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
      {/* Illustration */}
      <div className="mb-4">
        <DotLottieReact
          src="https://lottie.host/21c5da2c-30c9-441f-8538-2d8cfd8602d7/oJtbTbu5aE.lottie"
          loop
          autoplay
          style={{ height: "220px", width: "250px" }}
        />
      </div>

      {/* Title and Subtitle */}
      <div className="text-center mb-3">
        <h4
          style={{
            fontSize: "25px",
            color: "green",
            fontWeight: "700",
            fontFamily: "Arial, sans-serif",
          }}
          className="fw-bold"
        >
          ClassRoom
        </h4>
        <h5 style={{ fontSize: "15px" }} className="text-secondary">
          Learn to Grow
        </h5>
        <p style={{ fontSize: "13px" }} className="text-muted">
          Our classroom, Our classroom is very nice.
          <br />
          It is large, clean, and light.
        </p>
      </div>

      {/* Pagination Indicator */}
      <div className="d-flex justify-content-center mb-4">
        <span
          className="bg-secondary rounded-circle mx-1"
          style={{ width: "10px", height: "10px" }}
        ></span>
        <span
          className="bg-dark rounded-circle mx-1"
          style={{ width: "10px", height: "10px" }}
        ></span>
        <span
          className="bg-secondary rounded-circle mx-1"
          style={{ width: "10px", height: "10px" }}
        ></span>
      </div>

      {/* Button */}
      <Link to="/login" className="btn btn-success px-5 hoverLink">
        Get Started
      </Link>
    </div>
  </div>
  )
}
