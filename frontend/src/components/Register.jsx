import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const collectData = async (event) => {
    event.preventDefault();
    console.log(userName, userEmail, userPassword);
    setError(true);
    const data = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    let result = await fetch(`http://localhost:5000/register`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    if (result) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/lectures");
    }
  };

  return (
    <div className={styles.outer_container}>
      <span className={styles.back}>
        <Link to="/studentlogin">
          <FaArrowLeftLong />
          <a href="#">Back</a>
        </Link>
      </span>
      <div className={styles.body}>
        <form className={styles.container} onSubmit={collectData}>
          <h2 className={styles.create_acc}>Create Account</h2>
          <div className="mb-4">
            <input
              type="text"
              id="exampleInputtext"
              aria-describedby="emailHelp"
              className={`form-control ${styles.user_input}`}
              autoComplete="Username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {error && !userName && (
              <span className={styles.credentials}>
                * Enter valid credentials
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              className={`form-control ${styles.user_input}`}
              autoComplete="Email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {error && !userEmail && (
              <span className={styles.credentials}>
                * Enter valid credentials
              </span>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="exampleInputPassword1"
              className={`form-control ${styles.user_input}`}
              autoComplete="Password"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            {error && !userPassword && (
              <span className={styles.credentials}>
                * Enter valid credentials
              </span>
            )}
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label htmlFor="exampleCheck1">
              I read and agree to{" "}
              <span className={`form-check-label ${styles.terms}`}>
                Terms and Conditions
              </span>
            </label>
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${styles.submit_btn}`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
