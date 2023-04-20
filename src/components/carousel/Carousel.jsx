import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import Rating from "../rating/Rating";
import Genres from "../genres/Genres";
const Carousel = ({ data, loading, endPoint, title }) => {
  // console.log(endPoint, data.media_type);
  const carouselContainer = useRef();
  const { url } = useSelector((store) => store.home);
  const navigate = useNavigate();
  const navigation = (dir) => {
    // console.log(dir);
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
    console.log(container);
    console.log(scrollAmount);
  };
  // console.log(data);
  const skItem = () => {
    return (
      <div className="skeltonItem">
        <div className="posterBlock skelton"></div>
        <div className="textBlock">
          <div className="title skelton"></div>
          <div className="date skelton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="container carousel">
      {title && <div className="carouselTitle">{title}</div>}
      <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation("left")} />
      <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation("right")} />
      <div className="carouselItems" ref={carouselContainer}>
        {loading ? (
          <div className="loadingSkelton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ) : (
          data?.map((data) => {
            const imgUrl = data.poster_path ? url.poster + data.poster_path : PosterFallback;
            return (
              <div key={data.id} className="carouselItem" onClick={() => navigate(`/${data.media_type || endPoint}/${data?.id}`)}>
                <div className="posterBlock">
                  <Img src={imgUrl} />
                  <div className="flex-center flex-wrap">
                    <Rating rating={data.vote_average.toFixed(1)} />
                    <Genres data={data.genre_ids.slice(0, 2)} />
                  </div>
                </div>
                <div className="textBlock">
                  <div className="title">{data.title || data.name}</div>
                  <div className="date">{dayjs(data.release_date).format("MMM D, YYYY")}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Carousel;
