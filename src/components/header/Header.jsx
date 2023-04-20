import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const scrollFunction = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(Window.scrollY);
  };
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  const showMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div className="container">
        <div className="flex-center justify-content-between">
          <div className="logo">
            <Link to="/">
              <img src="./movix-logo.png" alt="" />
            </Link>
          </div>
          <ul className="menuItems">
            <li className="menuItem">
              <Link to="/explore/movies"> Movies </Link>
            </li>
            <li className="menuItem">
              <Link to="/explore/tv"> TV Shows </Link>
            </li>
            <li className="menuItem">
              <HiOutlineSearch onClick={() => setShowSearch(true)} />
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={showMobileMenu} />}
          </div>
        </div>
        {showSearch && (
          <div className="searchBar">
            <div className="search-input">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                placeholder="Search Movies, TV shows"
                onKeyUp={handleSearch}
              />
              <button className="btn" onClick={() => setShowSearch(false)}>
                <VscChromeClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
