import React from "react";

import "./ImageUpload.css";

const image = (props) => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? "contain" : "cover",
      backgroundPosition: props.left ? "left" : "center",
    }}
  />
);

export default image;
