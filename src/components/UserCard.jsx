import React from "react";
import { Link } from "react-router";

const UserCard = ({ user, showChatButton = false }) => {
  const { _id, firstName, lastName, age, gender, bio, skills, profile_pic } = user;

  return (
    <div className="card bg-base-200 w-96 shadow-xl m-7 ">
      {profile_pic?.length > 0 && (
        <figure>
          <img src={profile_pic} alt="photoUrl" />
        </figure>
      )}
      <div className="card-body">
        {firstName && (
          <h2 className="card-title">{firstName + " " + lastName}</h2>
        )}
        <p>
          {age} , {gender}
        </p>
        <p>{bio}</p>
        <p>Skills : {skills}</p>
        
        {showChatButton && _id && (
          <div className="card-actions justify-end mt-2">
            <Link to={`/chat/${_id}`} className="btn btn-primary btn-sm">
              💬 Chat
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
