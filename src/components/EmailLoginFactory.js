import { authService } from "fbase";
import React, { useState } from "react";

const EmailLoginFactory = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccout] = useState(true);
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (e.target.name === "email") {
      setEmail(value);
    } else if (e.target.name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccout((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={onChange}
        ></input>
        <input
          type="text"
          placeholder="password"
          name="password"
          onChange={onChange}
        ></input>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        ></input>
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </button>
    </>
  );
};

export default EmailLoginFactory;
