import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import authService from "./fbase";
import styles from "style/Home.module.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <div className={styles.BOX}>
    <App />
  </div>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
