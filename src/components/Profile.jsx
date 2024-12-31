import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(15);
  const [bio, setBio] = useState("Add your BIO");
  const [gender, setGender] = useState("male");
  const [profile_pic, setPhotoUrl] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
  );
  const [skills, setSkills] = useState("");
  const [checkStatus, setCheckStatus] = useState(false);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("Updating the store from Profile");
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
      console.log("Error ==> fetchUser: " + err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Synchronize form states with user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || 15);
      setBio(user.bio || "Add your BIO");
      setGender(user.gender || "male");
      setPhotoUrl(
        user.profile_pic ||
          "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
      );
      setSkills(user.skills || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, bio, gender, profile_pic, skills },
        {
          withCredentials: true,
        }
      );

      console.log("Updated data: ", res.data);
      dispatch(addUser(res.data));
      setCheckStatus(true);
      setTimeout(() => {
        setCheckStatus(false);
      }, 3000);
    } catch (err) {
      console.log("Error in handleUpdate ===> " + err.message);
    }
  };

  return (
    <>
      {checkStatus && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
      <div className="flex mx-auto justify-between items-center gap-7">
        <div className="card bg-base-300 w-96 shadow-xl mb-11">
          <div className="card-body">
            <h1 className="card-title mb-4">Profile Page</h1>
            <span className="label-text">First Name *</span>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </label>
            <span className="label-text">Last Name</span>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </label>
            <span className="label-text">Age</span>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </label>
            <span className="label-text">Select Gender</span>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                {gender}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li onClick={() => setGender("male")}>
                  <a>male</a>
                </li>
                <li onClick={() => setGender("female")}>
                  <a>female</a>
                </li>
                <li onClick={() => setGender("others")}>
                  <a>others</a>
                </li>
              </ul>
            </div>
            <span className="label-text">Photo Url</span>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                placeholder="Add Profile Picture"
                value={profile_pic}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <span className="label-text">Skills *</span>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                className="grow"
                onChange={(e) => setSkills(e.target.value)}
                value={skills}
              />
            </label>
            <span className="label-text">Bio</span>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <div className="justify-end mt-4 ml-auto">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, bio, skills, profile_pic }}
        />
      </div>
    </>
  );
};

export default Profile;
