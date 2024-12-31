import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/urls";
import UserCard from "./UserCard";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const users = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    console.log(res.data.data);
    dispatch(addConnections(res.data.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      {users && users.length > 0 ? (
        users.map((user) => {
          return <UserCard user={user} />;
        })
      ) : (
        <> No Connections present .....</>
      )}
    </div>
  );
};

export default Connection;
