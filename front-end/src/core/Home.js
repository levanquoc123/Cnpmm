import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../Layout/Layout";

import { Link } from "react-router-dom";

import Card from "./Card";
import Search from "./Search";
import Paginator from "../Paginator/Paginator";

import Chart from "./Chart";

// import axios from "axios";
import moment from "moment";

import { getProducts, listProducts, getAll } from "./apiCore";

import {
  listOrders,
  getStatusValues,
  updateOrderStatus,
  listOrdersChart,
} from "../admin/apiAdmin";

import Pagination from "@material-ui/lab/Pagination";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  // const [orders, setOrders] = useState([]);
  // const [statusValues, setStatusValues] = useState([]);

  const [chart, setChart] = useState({});

  // const [googleData, setGoogleData] = useState();

  // const { user, token } = isAuthenticated();

  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // const res = await listOrdersChart();

    fetch(`http://localhost:8090/api/order/listchart`)
      .then((res) => res.json())
      .then((jsonarray) => {
        var labels = jsonarray.map(function (e) {
          return moment(e.createdAt).fromNow();
        });

        // let abc = [];
        // var a = [];
        var data = jsonarray.map(function (e, i) {
          return e.amount;
        });

        console.log(labels, data);
        // console.log(labels);

        setChart({
          // labels: Object.keys(res.data[0]),
          labels: labels,
          datasets: [
            {
              label: "Orders Web Quốc",              
              data: Object.values(data),
            },
          ],
        });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [2, 4, 6, 8, 10];

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveProducts = () => {
    const params = getRequestParams(searchName, page, pageSize);

    getAll(params)
      .then((response) => {
        const { products, totalPages } = response.data;

        setProducts(products);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveProducts, [page, pageSize]);

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

  // const removeAllProducts = () => {
  //   removeAll()
  //     .then((response) => {
  //       console.log(response.data);
  //       refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <Layout
      title="Cửa Hàng Điện Thoại"
      description="Website bán hàng"
      className="container-fluid"
    >
      {/* <Search /> */}

      <div>
        <Chart data={chart} />
      </div>

      {/* <div>
          <Chart data={this.state.chart} />
        </div> */}

      <div className="list row">
        <div className="col-md-10">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tên Điện thoại"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={retrieveProducts}
              >
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid row m-0 p-0 card-container">
          <h4>Danh sách điện thoại</h4>

          <div className="mt-3">
            {"Kiểu trình bày: "}
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <h2 className="mb-4">Điện Thoại: </h2>
            <div className="container-fluid row m-0 p-0 card-container">
              {products &&
                products.map((product, index) => (
                  <div key={index} className="col-6 mb-3">
                    <Card product={product} />
                  </div>
                ))}
            </div>            
            <Pagination
              className="container-fluid row m-0 p-0 card-container"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
