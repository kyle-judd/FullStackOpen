import React from "react";

const Notificaiton = ({ message }) => {
  const errorStyle = {
    width: 200,
    height: 50,
    backgroundColor: "red",
    color: "black",
    border: "1px solid black",
  };

  const successStyle = {
    width: 200,
    height: 50,
    backgroundColor: "green",
    color: "black",
    border: "1px solid black",
  };

  return message.type === null ? null : (
    <div style={message.type === "success" ? successStyle : errorStyle}>
      {message.content}
    </div>
  );
};

export default Notificaiton;
