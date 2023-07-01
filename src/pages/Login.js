import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(useIsAuthenticated());

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const signIn = useSignIn();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5108/user/login`, {
        username: username,
        password: password,
      });

      signIn({
        token: response.data.data,
        expiresIn: 20,
        tokenType: "Bearer",
        authState: { username: username },
      });

      window.location.reload();

      console.log(response);
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <div className="pl-1 text-sm text-gray-400 flex gap-1">
            No account?
            <p className="font-bold text-green-400 hover:text-green-700 duration-100 cursor-pointer">
              Register
            </p>
          </div>
        </div>
        <div>
          <Button
            color="blue"
            className=" w-full"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
