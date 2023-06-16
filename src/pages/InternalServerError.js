import React from "react";

const InternalServerError = () => {
  return (
    <div className="h-screen flex justify-center  relative">
      <div className="absolute top-72">
        <h2 className="text-2xl font-semibold h-min ">
          <span className="text-red-600">500</span> | Internal server error.
        </h2>
        <p
          onClick={() => window.location.reload()}
          className="text-center text-blue-600 hover:underline cursor-pointer"
        >
          Refresh page
        </p>
      </div>
    </div>
  );
};

export default InternalServerError;
