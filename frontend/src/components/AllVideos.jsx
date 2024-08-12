import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AllVideos.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

const AllVideos = () => {
  const location = useLocation();
  const { selectClass, selectSubject } = location.state || {};
  const [result, setResult] = useState([]);

  useEffect(() => {
    const videoCollection = async () => {
      try {
        if (selectClass && selectSubject) {
          console.log(selectClass, selectSubject);
          let result = await fetch(
            `https://school-login-portal-backened-0zbt.onrender.com/${selectClass}/${selectSubject}`,
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setResult([]);
      }
    };

    videoCollection();
  }, [selectClass, selectSubject]);

  return (
    <div className={styles.outer_container}>
      <span className={styles.back}>
        <Link to="/lectures">
          <FaArrowLeftLong />
          <a href="#">Back</a>
        </Link>
      </span>
      <div className={styles.container}>
        {result.map((item, index) => (
          <div className={styles.video} key={index}>
            <iframe
              src={item.url}
              title={`YouTube video player ${index}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVideos;
