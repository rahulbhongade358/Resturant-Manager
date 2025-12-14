import React from "react";

const SummaryCard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Summary Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <div className="bg-white p-5 shadow rounded-lg">
          <h2 className="text-gray-600 font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-gray-800 mt-1">25</p>
        </div>

        <div className="bg-white p-5 shadow rounded-lg">
          <h2 className="text-gray-600 font-semibold">Total Customers</h2>
          <p className="text-3xl font-bold text-gray-800 mt-1">18</p>
        </div>

        <div className="bg-white p-5 shadow rounded-lg">
          <h2 className="text-gray-600 font-semibold">Total Profit</h2>
          <p className="text-3xl font-bold text-green-600 mt-1">₹ 12,500</p>
        </div>

        <div className="bg-white p-5 shadow rounded-lg">
          <h2 className="text-gray-600 font-semibold">Pending Orders</h2>
          <p className="text-3xl font-bold text-orange-600 mt-1">5</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
