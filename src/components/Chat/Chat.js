import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    // const data = queryString.parse(location.search);
    const { name, room } = queryString.parse(location.search);

    console.log('________location.search [%o]',location.search);
    // console.log('________data [%o]',data);

    socket = io(ENDPOINT );

    setName(name);
    setName(room);

    // 1
    // socket.emit('join', { name, room }, ({ error }) => {
    //   console.log('________socket [%o]', socket);
    //   alert(error);
    // });
    socket.emit('join', { name, room }, () => {
      console.log('________socket [%o]', socket);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  
  const sendMessage = (event) => {
    event.preventDefault();
  
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <h3>Chat</h3>
      <div className="container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
      </div>
    </div>
  )
}

export default Chat;
