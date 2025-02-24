"use client";

import React, { useState } from "react";
import "./homepage.scss";

function page() {
  const [data, setData] = useState({
    title: "Sahara Amusement is the title of this home page",
    buttonText: "Learn More",
    buttonLink: "/home",
    video: {
      mob: "",
    },
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis laborum, vel consequatur minima quam nesciunt optio ratione, pariatur a sit esse laboriosam laudantium at ad error sunt culpa maxime iusto dignissimos! Dolor, assumenda quaerat voluptates impedit fugit odit quod in cum, illum non ab tempore atque. Saepe aliquid soluta facere.",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.in%2FAttractionProductReview-g295424-d12970958-3000cc_Dune_Buggy_Sandboarding_Private_Experience-Dubai_Emirate_of_Dubai.html&psig=AOvVaw0MvRxPSOygvSQylXyX7Aar&ust=1740479380880000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCOjCj4yN3IsDFQAAAAAdAAAAABAE",
  });

  const [controls, setControls] = useState({
    view: "desk",
    saveState: true,
    resetState: false,
  });

  const saveStatus = (test) => {
    setControls({ ...controls, saveState: test ? true : false });
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
              <button className="btn ">Save</button>
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
                      data.title.length > 49 ? "error" : ""
                    }`}
                  >
                    {data.title.length}/50 character
                  </div>
                </div>
                <input
                  placeholder="your main hero heading goes here..."
                  type="text"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                {data.title.length < 50 ? (
                  <span> Please add a title for the hero section </span>
                ) : (
                  <span className="error">
                    please keep the title below 50 character
                  </span>
                )}
              </label>
              <div className="row">
                <label>
                  <div className="top">
                    <p>Hero Button Text*</p>
                    <div className="counter">10/10</div>
                  </div>
                  <input
                    placeholder="your main hero heading goes here..."
                    type="text"
                  />
                  <span className="error">stats</span>
                </label>
                <label>
                  <div className="top">
                    <p>Hero Button Link</p>
                  </div>
                  <select>
                    <option value=""></option>
                  </select>
                </label>
              </div>
              <div className="row">
                <label>
                  <div className="top">
                    <p>Video Fallback</p>
                  </div>
                  <input type="file" />
                  <span className="error">stats</span>
                </label>
                <label>
                  <div className="top">
                    <p>Desktop Video</p>
                  </div>
                  <input type="file" />
                  <span className="error">stats</span>
                </label>
              </div>
              <div className="row">
                <label>
                  <div className="top">
                    <p>Tab View Video</p>
                  </div>
                  <input type="file" />
                  <span className="error">stats</span>
                </label>
                <label>
                  <div className="top">
                    <p>Mobile View Video</p>
                  </div>
                  <input type="file" />
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
                  desktop
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
                <div
                  className={`option ${controls.view === "fi" ? "active" : ""}`}
                  onClick={() => setControls({ ...controls, view: "fi" })}
                >
                  FallBack Image
                </div>
              </div>
              <div className={`video-box ${controls.view}`}> </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
