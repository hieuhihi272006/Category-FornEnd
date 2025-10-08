import styles from "./Register.module.css";
import { data } from "./dataRegister.jsx";
import InputItem from "../../components/InputItem.jsx";
import { useState } from "react";
import checkInput from "./CheckInput.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, changeForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    address: "",
    err: {
      name: false,
      email: false,
      phone: false,
      password: false,
      rePassword: false,
    },
  });
  const [spinner, changSpinner] = useState(false);
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    changeForm((prev) => {
      let isValid;
      if (name === "rePassword") {
        isValid = value.trim().length >= 6 && value === prev.password;
      } else {
        isValid = checkInput(name, value);
      }
      return {
        ...prev,
        [name]: value,
        err: {
          ...prev.err,
          [name]: isValid ? false : prev.err[name],
        },
      };
    });
  };

  const notErrName = checkInput("name", form.name);
  const notErrEmail = checkInput("email", form.email);
  const notErrPhone = checkInput("phone", form.phone);
  const notErrPassword = checkInput("password", form.password);
  const notErrRePassword =
    form.password === form.rePassword && form.rePassword.trim().length >= 6;
  const hasError =
    !notErrName ||
    !notErrEmail ||
    !notErrPhone ||
    !notErrPassword ||
    !notErrRePassword;
  const handleSubmit = (e) => {
    e.preventDefault();
    changeForm((prev) => ({
      ...prev,
      err: {
        ...prev.err,
        name: !notErrName,
        email: !notErrEmail,
        phone: !notErrPhone,
        password: !notErrPassword,
        rePassword: !notErrRePassword,
      },
    }));
    if (hasError) return;
    changSpinner(true);
    const body = {
      name: form.name,
      phoneNumber: form.phone,
      password: form.password,
      address: form.address,
      retypePassword: form.rePassword,
      email: form.email,
    };
    fetch("http://localhost:8080/api/grocery/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
      })
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        changSpinner(false);
      });
  };

  return (
    <>
      <div className={styles.register}>
        <div className={styles.register__header}>
          <p>Create an account</p>
          <p>Enter your information to create your new account</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {data.map((item) => (
            <InputItem
              key={item.title}
              {...item}
              value={form[item.name]}
              onChange={handleChange}
              checkInput={form.err[item.name]}
            />
          ))}
          <button type="submit" className={styles.btn}>
            {spinner ? (
              <div className={styles.spinner}></div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <p className={styles.footer}>
          Already have an account?
          <Link to="/login" className={styles.link}>
            {" "}
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
