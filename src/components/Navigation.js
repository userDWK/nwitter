import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stylesNweet from "../style/nwitter.module.css";
import { faUser } from "@fortawesome/free-regular-svg-icons";
const Navigation = ({ userObj }) => (
  <div className={stylesNweet.container}>
    <nav>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon
              icon={faTwitter}
              className={stylesNweet.twitterLogo}
            />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon
              icon={faUser}
              className={stylesNweet.profileLogo}
            />
            <p>{userObj.displayName}의 Profile</p>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Navigation;
