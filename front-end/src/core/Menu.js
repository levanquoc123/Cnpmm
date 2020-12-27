import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Menuu from "./Menu.css";

const Menu = ({ history }) => {
  const isActive = (history, path) => {

    if (history.location.pathname === path) {
      return { 
        color: "#ff9900" 
      };
    } else {
      return { color: "#fff" };
    }
  };

  const { user, roles } = isAuthenticated();

  const getEnumRoles = (roles) => {
    const role = roles;
  };

  return (
    <div>
      <nav className="container main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/about")}
            to="/about"
          >
            My Web <i className="fa fa-store"></i>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home <i className="fa fa-home"></i>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/best")} to="/best">
            <i className="fa fa-home"></i>&nbsp;Best Seller
          </Link>
        </li>
      </ul>
      <ul className="nav nav-tabs bg-primary">

        {/* User Links  */}
        {isAuthenticated() &&
          isAuthenticated().user.roles.includes("ROLE_USER") && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  <i className="fa fa-user-circle"></i>&nbsp;
                  {isAuthenticated().name}
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/shop")}
                  to="/shop"
                >
                  Shop
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/search"
                  className="nav-link"
                  style={isActive(history, "/search")}
                >
                  Search
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/cart")}
                  to="/cart"
                >
                  <i className="fa fa-shopping-cart"></i>&nbsp;
                  <sup>
                    <small className="cart-badge">{itemTotal()}</small>
                  </sup>
                </Link>
              </li>
            </Fragment>
          )}

        {/* Admin Links */}
        {isAuthenticated() &&
          isAuthenticated().user.roles.includes("ROLE_ADMIN") && (
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                <i className="fa fa-user-circle"></i>&nbsp;Admin
              </Link>
            </li>
          )}
        </ul>

        <ul className="nav nav-tabs bg-primary">
        {!isAuthenticated() && (
          <Fragment>
            <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">           
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/shop")}
                  to="/shop"
                >
                  Shop
                </Link>
              </li>
            </ul>

              <li className="nav-item">
              <Link
                to="/search"
                className="nav-link"
                style={isActive(history, "/search")}
              >
                Search
              </Link>
            </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/cart")}
                  to="/cart"
                >
                  <i className="fa fa-shopping-cart"></i>&nbsp;
                  <sup>
                    <small className="cart-badge">{itemTotal()}</small>
                  </sup>
                </Link>
              </li>
              <ul className="nav nav-tabs bg-primary">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signupx")}
                  to="/b"
                >
                  Show Image Upload 
                </Link>
              </li>

            <ul className="nav nav-tabs bg-primary">  
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signupx")}
                  to="/api/document/upload"
                >
                  NewFileUpload
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signupx")}
                  to="/ca"
                >
                  FIleUpload
                </Link>
              </li>
              </ul>
            </ul>
        </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() =>
                signOut(() => {
                  history.push("/");
                })
              }
            >
              <i className="fa fa-sign-out-alt"></i>
            </span>
          </li>
        )}
      </ul>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
