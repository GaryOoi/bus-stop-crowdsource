import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="text-center mt-5 bg-dark">
      <div className="border-top p-4">
        <div className="text-light">
          Copyright &copy;
          {year}
        </div>
      </div>
    </div>
  );
}

export default Footer;
