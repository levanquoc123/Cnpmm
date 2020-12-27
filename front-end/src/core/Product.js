import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import Card from "./Card";

import { read, listRelated } from "./apiCore";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    // Fetch single Product
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // Fetch related products if fetch single product successfully
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  // console.log(product);
  // console.log(relatedProducts);
  const showNoRelated = () => {
    return relatedProduct.length === 0 && <h4>No related products found.</h4>;
  };

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="m-2 d-flex justify-content-center">
        <div className="col-6">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
      </div>
      <div className="text-center">
        <h1 className="title p-3">Related Products</h1>
        {showNoRelated()}
        <div className="row m-2">
          {relatedProduct.map((product) => (
            <div className="col-4" key={product._id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div>
      </div> */}
    </Layout>
  );
};

export default Product;
