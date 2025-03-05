"use client";

import React, { useEffect, useState } from "react";
import Confirmation from "../(comps)/confirmation/Confirmation";
import { ToastContainer } from "react-toastify";
import ThemeStore from "../(comps)/store/Theme";
import { getAboutData } from "../(api)/aboutApi";
import "./about.scss";

const page = () => {
  const { isDarkMode } = ThemeStore();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [controls, setControls] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getAboutData().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      {/* <Confirmation
          title="are you sure?"
          btnYes="No"
          btnNo="Yes"
        //   clickA={() => setControls({ ...controls, deleteId: null })}
        //   clickB={() => deleteT(controls.deleteId)}
        ></Confirmation> */}

      <div className="parent about">
        <div className="container about-container ">
          <div className="header">
            <div className="title">
              <div className="back"></div>
              <h2>About Section Content </h2>
            </div>
            <div className="btns ">
              <button className="btn">Update</button>
              <button className="btn2">Refresh Data</button>
            </div>
          </div>
          <div className="aboutsection">
            <div className="imgbox">
                
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
