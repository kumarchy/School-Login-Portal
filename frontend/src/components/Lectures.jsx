import React, { useState } from "react";
import styles from "./Lectures.module.css";
import {useNavigate } from "react-router-dom";

const Lectures = () => {
  const classes = ["Eleven", "Twelve"];

  const [selectClass, setSelectClass] = useState("");
  const [selectSubject, setSelectSubject] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const visitLecture = async () => {
    try {
      if (selectClass && selectSubject) {
        let result = await fetch(
          `http://localhost:5000/lecture/${selectClass}/${selectSubject}`,
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
          setResult(result);
        } else {
          setResult([]);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult([]);
    }
  };

  const seeVideos = (type) => {
    if (selectClass && selectSubject) {
      if (type === "videos") {
        navigate("/lectureVideos", { state: { selectClass, selectSubject } });
      } else {
        navigate("/notes", { state: { selectClass, selectSubject } });
      }
    }
    setError(true);
  };

  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Lectures and Notes</h3>
        <select
          className={`form-select ${styles.select_container}`}
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
        <div className={styles.subject_input}>
          <p>Subject:</p>
          <input
            className={styles.userInput}
            type="text"
            placeholder="Enter Subject Name"
            onChange={(e) => setSelectSubject(e.target.value)}
          />
        </div>
        {error && !selectClass && !selectSubject && (
          <div className={styles.inform}>
            <span>* Please select both class name and subject</span>
          </div>
        )}
        <button
          type="button"
          className={`btn btn-success ${styles.enter}`}
          onClick={visitLecture}
        >
          Enter
        </button>
        <div className={styles.lecture_videos}>
          {result.map((item, index) => (
            <iframe
              key={index}
              src={item.url}
              title={`YouTube video player ${index}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>
      <div className={styles.download_Container}>
        <div onClick={() => seeVideos("videos")}>
          <a href="#">See all videos</a>
        </div>
        <div onClick={() => seeVideos("notes")}>
          <a href="#">Notes</a>
        </div>
      </div>
    </div>
  );
};

export default Lectures;
