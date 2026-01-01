import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-container bg-dark text-light p-3">
      <div className="footer-content">
        <h4 className="text-center">
          All Rights Reserved &copy;
        </h4>

        <div className="social-links">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <FaLinkedin />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <FaFacebook />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <FaGithub />
          </a>
        </div>

        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="#" onClick={(e) => e.preventDefault()}>About</Link>
          <Link to="#" onClick={(e) => e.preventDefault()}>Privacy Policy</Link>
          <Link to="#" onClick={(e) => e.preventDefault()}>Contact</Link>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
