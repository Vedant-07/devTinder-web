import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { addRequests } from "../utils/requestSlice";
import UserCard from "./UserCard";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState(false);

  const fetchRequest = async () => {
    try {
      const res = await api.get("/user/requests/received");
      dispatch(addRequests(res.data.data));
    } catch (err) {
      // Handle error silently
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleReview = async (status, requestId) => {
    try {
      await api.post("/request/review/" + status + "/" + requestId, {});
      setRequestStatus(true);
      setTimeout(() => {
        setRequestStatus(false);
      }, 1000);
      const updatedRequests = requests.filter((r) => r.requestId !== requestId);
      dispatch(addRequests(updatedRequests));
    } catch (err) {
      // Handle error silently
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>
      {requestStatus && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Request updated</span>
          </div>
        </div>
      )}
      {requests && requests.length > 0 ? (
        <div className="flex flex-col items-center gap-4">
          {requests.map((request) => (
            <div key={request._id} className="flex flex-col">
              <UserCard user={request} />
              <div className="flex justify-around mt-2 gap-4">
                <button
                  className="btn btn-error"
                  onClick={() => handleReview("rejected", request.requestId)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleReview("accepted", request.requestId)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No pending requests
        </div>
      )}
    </div>
  );
};

export default Request;
