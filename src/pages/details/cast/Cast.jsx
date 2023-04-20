import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  //   console.log(data);
  //   console.log(url);
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <div className="container">
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((data) => {
              let imgPath = data?.profile_path ? url.profile + data.profile_path : avatar;
              return (
                <div key={data.id} className="listItem">
                  <div className="profileImg">
                    <Img src={imgPath} />
                  </div>
                  <div className="name">{data.name}</div>
                  <div className="character">{data.character} </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cast;
