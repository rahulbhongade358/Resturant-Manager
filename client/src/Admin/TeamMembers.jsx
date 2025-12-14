import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TeamMembers = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [errors, setErrors] = useState("");
  const fetchAllMembers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allusers`
      );
      setAllMembers(response.data.data);
    } catch (e) {
      setErrors(e.response.data.message);
      setAllMembers([]);
    }
  };
  useEffect(() => {
    fetchAllMembers();
  }, []);
  return (
    <div className="p-4">
      <div>{errors}</div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="font-bold text-xl">Team Members</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          <Link to="/signup">Add Member</Link>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allMembers.map((member) => (
              <tr key={member._id} className="border-b">
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.role}</td>
                <td className="px-4 py-3">{member.phone}</td>
                <td className="px-4 py-3 space-x-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {allMembers.map((member) => (
          <div
            key={member._id}
            className="bg-white shadow rounded p-4 space-y-2"
          >
            <p>
              <span className="font-semibold">Name:</span> {member.name}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {member.role}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {member.phone}
            </p>

            <div className="flex gap-3 pt-2">
              <button className="bg-yellow-500 text-white px-4 py-1 rounded w-full">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded w-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
