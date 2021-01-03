import autoprefixer from "autoprefixer";
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Menuu from "./Menu.css";

const Menu = ({ history }) => {
  const isActive = (history, path) => {

    if (history.location.pathname === path) {
      return {
        width: '100%', 
        height: 'calc(10vh - 6px)',
        overflow: 'auto',
        backgroundColor: "#fbff01",
        display: 'flex',
        alignitems: 'center',
        color: "#fd1605",
        position: 'static'
      };
    } else {
      return {
      width: '100%', 
      height: 'calc(10vh - 6px)',
      overflow: 'auto',
      backgroundColor: "#fbff01",
      display: 'flex',
      alignitems: 'center',
      color: "#fffff" };
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
        </ul>
        <ul className="nav nav-tabs bg-primary">
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home <i className="fa fa-home"></i>
            </Link>
          </li>
        </ul>      

          {/* User Links  */}
          {isAuthenticated() &&
            isAuthenticated().user.roles.includes("ROLE_USER") && (
              <Fragment>
                <ul className="nav nav-tabs bg-primary">
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
                </ul>
                <ul className="nav nav-tabs bg-primary">
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

                <ul className="nav nav-tabs bg-primary">
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
                </ul>
              </Fragment>
            )}

          {/* Admin Links */}
          {isAuthenticated() &&
            isAuthenticated().user.roles.includes("ROLE_ADMIN") && (
              <ul className="nav nav-tabs bg-primary">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                >
                  <i className="fa fa-user-circle"></i>&nbsp;Admin
              </Link>
              </li>
              </ul>
            )}

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
              </ul>

              <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/signup")}
                    to="/signup"
                  >
                    Sign Up
                </Link>
                </li>
              </ul>
              <ul className="nav nav-tabs bg-primary">
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

          {isAuthenticated() && (
            <ul className="nav nav-tabs bg-primary">
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
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
