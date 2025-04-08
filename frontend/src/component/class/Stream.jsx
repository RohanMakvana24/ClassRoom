import React, { useState } from 'react'
const Stream = () => {
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

    const Codestyles = {
        code: {
            fontSize: "72px",
            color: "#3c4043",
            margin: "20px 0",
            textAlign: "center"
        },
        footer: {
            fontSize: "14px",
            color: "#5f6368",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        link: {
            color: "#1a73e8",
            textDecoration: "none",
        },
        closeIcon: {
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "18px",
            cursor: "pointer",
        },
    };
    const [codePopUp, setCodePop] = useState(false);

    const toggleCodePopUp = () => setCodePop(!codePopUp)
    return (
        <>
            <div style={styles.headerImage}>
                <button className="btn btn-light" style={styles.customizeBtn}>
                    Customize
                </button>
            </div>
            <div className="row mt-4">
                <div className="col-md-3">
                    <div style={styles.card}>
                        <h6>Class code</h6>
                        <div className="d-flex align-items-center">
                            <span style={styles.code}>vjft3ua</span>
                            <i className="fas fa-expand ms-2" onClick={toggleCodePopUp} ></i>
                        </div>
                    </div>
                    <div style={styles.card}>
                        <h6>Upcoming</h6>
                        <p>No work due soon</p>
                        <a href="#">View all</a>
                    </div>
                </div>

                <div className="col-md-9">
                    <div style={{ ...styles.card, marginBottom: "16px" }}>
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                <span
                                    className="badge bg-primary rounded-circle"
                                    style={styles.badge}
                                >
                                    R
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Announce something to your class"
                                style={styles.announcementInput}
                            />
                        </div>
                    </div>

                    <div style={styles.card}>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/005/416/084/non_2x/world-book-day-background-with-fiction-elements-free-vector.jpg"
                                alt="Decorative image with various school supplies"
                                style={styles.streamImage}
                            />
                            <div className="ms-3">
                                <h5>This is where you can talk to your class</h5>
                                <p>
                                    Use the stream to share announcements, post
                                    assignments, and respond to student questions
                                </p>
                            </div>
                        </div>
                        <button className="btn btn-light">Stream settings</button>
                    </div>
                </div>
            </div>

            { /* Code Pop Up Modal */}
            {codePopUp && <div className="modal-backdrop fade show"></div>}
            <div
                className={`modal fade ${codePopUp ? "show" : ""}`}
                style={{ display: codePopUp ? "block" : "none" }}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">

                            <div style={Codestyles.closeIcon} onClick={toggleCodePopUp}>&times;</div>
                            <div style={{ textAlign: "center" }}>Class code</div>
                            <div style={Codestyles.code}>vjft3ua</div>
                            <div style={Codestyles.footer}>
                                <div>sdsd</div>
                                <div>
                                    <i className="far fa-copy"></i>
                                    <a href="#" style={Codestyles.link}>
                                        Copy invite link
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Stream
