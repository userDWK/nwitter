import React, { useEffect, useState, useRef } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setInit(true);
        // setUserObj(user);
        setUserObj({
          displayName: user.displayName.slice(0, 10),
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
        setInit(true);
      }
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj(Object.assign({}, user));
    setUserObj({
      displayName: user.displayName.slice(0, 10),
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      {/* <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={isLoggedIn}
        userObj={userObj}
      /> */}
    </>
  );
}

export default App;
