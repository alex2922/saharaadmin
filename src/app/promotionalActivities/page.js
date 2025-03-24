"use client";

import React, { useEffect, useState } from "react";
import "./promotionalActivities.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useRouter, useSearchParams } from "next/navigation";
const Page = () => {
  const [controls, setControls] = useState({
    title: "",
    description: "",
  });

  const [image, setimage] = useState({
    image: null,
    imagePrev: "",
  });

  const [error, setError] = useState({
    title: "",
    description: "",
    image: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("acivityId");

  const getActivtyData = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/PramotionalActivity/getById/${id}`
      );

      setControls({
        title: response?.data?.data?.title || "",
        description: response?.data?.data?.description || "",
      });

      setimage({
        image: null,
        imagePrev: response?.data?.data.image,
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

  const validate = () => {
    let errors = {};

    if (!controls.title.trim()) errors.title = "Title is required";
    else if (controls.title.length > 50) errors.title = "Title is too long";

    if (!controls.description.trim())
      errors.description = "Description is required";
    else if (controls.description.length > 550)
      errors.description = "Description is too long";

    if (!image.image) errors.image = "Image is required";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const addPromoActivity = async () => {
    if (!validate()) return;

    try {
      const formdata = new FormData();
      formdata.append(
        "data",
        JSON.stringify(id ? { ...controls, paId: id } : controls)
      );
      formdata.append("image", image.image);

      let response = id
        ? await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/PramotionalActivity/update`,
            formdata
          )
        : await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/PramotionalActivity/addPramotionalActivity`,
            formdata
          );

      if (response.status === 201) {
        router.push("/addPromotionalActivities");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="parent promotional-activities">
        <div className="container promotional-activities-container">
          <div className="header">
            <div className="title">
              <h2>Promotional Activities</h2>
            </div>
            <div className="btns">
              <button className="btn" onClick={addPromoActivity}>
                {id ? "Update" : "Add"}
              </button>
              <button className="btn2" onClick={() => getActivtyData(id)}>
                Refresh Data
              </button>
            </div>
          </div>
          <div className="promotional-activities-section">
            <div className="left">
              <label>
                <div className="top">
                  <p>Title Content*</p>
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
                {error.title && <span className="error">{error.title}</span>}
              </label>
              <label>
                <div className="top">
                  <p>Description Content*</p>
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
                  value={controls.description}
                  onChange={(e) =>
                    setControls({ ...controls, description: e.target.value })
                  }
                />
                {error.description && (
                  <span className="error">{error.description}</span>
                )}
              </label>
              <label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const validTypes = [
                      "image/png",
                      "image/jpeg",
                      "image/webp",
                    ];
                    if (!validTypes.includes(file.type)) {
                      setError({ ...error, image: "Invalid file type" });
                      return;
                    }

                    if (file.size > 4 * 1024 * 1024) {
                      setError({
                        ...error,
                        image: "File size must be less than 4MB",
                      });
                      return;
                    }

                    const imagePreview = URL.createObjectURL(file);
                    setimage({ image: file, imagePrev: imagePreview });
                    setError({ ...error, image: "" });
                  }}
                />
                {error.image && <span className="error">{error.image}</span>}
              </label>
            </div>
            <div className="right">
              <h2>Image Preview</h2>
              <div
                className="imgbox"
                style={{ backgroundImage: `url(${image.imagePrev})` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
