import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth";
import { itemTotal } from "../core/cartHelpers";

const AdminMenu = ({ history }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#6d36c5ad" };
    } else {
      return { color: "#fff" };
    }
  };

  return (
    <div>
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

        {/* User Links */}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                <i className="fa fa-user-circle"></i>&nbsp;
                {isAuthenticated().user.name}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, "/")} to="/">
                <i className="fa fa-home"></i>&nbsp;Home
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
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
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

        {!isAuthenticated() && (
          <Fragment>
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
                style={isActive(history, "/signup")}
                to="/a"
              >
                Sign Up
              </Link>
            </li>
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
    </div>
  );
};

export default withRouter(AdminMenu);
