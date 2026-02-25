"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

  // pages where header/footer should NOT show
  const hideLayout =
    pathname === "/Pages/Login" ||
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