"use client";
import { useEffect, useState } from "react";
import Sidebar from "./(comps)/sidebar/Sidebar";
import ThemeStore from "./(comps)/store/Theme";
import UilayoutStore from "./(comps)/store/Uilayout";
import "./globals.scss";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const { isDarkMode, toggleTheme } = ThemeStore();
  const { sidebar, toggleUi } = UilayoutStore();
  const router = useRouter();
  const [auth, setAuth] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setAuth(id);
      if (id != 1 && pathname !== "/login") {
        router.push("/login");
      }
    } else if (pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  const isLoginPage = pathname === "/login";

  if (!isLoginPage && (!auth || auth != 1)) {
    return null; // Prevent rendering while redirecting
  }
  
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
