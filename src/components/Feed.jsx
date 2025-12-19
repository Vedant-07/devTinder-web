import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/api";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState(false);
  
  const fetchFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await api.get("/user/feed?limit=20");
      dispatch(addFeed(res.data.data));
    } catch (err) {
      // Handle error silently
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleRequest = async (status) => {
    try {
      await api.post("/request/send/" + status + "/" + feed[0]._id, {});
      setRequestStatus(true);
      setTimeout(() => {
        setRequestStatus(false);
      }, 1000);

      const UpdatedFeed = feed.filter((fd) => fd._id !== feed[0]._id);
      dispatch(addFeed(UpdatedFeed));
    } catch (err) {
      // Handle error silently
    }
  };

  return (
    <>
      {requestStatus && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Request sent</span>
          </div>
        </div>
      )}
      {feed && feed.length > 0 ? (
        <div className="flex flex-col">
          <UserCard user={feed[0]} />
          <div className="flex justify-around mt-4 gap-7">
            <button
              className="btn btn-primary"
              onClick={() => handleRequest("ignore")}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleRequest("interested")}
            >
              Interested
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No new users found!
        </div>
      )}
    </>
  );
};

export default Feed;
