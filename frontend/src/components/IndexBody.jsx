import React from "react";
import styles from "./IndexBody.module.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { CgMailOpen } from "react-icons/cg";

const IndexBody = () => {
  return (
    <div className="school_image">
      <div className={styles.school}>
        <div className={styles.container}>
          <h1 className={styles.schoolName}>
            BALMIKI INTERNATIONAL
            <br className={styles.plus2} />
            SCHOOL +2 DIVISION
          </h1>
          <h1 className={styles.heading}>Enlightenment Through Education</h1>
          <h4 className={styles.qualityMessage}>
            A quality-driven institution in Dhangadhi, Kailali, Nepal,
            <br /> offering holistic education for student success. With a{" "}
            <br /> focus on values and modern facilities, we prepare our <br />{" "}
            students for a rapidly changing world.
          </h4>
          <h4 className={styles.coreValues}>Core Values</h4>
          <li className={styles.values}>
            <p>Integrity</p>
            <p>Collaboration</p>
            <p>Empathy</p>
          </li>
          <li className={styles.values}>
            <p>Inclusivity</p>
            <p>Creativity</p>
            <p>Responsibility</p>
          </li>
          <p className={styles.contact}>
            <MdOutlineLocationOn className={styles.location} />
            Hasanpur, Dhangadi-5, Kailali, Nepal <br />
            <CgMailOpen className={styles.gmail} /> balmikiintlschool@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndexBody;
