import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import CreateClassSchema from "../../ValidationSchema/Class/createClassSchema";
import ClassCard from "../ClassCard";
import { createNewClass } from "../../features/class/ClassSlice";
import { toast } from "react-toastify";
const Navbar = ({ fetchClass }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const createClassModelCloseRef = useRef(null);
  const handleLogout = async () => {
    const logoutToast = toast.loading("Logout Processing...");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/private-auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.isValid && response.data.success) {
        dispatch(logout());
        localStorage.removeItem("auth");
        toast.update(logoutToast, {
          render: "Logout Succefull",
          type: "success",
          theme: "colored",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(logoutToast, {
        render: "Somenthing Went Wrong",
        type: "error",
        theme: "colored",
        loading: false,
        autoClose: 3000,
      });
    }
  };

  const createClassFormik = useFormik({
    initialValues: {
      className: "",
      section: "",
      subject: "",
      room: "",
      userId: "",
    },
    validationSchema: CreateClassSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("className", values.className);
      formData.append("section", values.section);
      formData.append("subject", values.subject);
      formData.append("room", values.room);
      formData.append("userId", user._id);
      const classToastId = toast.loading("Class is Creating....");
      const result = await dispatch(createNewClass(formData));
      if (createNewClass.fulfilled.match(result)) {
        toast.update(classToastId, {
          render: result.payload.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        resetForm();
        fetchClass();
        createClassModelCloseRef.current.click();
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

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontWeight: "600" }}>
            <i
              className="fa-solid fa-book"
              style={{ marginRight: "4px", fontSize: "15px" }}
            ></i>
            Classroom
          </a>
          <div className="d-flex align-items-center ms-auto">
            <div className="dropdown">
              <button className="btn btn-link" data-bs-toggle="dropdown">
                <i className="fas fa-plus" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#createClassModal"
                  >
                    Create Class
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#joinClassModal"
                  >
                    Join Class
                  </button>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <img
                  alt="User profile"
                  className="rounded-circle"
                  height="32"
                  src={
                    user.profile?.url ||
                    "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_w.jpeg"
                  }
                  width="32"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Create Class Modal */}
      <div
        className="modal fade"
        id="createClassModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={createClassFormik.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Create Class</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  ref={createClassModelCloseRef}
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Update  Class Modal */}
    </>
  );
};

export default Navbar;
