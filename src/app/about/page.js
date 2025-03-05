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
  const [controls, setControls] = useState({
    title: "",
    description: "",
    btn_text: "",
    btn_link: "",
  });

  useEffect(() => {
    setIsLoading(true);
    getAboutData().then((data) => {
      setData(data.data);
      setIsLoading(false);
      setControls({
        title: data.data.title,
        description: data.data.description,
        btn_text: data.data.btn_text,
        btn_link: data.data.btn_link,
      })
    });
  }, []);


  useEffect(() => {
    console.log(data);
  }, [data]);

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
            <div className="left">
              
            <label>
                <div className="top">
                  <p>title Content*</p>
                  <div
                    className={
                      controls.title.length > 50
                        ? "counter error"
                        : "counter"
                    }
                  >
                    {controls.title.length}/50
                  </div>
                </div>
                <input
                  type="text"
                  value={controls.title}
                  onChange={(e) =>
                    setControls({ ...controls, title: e.target.value })
                  }
                />
                {controls.title.length > 50 && (
                  <span className="error">title message is too long</span>
                )}
              </label>
              <label>
                <div className="top">
                  <p>description Content*</p>
                  <div
                    className={
                      controls.description.length > 550
                        ? "counter error"
                        : "counter"
                    }
                  >
                    {controls.description.length}/550
                  </div>
                </div>
                <textarea
                  type="text"
                  value={controls.description}
                  onChange={(e) =>
                    setControls({ ...controls, description: e.target.value })
                  }
                />
                {controls.description.length > 550 && (
                  <span className="error">description message is too long</span>
                )}
              </label>
            </div>

            <div className="right">
              <div className="imgbox"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
