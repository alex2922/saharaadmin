"use client";
import React, { useState, useEffect } from "react";
import "./testimonials.scss";
import { getTestimonials, deleteTestimonials } from "../(api)/apis";
import { MdModeEdit } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";

const page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [controls, setControls] = useState({
    name: " this name",
    feedBack: "lorem usadhkjagfjkshd gdhsg jsdksdgf sajsha jha sha",
    star: 2,
  });

  useEffect(() => {
    setIsLoading(true);
    getTestimonials().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="parent testimonails">
        <div className="container testimonails-container ">
          <div className="header">
            <div className="title">
              <div className="back"></div>
              <h2>Testimonials Content </h2>
            </div>
            <div className="btns">
              <button className="btn ">Publish</button>
              <button
                className="btn2"
                onClick={() => {
                  setIsLoading(true);
                  getTestimonials().then((data) => {
                    setData(data);
                    setIsLoading(false);
                  });
                }}
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="content">
            <div className="left">
              {data && !isLoading ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Feedback</th>
                        <th>Stars</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((tdata, index) => (
                        <tr key={index}>
                          <td>{tdata.data.name}</td>
                          <td>{tdata.data.feedBack}</td>
                          <td>{tdata.data.stars} Stars</td>
                          <td>
                            <button className="btn4">
                              <MdModeEdit />
                            </button>
                            <button
                              className="btn4"
                              onClick={() => deleteTestimonials(tdata.data.id)}
                            >
                              <MdDeleteOutline />
                            </button>
                            {/* <button className="btn4"> <FaRegEye /></button>  */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="right">
              <h2>Add New Testimonials </h2>
              <form>
                <label>
                  <div className="top">
                    <p>Client Name*</p>
                    <div
                      className={`counter ${
                        controls.name.length > 20 ? "error" : ""
                      }`}
                    >
                      {controls.name.length}/20
                    </div>
                  </div>
                  <input
                    type="text"
                    value={controls.name}
                    onChange={(e) =>
                      setControls({ ...controls, name: e.target.value })
                    }
                  />
                  {controls.name.length > 20 && (
                    <span className="error">Only 20 characters allowed</span>
                  )}
                </label>

                <label>
                  <div className="top">
                    <p>Testimonial Content*</p>
                    <div className="counter">10/10</div>
                  </div>
                  <textarea type="text" />
                  <span className="error">stats</span>
                </label>

                <label>
                  <div className="top">
                    <p>Star Rating*</p>
                    <div className="counter">10/10</div>
                  </div>
                  <div className="stars">
                    <div
                      className={controls.star > 0 ? "star active" : "star"}
                      onClick={() => setControls({ ...controls, star: 1 })}
                    >
                      <IoMdStar />
                    </div>
                    <div
                      className={controls.star > 1 ? "star active" : "star"}
                      onClick={() => setControls({ ...controls, star: 2 })}
                    >
                      <IoMdStar />
                    </div>
                    <div
                      className={controls.star > 2 ? "star active" : "star"}
                      onClick={() => setControls({ ...controls, star: 3 })}
                    >
                      <IoMdStar />
                    </div>
                    <div
                      className={controls.star > 3 ? "star active" : "star"}
                      onClick={() => setControls({ ...controls, star: 4 })}
                    >
                      <IoMdStar />
                    </div>
                    <div
                      className={controls.star > 4 ? "star active" : "star"}
                      onClick={() => setControls({ ...controls, star: 5 })}
                    >
                      <IoMdStar />
                    </div>
                  </div>
                  <span className="error">stats</span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
