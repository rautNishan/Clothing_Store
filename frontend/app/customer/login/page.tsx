import styles from "./login.module.css";
import Image from "next/image";

export default function CustomerLogin() {
  return (
    <div className={styles.login_container}>
      <label className={styles.login_text}>Login</label>
      <label className={styles.sub_text}>
        Welcome Back, great to see you again
      </label>
      <div className={styles.form_container}>
        <label htmlFor="UserName" className={styles.label}>
          User Name
        </label>
        <input placeholder="Nishan Raut" className={styles.input} type="text" />
        <label htmlFor="Password" className={styles.label}>
          Password
        </label>
        <input placeholder="********" className={styles.input} type="text" />
        <a href="" className={styles.forget_password}>
          Forget Password?{" "}
        </a>
      </div>
      <button className={styles.login_button}>Login</button>
      <label className={styles.sub_text}>-or-</label>
      <div className={styles.continue_with_google}>
        <div className={styles.google_img}>
          <Image
            src="/svg/icons8-google-48.png"
            alt="Google"
            width={22}
            height={22}
          />
        </div>
        <label className={styles.google_text}>
          <a href="">Continue with Google</a>
        </label>
      </div>
      <a className={styles.continue_with_email} href="">
        Continue With Email
      </a>
      <div className={styles.new_to_app}>
        <label htmlFor="">New to app?</label>
        <a href="">Create new account</a>
      </div>
    </div>
  );
}
