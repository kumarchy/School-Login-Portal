import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const parentLogin = () => {
    navigate("/parentlogin");
  };

  const studentLogin = () => {
    navigate("/studentlogin");
  };
  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${styles.navbar}`}
    >
      <a href="#" className={styles.logo_container}>
        <img
          className={styles.school_logo}
          src="https://balmikischool.edu.np/images/balmiki-logo-full.png"
          alt="School Logo"
        />
      </a>
      <div className={`dropdown login ${styles.login}`}>
        {auth ? (
          <button type="button" className="btn btn-success" onClick={logout}>
            Logout
          </button>
        ) : (
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Login
          </button>
        )}
        <ul className={`dropdown-menu ${styles.login_ul}`}>
          <li>
            <a className="dropdown-item" href="#" onClick={parentLogin}>
              Parent Login
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={studentLogin}>
              Student Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
