import React from "react";

const UserCard = (user) => {
    
    console.log("from Usercard "+user.user)
    const{ firstName,lastName,age,gender,bio,skills,photoUrl} = user.user

  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      {photoUrl?.length>0 &&
      <figure>
        <img
          src={photoUrl}
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
