import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const UserProfile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { token } = isAuthenticated();

  const {
    user: { roles },
  } = isAuthenticated();

  const { name, email, password, error, success } = values;

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    // console.log(event.target.value);
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => (
    // if (success) {
    //   return <Redirect to="/cart" />;
    // }
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Your profile has been updated successfully!
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      Fail to update your profile
    </div>
  );

  const profileUpdate = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
            disabled
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            className="form-control"
            value={password}
          />
        </div>

        <div>
          {/* User Links */}
          {isAuthenticated() && roles.includes("ROLE_ADMIN") && (
            <Link
              className="btn btn-outline-warning float-left"
              // style={isActive(history, "/user/dashboard")}
              to="/admin/dashboard"
            >
              Back
            </Link>
          )}

          {/* User Links */}
          {isAuthenticated() && roles.includes("ROLE_USER") && (
            <Link
              className="btn btn-outline-warning float-left"
              // className="nav-link"
              // style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Back
            </Link>
          )}

          {/* <Link
            to="/user/dashboard"
            className="btn btn-outline-warning float-left"
          >
            Back
          </Link> */}
          <button onClick={clickSubmit} className="btn btn-primary float-right">
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <div className="container w-50">
        <h1 className="title m-3 text-center">Profile update</h1>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
        {showError(error)}
      </div>
    </Layout>
  );
};

export default UserProfile;
