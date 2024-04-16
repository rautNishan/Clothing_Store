import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootNav from "@/components/customer/nav/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer",
  description: "This is Customer Layout",
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <nav>
          <RootNav />
        </nav>
      </header>
      <main>{children}</main>
      {/* <footer>Footer</footer> */}
    </>
  );
}
