import styles from "./login.module.css";
import Image from "next/image";
interface ImgProps {
  width: number;
  height: number;
}
export default function CustomerLogin() {
  return (
    <div className={styles.login_body_container}>
      <h3 className={styles.login_text}>Login</h3>
      <div className={styles.login_container}>
        <div className={styles.form_container}>
          <label htmlFor="UserName" className={styles.label}>
            User Name
          </label>
          <input className={styles.input} type="text" />
          <label htmlFor="Password" className={styles.label}>
            Password
          </label>
          <input className={styles.input} type="text" />
        </div>
        <button className={styles.login_button}>Login</button>
        <label className={styles.text_center}>Or</label>
        <div className={styles.continue_with_google}>
          <label className={styles.google_text}>
            <a href="">Continue with Google</a>
          </label>
          <div className={styles.google_img}>
            <Image
              src="/svg/icons8-google-48.png"
              alt="Google"
              width={22}
              height={22}
            />
          </div>
        </div>
      </div>
     
    </div>
  );
}
1