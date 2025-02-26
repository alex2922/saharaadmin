"use client";
import { useEffect, useState } from "react";
import "./contacts.scss";
import { getContacts, deleteContacts } from "../(api)/contactAPi";
import Confirmation from "../(comps)/confirmation/Confirmation";
const page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [controls, setControls] = useState({
    deleteId: null,
  });

  useEffect(() => {
    setIsLoading(true);
    getContacts().then((data) => {
      setData(data);
      setIsLoading(false);
      console.log(data);
    });
  }, []);

  const deleteC = async (id) => {
    try {
      await deleteContacts(id);
      const updatedData = await getContacts();
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    } finally {
      setIsLoading(false);
      setControls({ ...controls, deleteId: null });
    }
  };

  return (
    <>

  {controls.deleteId &&  <Confirmation btnYes="Cancel" btnNo="Delete" title="Are you sure?" clickA={()=>setControls({ ...controls, deleteId: null })} clickB={()=>deleteC(controls.deleteId)}  />}


      <div className="parent contacts">
        <div className="contacts-container container">
          <div className="header">
            <div className="title">
              <div className="back"></div>
              <h2>Testimonials Content </h2>
            </div>
            <div className="btns ">
              <button className="btn">Save</button>
            </div>
          </div>

          {!isLoading ? (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Activity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data[0].responseMessage === }
                {data.map((cdata, index) => (
                  <tr key={index}>
                    <td>{cdata.data.cId}</td>
                    <td>{cdata.data.name}</td>
                    <td>{cdata.data.email}</td>
                    <td>{cdata.data.phoneNumber}</td>
                    <td>{cdata.data.message}</td>
                    <td>{cdata.data.activity}</td>
                    <td>
                      <button
                        className="btn2"
                        onClick={() =>
                          setControls({ ...controls, deleteId: cdata.data.cId })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="loading">Loading DataBase...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
