import { dbService, storageService } from "../fbase";
import React, { useEffect, useState } from "react";
import Nweet from "../components/nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
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
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {paintNweet.map((el, i) => {
          return (
            <Nweet
              key={el.id}
              nweetObj={el}
              isOwner={el.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
