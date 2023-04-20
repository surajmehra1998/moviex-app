import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import SwitchTab from "../../../components/switchTabs/SwitchTab";
import useFetch from "../../../hooks/useFetch";
const Popular = () => {
  // const [tab, setTab] = useState("day");
  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch(`/${endPoint}/popular`);
  // console.log(data?.results);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="container">
      <div className="flex-center justify-content-between">
        <h2 className="heading">Popular</h2>
        <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Popular;
