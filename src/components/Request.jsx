import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import UserCard from "./UserCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState(false);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("problem in request " + err.message);
    }
  };

  const handleReview = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      setRequestStatus(true);
      setTimeout(() => {
        setRequestStatus(false);
      }, 1000);

      const updatedRequests = requests.filter(
        (req) => !(req.requestId === requestId)
      );
      dispatch(addRequests(updatedRequests));
    } catch (err) {
      console.log("error in sending review req " + error.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="">
      {requestStatus && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Request sent </span>
          </div>
        </div>
      )}
      {requests &&
        requests.length > 0 &&
        requests.map((user, index) => {
          index = user._id;
          return (
            <div className="mb-20 shadow-2xl transform transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-md">
              <UserCard user={user} />

              <div className=" flex justify-around gap-7 pb-4 cursor-pointer">
                <button
                  className="btn btn-primary  "
                  onClick={() => handleReview("rejected", user.requestId)}
                >
                  Reject
                </button>

                <button
                  className="btn btn-secondary  "
                  onClick={() => handleReview("accepted", user.requestId)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      {(!requests || requests.length == 0) && <p>No new Requests found !!!</p>}
    </div>
  );
};

export default Request;
