"use client";

import React, { useEffect, useState } from "react";
import "./faq.scss";
import { addFaqs, getFaqs } from "../(api)/faqApi";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { getActivity } from "../(api)/ActivityApi";

const page = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [controls, setControls] = useState({
    deleteId: null,
    search: "",
    instruction: true,
    question: "",
    answer: "",
    page: "sfasdfas",
  });

  const getdata = () => {
    setIsLoading(true);
    getActivity().then((pagedata) => {
      setPages(pagedata);
    });
    getFaqs().then((data) => {
      setData(data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  const addFaq = async () => {
    try {
      setIsLoading(true);
      const response = await addFaqs(
        controls.question,
        controls.answer,
        controls.page
      );
      if (response) {
        const updatedData = await getFaqs();
        setData(updatedData);
        setControls({ ...controls, question: "", answer: "", page: "" });
      } 
    } catch (error) {
      console.error("Error adding FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="parent faq">
      <div className="faq-container container">
        <div className="header">
          <div className="title">
            <div className="back"></div>
            <h2>FAQs Content </h2>
          </div>
          <div className="btns ">
            <button className={  "btn disabled"} onClick={() => addFaq()}>
              Add FAQ
            </button>
            <button className="btn2" onClick={() => getdata()}>
              Refresh Data
            </button>
          </div>
        </div>
        <div className="content">
          <div className="left">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Page</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data[0] && data.map((fdata, index) => (
                  <tr key={index}>
                    <td>{fdata.data.id}</td>
                    <td>{fdata.data.question}</td>
                    <td>{fdata.data.answer}</td>
                    <td>{fdata.data.page}</td>
                    <td>
                      <button className="btn4">
                        <MdModeEdit />
                      </button>
                      <button className="btn4">
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="right">
            <h2>Add New FAQ</h2>
            <label>
              <div className="top">
                <p>Question*</p>
                <div
                  className={
                    controls.question.length > 100
                      ? "counter error"
                      : " counter"
                  }
                >
                  {controls.question.length}/100 character
                </div>
              </div>
              <textarea
                value={controls.question}
                onChange={(e) =>
                  setControls({ ...controls, question: e.target.value })
                }
              />
              <span className="error">sdfsadfsadf</span>
            </label>
            <label>
              <div className="top">
                <p>Answer*</p>
                <div
                  className={
                    controls.answer.length > 500 ? "counter error" : " counter"
                  }
                >
                  {controls.answer.length}/500 character
                </div>
              </div>
              <textarea
                className="ans"
                value={controls.answer}
                onChange={(e) =>
                  setControls({ ...controls, answer: e.target.value })
                }
              />
              <span className="error">sdfsadfsadf</span>
            </label>
            <label>
              <div className="top">
                <p>Page*</p>
                <div className={"error"}>34/50 character</div>
              </div>
              <select>
                <option>dsfasd</option>
                <option>dsfasd</option>
                <option>dsfasd</option>
              </select>
              <span className="error">sdfsadfsadf</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
