"use client";
import Link from "next/link";
import styles from "./login.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { LoginCommon } from "@/app/common/helper/login.request";
import { CustomError } from "@/app/common/errors/custom.error";
import {
  ReturnProps,
  validationForm,
} from "@/app/common/helper/login.form.validation";

//Reference
// React UserRef

export default function CustomerLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userNameEmptyError, setUserNameEmptyError] = useState("");
  const [passwordEmptyError, setPasswordEmptyError] = useState("");
  // const userNameRef = useRef();
  async function handleLogin() {
    try {
      const validateForm: ReturnProps = validationForm(userName, password);
      if (validateForm.isEmpty) {
        if (validateForm.forUserName) {
          setUserNameEmptyError(validateForm.forUserName);
        }
        if (validateForm.forPassword) {
          setPasswordEmptyError(validateForm.forPassword);
        }
      } else {
        const loginData = await LoginCommon({ userName, password });
        console.log("This is Login Data: ", loginData);
      }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error._error.message instanceof Array) {
          //This is not require since every thing is handle by frontend
        }
        setErrorMessage(error._error.message);
      }
    }
  }

  return (
    <form className={styles.login_container}>
      {errorMessage}
      <label className={styles.login_text}>Login</label>
      <label className={styles.sub_text}>
        Welcome Back, great to see you again
      </label>
      <div className={styles.form_container}>
        <label htmlFor="UserName" className={styles.label}>
          User Name
        </label>
        <input
          placeholder={userNameEmptyError || "UserName"}
          className={`${styles.input} ${
            userNameEmptyError
              ? `${styles.inputError} ${styles.inputBorderError}`
              : ""
          }`}
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (e.target.value.trim() !== "") {
              setUserNameEmptyError("");
            }
          }}
          required={true}
        />
        <label htmlFor="Password" className={styles.label}>
          Password
        </label>
        <input
          placeholder={passwordEmptyError || "********"}
          className={`${styles.input} ${
            passwordEmptyError
              ? `${styles.inputError} ${styles.inputBorderError}`
              : ""
          }`}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value.trim() !== "") {
              setPasswordEmptyError("");
            }
          }}
          required={true}
        />
        <a href="" className={styles.forget_password}>
          Forget Password?{" "}
        </a>
      </div>
      <button
        type="button"
        className={styles.login_button}
        onClick={handleLogin}
      >
        Login
      </button>
      <label className={styles.sub_text}>-or-</label>
      <button className={styles.continue_with_google}>
        <div className={styles.google_img}>
          <Image
            src="/svg/icons8-google-48.png"
            alt="Google"
            width={22}
            height={22}
          />
        </div>
        <label className={styles.google_text}>
          <label>Continue with Google</label>
        </label>
      </button>
      <a className={styles.continue_with_email} href="">
        Continue With Email
      </a>
      <div className={styles.new_to_app}>
        <label htmlFor="">New to app?</label>
        <Link href="/register">Create new account</Link>
      </div>
    </form>
  );
}
