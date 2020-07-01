import React from 'react';

import ReactEmoji from 'react-emoji';

import './Message.css';
// // 2
// const Message = ({ message, name }) => (
const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText">{trimmedName}</p>
          <div className="messageBox">
            <p className="messageText">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{text}</p>
          </div>
          <p className="sentText pl-10">{user}</p>
        </div>
      )
  )
}

export default Message;
