import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../constants/urls";
import { removeUser } from "../utils/userSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.value);
  const handleLogout = async () => {
    try {
      //delete the cookie && remove the user from the redux-store
      await axios.post(
        BASE_URL + "/signout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("problem in logout " + err);
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {user ? (
          <Link to="/" className="btn btn-ghost text-xl">
            DevTinder
          </Link>
        ) : (
          <Link to="/login" className="btn btn-ghost text-xl">
            DevTinder
          </Link>
        )}
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div className="flex items-center">
            <p>Welcome {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-7"
              >
                <div className="w-10 rounded-full">
                  <img alt="user profile pic" src={user.profile_pic} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/request">Requests</Link>
                </li>
                <li>
                  <Link to="/connection">Connections</Link>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
