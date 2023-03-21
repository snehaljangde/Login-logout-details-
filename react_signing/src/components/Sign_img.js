import React from "react";

import BackImg from "../assets/img/BackImg.png";

const SIGN_IMG = () => {
  return (
    <div className="right_data mt-5" style={{ width: "100%" }}>
      <div className="sign_img mt-5">
        <img src={BackImg} style={{ maxWidth: "100%" }} alt="" />
      </div>
    </div>
  );
};

export default SIGN_IMG;
