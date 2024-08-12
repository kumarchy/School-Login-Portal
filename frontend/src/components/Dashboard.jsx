import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { MdDashboard } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrScorecard } from "react-icons/gr";
import { SiWelcometothejungle } from "react-icons/si";
import PaymentDetails from "./PaymentDetails";
import StudentMarksDetails from "./StudentMarksDetails";
import Welcome from "./Welcome";

const Dashboard = () => {
  const [selectDetail, setSelectDetail] = useState("Welcome");
  const [showRollno, setShowRollno] = useState("");

  const renderCounter = (selectDetails) => {
    if (selectDetail === "Payment Details") {
      return <PaymentDetails passRollno={showRollno} />;
    } else if (selectDetail === "Student Marks Details") {
      return <StudentMarksDetails passRollno={showRollno} />;
    } else {
      return <Welcome />;
    }
  };

  const getPaymentSectionRollno = async () => {
    setSelectDetail("Payment Details");
    let result = await fetch("https://school-login-portal-backened-0zbt.onrender.com", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      setShowRollno(result);
    }
  };

  const getMarksSectionRollno = async () => {
    setSelectDetail("Student Marks Details");
    let result = await fetch("https://school-login-portal-backened-0zbt.onrender.com", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      setShowRollno(result);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.outer_dashboard_container}>
        <div
          className={`d-flex flex-column flex-shrink-0 p-3  ${styles.dashboard_container}`}
          style={{ width: "280px" }}
        >
          <a
            href="#"
            className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ${styles.dash_logo_container}`}
          >
            <MdDashboard className={styles.dashboardLogo} />
            <span className={styles.dashboard}>Dashboard</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-white ${
                  selectDetail === "Welcome" ? "active" : ""
                } ${styles.details}`}
                aria-current="page"
                onClick={() => setSelectDetail("Welcome")}
              >
                <SiWelcometothejungle className={styles.detailsLogo} />
                <p className={styles.payment}>Welcome</p>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link text-white ${
                  selectDetail === "Payment Details" ? "active" : ""
                } ${styles.details}`}
                aria-current="page"
                onClick={getPaymentSectionRollno}
              >
                <RiSecurePaymentLine className={styles.detailsLogo} />
                <p className={styles.payment}>Payment Details</p>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`nav-link text-white ${
                  selectDetail === "Student Marks Details" ? "active" : ""
                }  ${styles.details}`}
                onClick={getMarksSectionRollno}
              >
                <GrScorecard className={styles.detailsLogo} />
                <p className={styles.marks}>Student Marks Details</p>
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a href="/">
              <img
                src="https://balmikischool.edu.np/images/balmiki-logo-full.png"
                alt=""
                width="50"
                height="50"
                className="rounded-circle me-2"
              />
            </a>
          </div>
        </div>
      </div>
      {renderCounter()}
    </div>
  );
};

export default Dashboard;
