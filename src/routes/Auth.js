// import { authService } from "../fbase";
// import React, { useState } from "react";

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [newAccount, setNewAccount] = useState(true);
//   const onChange = (event) => {
//     const {
//       target: { name, value },
//     } = event;
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     }
//   };
//   const onSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       let data;
//       if (newAccount) {
//         data = await authService.createUserWithEmailAndPassword(
//           email,
//           password
//         );
//       } else {
//         data = await authService.signInWithEmailAndPassword(email, password);
//       }
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           name="email"
//           type="text"
//           placeholder="Email"
//           required="required"
//           value={email}
//         />
//         <input
//           onChange={onChange}
//           name="password"
//           type="password"
//           placeholder="password"
//           required="required"
//           value={password}
//         />
//         <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
//       </form>
//       <div>
//         <button>Continue With Google</button>
//         <button>Continue With Github</button>
//       </div>
//     </div>
//   );
// };
// export default Auth;

import EmailLoginFactory from "components/EmailLoginFactory";
import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

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
    <div>
      <EmailLoginFactory />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue With Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue With Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
