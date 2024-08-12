import React, { useEffect, useState } from "react";
import styles from "./Notes.module.css";
import { useLocation,Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Notes = () => {
  const location = useLocation();
  const { selectClass, selectSubject } = location.state || {};
  const [result, setResult] = useState([]);
  const [displayNotes, setDisplayNotes] = useState(false);
  const [urlState, setUrlState] = useState();

  useEffect(() => {
    const notesCollection = async () => {
      try {
        if (selectClass && selectSubject) {
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

    notesCollection();
  }, [selectClass, selectSubject]);

  const showNotes = (url) => {
    setDisplayNotes(true);
    setUrlState(url);
  };

  return (
    <div className={styles.outermost_container}>
      <span className={styles.back}>
        <Link to="/lectures">
          <FaArrowLeftLong />
          <a href="#">Back</a>
        </Link>
      </span>
      <div className={styles.outer_container}>
        <div className={styles.inner_container}>
          <h1 className={styles.heading}>Lecture Notes</h1>
          <div className={styles.subject_container}>
            {result.map((item, index) => (
              <a href="#">
                <img
                  key={index}
                  className={styles.subject}
                  src={item.notes_img_url}
                  alt="Notes not available"
                  onClick={() => showNotes(item.notes_img_url)}
                />
              </a>
            ))}
          </div>
          <div className={styles.scroll}>
            {displayNotes && (
              <ul>
                {result.map(
                  (item, index) =>
                    item.notes_img_url &&
                    urlState === item.notes_img_url && (
                      <li>
                        <img
                          key={index}
                          className={styles.notes}
                          src={item.notes_img_url}
                          alt=""
                        />
                      </li>
                    )
                )}
                {/* <li>
            <img 
        className={styles.notes} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFw4CGe2rv5HF_QgVmm1KPG_9iIC6-a_srSb1bvCkjk-sYe-UOltg_tyYQG9DN9-y5yL0P-Drd8-Ivkl916S6aeO9DTEwH4m7UNh5JNCAPKp0b9Qw_Q7qdT5ER-wJMuA18PiZa6u_bhqe-9mrkn-Qgmjo2aa525_O37hKIDzIWfTnwBdpi_KJ9pu2F/s1080/4.png" alt="" />
              </li>
            */}
              </ul>
            )}
          </div>
          <h2 className={styles.thankyou}>Thank you!!</h2>
        </div>
      </div>
    </div>
  );
};

export default Notes;
