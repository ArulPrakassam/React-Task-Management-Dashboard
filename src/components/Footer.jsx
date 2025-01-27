import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-credits">
        <p>
          &copy; <span>{new Date().getFullYear()}</span>. Designed and Developed
          by{" "}
          <a href="https://github.com/ArulPrakassam" target="_blank">
            Arul Prakassam.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
