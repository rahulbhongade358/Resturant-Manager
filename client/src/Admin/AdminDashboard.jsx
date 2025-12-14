import React from "react";
import Navbar from "../Component/Navbar.jsx";
import { LayoutDashboard, UserCircle } from "lucide-react";
import SummaryCard from "./SummaryCard.jsx";
import OrdersTable from "./OrdersTable.jsx";
import TeamMembers from "./TeamMembers.jsx";
import QuickLinks from "./QuickLinks.jsx";
const AdminDashboard = () => {
  const adminData = JSON.parse(localStorage.getItem("userlogin"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={28} className="text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <UserCircle size={22} className="text-gray-500" />
            <span className="font-medium">
              Welcome, {adminData?.name || "Admin"}
            </span>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl shadow p-6">
          <SummaryCard />
          <div className="mt-4 bg-white rounded-xl shadow p-6">
            <QuickLinks />
          </div>
          <div className="mt-4 bg-white rounded-xl shadow p-6">
            <TeamMembers />
          </div>
          <div className="mt-4 bg-white rounded-xl shadow p-6">
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
