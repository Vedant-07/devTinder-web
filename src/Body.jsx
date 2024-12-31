import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./constants/urls";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.value);
  const fetchUser = async () => {
    if (user) return;
    try {
      axios
        .get(BASE_URL + "/profile/view", {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(addUser(res.data));
        })
        .catch((err) => {
          navigate("/login");
          console.log("error ==> the fetchUser " + err.message);
        });
    } catch (err) {
      console.log("error ==> the Body " + err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className=" flex flex-col h-screen ">
        <Navbar />
        <div className="flex justify-center h-full items-start mt-16 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Body;
