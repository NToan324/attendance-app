import React from "react";

import Congratulations from "../../public/Animation - 1729565257204.gif";
import FireGif from "../../public/3576f1df24e20af5bc43777b9a5ddc98.gif";
export default function index() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-white">
      <img src={Congratulations} alt="Loading" className="w-60 h-60" />
      <h1 className="text-center text-3xl font-bold">Điểm danh thành công!</h1>
    </div>
  );
}
