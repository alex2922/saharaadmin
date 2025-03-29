"use client";
import { useEffect, useState } from "react";
import Sidebar from "./(comps)/sidebar/Sidebar";
import ThemeStore from "./(comps)/store/Theme";
import UilayoutStore from "./(comps)/store/Uilayout";
import "./globals.scss";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const { isDarkMode, toggleTheme } = ThemeStore();
  const { sidebar, toggleUi } = UilayoutStore();

  const [auth, setAuth] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setAuth(id);
    }
  }, []);

  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body>
        {!isLoginPage && auth && (
          <div
            className={
              sidebar ? "sidebar-wrapper" : "sidebar-wrapper collapsed"
            }
          >
            <Sidebar />
          </div>
        )}
        <div className={sidebar ? "content-area " : "content-area extened"}>
          {children}
        </div>

        <div className="error-screen">
          <p>Please use a larger device to view this page</p>
        </div>
      </body>
    </html>
  );
}
