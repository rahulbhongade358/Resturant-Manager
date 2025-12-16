import React from "react";
import Navbar from "../Component/Navbar";
import { LayoutDashboard, UserCircle } from "lucide-react";
import SummaryCard from "../Admin/SummaryCard";
import OrdersTable from "../Admin/OrdersTable";
import QuickLinks from "../Admin/QuickLinks";
import TeamMembers from "../Admin/TeamMembers";
import Menu from "../Menu/menu";
import AdminTables from "../Admin/AdminTables";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("userlogin"));
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={28} className="text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.role === "Admin"
                ? "Admin"
                : user?.role === "Chef"
                ? "Chef"
                : "Waiter"}{" "}
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <UserCircle size={22} className="text-gray-500" />
            <span className="font-medium">
              Welcome,{" "}
              {user?.role === "Admin"
                ? "Sir"
                : user?.role === "Chef"
                ? "Chef"
                : "Waiter"}{" "}
              {user?.name || "User"}
            </span>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl shadow p-6">
          {user?.role === "Admin" && (
            <>
              <div>
                <SummaryCard />
              </div>
              <div className="mt-4 bg-white rounded-xl shadow p-6">
                <AdminTables />
              </div>
              <div className="mt-4 bg-white rounded-xl shadow p-6">
                <QuickLinks />
              </div>
              <div className="mt-4 bg-white rounded-xl shadow p-6">
                <TeamMembers />
              </div>
              <div className="mt-4 bg-white rounded-xl shadow p-6">
                <OrdersTable />
              </div>
            </>
          )}
          {user?.role === "Chef" && (
            <>
              <div>
                <SummaryCard />
              </div>
              <div className="mt-4 bg-white rounded-xl shadow p-6">
                <OrdersTable />
              </div>
              <div className="mt-4 bg-white rounded-xl shadow p-6">
                <QuickLinks />
              </div>
              <div className="mt-4 bg-white rounded-xl shadow p-6">
                <TeamMembers />
              </div>
            </>
          )}
          {user?.role === "Waiter" && (
            <>
              <div>
                <Menu />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
