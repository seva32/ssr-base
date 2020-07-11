/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState} from "react";
import {Link} from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuToggle] = useState(false);

  const toggleMenu = () => {
    setMenuToggle(!menuOpen);
    return false;
  };

  const stylesOpen = {
    transform: "translateX(0px)",
  };
  return (
    <div className="navbar-fixed">
      <nav className="red">
        <div className="container">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              Project Photos
            </a>
            <a href="#" onClick={toggleMenu} className="sidenav-trigger right">
              <i className="material-icons">menu</i>
            </a>
            <div
              className="sidenav-overlay"
              style={menuOpen ? {display: "block", opacity: 1} : null}
              onClick={toggleMenu}
            />
            <ul
              id="slide-out"
              className="sidenav"
              style={menuOpen ? stylesOpen : null}
            >
              <li>
                <a className="subheader">Menu</a>
              </li>
              <li>
                <div className="divider" />
              </li>
              <li>
                <Link to="/" className="item" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/photos" className="item" onClick={toggleMenu}>
                  Photos
                </Link>
              </li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/photos" className="item">
                  Photos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
