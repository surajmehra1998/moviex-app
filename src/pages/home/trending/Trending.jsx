import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import SwitchTab from "../../../components/switchTabs/SwitchTab";
import useFetch from "../../../hooks/useFetch";
const Trending = () => {
  const [tab, setTab] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${tab}`);
  // console.log(data?.results);
  const onTabChange = (tab) => {
    setTab(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="container">
      <div className="flex-center justify-content-between">
        <h2 className="heading">Trending</h2>
        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
