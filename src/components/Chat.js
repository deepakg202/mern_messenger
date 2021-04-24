import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import socket from "../utils/socket";

function Chat() {
  
  const [messages, setMessages] = useState([]) 
  const {username} = useSelector((state) => state.session.sessionInfo)
  const [online, setOnline] = useState(0)

  useEffect(() => {
    socket.on('new-connection', (n) => {
      setOnline(n)
    })
    socket.on("new-message", message => {
      setMessages((msgs) => [...msgs, message])
    });
    return () => {
      socket.disconnect();
    }
  }, []);

  const chatHandler = (e) => {
    e.preventDefault();
    const msg = e.target["message"].value;
    if(msg)
      socket.emit("send-message", {msg: msg, author: username || "Anonymous"})
    e.target.reset()
  }

  const Message = ({msg, author}) => {
    if(author === username)
    {
      return <div className="text-end text-white bg-primary p-2 m-1">{msg}</div>
    }else{
      return <div className="text-start text-white bg-warning p-2 m-1">{author}: {msg}</div>
    }
  }


  return (
    <div className="container my-3">
      <div className="h2">Global Chat <span className="text-success h6">Online: {online}</span></div>
      <div className="p-2 border rounded">
        <div id="chat-window" className="bg-dark my-2">
          {
            messages.map((m,i) => <Message key={i} msg={m.msg} author={m.author}/>)
          }
        </div>
        <form onSubmit={chatHandler}>
          <label htmlFor="message" className="form-label">
            Enter A Message:
          </label>
          <input type="text" name="message" id="message" className="form-control" autocomplete="off"/>
          <button type="submit" className="mx-2 btn btn-primary">Send</button>
        </form>
      </div>
     </div>
  );
}

export default Chat