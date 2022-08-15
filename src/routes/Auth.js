import EmailLoginFactory from "components/EmailLoginFactory";
import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import styles from "../style/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className={styles.authCon}>
      <Link to="/">
        <FontAwesomeIcon icon={faTwitter} className={styles.twitterLogo} />
      </Link>
      <EmailLoginFactory />
      <div className={styles.socialBox}>
        <button className={styles.google} name="google" onClick={onSocialClick}>
          Continue With Google{" "}
          <FontAwesomeIcon icon={faGoogle} className={styles.googleLogo} />
        </button>
        <button className={styles.github} name="github" onClick={onSocialClick}>
          Continue With Github{" "}
          <FontAwesomeIcon icon={faGithub} className={styles.githubLogo} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
