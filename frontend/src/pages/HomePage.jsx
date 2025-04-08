import React, { useDeferredValue, useEffect, useState } from "react";
import "../assets/css/homePage.css";
import ClassCard from "../component/ClassCard";
import { Link } from "react-router-dom";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import SidebarDesk from "../component/layout/SidebarDesk";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getClassCode } from "../features/class/ClassSlice";
const HomePage = () => {
  const styles = {
    heading: {
      fontSize: "20px",
      fontWeight: "600",
      color: "whites",
    },
    formGroup: {
      height: "62px",
      marginBottom: "1px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#555",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
    },
    inputFocus: {
      borderColor: "#007bff",
      boxShadow: "0 0 4px rgba(0, 123, 255, 0.3)",
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
    cancelButton: {
      padding: "8px 16px",
      backgroundColor: "#f0f0f0",
      color: "#555",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    cancelButtonHover: {
      backgroundColor: "#e0e0e0",
    },
    createButton: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    createButtonHover: {
      backgroundColor: "#0056b3",
    },
    required: {
      color: "red",
    },
  };

  const [Class, setClass] = useState([]);
  const [Images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ClassCodeData, setClassCodeData] = useState();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // ~~ Get All Class ~~ //
  const fetchClass = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/get-all-classes/${
          user._id
        }`
      );
      setClass(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClass();
  }, [user._id]);

  // ~~ Get Class Code Data And Show in Modal ~~ //

  const showQRCode = async (classID) => {
    const result = await dispatch(getClassCode(classID));
    if (getClassCode.fulfilled.match(result)) {
      const newCodeData = {
        code: result.payload.data.code,
        url: result.payload.data.url,
      };
      setClassCodeData(newCodeData);
    } else {
      console.log(result.error);
    }
  };

  return (
    <>
      <div className="mainOP">
        {/* Navbar */}
        <Navbar fetchClass={fetchClass} />

        {/* Offcanvas Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="container-fluid">
          <div className="row">
            <SidebarDesk />
            <main className="col-lg-10 ms-auto px-6">
              <div className="container-fluid mt-4">
                <div className="row g-3">
                  {loading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "50vh" }}
                    >
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : Class.length > 0 ? (
                    Class.map((classItem, idx) => (
                      <div
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                        key={classItem._id} // Use a unique key from API
                      >
                        <ClassCard
                          getCodeOfClass={showQRCode}
                          ClassCodeData={ClassCodeData}
                          fetchClass={fetchClass}
                          classId={classItem._id}
                          title={classItem.className} // Assuming `name` is the class title
                          students={classItem.studentCount || 0} // Assuming `studentCount` exists
                        />
                      </div>
                    ))
                  ) : (
                    <div class="text-center">
                      <img
                        alt="Illustration of a window, a bird, a book, and other objects"
                        class="mx-auto mt-5 mb-4"
                        height="140"
                        src="https://img.freepik.com/premium-vector/beautiful-business-woman-working-laptop-illustration_96037-533.jpg?w=826"
                        width="250"
                      />
                      <p class="text-muted mb-4">Add a class to get started</p>
                      <div class="d-flex justify-content-center gap-3">
                        <button
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#createClassModal"
                        >
                          Create class
                        </button>
                        <button class="btn btn-primary">Join class</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
