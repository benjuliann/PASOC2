"use client";

import { usePathname } from "next/navigation";
import { Header } from "./UI/Header";
import { Footer } from "./UI/Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

  // pages where header/footer should NOT show
    const hideLayout =
      pathname === "/Portals" ||
      pathname === "/Pages/SignUp" ||
      pathname === "/Pages/ForgotPassword";

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}