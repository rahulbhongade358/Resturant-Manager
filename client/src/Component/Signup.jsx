import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { User, Mail, Phone, Lock, UserCog } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-amber-700 mb-2">
          Add Team Member
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create staff accounts for smooth order handling
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center border rounded-lg px-3">
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="w-full px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="name@restaurant.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3">
            <Phone size={18} className="text-gray-400" />
            <input
              type="tel"
              placeholder="Contact Number"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              className="w-full px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="w-full px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded-lg px-3">
            <UserCog size={18} className="text-gray-400" />
            <select
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              className="w-full px-3 py-2 bg-transparent focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Chef">Chef</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>

          <button
            onClick={signin}
            className="bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            Add Member
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Back to{" "}
          <Link
            to="/admindashboard"
            className="text-amber-600 font-medium hover:underline"
          >
            Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
