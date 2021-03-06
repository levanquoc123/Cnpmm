import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import classes from "./Card.css";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);

  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            Xem Sản Phẩm
          </button>
        </Link>
      )
    );
  };

  // Add to cart functionality
  const addToCart = () => {
    // console.log('added');
    addItem(product, count, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1"
        >
          Thêm vào giỏ hàng
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill mb-2">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill mb-2">Out of Stock</span>
    );
  };

  // update cart functionality
  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart //re-render setItem in localstorage
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group-mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Số lượng</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  //Remove item from cart functionality
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart //re-render setItem in localstorage
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Xóa Sản Phẩm Ra Khỏi Giỏ Hàng
        </button>
      )
    );
  };

  return (
    <div className="card h-70 w-70 text-center">
      
      {/* <div className="card-header name">{product.name}</div> */}
      <div className="card-header">{product.name}</div>
      <div className="card-image">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
      </div>

      <div className="column card-body">
        <p>{product.description.substring(0, 50)}</p>
        <hr />
        <h5>${product.price}</h5>
        <hr />
        <p>Hãng: {product.category && product.category.name}</p>
        <hr />
        <p>Đã thêm {moment(product.createdAt).fromNow()}</p>

        <div>{showStock(product.quantity)}</div>
        <div>
          {showViewButton(showViewProductButton)}

          {showAddToCart(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}
        </div>
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
