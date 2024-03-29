import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import {Link} from "react-router-dom";

interface Message {
    username: string;
    message: string;
}

const Chat: React.FC = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [isJoined, setIsJoined] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (isJoined && socket) {
            const handleReceiveMessage = (data: Message) => {
                setMessageList((prevMessages) => [...prevMessages, data]);
            };

            const handleDisconnect = () => {
                console.log('Disconnected from server');
            };
            socket.on('receiveMessage', handleReceiveMessage);
            socket.on('disconnect', handleDisconnect);

            return () => {
                console.log('useEffect Cleanup - Component Will Unmount');

                socket.off('receiveMessage', handleReceiveMessage);
                socket.off('disconnect', handleDisconnect);
            };
        }
    }, [isJoined, socket]);

    const joinRoom = (event: React.FormEvent) => {
        event.preventDefault();
        const newSocket = io('http://localhost:3100');
        newSocket.emit('joinRoom', { username, room });
        setSocket(newSocket);
        setIsJoined(true);
    };
    const leaveRoom = (event: React.FormEvent) => {

        event.preventDefault();
        const newSocket = io('http://localhost:3100');
        newSocket.emit('disconnect' );
        setSocket(newSocket);
        setIsJoined(false);
    };

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (socket) {
            await socket.emit('sendMessage', { username, room, message });
            setMessage('');
        }
    };

    const renderMessage = (msg: Message, index: number) => {
        const isMyMessage = msg.username === username;
        const messageStyle = {
            textAlign: isMyMessage ? 'right' : 'left',
            color: isMyMessage ? 'blue' : 'green',
        };
        const hour = new Date().getHours()
        const min = new Date().getMinutes()


        return (
            <li key={index} style={messageStyle}>
                {`${hour}:${min} ${msg.username}: ${msg.message}`}
            </li>
        );
    };

    return (
        <div className="chat-container">

            {isJoined ? (
                <div>
                    <h1>Chat  {room}</h1>
                    <div>
                        <label htmlFor="messageInput">Message:</label>
                        <textarea
                            id="messageInput"
                            placeholder="Type your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send Message</button>
                        <Link to='\'>
                            <button onClick={leaveRoom}>Leave room</button>
                        </Link>

                    </div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {messageList.map((msg, index) => renderMessage(msg, index))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h1>Chat</h1>
                    <label htmlFor="usernameInput">Your Name:</label>
                    <input
                        type="text"
                        id="usernameInput"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="roomInput">Room:</label>
                    <input
                        type="text"
                        id="roomInput"
                        placeholder="Enter room name"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />

                    <button onClick={joinRoom}>Join Room</button>

                </div>
            )}
        </div>
    );
};

export default Chat;

