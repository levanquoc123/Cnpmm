import React, { useState, useEffect } from "react";

import Card from "./Card";

import Layout from "../Layout/Layout";

import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

import { getCategories, list } from "./apiCore";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  


  const { categories, category, search, results, searched } = data;

  
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    // console.log(`search:${search}`, `category:${category}`);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({
              ...data,
              results: response,
              searched: true,
            });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="mt-3 text-center">
        <h2 className="mt-3 mb-3">{searchMessage(searched, results)}</h2>
        <div className="row card-container">
          {results.map((product, i) => (
            <div className="col-4 mb-3" key={i}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      //  {/* Search Form */}
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">Tất Cả</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Tìm kiếm theo tên"
            />
          </div>

          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Tìm</button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div
      title="Search Page"
      description="Search go!"
      className="container-fluid"
    >
      <div className="row">
        <div className="container mb-3">{searchForm()}</div>

        <div className="container-fluid mb-3">
          {/* Search  Results*/}
          {searchedProducts(results)}
        </div>
      </div>
    </div>
  );
};

export default Search;
