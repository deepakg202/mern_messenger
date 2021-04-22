import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import socketIOClient from "socket.io-client";

function Chat() {
  const {sessionInfo} = useSelector(state => state.session)
  const [response, setResponse] = useState(sessionInfo.username);

  useEffect(() => {
    const socket = socketIOClient("/ws/chat");
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="container my-3">
      It's <div>{response}</div>
    </div>
  );
}

export default Chat