import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./styling/WelcomeSlideShow.css";
const slideImages = [
  {
    url: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Task.jpg",
    caption: "Track Task Organization With Daily Reminders",
  },
  {
    url: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Money.jpg",
    caption: "Keep Track of Spending",
  },
  {
    url:
      process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Health.jpg",
    caption: "Track Fitness and Health for the Life you want to Live",
  },
  {
    url: process.env.REACT_APP_ASSET_URL + "/data/frontendref/images/Life.jpg",
    caption: "Relax and Live your Life",
  },
];

const WelcomeSlideShow = () => {
  return (
    <div className="WelcomeSlideShow__slide-container">
      <Slide cssClass="WelcomeSlideShow__slide">
        {slideImages.map((slideImage, index) => (
          <div className="WelcomeSlideShow__each-slide" key={index}>
            <div
              className="WelcomeSlideShow__image"
              style={{ backgroundImage: `url(${slideImage.url})` }}
            >
              <span>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default WelcomeSlideShow;
