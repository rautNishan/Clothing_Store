"use client";
import Link from "next/link";
import styles from "./nav.module.css";
import { usePathname } from "next/navigation";
export default function RootNav() {
  const pathname: string = usePathname();

  return (
    <>
      <div className={styles.nav}>
        <Link
          className={`${styles.links} ${
            pathname === "/customer/hostels" ? `${styles.active}` : ""
          }`}
          href="/customer/hostels"
        >
          Hostels
        </Link>
        <Link
          className={`${styles.links}  ${
            pathname === "/customer/login" ? `${styles.active}` : ""
          }`}
          href="/customer/login"
        >
          Login
        </Link>
      </div>
    </>
  );
}
