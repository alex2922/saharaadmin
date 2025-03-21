"use client";

import React, { useEffect, useState } from "react";
import "./promotionalActivities.scss";
import axios from "axios";
import { useSearchParams } from "next/navigation";
const Page = () => {
  const [controls, setControls] = useState({
    title: "",
    description: "",
  });

  const [image, setimage] = useState({
    image: null,
    imagePrev: "",
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("acivityId");

  const getActivtyData = async (id) => {
    try {
      const response = await axios.get(
       
        `${process.env.NEXT_PUBLIC_API_URL}/PramotionalActivity/getById/${id}`
      );


      setControls({
        title: response.data.data.title,
        description: response.data.data.description,
      });

      setimage({
        image: null,
        imagePrev: response.data.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getActivtyData(id);
    }
  }, [id]);

  const addPromoActivity = async () => {
    try {
      const formdata = new FormData();

      if (id) {
        formdata.append("data", JSON.stringify({ ...controls, paId: id }));
        formdata.append("image",image.image)

      } else {
        formdata.append("data", JSON.stringify(controls));
        formdata.append("image",image.image)
      }

 
      let response;

      if (id) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/PramotionalActivity/update`,
          formdata
        );
      } else {

        response = await axios.post(
          `https://tomcat.diwise.in/saharaAmmusment/PramotionalActivity/addPramotionalActivity`,
          formdata
        );
      }

      if (response.status === 201) {
        router.push("/activity");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="parent promotional-activities">
        <div className="container promotional-activities-container ">
          <div className="header">
            <div className="title">
              <div className="back"></div>
              <h2>Promotional Activies Section Content </h2>
            </div>
            <div className="btns ">
              <button
                className="btn"
                onClick={addPromoActivity}
              >
                {id ? "Update" : "Add" }
              </button>
              <button className="btn2">Refresh Data</button>
            </div>
          </div>
          <div className="promotional-activities-section">
            <div className="left">
              <label>
                <div className="top">
                  <p>title Content*</p>
                  <div
                    className={
                      controls.title.length > 50 ? "counter error" : "counter"
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

              <div className="row">
                <label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => {
                    //   const file = e.target.files[0];

                    //   if (!file) return;
                    setimage({...image, image:e.target.files[0]})

                      // Allowed image types
                    //   const validTypes = [
                    //     "image/png",
                    //     "image/jpeg",
                    //     "image/webp",
                    //   ];
                    //   if (!validTypes.includes(file.type)) {
                    //     setimage((prev) => ({ ...prev, imgalert: 2 }));
                    //     toast.error("Upload prohibited", {
                    //       position: "top-center",
                    //       autoClose: 500,
                    //       theme: isDarkMode ? "dark" : "light",
                    //     });
                    //     return;
                    //   }

                    //   // Max file size check (4MB)
                    //   if (file.size > 4 * 1024 * 1024) {
                    //     setControls((prev) => ({ ...prev, imgalert: 3 }));
                    //     toast.error("Upload prohibited", {
                    //       position: "top-center",
                    //       autoClose: 500,
                    //       theme: isDarkMode ? "dark" : "light",
                    //     });
                    //     return;
                    //   }

                      // Read the file to get its dimensions
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const img = new Image();
                        img.src = reader.result;

                        img.onload = () => {
                          if (img.width < 1080 || img.height < 1080) {
                            // setControls((prev) => ({ ...prev, imgalert: 1 }));
                            toast.error("Upload prohibited", {
                              position: "top-center",
                              autoClose: 500,
                              theme: isDarkMode ? "dark" : "light",
                            });
                            return;
                          }

                          // If all validations pass, update the image
                        //   setControls((prev) => ({
                        //     ...prev,
                        //     imgalert: 0,
                        //     img: file,
                        //   }));
                        };
                      };
                      reader.readAsDataURL(file);
                    }}
                  />

                  {/* Displaying validation messages */}
                  {controls.imgalert === 1 && (
                    <span className="error">
                      Image should be at least 1080 x 1080px
                    </span>
                  )}
                  {controls.imgalert === 2 && (
                    <span className="error">
                      Only JPG, PNG, and WEBP formats are allowed
                    </span>
                  )}
                  {controls.imgalert === 3 && (
                    <span className="error">Image should be less than 4MB</span>
                  )}
                  {controls.imgalert === 4 && (
                    <span className="error">Image is required</span>
                  )}
                </label>
              </div>
            </div>

            <div className="right">
              <h2>Image Preview</h2>

              <div
                className="imgbox"
                style={{ backgroundImage: `url(${controls.img})` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
