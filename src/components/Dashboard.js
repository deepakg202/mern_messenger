import React from "react";
import {useSelector} from "react-redux";

function Dashboard(props) {
  
  const {sessionInfo} = useSelector((state) => state.session)
  return (
    <div className="jumbotron h4 my-4">
        <center>Welcome {sessionInfo.username}</center>
    </div>
  );
}

export default Dashboard;
