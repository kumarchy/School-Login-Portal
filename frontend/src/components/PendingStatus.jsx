import React, { useState } from "react";
import styles from "./PendingStatus.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Dashboard from "./Dashboard";

const PendingStatus = () => {
  const [status, setStatus] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  const [showBoth, setShowBoth] = useState(false);

  const year = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];

  const pendingStatus = async () => {
    try {
      console.log(selectDate);
      let result = await fetch(
        `https://school-login-portal-backened-0zbt.onrender.com/feeStatus/${selectDate}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      result = await result.json();
      console.log(result);
      if (Array.isArray(result)) {
        setStatus(result);
      } else {
        setStatus([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus([]);
    }
  };

  const handleBtnClick = () => {
    setShowBoth(true);
  };

  const totalPendingFee = status.reduce(
    (total, item) => total + item["pending_fee"],
    0
  );

  return (
    <div className={styles.outermost_container}>
      {!showBoth ? (
        <div>
          <span className={styles.back}>
            <a href="#" onClick={handleBtnClick}>
              <FaArrowLeftLong />
              <span>Back</span>
            </a>
          </span>
          <div className={styles.outer_container}>
            <div className={styles.inner_container}>
              <div className={styles.select_date}>
                <label htmlFor="date">Date:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={selectDate}
                  onChange={(e) => setSelectDate(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {year.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={`btn btn-success ${styles.enter}`}
                  onClick={pendingStatus}
                >
                  Enter
                </button>
              </div>
              <div className={styles.pending_status}>
                <ul className={styles.heading}>
                  <li>Year</li>
                  <li>Month</li>
                  <li>Total Monthly Fee</li>
                  <li>Pending Fee</li>
                </ul>
                <div className={styles.data_container}>
                  {status.map((item, index) => (
                    <ul className={styles.data} key={index}>
                      <li>{item.year}</li>
                      <li>{item.month}</li>
                      <li>{item.total_monthly_fee}</li>
                      <li>{item.pending_fee}</li>
                    </ul>
                  ))}
                  <div className={styles.display_fee}>
                    <ul className={styles.total_pending_fee}>
                      <li>Total Pending Fee: Rs. {totalPendingFee}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default PendingStatus;
