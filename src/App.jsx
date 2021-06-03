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
  getMyCanvases,
  updateCanvas,
  updateUser,
  whoAmI,
  getMyCanvas,
  deleteMyCanvas,
} from "./apicalls";
import data from "./data.json";
import data2 from "./data2.json";
import VerificationEmail from "./VerificationEmail";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [myCanvases, setMyCanvases] = useState(null);
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPass, setLoginPass] = useState(null);
  const [updateName, setUpdateName] = useState(null);
  const [updateEmail, setUpdateEmail] = useState(null);

  useEffect(() => {
    (async function () {
      const user = await authenticateUser();
      console.log(user);
      setUserInfo(user);
      const users = await getAllUsers();
      console.log(users);
    })();
  }, []);

  const { register, update, handleSubmit, errors } = useForm();

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

  const onUpdateUser = async () => {

    const data = {
      username: 'gemma',
    };
    console.log(data);
    const res = await updateUser(data);
    console.log(res);
  };

  const meUser = async () => {
    console.log("me");
    const res = await whoAmI();
    console.log(res);
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

  const modifyCanvas = async () => {
    const canvasID = "29";
    const data = {
      canvas_name : 'new name',
      canvas_json : data2,
    }
    const res = await updateCanvas(canvasID,data);
    console.log(res);
  }


  const showMyWork = async () => {
    const res = await getMyCanvases();
    console.log(res);
  };

  const getOneCanvas = async () => {
    const res = await getMyCanvas('28');
    console.log(res);
  }

  const deteleCanvas = async () => {
    const res = await deleteMyCanvas('29');
    console.log(res);
  }

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

      <form onSubmit={handleSubmit(onUpdateUser)}>
        <input
          type="text"
          placeholder="username"
          name="username"
          ref={update}
        />

        <input type="submit" />
      </form>
      <button onClick={meUser}>Me</button>
      <button onClick={handleLogOut}>Log out</button>
      <button onClick={saveCanvas}>save my work</button>
      <button onClick={showMyWork}>get my work</button>
      <button onClick={modifyCanvas}>update my work</button>
      <button onClick={getOneCanvas}>get one canvas </button>
      <button onClick={deteleCanvas}>delete one canvas</button>
      <Switch>
        <Route exact path="/verify/:verifToken" component={VerificationEmail} />
      </Switch>
    </Router>
  );
}
