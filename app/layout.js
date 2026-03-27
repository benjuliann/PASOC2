import { Inter, Domine, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./_utils/auth-context";
import ClientLayoutGuard from "./ClientLayoutGuard";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const domine = Domine({
//   variable: "--font-domine",
//   subsets: ["latin"],
//   weight: ["600", "700"],
// });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "PASOC",
  description: "Pangasinan Society of Calgary",
};

// This layout will be used for all pages in the app, except those that specify otherwise (like the login page).
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <div className={"min-h-screen bg-[#f0ece1] flex flex-col"}>
          <AuthProvider>
            <ClientLayoutGuard>
              {children}  
            </ClientLayoutGuard>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
