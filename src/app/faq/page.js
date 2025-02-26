import React from 'react'
import "./faq.scss"

const page = () => {
  return (
    <div className='parent faq'>
      <div className="faq-container container">
      <div className="header">
          <div className="title">
            <div className="back"></div>
            <h2>FAQs Content </h2>
          </div>
          <div className="btns ">
            <button className="btn">Save</button>
            <button className="btn2">Refresh</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
