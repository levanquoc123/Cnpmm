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
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Right navbar links */}
        <ul className="navbar-nav mr-auto">
          {/* Messages Dropdown Menu */}
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="javascript:;">
              <i className="far fa-user" /> Hello, {name} - Role:&nbsp;
            {Object.values(roles) === "ROLE_ADMIN"
                ? "Registered User"
                : "Admin"}
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">menu</span>
              <div className="dropdown-divider" />
              <Link to={`/profile/${_id}`} className="dropdown-item">
                <i className="fas fa-user-alt mr-2" /> Cập nhật thông tin
            </Link>
              <div className="dropdown-divider" />
              {/* <a
                href="javascript:;"
                // onClick={() => Logout(props)}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt mr-2" /> Logout
            </a> */}
              <Link className="nav-link" to="/create/category">
                Thêm Hãng Điện Thoại
            </Link>
              <Link className="nav-link" to="/admin/categories">
                Quản Lý Hãng Điện Thoại
            </Link>
              <Link className="nav-link" to="/create/product">
                Thêm Điện Thoại Mới
            </Link>
              <Link className="nav-link" to="/admin/products">
                Quản Lý Sản Phẩm
            </Link>
              <Link className="nav-link" to="/admin/orders">
                Xem Đơn Hàng
            </Link>
            </div>
          </li>
        </ul>
      </nav>
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
      {adminLinks()}
      {/* <div className="row p-5 card-container">
        <div className="col-8">{adminInfo()}</div>
      </div> */}
    </Layout>
  );
};

export default AdminDashboard;
