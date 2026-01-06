import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [menu, setMenu] = useState([]);
  const [summary, setSummary] = useState([]);
  const [errors, setErrors] = useState("");
  const [skeletonLoading, setSkeletonLoading] = useState({
    orders: false,
    tables: false,
    teams: false,
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
  const fetchTeams = async () => {
    setSkeletonLoading((prev) => ({ ...prev, teams: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/allusers`
      );
      setTeams(response.data.data);
      setSkeletonLoading((prev) => ({ ...prev, teams: false }));
    } catch (e) {
      setErrors(e.response.data.message);
      setTeams([]);
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
  const fetchTeamByID = async (userid) => {
    setSkeletonLoading((prev) => ({ ...prev, team: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/getUserbyID/${userid}`
      );
      setTeam(response.data.data);
      setSkeletonLoading((prev) => ({ ...prev, team: false }));
    } catch (e) {
      setErrors(e.response.data.message);
      setTeam(null);
    }
  };
  const removeTeamLocal = (userid) => {
    setTeams((prev) => prev.filter((user) => user._id !== userid));
  };

  useEffect(() => {
    fetchOrders();
    fetchTables();
    fetchTeams();
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
        teams,
        menu,
        summary,
        skeletonLoading,
        fetchTeams,
        fetchTeamByID,
        fetchMenu,
        fetchOrders,
        fetchSummary,
        fetchTables,
        removeTeamLocal,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
