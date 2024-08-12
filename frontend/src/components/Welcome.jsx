import React from "react";
import styles from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const welcomeback = () => {
    navigate("/ParentLogin");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>~~~!!~WELCOME~!!~~~</h1>
    </div>
  );
};

export default Welcome;
