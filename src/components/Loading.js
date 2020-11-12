import React from "react";
import Spinner from "../img/spinner.gif";

const Loading = () => {
  return (
    <div className="text-center">
      <img src={Spinner} alt="Loading" />
    </div>
  );
};

export default Loading;
