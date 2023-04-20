import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  // console.log(genres);
  // console.log(data);
  return (
    <div className="text-white genre flex-center">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return <div key={g}>{genres[g]?.name}</div>;
      })}
    </div>
  );
};

export default Genres;
