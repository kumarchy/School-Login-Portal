import React, { useState } from "react";
import styles from "./StudentMarksDetails.module.css";
import { Link } from "react-router-dom";

const StudentMarksDetails = ({ passRollno }) => {
  const [marks, setMarks] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRollNo, setSelectedRollNo] = useState("");
  const [error, setError] = useState(false);

  const classes = ["Eleven", "Twelve"];
  const header = [
    "Subjects",
    "Full Marks",
    "Pass Marks",
    "Obtained Marks",
    "Remarks",
  ];

  const collectData = async () => {
    if (selectedClass && selectedRollNo) {
      let result = await fetch(
        `https://school-login-portal-backened-0zbt.onrender.com/report/${selectedClass}/${selectedRollNo}`,
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
      if (result) {
        setMarks(result);
      }
    }
    setError(true);
    console.log(selectedClass);
    console.log(selectedRollNo);
  };

  return (
    <div className={styles.outer_container}>
      <div className={styles.marks_details_section}>
        <div className={styles.progress_report}>
          <p>Student Progress Report</p>
        </div>
        <div className={styles.select_container}>
          <select
            className="form-select"
            aria-label="Default select example"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
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
            value={selectedRollNo}
            onChange={(e) => setSelectedRollNo(e.target.value)}
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
        {error && !selectedClass && error && !selectedRollNo && (
          <div className={styles.inform}>
            <span>* Please select both class name and roll number</span>
          </div>
        )}
        <button
          type="button"
          className={`btn btn-success ${styles.enter_btn}`}
          onClick={collectData}
        >
          Enter
        </button>
        <div className={styles.marks}>
          <ul className={styles.heading}>
            {header.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {marks.length > 0 &&
            marks.map((item, index) => (
              <ul key={index}>
                <li>{item.subject}</li>
                <li>{item.full_marks}</li>
                <li>{item.pass_marks}</li>
                <li>{item.obtained_marks}</li>
                <li>{item.remarks}</li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentMarksDetails;
