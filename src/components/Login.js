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
      error.username = "Username is required";
    }
    if (password.length < 6)
      error.password = "Password should be of min 6 characters.";

    setFormErrors(error);

    if (Object.keys(error).length === 0) {
      dispatch(createSession(username, password))
    }
  };

  return (
    <div className="container">
      <h1>
          <center>Welcome</center>
      </h1>
      <div>
      <form onSubmit={submitHandler}>
        <fieldset disabled={loading}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username"/>
          <div className="text-danger">{formErrors.username}</div>
       </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password"/>
          <div className="text-danger">{formErrors.password}</div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </fieldset>
      </form>
        <div className="mb-3">{error}</div>
      </div>
    </div>
  );
}

export default LoginPage;
