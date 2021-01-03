import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";

import Card from "./Card";
import Checkout from "./Checkout";

import { getCart } from "./cartHelpers";

const Cart = () => {
  const [items, setItems] = useState([]);

  const [run, setRun] = useState(false);

  useEffect(() => {
    console.log("MAX DEPTH ...");
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Giỏ hàng của bạn có {`${items.length}`} mặt hàng</h2>
        <hr />
        <div className="row">
          {items.map((product, i) => (
            <div className="col-2 mb-3" key={product._id}>
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        Giỏ hàng của bạn hiện đang trống. <br />{" "}
        <Link to="/shop">Tiếp tục mua sắm</Link>
      </h2>
    );
  };

  return (
    <Layout
      title="Giỏ Hàng"
      description="Thanh toán tại đây!"
      className="container-fluid"
    >
      <div className="text-center m-3">
        <div className="">
          <h1 className="title p-2">Thông tin giỏ hàng</h1>
          <Checkout products={items} setRun={setRun} />
        </div>

        <div className="mt-4">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>
      {/* <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} />
        </div>
      </div> */}
    </Layout>
  );
};

export default Cart;
