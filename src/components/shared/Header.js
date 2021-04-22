import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"

import {removeSession} from "../../actions/sessionActions"

const NoSessionLinks = (props) => {
  return (<React.Fragment>
    <Link className="nav-link" to="/login">Login</Link>
  </React.Fragment>)
}

const SessionLinks = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(removeSession())
  }
  return (<React.Fragment>  
    <Link className="nav-link" to="/chat">Chat</Link>
    <Link className="nav-link" to="/settings">Settings</Link>
    
    <button onClick={logoutHandler} className="btn btn-danger">Logout</button>
  </React.Fragment>)
}


const Header = (props) => {

  const {sessionInfo, checked} = useSelector((state) => state.session)
  
  return (<div id="header">
    <nav className="navbar navbar-expand navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/">MERN Messenger</Link>
     <div className="collapse navbar-collapse">
     <div className="navbar-nav ms-auto">
        {!checked?<div/>:(!!sessionInfo?<SessionLinks/>:<NoSessionLinks/>)}
      </div></div>
   </div>
</nav>
  </div>)
}

export default Header;