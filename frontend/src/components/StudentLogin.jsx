import React, { useEffect, useState } from "react";
import styles from "./StudentSignin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/lectures");
    }
  }, [navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError(true);
      return false;
    }

    try {
      let response = await fetch("https://school-login-portal-backened-0zbt.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      console.log(result);

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/lectures");
      } else {
        alert("Enter correct credentials");
      }
    } catch (error) {
      alert("Enter correct credentials");
    }
  };

  return (
    <div className={styles.outer_container}>
      <span className={styles.back}>
        <Link to="/">
          <FaArrowLeftLong />
          <a href="#">Back</a>
        </Link>
      </span>
      <div className={styles.container}>
        <div className={styles.login_container}>
          <div className={styles.signin_page}>
            <div className={styles.signin_container}>
              <div className={styles.logo_container}>
                <h1 className={styles.heading}>Sign In</h1>
                <div className="social_media_logo">
                  <a href="#">
                    <img
                      className={styles.logo}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                      alt="Google Logo"
                    />
                  </a>
                  <a href="#">
                    <img
                      className={styles.logo}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s"
                      alt="Facebook Logo"
                    />
                  </a>
                  <a href="#">
                    <img
                      className={styles.logo}
                      src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                      alt="LinkedIn Logo"
                    />
                  </a>
                </div>
                <p className={styles.or}>or</p>
              </div>
              <form className={styles.authenticate} onSubmit={handleFormSubmit}>
                <div className={`mb-3 ${styles.email_container}`}>
                  <label
                    htmlFor="exampleInputEmail1"
                    className={`form-label ${styles.email}`}
                  >
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className={`form-control ${styles.user_input}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    autoComplete="email"
                  />
                  {error && !email && (
                    <span className={styles.credentials}>
                      * Enter valid credentials
                    </span>
                  )}
                </div>
                <div className={`mb-3 ${styles.password_container}`}>
                  <label
                    htmlFor="exampleInputPassword1"
                    className={`form-label ${styles.password}`}
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className={`form-control ${styles.user_input}`}
                    id="exampleInputPassword1"
                    autoComplete="current-password"
                  />
                  {error && !password && (
                    <span className={styles.credentials}>
                      * Enter valid credentials
                    </span>
                  )}
                </div>

                <div className={styles.forgot_password}>
                  <a href="#">Forgot Password</a>
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.signin_btn}`}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>

          <div className={styles.signup_page}>
            <h3 className={styles.welcome}>Welcome back!</h3>
            <div className={styles.signup_img}>
              <img
                className={styles.signup_image}
                src="https://img.freepik.com/premium-vector/woman-sitting-floor-reading-book-woman-reading-with-stack-books-study-lamp-simple-minimalist-flat-vector-illustration_538213-49481.jpg?w=1060"
                alt="Signup Illustration"
              />
            </div>
            <p className={styles.acc_text}>
              Don't have an Account? <br />
              <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
