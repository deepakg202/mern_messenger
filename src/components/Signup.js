import React, { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
function LoginPage(props) {
  const history = useHistory()
  const [formErrors, setFormErrors] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const submitHandler = (e) => {
    e.preventDefault();
    const name = e.target["name"].value;
    const username = e.target["username"].value;
    const password = e.target["password"].value;
    const userType = e.target["userType"].value;

    let error = {};
    // Validate the values related to the login form here
    if (!username) {
      error.username = "Username is required";
    }
    if (!name) {
      error.name = "Name is required";
    }
    if (!userType) {
      error.userType = "User Type is required";
    }
    if (password.length < 6)
      error.password = "Password should be of min 6 characters.";

    setFormErrors(error);

    if (Object.keys(error).length === 0) {
      setLoading(true)
      axios.post("/api/signup", {name, username, password, userType}).then(({data}) => {          
        e.target.reset()
        setMessage(data.message + ". Go to login Page")
        history.push("/login")
      }).catch((er) => {
        setMessage(er.response.data.message)
      }).finally(() => {
        setLoading(false);
      })
    }
  };

  return (
    <div className="container">
      <h1>
          <center>Create An Account</center>
      </h1>
      <div>
      <form onSubmit={submitHandler}>
        <fieldset disabled={loading}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name"/>
          <div className="text-danger">{formErrors.name}</div>
       </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username"/>
          <div className="text-danger">{formErrors.username}</div>
       </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password"/>
          <div className="text-danger">{formErrors.password}</div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="userType" className="form-label">User Type</label>
          <select className="form-select" name="userType" id="userType" defaultValue="">
            <option value="">Select User type</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="NORMAL">Normal</option>
          </select>
          <div className="text-danger">{formErrors.userType}</div>
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
        </fieldset>
      </form>
        <div className="my-3">{message}</div>
      </div>
    </div>
  );
}

export default LoginPage;
