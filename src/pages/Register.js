import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { registerUser } from "../api/Api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();

  const validateInput = () => {
    if (username === "") {
      toast.warn("Username cannot be empty");
      return false;
    }
    if (firstname === "") {
      toast.warn("First name cannot be empty");
      return false;
    }
    if (lastname === "") {
      toast.warn("Last name cannot be empty");
      return false;
    }
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters");
      return false;
    }
    if (password === "") {
      toast.warn("Password cannot be empty");
      return false;
    }
    if (cpassword === "") {
      toast.warn("Confirm password cannot be empty");
      return false;
    }
    if (password !== cpassword) {
      toast.warn("Passwords do not match");
      return false;
    }
    return true;
  };

  const register = async () => {
    try {
      const isValid = validateInput();
      if (!isValid) return;
      const user = { username, firstname, lastname, password };
      await registerUser(user);
      toast.success("User registered successfully");
      navigate("/login");
    } catch {
      toast.error("Error registering user");
    }
  };

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
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
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            className="py-2 pl-3 pr-10 bg-gray-50"
          />
        </div>

        <div>
          <div className="pl-1 text-sm text-gray-400 flex gap-1">
            Already have an account?
            <p
              onClick={() => navigate("/login")}
              className="font-bold text-blue-400 hover:text-blue-700 duration-100 cursor-pointer"
            >
              Login
            </p>
          </div>
        </div>
        <div>
          <Button color="green" className=" w-full" onClick={() => register()}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
