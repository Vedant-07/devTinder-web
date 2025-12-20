import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");

  const handleLoginANDSignUp = async () => {
    if (isLoginPage) {
      try {
        const val = await axios.post(
          BASE_URL + "/auth/signin",
          {
            emailID: emailID,
            password: password,
          }
        );

        // Save token to localStorage
        localStorage.setItem("token", val.data.token);
        dispatch(addUser(val.data.user));
        navigate("/");
      } catch (err) {
        // Handle error - could show toast here
      }
    } else {
      try {
        const res = await axios.post(
          BASE_URL + "/auth/signup",
          {
            firstName,
            lastName,
            emailID,
            password,
            skills,
          }
        );

        // Save token to localStorage
        localStorage.setItem("token", res.data.token);
        dispatch(addUser(res.data.user));
        navigate("/profile");
      } catch (err) {
        // Handle error - could show toast here
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card bg-base-100 w-[28rem] shadow-xl">
      <div className="card-body ">
        <h1 className="card-title mb-4">
          {isLoginPage ? "Login Page" : "Sign up Page"}
        </h1>

        {!isLoginPage && (
          <>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="FirstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>

              <input
                type="text"
                className="grow"
                placeholder="LastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <span className="badge badge-info">Optional</span>
            </label>
          </>
        )}

        <div className="card-actions flex flex-col grow  ">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={isLoginPage ? "password" : "text"}
              className="grow"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {!isLoginPage && (
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="SKILLS"
                onChange={(e) => setSkills(e.target.value)}
                value={skills}
              />
              <span className="badge badge-accent">Atleast one</span>
            </label>
          )}

          <div className=" justify-end  mt-4 ml-auto">
            <button
              className="underline cursor-pointer mx-2"
              onClick={() => setIsLoginPage((val) => !val)}
            >
              {isLoginPage ? "New User ? SignUp" : "existing user, Login"}
            </button>
            <button
              className="btn btn-primary  "
              onClick={handleLoginANDSignUp}
            >
              {isLoginPage ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
