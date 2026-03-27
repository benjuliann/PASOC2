"use client";

import { usePathname } from "next/navigation";
import { Header } from "./UI/Header";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

  // pages where header/footer should NOT show
    const hideLayout =
      pathname === "/Portals" ||
      pathname === "/Pages/SignUp" ||
      pathname === "/Pages/ForgotPassword";

  // Exclude FloatingButton from FAQ pages
  const hideFAQButton =
    pathname === "/FaqsManager" ||
    pathname === "/Admin/FaqsManager" ||
    pathname === "/Faqs" ;  

  return (
    <>
      {!hideLayout && <Header />}
      {children}
    </>
  );
}