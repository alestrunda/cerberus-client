import React from "react";
import { version } from "../config";

const Footer = () => (
  <footer className="page-footer">
    <div className="container">Cerberus v{version}</div>
  </footer>
);

export default Footer;
