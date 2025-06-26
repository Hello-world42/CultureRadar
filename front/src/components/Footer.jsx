import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    className="bg-dark text-white py-3 mt-5"
    style={{
      left: 0,
      bottom: 0,
      width: "100%",
      zIndex: 100,
    }}
  >
    <div className="container text-center">
      <Link to="/about" className="text-white text-decoration-none">
        A propos
      </Link>
    </div>
  </footer>
);

export default Footer;
