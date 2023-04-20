import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import "./style.scss";
const HeroBanner = () => {
  const [background, setBackground] = useState();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  // console.log(url.backdrop);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
      //   setSearch("");
    }
  };

  useEffect(() => {
    const randomBg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
    // console.log(randomBg);
    setBackground(randomBg);
  }, [data]);

  return (
    <section style={{ backgroundImage: `url(${!loading && background})`, color: "white" }} className="banner flex-center">
      <div className="container">
        <div className="hero-banner text-center">
          {/* {!loading && <Img src={background} />} */}
          <h1>Welcome</h1>
          <p>Millions of movies, TV shows, and People to discover. Explore Now</p>
          <div className="col-sm-6 m-auto">
            <div className="search-container d-flex">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                placeholder="Search Movies, TV shows"
                onKeyUp={handleSearch}
              />
              <button className="btn">Search</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
