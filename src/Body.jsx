import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import api from "./utils/api";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.value);

  const fetchUser = async () => {
    // Skip auth check if on login page
    if (location.pathname === "/login") return;
    
    // If user already exists in Redux, no need to fetch
    if (user) return;
    
    // Check if token exists
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.get("/profile/view");
      dispatch(addUser(res.data));
    } catch (err) {
      // Only redirect if it's an auth error
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname, user]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-center h-full items-start mt-16 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
