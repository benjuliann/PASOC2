import LayoutShell from "./UI/LayoutShell";

export default function MembersLayout({ children }) {
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
