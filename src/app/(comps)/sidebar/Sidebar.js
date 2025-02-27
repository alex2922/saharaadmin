import React from "react";
import "./Sidebar.scss";
import ThemeStore from "../store/Theme";
import { MdDarkMode, MdOutlineContactPage } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import UilayoutStore from "../store/Uilayout";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaQuora } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";

function Sidebar() {
  const { isDarkMode, toggleTheme } = ThemeStore();
  const { sidebar, toggleUi } = UilayoutStore();
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Home Page",
      path: "/homepage",
      icon: <FiHome />,
    },
    {
      name: "Testimonials",
      path: "/testimonials",
      icon: <FaRegNoteSticky />,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: <AiOutlineProduct />,
    },
    {
      name: "FAQs",
      path: "/faq",
      icon: <FaQuora />,
    },
    {
      name: "Contacts",
      path: "/contacts",
      icon: <MdOutlineContactPage />,
    },
  ];

  return (
    <div className={sidebar ? "sidebar " : "sidebar collapse"}>
      <div className="links">
        <div className="top">
          <h3>
           {sidebar ? <> Sahara 
            <br />
            Amusement</> :<></> }
          </h3>
          <button
            className={sidebar ? "btn3 active" : "btn3 "}
            onClick={toggleUi}
          >
            <IoIosArrowForward />
          </button>
        </div>

        {links.map((link, index) => (
          <Link
            key={index}
            className={pathname === link.path ? "active" : ""}
            href={link.path}
          >
           
           <span>
            {link.icon}
           </span>
           
            {sidebar &&link.name}
          </Link>
        ))}
      </div>
      <div className="btns">
       {sidebar ? <button className="btn"> <span><HiOutlineLogout /> </span>Logout</button> :
        <button className="btn"> <span><HiOutlineLogout /> </span></button>}
        <button className="btn2" onClick={toggleTheme}>
          {isDarkMode ? <MdDarkMode /> : <MdSunny />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
