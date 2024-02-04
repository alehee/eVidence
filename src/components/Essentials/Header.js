import React from "react";
import { Toaster } from "react-hot-toast";

const Header = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <div className="text-center p-5 h2 background-second text-second">
        eVidence
      </div>
    </div>
  );
};
export default Header;
