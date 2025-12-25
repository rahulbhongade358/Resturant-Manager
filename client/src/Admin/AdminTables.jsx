import React, { memo, useMemo, useState } from "react";
import axios from "axios";
import { useApi } from "../Context/ApiContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AdminTables = () => {
  const { tables, fetchTables, skeletonLoading } = useApi();
  const [tableNumber, setTableNumber] = useState("");

  const toggleTableStatus = async (tableId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/tables/${tableId}/toggle`
      );
      fetchTables(); // refresh UI
    } catch (err) {
      alert("Unable to update table status");
    }
  };
  const addTable = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/addtable`, {
        tableNumber,
      });
      fetchTables(); // refresh UI
    } catch (err) {
      alert("Unable to add table");
    }
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Table Management</h1>
        <div className="mb-4">
          <form className="space-y-6">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                className="block py-3 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required
              />
              <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Add Table
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                addTable();
                setTableNumber("");
              }}
              className="w-full py-2 rounded bg-amber-600 text-white font-medium hover:bg-amber-700 transition"
            >
              Add Table
            </button>
          </form>
          <div />
          {skeletonLoading.tables ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tables.map((table) => (
                <div
                  key={table._id}
                  className={`p-4 rounded-lg shadow-md border
                ${
                  table.isActive
                    ? "bg-green-50 border-green-400"
                    : "bg-red-50 border-red-400"
                }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">
                      Table {table.tableNumber}
                    </h2>

                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold
                    ${
                      table.isActive
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                    >
                      {table.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleTableStatus(table._id)}
                    className={`w-full py-2 rounded text-white font-medium transition
                  ${
                    table.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  >
                    {table.isActive ? "Deactivate Table" : "Activate Table"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminTables);
