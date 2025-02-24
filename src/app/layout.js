"use client";
import Sidebar from "./(comps)/sidebar/Sidebar";
import ThemeStore from "./(comps)/store/Theme";
import UilayoutStore from "./(comps)/store/Uilayout";
import "./globals.scss";

export default function RootLayout({ children }) {
  const { isDarkMode, toggleTheme } = ThemeStore();
  const { sidebar, toggleUi } = UilayoutStore();

  return (
    <html lang="en">
      <body>
        <div className={sidebar ? "sidebar-wrapper " : "sidebar-wrapper collapsed"}>
          <Sidebar />
        </div>
        <div className={sidebar ? "content-area " : "content-area extened"}>{children}</div>
      </body>
    </html>
  );
}
