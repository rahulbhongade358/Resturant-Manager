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
  const [skeletonLoading, setSkeletonLoading] = useState({
    orders: false,
    tables: false,
    team: false,
    menu: false,
    summary: false,
  });

  const fetchTables = async () => {
    setSkeletonLoading((prev) => ({ ...prev, tables: true }));
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tables`);
      setTables(res.data.data);
      setSkeletonLoading((prev) => ({ ...prev, tables: false }));
    } catch (err) {
      console.error("Failed to fetch tables");
    }
  };
  const fetchOrders = async () => {
    setSkeletonLoading((prev) => ({ ...prev, orders: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allorders`
      );
      setOrders(response.data.data);
      setSkeletonLoading((prev) => ({ ...prev, orders: false }));
    } catch (e) {
      setErrors(e.response.data.message);
      setOrders([]);
    }
  };
  const fetchSummary = async () => {
    setSkeletonLoading((prev) => ({ ...prev, summary: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboardsummary`
      );
      setSummary(response.data);
      setSkeletonLoading((prev) => ({ ...prev, summary: false }));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTeam = async () => {
    setSkeletonLoading((prev) => ({ ...prev, team: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allusers`
      );
      setTeam(response.data.data);
      setSkeletonLoading((prev) => ({ ...prev, team: false }));
    } catch (e) {
      setErrors(e.response.data.message);
      setTeam([]);
    }
  };
  const fetchMenu = async () => {
    setSkeletonLoading((prev) => ({ ...prev, menu: true }));
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
      setMenu(response.data.data);
      setSkeletonLoading((prev) => ({ ...prev, menu: false }));
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
