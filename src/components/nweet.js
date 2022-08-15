import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stylesNweet from "../style/nwitter.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import stylesedit from "../style/edit.module.css";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [nweetTextRef, setNweetTextRef] = useState(
    doc(dbService, "nweets", `${nweetObj.id}`)
  );
  const onDelClick = async (e) => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(nweetTextRef);
      if (nweetObj.attachmentUrl)
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    } else {
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(nweetTextRef, { text: newNweet });
    setEditing(false);
  };
  return (
    <div className={stylesNweet.nweetBox}>
      {editing ? (
        <div className={stylesedit.editBox}>
          <form onSubmit={onSubmit}>
            <input
              className={stylesedit.modifyNweet}
              onChange={onChange}
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              maxLength={120}
              required
            />
            <input
              type="submit"
              value="Modify"
              className={stylesedit.modifySub}
            />
          </form>
          <button onClick={toggleEditing} className={stylesedit.cancelBtn}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={stylesNweet.nweetText}>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div>
              <button onClick={onDelClick}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={stylesNweet.deleteLogo}
                />
              </button>
              <button onClick={toggleEditing}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={stylesNweet.editLogo}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Nweet;
