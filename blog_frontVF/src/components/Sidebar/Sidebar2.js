import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/img/3Alogo.png";

var ps;

function Sidebar() {
  const location = useLocation();
  const sidebar = React.useRef();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div className="sidebar" data-color="blue" data-active-color="info">
      <div className="logo">
        <a  className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a  className="simple-text logo-normal">
          Triple A Travel
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <li className={activeRoute("/dashboard")}>
            <NavLink to="/admin/dashboard" className="nav-link">
              <i className="nc-icon nc-bank" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li className={activeRoute("/Comment")}>
            <NavLink to="/admin/Comment" className="nav-link">
              <i className="nc-icon nc-bank" />
              <p>Comment</p>
            </NavLink>
          </li>
          <li className={activeRoute("/story")}>
            <NavLink to="/admin/story" className="nav-link">
              <i className="nc-icon nc-vector" />
              <p>Story</p>
            </NavLink>
          </li>
          <li className={activeRoute("/user")}>
            <NavLink to="/admin/user" className="nav-link">
              <i className="nc-icon nc-badge" />
              <p>User</p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
