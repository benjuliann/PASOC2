import * as React from "react";

export function Footer() {
  const styles = {
    footer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
      padding: "24px",
      marginTop: "44px",
      fontWeight: 700,
      color: "#fff",
      backgroundColor: "#556B2F",
      boxShadow: "0px -10px 10px rgba(0,0,0,0.25)",
    },
    inner: { display: "flex", gap: 16, justifyContent: "space-between", width: "100%", maxWidth: 1120, margin: "0 auto", alignItems: "center" },
    logo: { width: 56, height: 56, objectFit: "contain" },
    copyright: { margin: 0, fontSize: 20, textAlign: "center" },
    contact: { textAlign: "right", fontSize: 18, marginTop: 8 },
    link: { textDecoration: "underline", color: "inherit" },
  };

  return (
    <footer className="mt-12 bg-[#556B2F] text-white font-bold py-6 px-4 shadow-inner">
      <div className="relative max-w-4xl mx-auto flex items-center justify-between">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/7e60ee9e68fcf520263f834dedfab402fb8b6539?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
          alt="PASOC footer logo"
          className="w-7 h-7 object-contain"
        />

        <p className="absolute left-1/2 transform -translate-x-1/2 m-0 text-1xl text-center">© Copyright PASOC 2004 - 2025</p>

        <div className="text-right text-sm w-1/4">
          For any site issues and inquires: <br />
          Email{' '}
          <a href="mailto:dgsv0508@yahoo.ca" className="underline">
            dgsv0508@yahoo.ca
          </a>
        </div>
      </div>
    </footer>
  );
}