"use client";

import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import "./addActivity.scss";
import axios from "axios";
const Page = () => {
  const [errors, setErrors] = useState({});
  const [addData, setAddData] = useState({
    title: "",
    activityTitle: "",
    description: "",
    additionalInfo: {},
  });
  const [image, setimage] = useState({
    image: null,
    imagePrev: "",
  });
  const [coverImage, setCoverImage] = useState({
    coverImage: null,
    coverImagePrev: "",
  });

  const [controls, setControls] = useState({
    view: "feature",
    saveState: true,
    resetState: false,
  });

  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

  const handleInputChange = (index, type, value) => {
    const updatedPairs = [...keyValuePairs];
    updatedPairs[index][type] = value;
    setKeyValuePairs(updatedPairs);
  };

  const handleAddRow = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedPairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(updatedPairs);
  };

  useEffect(() => {
    const updatedInfo = {}; // Create a new object to store key-value pairs

    keyValuePairs.forEach((item) => {
      if (item.key.trim() && item.value.trim()) {
        updatedInfo[item.key] = item.value; // Add key-value pairs dynamically
      }
    });

    setAddData((prev) => ({
      ...prev,
      additionalInfo: updatedInfo,
    }));
  }, [keyValuePairs]);

  const addActivity = async () => {
    try {
        const formdata = new FormData();

        formdata.append("data", JSON.stringify(addData));
        formdata.append("image", image.image);
        formdata.append("coverImage", coverImage.coverImage);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/activity/Add`,formdata);

        console.log(response)
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <>
      <div className="parent homepage">
        <div className="container homepage-container ">
          <div className="header">
            <div className="title">
              <div className="back"></div>
              <h2>Acitivty Page Content </h2>
            </div>
            <div className="btns">
              <button className="btn "  onClick={addActivity} >Save</button>
              <button className="btn2 ">Reset</button>
            </div>
          </div>
          <form>
            <div className="left">
              <div className="row">
                <label>
                  <div className="top">
                    <p>Title *</p>
                  </div>
                  <input
                    placeholder="your main hero heading goes here..."
                    type="text"
                    value={addData.title}
                    onChange={(e) =>
                        setAddData({ ...addData, title: e.target.value })
                    }
                  />
                </label>
                <label>
                  <div className="top">
                    <p>Activity Title *</p>
                    <div
                      className={`counter ${
                        addData?.title?.length > 49 ? "error" : ""
                      }`}
                    >
                      {addData?.title?.length}/50 character
                    </div>
                  </div>
                  <input
                    placeholder="your main hero heading goes here..."
                    type="text"
                    value={addData.activityTitle}
                    onChange={(e) =>
                        setAddData({ ...addData, activityTitle: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="row">
                <label>
                  <div className="top">
                    <p>Activity Description*</p>
                    <div className="counter">10/10</div>
                  </div>
                  <textarea
                    placeholder="your main hero heading goes here..."
                    type="text"
                    value={addData.description}
                    onChange={(e) =>
                        setAddData({ ...addData, description: e.target.value })
                    }
                  />
                </label>
              </div>
              {keyValuePairs.map((pair, index) => (
                <div className="row" key={index}>
                  <label>
                    <div className="top">
                      <p>Activity Key*</p>
                      <div className="counter">10/10</div>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter key"
                      value={pair.key}
                      onChange={(e) =>
                        handleInputChange(index, "key", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    <div className="top">
                      <p>Activity Value*</p>
                      <div className="counter">10/10</div>
                    </div>
                    <div className="append_button">
                      <input
                        type="text"
                        placeholder="Enter value"
                        value={pair.value}
                        onChange={(e) =>
                          handleInputChange(index, "value", e.target.value)
                        }
                      />
                      <div className="plus_button" onClick={handleAddRow}>
                        {" "}
                        <GoPlus />{" "}
                      </div>
                      {index > 0 && (
                        <div
                          className="minus_button"
                          onClick={() => handleRemoveRow(index)}
                        >
                          {" "}
                          <LuMinus />{" "}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              ))}
              <div className="row">
                <label>
                  <div className="top">
                    <p>Feature Image *</p>
                  </div>
                  <input
                    placeholder="your main hero heading goes here..."
                    type="file"
                    onChange={(e) =>
                      setimage({ ...image, image: e.target.files[0] })
                    }
                  />
                </label>
                <label>
                  <div className="top">
                    <p>Cover Image *</p>
                  </div>
                  <input
                    placeholder="your main hero heading goes here..."
                    type="file"
                    onChange={(e) =>
                      setCoverImage({
                        ...coverImage,
                        coverImage: e.target.files[0],
                      })
                    }
                  />
                </label>
              </div>
            </div>
            <div className="right">
              <div className="video-select">
                <div
                  className={`option ${
                    controls.view === "feature" ? "active" : ""
                  }`}
                  onClick={() => setControls({ ...controls, view: "feature" })}
                >
                  Feature Image
                </div>
                <div
                  className={`option ${
                    controls.view === "cover" ? "active" : ""
                  }`}
                  onClick={() => setControls({ ...controls, view: "cover" })}
                >
                  Cover Image
                </div>
              </div>
              <div className={`video-box ${controls.view}`}>
                {controls.view === "feature" && <img src="" alt="" />}

                {controls.view === "cover" && <img src="" alt="" />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
