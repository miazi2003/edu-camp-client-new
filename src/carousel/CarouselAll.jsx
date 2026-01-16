import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./CarouselAll.css"
import Banner from "../pages/home/banner/Banner";
import BannerOne from "../new Banner/BannerOne";
import BannerTwo from "../new Banner/BannerTwo";

const CarouselAll = () => {
  return (
    <div className="my-carousel-wrapper">
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={600}
        swipeable
        emulateTouch
        stopOnHover
      >
        <BannerOne />
        <BannerTwo />
        <Banner />
      </Carousel>
    </div>
  );
};

export default CarouselAll;
