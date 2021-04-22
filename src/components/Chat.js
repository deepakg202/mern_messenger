import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import socketIOClient from "socket.io-client";

function Chat() {
  
  const [messages, setMessages] = useState([]) 
  const {username} = useSelector((state) => state.session.sessionInfo)
  const socket = socketIOClient("/chat")

  useEffect(() => {
    socket.on("new-message", message => {
      setMessages((msgs) => [...msgs, message])
    });
    return () => socket.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatHandler = (e) => {
    e.preventDefault();
    const msg = e.target.elements["message"].value;
    if(msg)
      socket.emit("send-message", {msg: msg, author: username})
  }

  const Message = ({msg, author}) => {

    return <div className="text-start text-white bg-warning">{author}: {msg}</div>
  }


  return (
    <div className="container my-3">
      <div className="h2">Global Chat</div>
      <div id="chatSection">
        <div id="chat-window" className="overflow-y-auto bg-dark my-2">
          {
            messages.map((m,i) => <Message key={i} msg={m.msg} author={m.author}/>)
          }
        </div>
        <form className="chat-form" onSubmit={chatHandler}>
          <label className="form-label">
            Enter a message:
            <input type="text" name="message" className="form-control" />
          </label>
          <button type="submit" className="mx-2 btn btn-primary">Submit</button>
        </form>
      </div>
     </div>
  );
}

export default Chat