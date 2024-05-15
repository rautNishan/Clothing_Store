"use client";
import Link from "next/link";
import styles from "./nav.module.css";
import { usePathname } from "next/navigation";
export default function RootNav() {
  const pathname: string = usePathname();

  return (
    <div className={styles.nav}>
      <div className={styles.left_side_nav}>
        <ul className={styles.u_list}>
          <li className={styles.list}>
            <Link
              className={`${styles.links} ${
                pathname === "/customer/hostels" ? styles.active : ""
              }`}
              href="/customer/hostels"
            >
              Hosteler
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.right_side_nav}>
        <ul className={styles.u_list}>
          <li className={styles.list}>
            <Link
              className={`${styles.links} ${
                pathname === "/customer/hostels" ? styles.active : ""
              }`}
              href="/customer/hostels"
            >
              Hostels
            </Link>
          </li>
          <li className={styles.list}>
            <Link
              className={`${styles.links}  ${
                pathname === "/customer/login" ? styles.active : ""
              }`}
              href="/customer/login"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
