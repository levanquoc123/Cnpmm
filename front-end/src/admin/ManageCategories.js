import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

import { getCategories, deleteCategory } from "./apiAdmin";
import { isAuthenticated } from "../auth";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () =>
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });

  useEffect(() => {
    loadCategories();
  }, []);

  const deleteCategoryButton = (categoryId) => {
    deleteCategory(user._id, token, categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  return (
    <Layout
      title="Quản lý nhà sản xuất"
      description="Thực hiện CRUD trên các nhà sản xuất"
      className="container-fluid"
    >
      <div className="container w-50">
        <h1 className="title m-3 text-center">Quản lý nhà sản xuất</h1>
        <Link
          to="/admin/dashboard"
          className="btn btn-outline-warning float-left"
        >
          Quay lại
        </Link>
        <h2>Tổng số nhà sản xuất: {categories.length}</h2>
        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              {categories.map((c) => (
                <li className="list-group-item" key={c._id}>
                  <strong className="float-left">{c.name}</strong>
                  <div className="float-right">
                    <Link to={`/admin/category/update/${c._id}`}>
                      <span className="badge badge-warning badge-pill m-2">
                        Cập nhật
                      </span>
                    </Link>

                    <Link to={`/admin/categories`}>
                      <span
                        className="badge badge-danger badge-pill"
                        onClick={() => deleteCategoryButton(c._id)}
                      >
                        Xóa
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategories;
