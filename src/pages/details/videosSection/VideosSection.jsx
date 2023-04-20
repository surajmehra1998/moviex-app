import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  // console.log(data?.results);
  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <div className="container">
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results.map((data) => (
              <div className="videoItem" key={data.id}>
                <div
                  className="videoThumbnail"
                  onClick={() => {
                    setShow(true);
                    setVideoId(data.key);
                  }}
                >
                  <Img src={`https://img.youtube.com/vi/${data.key}/mqdefault.jpg`} />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{data.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </div>
      <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
    </div>
  );
};

export default VideosSection;
