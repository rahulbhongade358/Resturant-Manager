import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Phone, Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { initSound } from "../utils/orderSound";
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

      if (response?.data?.success) {
        await initSound();
        toast.success("Login Successful", { icon: "✅", duration: 2000 });
        localStorage.setItem("userlogin", JSON.stringify(response.data.user));
        localStorage.setItem("justLoggedIn", "true");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        return;
      }
    } catch (err) {
      if (err.response?.status === 403) {
        window.location.href = "/unauthorized";
        return;
      }

      if (err.response?.status === 401) {
        window.location.href = "/unauthorized";
        return;
      }

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 relative">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-amber-700 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to manage orders & kitchen flow
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center border rounded-lg px-3">
            <Phone size={18} className="text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={loginuser.phone}
              onChange={(e) =>
                setLoginuser({ ...loginuser, phone: e.target.value })
              }
              className="w-full px-3 py-2 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginuser.password}
              onChange={(e) =>
                setLoginuser({ ...loginuser, password: e.target.value })
              }
              className="w-full px-3 py-2 focus:outline-none"
              required
            />
          </div>

          <button
            onClick={login}
            className="bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            Login
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Staff & Admin access only
        </p>
      </div>
      <Link
        to="/"
        className="absolute bottom-20  text-amber-600 underline hover:text-amber-800"
      >
        ← Back to Home
      </Link>
      <Toaster position="top-center" />
    </div>
  );
}

export default Login;
