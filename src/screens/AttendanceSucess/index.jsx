import React from "react";

import Congratulations from "../../public/Animation - 1729565257204.gif";
export default function index() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-white">
      <img src={Congratulations} alt="Loading" className="w-60 h-60" />
      <h1 className="text-center text-2xl font-bold">Điểm danh thành công!</h1>
    </div>
  );
}
