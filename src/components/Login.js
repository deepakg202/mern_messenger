import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { createSession } from "../actions/sessionActions.js";

function LoginPage(props) {
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.session)
  const submitHandler = (e) => {
    e.preventDefault();
    const username = e.target.elements["username"].value;
    const password = e.target.elements["password"].value;

    let error = {};
    // Validate the values related to the login form here
    if (!username) {
      error.username = "username is required";
    }
    if (password.length < 6)
      error.password = "Password should be of min 6 characters.";

    setFormErrors(error);

    if (Object.keys(error).length === 0) {
      dispatch(createSession(username, password))
    }
  };

  return (
    <div>
      <h1>
          <center>Welcome</center>
      </h1>
      <div>
        <form onSubmit={submitHandler}>
          <fieldset disabled={loading}>
            <div>
              <input type="text" name="username" placeholder="Enter Username"/>
            </div>
            <small>{formErrors.username}</small>
            <div>
              <input type="password" name="password" placeholder="Enter Password"/>
            </div>
            <small>{formErrors.password}</small>
            
            <div><button type="submit">Login</button></div>
          </fieldset>
        </form>
        <div>{error}</div>
      </div>
    </div>
  );
}

export default LoginPage;
