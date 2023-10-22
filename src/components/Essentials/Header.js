import React from "react";
import { Toaster } from "react-hot-toast";

const Header = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <div className="text-center my-5 h3"> eVidence</div>
    </div>
  );
};
export default Header;
