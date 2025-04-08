import React from "react";

const People = () => {
  const styles = {
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "500",
      marginTop: "20px",
    },
    member: {
      display: "flex",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #ddd",
    },
    memberImage: {
      borderRadius: "50%",
      marginRight: "10px",
    },
    inviteLink: {
      color: "#1a73e8",
      textDecoration: "none",
    },
    inviteLinkHover: {
      textDecoration: "underline",
    },
    addStudentsSection: {
      textAlign: "center",
      marginTop: "50px",
    },
    addStudentsImage: {
      maxWidth: "100%",
      height: "auto",
    },
    addStudentsText: {
      marginTop: "10px",
      fontSize: "16px",
    },
    addStudentsLink: {
      fontSize: "16px",
    },
    icon: {
      fontSize: "24px",
      marginLeft: "auto",
    },
  };
  return (
    <>
      <div style={styles.sectionTitle}>Teachers</div>
      <div style={styles.member}>
        <img
          src="https://storage.googleapis.com/a1aa/image/NDNGr2ykeNzKR62s3X42g7fnnkEYYgbuB405Pm3jtgMvnDJUA.jpg"
          alt="Profile picture of Rohan Makvana"
          height="40"
          width="40"
          style={styles.memberImage}
        />
        <span>Rohan Makvana</span>
        <i className="fas fa-user-plus" style={styles.icon}></i>
      </div>

      <div style={styles.sectionTitle}>Students</div>
      <div style={styles.member}>
        <i className="fas fa-user-plus" style={styles.icon}></i>
      </div>

      <div style={styles.addStudentsSection}>
        <img
          src="https://storage.googleapis.com/a1aa/image/KLg305fOZzRqbye2r9zO59dlhkMAt7r5LrpRzPv3hQttnDJUA.jpg"
          alt="Illustration of a book and a pen"
          height="200"
          width="200"
          style={styles.addStudentsImage}
        />
        <p style={styles.addStudentsText}>Add students to this class</p>
        <a href="#" style={styles.inviteLink}>
          <i className="fas fa-user-plus"></i> Invite students
        </a>
      </div>
    </>
  );
};

export default People;
