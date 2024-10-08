import React from "react";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <span>{text}</span>
    </div>
  );
};

export default Message;
