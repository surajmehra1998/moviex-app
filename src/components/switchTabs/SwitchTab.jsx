import React, { useState } from "react";
import "./style.scss";
const SwitchTab = ({ data, onTabChange }) => {
  //   console.log(data);
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);
  const activeTab = (tabs, index) => {
    // console.log(tabs);
    setLeft(index * 100);
    console.log(index);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tabs, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tabs, index) => (
          <div key={index} className={`tabItem ${selectedTab === index ? "active" : ""}`} onClick={() => activeTab(tabs, index)}>
            {tabs}
          </div>
        ))}
        <div className="movingBg" style={{ left }}></div>
      </div>
    </div>
  );
};

export default SwitchTab;
