import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  deleteClass,
  getClassCode,
  getSingleClassThunk,
  updateClassThunk,
} from "../features/class/ClassSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import CreateClassSchema from "../ValidationSchema/Class/createClassSchema";
import { Check2 } from "react-bootstrap-icons";
import { ShareSocial } from "react-share-social";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
} from "react-share";

const ClassCard = ({
  classId,
  title,
  students,
  fetchClass,
  getCodeOfClass,
  ClassCodeData,
}) => {
  const [image, setImage] = useState("");
  const [rawImage, setRawImage] = useState("");
  const isInitialRender = useRef(true);
  const dispatch = useDispatch();
  const updateClasssModelCloseRef = useRef(null);
  const [copie, setCopie] = useState(false);
  const [showShareBox, setshowShareBox] = useState(false);

  const fetchStaticImage = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/get-all-staticimages`
      );
      setRawImage(response.data.images);
    } catch (error) {
      console.error("Static Images API Error:", error);
    }
  };

  useEffect(() => {
    fetchStaticImage();
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (rawImage && rawImage.length > 0) {
      const randomIndex = Math.floor(Math.random() * rawImage.length);
      const randomImageObject = rawImage[randomIndex];
      setImage(randomImageObject.url);
    } else {
      console.error("The images array is empty.");
    }
  }, [rawImage]);

  // ~~ 🔥 Delete Class Section Start 🔥 ~~ //
  const handleDeletClass = async () => {
    const result = await dispatch(deleteClass(classId));
    const toastClassDeleteId = toast.loading("Class is deleting...");

    if (deleteClass.fulfilled.match(result)) {
      toast.update(toastClassDeleteId, {
        render: result.payload.message,
        type: "success",
        theme: "colored",
        isLoading: false,
        autoClose: 3000,
      });
      fetchClass();
    } else {
      const errorData = result.payload?.message;
      toast.update(toastClassDeleteId, {
        render: errorData || "Something Went Wrong",
        type: "error",
        theme: "colored",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  // ~~ 🔥 Delete Class Section End 🔥 ~~ //

  // ~~ 🔥 Update Class Section Start 🔥 ~~ //

  // `` 🎉 Get Class Information 🎉 `` //
  const createClassFormik = useFormik({
    initialValues: {
      className: "",
      section: "",
      subject: "",
      room: "",
      classId: "",
    },
    validationSchema: CreateClassSchema,
    onSubmit: async (values, { resetForm }) => {
      const classToastId = toast.loading("Class is Updating....");

      const result = await dispatch(updateClassThunk(values));
      if (updateClassThunk.fulfilled.match(result)) {
        toast.update(classToastId, {
          render: "Class Updated Succefully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchClass();
        resetForm();

        updateClasssModelCloseRef.current.click();
      } else {
        const errorData = result.payload?.errors;
        if (errorData) {
          const errorMessage = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n");

          toast.update(classToastId, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(classToastId, {
            render: "Somenthing Went Wrong",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    },
  });

  const getSingleClass = async (classId1) => {
    const result = await dispatch(getSingleClassThunk(classId1));
    if (getSingleClassThunk.fulfilled.match(result)) {
      const fetchedData = result.payload.data;
      createClassFormik.resetForm({
        values: {
          className: fetchedData.className || "",
          section: fetchedData.section || "",
          subject: fetchedData.subject || "",
          room: fetchedData.room || "",
          classId: classId,
        },
      });
    } else {
      console.log(result.error);
    }
  };

  // ~~ Handle Copy Code Logic ~~ //
  const handleCopyCode = async (code) => {
    await navigator.clipboard.writeText(code);
    setCopie(true);
    setTimeout(() => setCopie(false), 1500);
  };

  // ~~ Show Share Box ~~ //
  const handleShareBox = () => {
    setshowShareBox(true);
  };
  ClassCodeData;
  const shareUrl = `https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww`;
  const shareText = "Join my class using this QR code!";
  // ~~ Style CSS ~~ //

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    border: "none",
    backgroundColor: "#0d6efd",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
  };

  const qrBoxStyle = {
    marginTop: "20px",
  };
  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
        }}
      >
        {/* Image Section */}
        <div
          style={{ position: "relative", height: "220px", overflow: "hidden" }}
        >
          <img
            src={image}
            alt="Class Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <div className="dropdown">
              <i
                className="fas fa-ellipsis-v"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  fontSize: "22px",
                  color: "#000", // Set to black
                  background: "transparent", // No background
                  padding: "12px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              ></i>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#updateClassModal"
                    onClick={() => getSingleClass(classId)}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => getCodeOfClass(classId)}
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Copy Invite Link
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleDeletClass}>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: "25px",
            textAlign: "center",
            background: "white",
          }}
        >
          <Link
            to={`/one-class?classId=${classId}`}
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#333",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            {title}
          </Link>
          <p
            style={{
              color: "#666",
              fontSize: "18px",
              marginTop: "12px",
            }}
          >
            {students} students
          </p>
        </div>
      </div>
      {/* Update Class Modal */}
      <div
        className="modal fade"
        id="updateClassModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={createClassFormik.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Update Class</h5>
                <button
                  type="button"
                  className="btn-close"
                  ref={updateClasssModelCloseRef}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Class Name{" "}
                    <span style={{ color: "red" }}> (required) </span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      createClassFormik.touched.className &&
                      createClassFormik.errors.className
                        ? "is-invalid"
                        : ""
                    }`}
                    name="className"
                    value={createClassFormik.values.className}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.className &&
                    createClassFormik.errors.className && (
                      <div className="text-danger">
                        {createClassFormik.errors.className}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Section</label>
                  <input
                    type="text"
                    name="section"
                    className={`form-control ${
                      createClassFormik.touched.section &&
                      createClassFormik.errors.section
                        ? "is-invalid"
                        : ""
                    }`}
                    value={createClassFormik.values.section}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.section &&
                    createClassFormik.errors.section && (
                      <div className="text-danger">
                        {createClassFormik.errors.section}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className={`form-control ${
                      createClassFormik.touched.subject &&
                      createClassFormik.errors.subject
                        ? "is-invalid"
                        : ""
                    }`}
                    name="subject"
                    value={createClassFormik.values.subject}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.subject &&
                    createClassFormik.errors.subject && (
                      <div className="text-danger">
                        {createClassFormik.errors.subject}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Room</label>
                  <input
                    type="text"
                    className={`form-control ${
                      createClassFormik.touched.room &&
                      createClassFormik.errors.room
                        ? "is-invalid"
                        : ""
                    }`}
                    name="room"
                    value={createClassFormik.values.room}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.room &&
                    createClassFormik.errors.room && (
                      <div className="text-danger">
                        {createClassFormik.errors.room}
                      </div>
                    )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Code Generates Modal */}
      <div>
        {/* Code Generates Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Share Class Invite
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div style={{ textAlign: "center", position: "relative" }}>
                  <h4 style={{ marginBottom: "8px", fontWeight: "600" }}>
                    Invite Students via QR Code
                  </h4>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#555",
                      marginBottom: "20px",
                    }}
                  >
                    Share this QR code or link to let students join your class
                  </p>

                  {ClassCodeData && (
                    <div style={{ position: "relative", width: "100%" }}>
                      <input
                        type="text"
                        value={ClassCodeData.code}
                        readOnly
                        onClick={() => handleCopyCode(ClassCodeData.code)}
                        className={`form-control pe-5 ${
                          copie ? "border border-2 border-success" : ""
                        }`}
                        style={{
                          paddingRight: "44px", // enough for larger icon
                          padding: "12px",

                          fontSize: "0.95rem",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          marginBottom: "15px",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      />

                      {/* ✅ Check Icon inside input */}
                      {copie && (
                        <Check2
                          size={35} // Increased icon size
                          className="text-success position-absolute"
                          style={{
                            top: "50%",
                            right: "12px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {/* Tooltip-style "Copied!" message */}
                      {copie && (
                        <div
                          className="position-absolute bg-dark text-white small px-2 py-1 rounded"
                          style={{
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginTop: "5px",
                            whiteSpace: "nowrap",
                            zIndex: 1,
                          }}
                        >
                          Copied!
                        </div>
                      )}
                    </div>
                  )}

                  {ClassCodeData && (
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                      <img
                        src={`${ClassCodeData.url}`}
                        alt="QR Code"
                        style={{
                          borderRadius: "12px",
                          padding: "10px",
                          height: "270px",
                          width: "270px",
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  )}

                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#888",
                      marginTop: "10px",
                    }}
                  >
                    Scan the code or use the invite code
                  </p>

                  <button
                    onClick={() => {
                      handleShareBox();
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      backgroundColor: "#0d6efd",
                      color: "#fff",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      marginBottom: "20px",
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0b5ed7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0d6efd")
                    }
                  >
                    Share QR Code
                  </button>
                  {showShareBox && (
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                      <WhatsappShareButton url={shareUrl} title={shareText}>
                        <WhatsappIcon size={48} round />
                      </WhatsappShareButton>
                      <FacebookShareButton url={shareUrl} quote={shareText}>
                        <FacebookIcon size={48} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareUrl} title={shareText}>
                        <TwitterIcon size={48} round />
                      </TwitterShareButton>
                      <TelegramShareButton url={shareUrl} title={shareText}>
                        <TelegramIcon size={48} round />
                      </TelegramShareButton>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
