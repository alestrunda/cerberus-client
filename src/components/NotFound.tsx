import React from "react";

export default ({ text = "Not found" }) => (
  <p className="text-error text-center text-uppercase mb10">{text}</p>
);
