import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

import jwt from "jsonwebtoken";
import { resetPasswordFetch } from "../auth";

const ResetPage = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    error: "",
    success: false,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, error, success } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    resetPasswordFetch({ newPassword, resetPasswordLink: token }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ newPassword: "", error: false, success: true });
        }
      }
    );
  };

  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">New Password</label>
        <input
          onChange={handleChange}
          name="password"
          value={newPassword}
          type="password"
          className="form-control"
          required
        />
      </div>

      <div>
        <Link to="/signin" className="btn btn-outline-warning float-left">
          Back
        </Link>
        <button className="btn btn-primary float-right" onClick={clickSubmit}>
          Submit
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Your password has been updated!
    </div>
  );

  return (
    <Layout title="Reset password" description={`Reset password!`}>
      <div className="container w-50">
        <div className="p-3 text-center">
          <h1 className="title">Welcome back! {name}</h1>
        </div>
        {showError()}
        {showSuccess()}
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default ResetPage;
