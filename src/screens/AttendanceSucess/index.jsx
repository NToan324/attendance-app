import React from "react";

import Congratulations from "../../public/862b16876fd04dffafbc520be90c9e7e.gif";
import FireGif from "../../public/3576f1df24e20af5bc43777b9a5ddc98.gif";
export default function index() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-white">
      <img src={Congratulations} alt="Loading" className="" />
      <h1 className="text-center text-3xl font-bold absolute bottom-52">
        Điểm danh thành công!
      </h1>
    </div>
  );
}
