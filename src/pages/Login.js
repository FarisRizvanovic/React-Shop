import { Button } from "@material-tailwind/react";
import React from "react";

const Login = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 mb-80 bg-white p-10 rounded-2xl min-w-[400px]">
        <div className="flex flex-col ">
          <label htmlFor="username" className=" text-gray-400">
            Username
          </label>
          <input
            type="username"
            name="username"
            id=""
            className="py-2 pl-3 pr-10 bg-gray-50"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="password" className=" text-gray-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            id=""
            className="py-2 pl-3 pr-10 bg-gray-50"
          />
        </div>
        <div>
          <p className="pl-1 text-sm text-gray-400 flex gap-1">
            No account?
            <p className="font-bold text-green-400 hover:text-green-700 duration-100 cursor-pointer">
              Register
            </p>
          </p>
        </div>
        <div>
          <Button color="blue" ripple="light" className=" w-full">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
