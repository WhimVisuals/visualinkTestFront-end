import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  signUpUser,
  getAllUsers,
  authenticateUser,
  loginUser,
  logOut,
  addNewCanvas,
  getMyCanvas,
} from "./apicalls";
import data from "./data.json";
import VerificationEmail from "./VerificationEmail";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [myCanvases, setMyCanvases] = useState(null);
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPass, setLoginPass] = useState(null);

  useEffect(() => {
    (async function () {
      const user = await authenticateUser();
      console.log(user);
      setUserInfo(user);
      const users = await getAllUsers();
      console.log(users);
    })();
  }, []);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await signUpUser(data);
    console.log(res);
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const data = {
      email: loginEmail,
      password: loginPass,
    };
    console.log(data);
    const res = await loginUser(data);
    console.log(res);
    setUserInfo(res);
  };

  const handleLogOut = async () => {
    const res = await logOut();
    if (!res.errors) {
      setUserInfo(null);
    }
  };

  const saveCanvas = async () => {
    const res = await addNewCanvas(data);
    console.log(res);
  };

  const showMyWork = async () => {
    const res = await getMyCanvas();
    console.log(res);
  };

  return (
    <Router>
      <div>
        <h1>hello {userInfo && userInfo.nickname} </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="username"
          name="username"
          ref={register}
        />
        <input
          type="password"
          placeholder="pass"
          name="password"
          ref={register}
        />
        <input
          type="text"
          placeholder="nickname"
          name="nickname"
          ref={register}
        />
        <input type="email" placeholder="email" name="email" ref={register} />

        <input type="submit" />
      </form>

      <form onSubmit={onLogin}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          onChange={(e) => setLoginPass(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>

      <button onClick={handleLogOut}>Log out</button>
      <button onClick={saveCanvas}>save my work</button>
      <button onClick={showMyWork}>get my work</button>
      <Switch>
        <Route exact path="/verify/:verifToken" component={VerificationEmail} />
      </Switch>
    </Router>
  );
}
