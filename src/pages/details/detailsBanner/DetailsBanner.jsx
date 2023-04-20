import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import Rating from "../../../components/rating/Rating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  // console.log(video);
  // console.log(crew);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((store) => store.home);
  // console.log(url);
  // console.log(data);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const genresId = data?.genres?.map((data) => data.id);

  const director = crew?.filter((data) => data.job === "Director");
  const writer = crew?.filter((data) => data.job === "Screenplay" || data.job === "Story" || data.job === "Writer");
  // console.log(director);
  // console.log(writer);
  // console.log(genresId);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          <div className="backdrop-img">
            <Img src={url?.poster + data?.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <div className="container">
            <div className="content">
              <div className="left">
                {data?.poster_path ? (
                  <Img src={url?.backdrop + data?.poster_path} className="posterImg" />
                ) : (
                  <Img src={PosterFallback} className="posterImg" />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {data?.title || data?.name}
                  {`(${dayjs(data?.release_date).format("YYYY")})`}
                </div>
                <div className="subtitle">{data?.tagline}</div>
                <Genres data={genresId} />
                <div className="row">
                  <Rating rating={data?.vote_average.toFixed(1)} />
                  <div
                    className="playbtn"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video?.key);
                    }}
                  >
                    <PlayIcon />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data?.overview}</div>
                </div>
                <div className="info">
                  {data?.status && (
                    <div className="infoItem">
                      <span className="text bold">Status</span>
                      <span className="text">{data?.status}</span>
                    </div>
                  )}
                  {data?.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date</span>
                      <span className="text">{dayjs(data?.release_date).format("MMM D, YYYY")}</span>
                    </div>
                  )}
                  {data?.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Run Time</span>
                      <span className="text">{toHoursAndMinutes(data?.runtime)}</span>
                    </div>
                  )}
                </div>
                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director:</span>
                    <span className="text">
                      {director?.map((data, i) => (
                        <span key={i}>{data.name}</span>
                      ))}
                    </span>
                  </div>
                )}
                {writer?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer:</span>
                    <span className="text">
                      {writer?.map((data, i) => (
                        <span key={i}>{data.name}</span>
                      ))}
                    </span>
                  </div>
                )}
                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Created By:</span>
                    <span className="text">
                      {data?.created_by?.map((data, i) => (
                        <span key={i}>{data.name}</span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <div className="container">
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
