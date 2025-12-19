import React from "react";
import { memo } from "react";
import { useApi } from "../Context/ApiContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SummaryCard = () => {
  const { summary, errors, skeletonLoading } = useApi();
  return (
    <div>
      {errors && <p className="text-red-500">{errors}</p>}
      <h1 className="text-2xl font-bold mb-4">Summary Cards</h1>
      {skeletonLoading?( <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                width={285}
                height={100}
                baseColor="#d1d5db"
                highlightColor="#f3f4f6"
                borderRadius={8}
              />
            ))}
        </div>):(

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <div className="bg-white p-5 shadow rounded-lg">
            <h2 className="text-gray-600 font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {summary.totalOrders}
            </p>
          </div>
  
          <div className="bg-white p-5 shadow rounded-lg">
            <h2 className="text-gray-600 font-semibold">Total Customers</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {summary.totalCustomers}
            </p>
          </div>
  
          <div className="bg-white p-5 shadow rounded-lg">
            <h2 className="text-gray-600 font-semibold">Total Profit</h2>
            <p className="text-3xl font-bold text-green-600 mt-1">
              ₹ {summary.totalProfit}
            </p>
          </div>
  
          <div className="bg-white p-5 shadow rounded-lg">
            <h2 className="text-gray-600 font-semibold">Pending Orders</h2>
            <p className="text-3xl font-bold text-orange-600 mt-1">
              {summary.pendingOrders}
            </p>
          </div>
          <div className="bg-white p-5 shadow rounded-lg">
            <h2 className="text-gray-600 font-semibold">Preparing Orders</h2>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {summary.preparingOrders}
            </p>
          </div>
          <div className="bg-white p-5 shadow rounded-lg">
            <h2 className="text-gray-600 font-semibold">Delivered Orders</h2>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {summary.deliveredOrders}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default React.memo(SummaryCard);
