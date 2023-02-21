import React from "react";
import { Carousel } from "react-responsive-carousel";
import Promotion from "./Promotion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImgSlider() {
  return (
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <Promotion />
      <Promotion />
    </Carousel>
  );
}

export default ImgSlider;
