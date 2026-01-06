import React from "react";
import { useApi } from "../Context/ApiContext";
import { useEffect } from "react";
import { useParams } from "react-router";

const UserDetails = () => {
  const { team, errors, skeletonLoading, fetchTeamByID } = useApi();

  const { userid } = useParams();
  useEffect(() => {
    fetchTeamByID(userid);
  }, [team]);
  return (
    <div>
      <h1>{team._id}</h1>
      <h1>{team.name}</h1>
      <h1>{team.email}</h1>
      <h1>{team.phone}</h1>
      <h1>{team.password}</h1>
      <h1>{team.role}</h1>
    </div>
  );
};

export default UserDetails;
