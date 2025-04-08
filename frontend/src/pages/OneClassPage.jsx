import React, { useState } from "react";
import "../assets/css/homePage.css";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import ClassCard from "../component/ClassCard";
import ClassWork from "../component/class/ClassWork";
import People from "../component/class/People";
import Stream from "../component/class/Stream";
import SidebarDesk from "./../component/layout/SidebarDesk";
import { useLocation } from "react-router-dom";
const OneClassPage = () => {
  const styles = {
    headerImage: {
      backgroundImage:
        'url("https://static.vecteezy.com/system/resources/previews/011/134/640/non_2x/development-illustration-vector.jpg")',
      backgroundSize: "cover", // Ensures the image covers the container
      backgroundPosition: "center", // Centers the image
      height: "200px",
      position: "relative",
    },

    headerImageImg: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "100%",
      height: "auto",
    },
    customizeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
    },
    code: {
      fontSize: "24px",
      color: "#1a73e8",
    },
    announcementInput: {
      border: "none",
      outline: "none",
      width: "100%",
    },
    streamImage: {
      maxWidth: "10%",
      height: "auto",
    },
    badge: {
      width: "40px",
      height: "40px",
    },
  };

  // ~~ Class Id Get //
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const classId = param.get("classId");

  console.log(classId);

  const [ActiveTab, setActiveTab] = useState(localStorage.getItem('activeTab') ? localStorage.getItem('activeTab') :  "stream");
  const HandleActiveTab = (types) => {
    setActiveTab(types);
    localStorage.setItem('activeTab' , types);
  };
  return (
    <>
      <div className="mainOP">
        {/* Navbar */}
        <Navbar />
        {/* Offcanvas Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="container-fluid">
          <div className="row">
            <SidebarDesk />
            <main className="col-lg-10 ms-auto px-6">
              <div className="container-fluid mt-4">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a
                      onClick={() => HandleActiveTab("stream")}
                      class={`nav-link ${
                        ActiveTab === "stream" ? "active" : ""
                      }`}
                      aria-current="page"
                    >
                      Stream
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      onClick={() => HandleActiveTab('classwork')}
                      class={`nav-link ${
                        ActiveTab === "classwork" ? "active" : ""
                      }`}
                    >
                      Classwork
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      onClick={() => HandleActiveTab('people')}
                      class={`nav-link ${
                        ActiveTab === "people" ? "active" : ""
                      }`}
                    >
                      People
                    </a>
                  </li>
                </ul>
                {ActiveTab === "stream" && <Stream />}
                {ActiveTab === "classwork" && <ClassWork />}
                {ActiveTab === "people" && <People />}
              </div>
            </main>
            
<div>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          ...
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default OneClassPage;
