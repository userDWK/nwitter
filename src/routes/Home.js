import { dbService, storageService } from "../fbase";
import React, { useEffect, useState } from "react";
import Nweet from "../components/nweet";
import NweetFactory from "components/NweetFactory";
import stylesNweet from "../style/nwitter.module.css";

const Home = ({ userObj, nweetDis }) => {
  const [paintNweet, setPaintNweet] = useState([]);
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPaintNweet(nweetArray);
    });
  }, []);
  return (
    <div className={stylesNweet.nweetContainer}>
      <NweetFactory userObj={userObj} nweetDis={nweetDis} />
      <div className={stylesNweet.nweetTextBox}>
        {paintNweet.map((el, i) => {
          return (
            <Nweet
              key={el.id}
              nweetObj={el}
              isOwner={el.creatorId === userObj.uid}
              nweetDis={nweetDis}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
