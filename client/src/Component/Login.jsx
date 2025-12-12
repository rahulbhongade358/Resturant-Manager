import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
function Login() {
  const [loginuser, setLoginuser] = useState({
    phone: "",
    password: "",
  });

  const login = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        loginuser
      );

      // ✔ Staff roles only (Admin, Waiter, Chef)
      if (response?.data?.success) {
        localStorage.setItem("userlogin", JSON.stringify(response.data.user));
        window.location.href = "/";
        return;
      }
    } catch (err) {
      // ❌ Customer trying to login → Access Denied
      if (err.response?.status === 403) {
        window.location.href = "/unauthorized";
        return;
      }

      // ❌ Wrong number/password
      if (err.response?.status === 401) {
        window.location.href = "/unauthorized";
        return;
      }

      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <div className="flex flex-col gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Contact Number"
            value={loginuser.phone}
            onChange={(e) => {
              setLoginuser({ ...loginuser, phone: e.target.value });
            }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginuser.password}
            onChange={(e) => {
              setLoginuser({ ...loginuser, password: e.target.value });
            }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            onClick={login}
            className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default Login;
