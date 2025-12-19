import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [team, setTeam] = useState([]);
  const [menu, setMenu] = useState([]);
  const [summary, setSummary] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const fetchTables = async () => {
    setSkeletonLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tables`);
      setTables(res.data.data);
      setSkeletonLoading(false);
    } catch (err) {
      console.error("Failed to fetch tables");
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    setSkeletonLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allorders`
      );
      setOrders(response.data.data);
      setSkeletonLoading(false);
    } catch (e) {
      setErrors(e.response.data.message);
      setOrders([]);
    }
  };
  const fetchSummary = async () => {
    setSkeletonLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboardsummary`
      );
      setSummary(response.data);
      setSkeletonLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTeam = async () => {
    setSkeletonLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allusers`
      );
      setTeam(response.data.data);
      setSkeletonLoading(false);
    } catch (e) {
      setErrors(e.response.data.message);
      setTeam([]);
    }
  };
  const fetchMenu = async () => {
    try {
      setSkeletonLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
      setMenu(response.data.data);
      setSkeletonLoading(false);
    } catch (e) {
      setErrors(e.response.data.message);
      setMenu([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTables();
    fetchTeam();
    fetchMenu();
    fetchSummary();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        errors,
        orders,
        tables,
        team,
        menu,
        summary,
        loading,
        skeletonLoading,
        fetchTeam,
        fetchMenu,
        fetchOrders,
        fetchSummary,
        fetchTables,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
