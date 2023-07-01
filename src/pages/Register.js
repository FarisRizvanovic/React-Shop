import React from "react";
import { Button } from "@material-tailwind/react";

const Register = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 mb-80 mt-6 bg-white p-10 rounded-2xl min-w-[400px]">
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
          <label htmlFor="firstname" className=" text-gray-400">
            First name
          </label>
          <input
            type="text"
            name="firstname"
            id=""
            className="py-2 pl-3 pr-10 bg-gray-50"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="lastname" className=" text-gray-400">
            Last name
          </label>
          <input
            type="text"
            name="lastname"
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

        <div className="flex flex-col ">
          <label htmlFor="cpassword" className=" text-gray-400">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            id=""
            className="py-2 pl-3 pr-10 bg-gray-50"
          />
        </div>

        <div>
          <div className="pl-1 text-sm text-gray-400 flex gap-1">
            Already have an account?
            <p className="font-bold text-blue-400 hover:text-blue-700 duration-100 cursor-pointer">
              Login
            </p>
          </div>
        </div>
        <div>
          <Button color="green" className=" w-full">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
