import React from "react";

import Menu from "../core/Menu";
import classes from "./Layout.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />

    {/* <div className={`jumbotron $={classes.Layout}`}> */}
    <div className={classes.Layout}>
      <h2 className={classes.abc}>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
