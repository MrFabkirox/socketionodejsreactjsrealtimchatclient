import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (

  <form className="form">

  <h3>input</h3>

  <input
    className="input"
    type="text"
    placeholder="Enter message"
    value={message}
    onchange={(event) => setMessage(event.target.value)} 
    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
  />

  <button
    className="sendButton"
    onClick={(event) => sendMessage(event)}>Send</button>

  </form >
)

export default Input;

