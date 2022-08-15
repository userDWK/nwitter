import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stylesNweet from "../style/nwitter.module.css";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const nweetText = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  const paintingNweet = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetData = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetData);
    setNweet("");
    setAttachment("");
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
  };
  return (
    <div className={stylesNweet.nweetForm}>
      <form onSubmit={paintingNweet}>
        <div className={stylesNweet.conSub}>
          <input
            value={nweet}
            type="text"
            onChange={nweetText}
            placeholder="what's on your mind?"
            maxLength={120}
            className={stylesNweet.nweet}
          />
          <input type="submit" value="→" className={stylesNweet.nweetSub} />
        </div>
        <div className={stylesNweet.nweetSubBox2}>
          <label htmlFor="inputFile">
            Add Photos <span> +</span>
          </label>
          <input
            id="inputFile"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className={stylesNweet.file}
          />
        </div>

        {attachment && (
          <div className={stylesNweet.photoBox}>
            <img src={attachment} />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
    </div>
  );
};
export default NweetFactory;
