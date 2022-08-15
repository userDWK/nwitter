import { authService, dbService } from "../fbase";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import stylesedit from "../style/edit.module.css";
const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <div className={stylesedit.profileBox}>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          className={stylesedit.modifyNweet}
        />
        <Link to="/">
          <input
            type="submit"
            value="Update Profile"
            className={stylesedit.modifySub}
          />
        </Link>
      </form>
      <button onClick={onLogOutClick} className={stylesedit.cancelBtn}>
        Log Out
      </button>
    </div>
  );
};
export default Profile;
