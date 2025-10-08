import styles from "./Login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.js";
export default function Login() {
  const [colorPhone, changeColorPhone] = useState(false);
  const [colorPassword, changeColorPassword] = useState(false);
  const [appearPassword, changeAppearPassword] = useState(false);
  const [phoneNumber, changePhoneNumber] = useState("");
  const [password, changePassword] = useState("");
  const [checkPhone, changeCheckPhone] = useState(false);
  const [checkPassword, changeCheckPassword] = useState(false);
  const [load, changeLoad] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  const onChangePhone = (e) => {
    const value = e.target.value;
    changePhoneNumber(value);
    const phoneInValid = isNaN(value) || value.length < 10;
    if (!phoneInValid) {
      changeCheckPhone(false);
    }
  };
  const onChangePassword = (e) => {
    const value = e.target.value;
    changePassword(value);
    const passwordInValid = value.trim().length < 6;
    if (!passwordInValid) {
      changeCheckPassword(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneInValid = isNaN(phoneNumber) || phoneNumber.length < 10;
    const passwordInvalid = password.trim().length < 6;
    changeCheckPhone(phoneInValid);
    changeCheckPassword(passwordInvalid);
    if (phoneInValid || passwordInvalid) {
      return;
    }
    changeLoad(false);
    fetch("http://localhost:8080/api/grocery/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server trả lỗi");
        }
        return res.text();
      })
      .then((data) => {
        console.log("Token: " + data);
        login(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        changeLoad(true);
      });
  };

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.login__header}>Welcome Back</h2>
        <p className={styles.login__guide}>
          Enter your credentials to access your account
        </p>
        <form className={styles.form}>
          <label className={styles.label__item}>
            <strong>Phone</strong>
            <div
              className={`${styles.item__box} ${
                colorPhone ? styles.focus : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="20"
                height="20"
                className={styles.item__icon}
                fill={colorPhone ? "black" : "currentColor"}
              >
                <path
                  // fill="currentColor"
                  d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter your phone"
                className={styles.item__input}
                value={phoneNumber}
                onChange={onChangePhone}
                onFocus={() => changeColorPhone(true)}
                onBlur={() => changeColorPhone(false)}
              ></input>
            </div>
            {checkPhone && (
              <p className={styles.errNumber}>Number Phone is NotValid</p>
            )}
          </label>
          <label className={styles.label__item}>
            <strong>Password</strong>
            <div
              className={`${styles.item__box} ${
                colorPassword ? styles.focus : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                width="20"
                height="20"
                className={styles.item__icon}
                fill={colorPassword ? "black" : "currentColor"}
              >
                <path d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z" />
              </svg>
              <input
                type={appearPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={styles.item__input}
                value={password}
                onChange={onChangePassword}
                onFocus={() => changeColorPassword(true)}
                onBlur={() => changeColorPassword(false)}
              ></input>
              {appearPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width="20"
                  height="20"
                  className={styles.eye}
                  fill="currentColor"
                  onClick={() => changeAppearPassword((item) => !item)}
                >
                  <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width="20"
                  height="20"
                  className={styles.eyeAppear}
                  fill="currentColor"
                  onClick={() => changeAppearPassword((item) => !item)}
                >
                  <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" />
                </svg>
              )}
            </div>
            {checkPassword && (
              <p className={styles.errPassword}>Password is NotValid</p>
            )}
          </label>
        </form>
        <div className={styles.inner}>
          <div className={styles.inner__remember}>
            <input type="checkbox" name="" id="" className={styles.checkBox} />
            <strong>Remember me</strong>
          </div>
          <a className={styles.inner__forgot}>Forgot password ?</a>
        </div>
        <button onClick={handleSubmit} className={styles.btn}>
          {load ? "Sign In" : <div className={styles.spinner}></div>}
        </button>
        <p className={styles.headerFooter}>
          Don't have an account?
          <Link to="/register" className={styles.signUp}>
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
