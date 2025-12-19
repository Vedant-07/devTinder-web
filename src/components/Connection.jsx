import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Connections</h1>
      {users && users.length > 0 ? (
        <div className="flex flex-col items-center gap-4">
          {users.map((user) => (
            <UserCard key={user._id} user={user} showChatButton={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No Connections yet. Start swiping!
        </div>
      )}
    </div>
  );
};

export default Connection;
