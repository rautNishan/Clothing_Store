import Link from "next/link";
import "./nav.module.css";
export default function RootNav() {
  return (
    <>
      <div className="nav">
        <Link href="/customer/login">Login</Link>
        <Link href="/customer/hostels">Hostels</Link>
      </div>
    </>
  );
}
