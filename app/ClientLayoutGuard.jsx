"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./(Navigation)/(Members)/UI/Header";
import { Footer } from "./(Navigation)/(Members)/UI/Footer";

export default function ClientLayoutGuard({ children }) {
  const pathname = usePathname();

  const showLayout = pathname === "/"; // only show header/footer on root

  return (
    <>
      {showLayout && <Header />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
