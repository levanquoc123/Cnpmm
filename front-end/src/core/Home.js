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
  const [searchName, setSearchName] = useState("");

  // const setScrollToTop = useScrollToTop(true);

  // const [orders, setOrders] = useState([]);
  // const [statusValues, setStatusValues] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [chart, setChart] = useState({});

  // const [googleData, setGoogleData] = useState();
  // const { user, token } = isAuthenticated();

  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // const res = await listOrdersChart();

    fetch(`http://localhost:8090/api/sold`)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        }
        setLoading(false);
        return res.json();
      })
      .then((jsonarray) => {
        var labels = jsonarray.map(function (e) {
          // return moment(e.createdAt).fromNow();
          return e.name;
        });

        // let abc = [];
        // var a = [];
        var data = jsonarray.map(function (e, i) {
          return e.sold;
        });

        console.log(data);
        console.log(labels, data);
        // console.log(labels);

        setChart({
          // labels: Object.keys(res.data[0]),
          labels: labels,
          datasets: [
            {
              label: "Product Sold",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              // data: Object.values(res.data[0]),
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

  const pageSizes = [3, 6, 9];

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
    setError(false);
    setLoading(false);
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
        if (response.error) {
          setError(response.error);
        }

        const { products, totalPages } = response.data;

        setLoading(false);
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
    setLoading(true);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
    setLoading(true);
  };

  const showError = () => error && <h2>Fail to load!</h2>;

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <Layout
      title="Trang Chủ"
      description="Điện Thoại Shop Web"
      className="container-fluid"
    >
      <section class="section-stories" id="section-stories">
        {/* <Search /> */}

        <div class="bg-video">
          <video autoPlay muted loop class="bg-video__content">
            <source type="video/mp4"></source>
            Your browser is not supported!
          </video>
        </div>

        <div class="navigation">
          <input
            type="checkbox"
            class="navigation__checkbox"
            id="navi-toggle"
          />

          <label for="navi-toggle" class="navigation__button__g3">
            <span class="navigation__icon"> &nbsp; </span>
          </label>

          <div class="navigation__background">&nbsp;</div>

          <nav class="navigation__nav">
            <ul class="navigation__list">
              {/* <li class="navigation__item">
              <Link to="/about" class="navigation__link">
                <span>01</span>About
              </Link>
            </li>
            <li class="navigation__item">
              <Link to="/dashboard" class="navigation__link">
                <span>02</span>Admin Dashboard
              </Link>
            </li> */}

              <li class="navigation__item">
                <Link
                  to="/"
                  class="navigation__link"
                // onClick={() => setScrollToTop(true)}
                >
                  <span>Click me to scroll to top</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          {showError()}
          <Chart data={chart} />
          {showLoading()}
        </div>

        {/* <div>
          <Chart data={this.state.chart} />
        </div> */}

        <div className="text-center">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên cần tìm"
                value={searchName}
                onChange={onChangeSearchName}
              />
              {showLoading()}
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={retrieveProducts}
                >
                  Search
                  {showLoading()}
                </button>
              </div>
            </div>
          </div>

          <div className="container-fluid row m-0 p-0 card-container">
            <div className="mt-3">
              <h2
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #6b95c5, #007bff)",
                  textTransform: "uppercase",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  fontWeight: 700,
                }}
              >
                Cách sắp xếp sản phẩm:
              </h2>
              {showLoading()}
              <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              {/* {showError()}
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
              {productsByArrival.map((product, i) => (
                <div key={i} className="col-4 mb-3">
                  <Card product={product} />
                </div>
              ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
              {productsBySell.map((product, i) => (
                <div key={i} className="col-4 mb-3">
                  <Card product={product} />
                </div>
              ))}
            </div> */}

              {showError()}
              <h2 className="title">Best Seller</h2>
              {showLoading()}

              <div className="row card-container row__center__home">
                {products &&
                  products.map((product, index) => (
                    <div key={index} className="col-sm-5 col-md-6 col-lg-4 mb-3">
                      {showError()}
                      <Card product={product} className="test" />
                      {showLoading()}
                    </div>
                  ))}
              </div>

              <Pagination
                className="container-fluid row card-container justify-content-center row__center__container__paginate"
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
              {showLoading()}
            </div>

            {/* <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  // className={
                  //   "list-group-item " + (index === currentIndex ? "active" : "")
                  // }
                  // onClick={() => setActiveProduct(product, index)}
                  key={index}
                >
                  {product.name}
                </li>
              ))}
          </ul> */}
          </div>
        </div>
      </section>
     
    </Layout>
  );
};

export default Home;

