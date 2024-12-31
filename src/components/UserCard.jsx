import React from "react";

const UserCard = (user) => {
    const{ firstName,lastName,age,gender,bio,skills,profile_pic} = user.user
    

  return (
    <div className="card bg-base-200 w-96 shadow-xl m-7 " >
      {profile_pic?.length>0 &&
      <figure>
        <img
          src={profile_pic}
          alt="photoUrl"
        />
      </figure>
}
      <div className="card-body">
        { firstName  && (<h2 className="card-title">{firstName +" "+ lastName}</h2>)} 
        <p>{age} , {gender}</p>
        <p>{bio}</p>
        <p>Skills : {skills}</p>
        </div>
    </div>
  );
};

export default UserCard;
