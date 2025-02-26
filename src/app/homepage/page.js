"use client";

import React, { useEffect, useState } from "react";
import "./homepage.scss";
import axios from "axios";

function page() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    
  }, []);

  const [controls, setControls] = useState({
    view: "desk",
    saveState: true,
    resetState: false,
  });

  const saveStatus = (test) => {
    setControls({ ...controls, saveState: test ? true : false });
  };

  return <>
  
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

  
  </>;
}

export default page;
