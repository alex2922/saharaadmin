"use client";

import React, { useEffect, useState } from "react";
import { getActivity } from "../(api)/ActivityApi";
import axios from "axios";
import Confirmation from "../(comps)/confirmation/Confirmation";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activityData, setActivityData] = useState([]);

const [deletepop,setDeletepop] = useState(false)
  useEffect(() => {
    setIsLoading(true); // Set loading state before fetching data
    getActivity()
      .then((data) => {
        setActivityData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deleteActivity = async () => {
    try {
      const id = localStorage.getItem("id");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/activity/delete?activityId=${id}`
      );
     
      localStorage.removeItem("id");
      setDeletepop(false);
      window.location.reload();
      getActivity()
    } catch (error) {
      console.log(error);
    }
  };

  const openPop = (id)=>{
localStorage.setItem("id", id);

setDeletepop(true)
  }

  return (
    <>
   {deletepop && (
        <Confirmation
          btnYes="Cancel"
          btnNo="Delete"
          title="Confirm Deletion"
          clickA={()=>setDeletepop(false)}
          clickB={deleteActivity}
        />
      )}
      <div className="contacts activity parent">
        <div className="contacts-container activity-cont container">
          <div className="header">
            <div className="title">
              <h2>Activites Page</h2>
            </div>
            <div className="btns">
              <a href="/addActivity" className="btn">
                Add Activity
              </a>
              <button
                className="btn2"
                onClick={() => {
                  loadData();
                  toast.info("All Latest Contacts Fetched", {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    theme: isDarkMode ? "dark" : "light",
                  });
                }}
              >
                Refresh Data
              </button>
            </div>
          </div>
          <div className="table-box">
            {!isLoading ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Activity Title</th>
                    <th>Description</th>
                    <th>Feature Image</th>
                    <th>Cover Image</th>
                    {/* <th>Status</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activityData && activityData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.data.aid}</td>
                      <td>{item.data.title}</td>
                      <td>{item.data.activityTitle}</td>
                      <td>{item.data.description}</td>
                      <td>
                        {" "}
                        <img
                          src={item.data.image}
                       
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />{" "}
                      </td>
                      <td>
                        {" "}
                        <img
                          src={item.data.coverImage}
            
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />{" "}
                      </td>

                      <td
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          height: "100%",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href={`/addActivity?acivityId=${item.data.aid}`}
                          className="btn2"
                        >
                          Edit
                        </a>
                        <button className="btn2" onClick={()=>openPop(item.data.aid)}  >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="loading">Fetching contact requests...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
