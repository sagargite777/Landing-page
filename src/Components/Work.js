import React from "react";
import fast_delivered from "../Assets/fast_delivered.jpg";
import moon_1 from "../Assets/moon_1.jpg";
import low_cost from "../Assets/low_cost.png";

const Work = () => {
  const workInfoData = [
    {
      image: low_cost,
      title: "Low Cost",
      text: "Musk has stated that one of his goals with SpaceX is to decrease the cost and improve the reliability of access to space",
    },
    {
      image: moon_1,
      title: "Choose How Often",
      text: "We choose to explore space because doing so improves our lives and lifts our national spirit.",
    },
    {
      image: fast_delivered,
      title: "Fast Deliveries",
      text: "Five complete Space Shuttle orbiter vehicles were built and flown on a total of 135 missions from 1981 to 2011.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          The first stage propels the rocket into orbit and handles safely
          returning and landing the rocket on Earth.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
