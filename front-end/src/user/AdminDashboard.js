import React from "react";
import Layout from "../Layout/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, roles, _id },
  } = isAuthenticated();

  // const token = isAuthenticated().token;

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Công Cụ</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Cập Nhật Hồ Sơ
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Thêm Hãng Điện Thoại
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/categories">
              Quản Lý Hãng Điện Thoại
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Thêm Điện Thoại Mới
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Quản Lý Sản Phẩm
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              Xem Đơn Hàng
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link"
              to="/admin/orderschart"
              // userId={id}
              // token={token}
            >
              Orders Chart
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Thông Tin người dùng</h3>
        <ul className="list-group">
          <li className="list-group-item">Tên Người Dùng:&nbsp;{name}</li>
          <li className="list-group-item">Email:&nbsp;{email}</li>
          <li className="list-group-item">
            Quyền:&nbsp;
            {Object.values(roles) === "ROLE_ADMIN"
              ? "Registered User"
              : "Admin"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Trang Quản Trị Admin"
      description={`Trang Quản Trị của ${name}!`}
      className="container-fluid"
    >
      <div className="row p-5 card-container">
        <div className="col-4">{adminLinks()}</div>
        <div className="col-8">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
