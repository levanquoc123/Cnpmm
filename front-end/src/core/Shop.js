import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Card from "./Card";

import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import classes from './Shop.css'

import { getCategories, getFilteredProducts } from "./apiCore";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { categories: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  // console.log(myFilter.filters);

  const init = () => {
    // Get the categories from API
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log(data);
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    console.log(newFilters);
    // Get the filtered products from API
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        // for Load More button, size from the API
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    console.log(toSkip);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <li className="nav-item dropdown">
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Thêm 
        </button>
        </li>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    // push ids from checkbox component to the state
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    // 1. loop over the keys in the defaultPrice and find the price range that match the id
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop"
      description="Chọn lựu những chiếc điện thoại bạn yêu thích"
      className="container-fluid"
    >
      <div className="text-center">
        <div className="m-3">
          <h1 className="title">Bộ Lọc Sản Phẩm</h1>
        </div>
         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
         <li className="nav-link nav-item dropdown">
         {/* container-fluid ml-0 row mark d-flex justify-content-center align-content-center */}
          <div className={classes.Shop}>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </div>
          </li>
          <li className="nav-link nav-item dropdown">
            <div className={classes.abc}>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
            </li>
            <div className="row m-3 card-container">
              {filteredResults.map((product, i) => (
                <div className="col-2 mb-3" key={i}>
                  <Card product={product} />
                </div>
              ))}
              </div>
        
        {loadMoreButton()}  
        </nav>    
      </div>
    </Layout>
  );
};

export default Shop;
