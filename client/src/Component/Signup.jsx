import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const signin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        userData
      );
      console.log(response);
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder=" Name"
            value={userData.name}
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="tel"
            name="Phone"
            placeholder="Contact Number"
            value={userData.phone}
            onChange={(e) => {
              setUserData({ ...userData, phone: e.target.value });
            }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <select
            name="role"
            value={userData.role}
            onChange={(e) => {
              setUserData({ ...userData, role: e.target.value });
            }}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Chef">Chef</option>
            <option value="Waiter">Waiter</option>
          </select>
          <button
            onClick={signin}
            className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
