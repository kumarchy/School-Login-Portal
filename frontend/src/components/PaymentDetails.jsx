import React, { useState } from "react";
import styles from "./PaymentDetails.module.css";
import { Link, useNavigate } from "react-router-dom";

const PaymentDetails = ({ passRollno }) => {
  const navigate = useNavigate();
  const classes = ["Eleven", "Twelve"];
  const header = [
    "Roll No.",
    "Full Name",
    "Parents Name",
    "Payment Status",
    "Phone Number",
  ];

  const [selectClass, setSelectClass] = useState("");
  const [selectRollno, setSelectRollno] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);

  const showPending = async () => {
    console.log(selectClass);
    console.log(selectRollno);
    try {
      if (selectClass && selectRollno) {
        let result = await fetch(
          `https://school-login-portal-backened-0zbt.onrender.com/pending/${selectClass}/${selectRollno}`,
          {
            headers: {
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        result = await result.json();
        if (Array.isArray(result)) {
          setResult(result);
        } else {
          setResult([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult([]);
    }
    setError(true);
  };

  return (
    <div className={styles.outer_container}>
      <div className={styles.payment_details_section}>
        <div className={styles.select_container}>
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue=""
            onChange={(e) => setSelectClass(e.target.value)}
          >
            <option value="">Select Class Name</option>
            {classes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue=""
            onChange={(e) => setSelectRollno(e.target.value)}
          >
            <option value="">Select Roll Number</option>
            {passRollno.length > 0 &&
              passRollno.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        {error && !selectClass && error && !selectRollno && (
          <div className={styles.inform}>
            <span>* Please select both class name and roll number</span>
          </div>
        )}
        <button
          type="button"
          className={`btn btn-success ${styles.enter_btn}`}
          onClick={showPending}
        >
          Enter
        </button>

        <div className={styles.payment_status}>
          <ul className={styles.heading}>
            {header.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {result.map((item, index) => (
            <ul key={index} className={styles.pendingData}>
              <li>{item.roll_number}</li>
              <li>{item.student_name}</li>
              <li>{item.parent_name}</li>
              <li>{item.payment_status}</li>
              <li>{item.phone_number}</li>
            </ul>
          ))}
        </div>
        <span className={styles.pending_status_link}>
          <Link to="/PendingStatus">Pending Status</Link>
        </span>
      </div>
    </div>
  );
};
export default PaymentDetails;
