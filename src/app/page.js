"use client";

import "./page.scss";
import CountUp from "react-countup";




function Card(props) {
  return (
    <div className={`card ${props.className}`}>
      <div className="top">
        <h3>{props.title}</h3>
      </div>
      <div className="bottom">
        <h1>
          <span>{props.number}</span>
          {props.desc}
        </h1>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="parent dashboard">
      <div className="dashboard-container container">
        <div className="header">
          <div className="title">
            <div className="back"></div>
            <h2>Dashboard </h2>
          </div>
          <div className="btns"></div>
        </div>

        <div className="bento-wrapper">
          <div className="bento">
            <Card className="card1" title="Activity" number={<CountUp end={6} duration={2} />} desc="Activities" />
            <Card className="card2" title="About Page" />
            <Card className="card3" title="Testimonials" number={<CountUp end={6} duration={2} />} desc="Testimonials" />
            <Card className="card4" title="Hero Section" />
            <Card className="card5" title="FAQ" number={<CountUp end={16} duration={2} />} desc="FAQs" />
            <Card className="card6" title="Contacts" number={<CountUp end={200} duration={2} />} desc="Contacts" />
            
          </div>
        </div>
      </div>
    </div>
  );
}
