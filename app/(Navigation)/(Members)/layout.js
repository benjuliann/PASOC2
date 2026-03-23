"use client";

import { usePathname } from "next/navigation";
import { Header } from "./UI/Header";
import { Footer } from "./UI/Footer";
import { FloatingButton } from "./UI/FloatingButton";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

  // pages where header/footer should NOT show
    const hideLayout =
      pathname === "/Portals" ||
      pathname === "/Pages/SignUp" ||
      pathname === "/Pages/ForgotPassword";

  // Exclude FloatingButton from FAQs page
  const hideFAQButton = pathname === "/Faqs";

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
      {!hideFAQButton && <FloatingButton />}
    </>
  );
}