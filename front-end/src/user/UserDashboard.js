import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import moment from "moment";

import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "./apiUser";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { name, email, roles, _id },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Công Cụ</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              Giỏ Hàng
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Cập Nhật Hồ Sơ
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5 card-dashboard">
        <h3 className="card-header">Thông Tin Người Dùng</h3>
        <ul className="list-group">
          <li className="list-group-item">Tên Người Dùng:&nbsp;{name}</li>
          <li className="list-group-item">Email:&nbsp;{email}</li>
          <li className="list-group-item">
            Quyền:&nbsp;
            {Object.values(roles) === "ROLE_USER" ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Lịch Sử Giao Dịch</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div key={h._id}>
                  <h3>Total Products:&nbsp;{h.products.length}</h3>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={p._id}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createAt).fromNow()}</h6>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <hr />
            {JSON.stringify(history)}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Hồ Sơ"
      description={`Hồ sơ của ${name}!`}
      className="container-fluid"
    >
      <div className="row p-5 card-container">
        <div className="col-4">{userLinks()}</div>
        <div className="col-8">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
