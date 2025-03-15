"use client";

import React, { useEffect, useState } from "react";
import "./homepage.scss";
import axios from "axios";

function Page() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const [addData, setAddData] = useState({
    title: "",
    buttonText: "",
    buttonLink: "",
    description: "",
  });

  const [image, setImage] = useState();
  const [desktop, setDesktop] = useState();
  const [tab, setTab] = useState();
  const [mob, setMob] = useState();

  useEffect(() => {}, []);

  const [controls, setControls] = useState({
    view: "desk",
    saveState: true,
    resetState: false,
  });

  const saveStatus = (test) => {
    setControls({ ...controls, saveState: test ? true : false });
  };

  const getVideos = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/viedoAndAboutSection/get/1`
      );
      console.log(response.data.data, "response");

      if (response.status === 200) {
        setAddData({
          title: response?.data?.data.title,
          buttonText: response?.data?.data.buttonText,
        });
        setImage(response?.data?.data.image);
        setDesktop(response?.data?.data?.viedo.desktop);
        setTab(response?.data?.data?.viedo.tab);
        setMob(response?.data?.data?.viedo.mob);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(desktop, "desktop");

  useEffect(() => {
    getVideos();
  }, []);

  const updateVideos = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/viedoAndAboutSection/update/1`,
        addData
      );
      getVideos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="parent homepage">
        <div className="container homepage-container ">
          <div className="header">
            <div className="title">
              <div className="back"></div>
              <h2>HomePage Content </h2>
            </div>
            <div className="btns">
              <button className="btn " onClick={() => updateVideos()}>
                Save
              </button>
              <button className="btn2 ">Reset</button>
            </div>
          </div>
          <form>
            <div className="left">
              <div className="row"></div>
              <label>
                <div className="top">
                  <p>HomePage Title *</p>
                  <div
                    className={`counter ${
                      data?.title?.length > 49 ? "error" : ""
                    }`}
                  >
                    {data?.title?.length}/50 character
                  </div>
                </div>
                <input
                  placeholder="your main hero heading goes here..."
                  type="text"
                  value={addData.title}
                  onChange={(e) =>
                    setData({ ...addData, title: e.target.value })
                  }
                />
                {data?.title?.length < 50 ? (
                  <span> Please add a title for the hero section </span>
                ) : (
                  <span className="error">
                    please keep the title below 50 character
                  </span>
                )}
              </label>
              <div className="row">
                {/* <label>
            <div className="top">
              <p>Hero Button Link</p>
            </div>
            <select>
              <option value=""></option>
            </select>
          </label> */}
              </div>
              <div className="row">
                {/* <label>
                  <div className="top">
                    <p>Video Fallback</p>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <span className="error">stats</span>
                </label> */}
                <label>
                  <div className="top">
                    <p>Hero Button Text*</p>
                    <div className="counter">10/10</div>
                  </div>
                  <input
                    placeholder="your main hero heading goes here..."
                    type="text"
                    value={addData.buttonText}
                    onChange={(e) =>
                      setData({ ...addData, buttonText: e.target.value })
                    }
                  />
                  <span className="error">stats</span>
                </label>
                <label>
                  <div className="top">
                    <p>Desktop Video</p>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setDesktop(e.target.files[0])}
                  />
                  <span className="error">stats</span>
                </label>
              </div>
              <div className="row">
                <label>
                  <div className="top">
                    <p>Tab View Video</p>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setTab(e.target.files[0])}
                  />
                  <span className="error">stats</span>
                </label>
                <label>
                  <div className="top">
                    <p>Mobile View Video</p>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setMob(e.target.files[0])}
                  />
                  <span className="error">stats</span>
                </label>
              </div>
            </div>
            <div className="right">
              <div className="video-select">
                <div
                  className={`option ${
                    controls.view === "desk" ? "active" : ""
                  }`}
                  onClick={() => setControls({ ...controls, view: "desk" })}
                >
                  Desktop
                </div>
                <div
                  className={`option ${
                    controls.view === "mob" ? "active" : ""
                  }`}
                  onClick={() => setControls({ ...controls, view: "mob" })}
                >
                  Mobile
                </div>
                <div
                  className={`option ${
                    controls.view === "tab" ? "active" : ""
                  }`}
                  onClick={() => setControls({ ...controls, view: "tab" })}
                >
                  Tab
                </div>
                {/* <div
            className={`option ${controls.view === "fi" ? "active" : ""}`}
            onClick={() => setControls({ ...controls, view: "fi" })}
          >
            FallBack Image
          </div> */}
              </div>
              <div className={`video-box ${controls.view}`}>
                {controls.view === "desktop" && desktop && (
                  <video controls width="100%">
                    <source src={desktop} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {controls.view === "mob" && mob && (
                  <video controls width="100%">
                    <source src={mob} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {controls.view === "tab" && tab && (
                  <video controls width="100%">
                    <source src={tab} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Page;
