import React, { useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatService from "../service/ChatService";
import {BACKEND_URL} from "../service/Config";

var stompClient = null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    const connect = () => {
        let socket = new SockJS(BACKEND_URL + "chat-app");
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);

        let chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (payloadData.status === "JOIN") {
            if (!privateChats.get(payloadData.senderName)) {
                privateChats.set(payloadData.senderName, []);
                setPrivateChats(new Map(privateChats));
            }
        } else if (payloadData.status === "MESSAGE") {
            publicChats.push(payloadData);
            setPublicChats([...publicChats]);
        }
    }

    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            ChatService.sendPrivateMessage(chatMessage)
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    return (
        <div className="container">
            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={() => { setTab("CHATROOM") }} className={`member mb-3 rounded ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateChats.keys()].map((name, index) => (
                                <>
                                    {userData.username !== name && (
                                        <li onClick={() => { setTab(name) }} className={`member mb-3 rounded ${tab === name && "active"}`} key={index}>{name}</li>
                                    )}
                                </>
                            ))}
                        </ul>
                    </div>
                    {tab === "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {/*<div className="box3-right sb13">I'm speech bubbleI'm speech bubbleI'm speech bubbleI'm speech bubble</div>*/}
                            {/*<div className="box3-left sb14">I'm spee ch bubble</div>*/}
                            {publicChats.map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">
                                        <h3 className='text-center py-auto my-auto'>{chat.senderName.substring(0,1)}</h3>
                                    </div>}
                                    {chat.senderName !== userData.username && (
                                        <div>
                                            <p className='name-sender my-0'>{chat.senderName}</p>
                                            <div className="box3-left sb14">{chat.message}</div>
                                        </div>
                                    )}
                                    {/*<div className="message-data">{chat.message}</div>*/}
                                    {chat.senderName === userData.username && (
                                        <div>
                                            <p className='self-sender my-0'>{chat.senderName}</p>
                                            <div className="box3-right sb13">{chat.message}</div>
                                        </div>
                                    )}
                                    {chat.senderName === userData.username && <div className="avatar self">
                                        <h3 className='text-center py-auto my-auto'>{chat.senderName.substring(0,1)}</h3>
                                    </div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message rounded" placeholder="Ketik pesan..." value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button rounded" onClick={sendValue}>Kirim</button>
                        </div>
                    </div>}
                    {tab !== "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">
                                        <h3 className='text-center py-auto my-auto'>{chat.senderName.substring(0,1)}</h3>
                                    </div>}
                                    {chat.senderName !== userData.username && (
                                        <div>
                                            <p className='name-sender my-0'>{chat.senderName}</p>
                                            <div className="box3-left sb14">{chat.message}</div>
                                        </div>
                                    )}
                                    {/*<div className="message-data">{chat.message}</div>*/}
                                    {chat.senderName === userData.username && (
                                        <div>
                                            <p className='self-sender my-0'>{chat.senderName}</p>
                                            <div className="box3-right sb13">{chat.message}</div>
                                        </div>
                                    )}
                                    {chat.senderName === userData.username && <div className="avatar self">
                                        <h3 className='text-center py-auto my-auto'>{chat.senderName.substring(0,1)}</h3>
                                    </div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message rounded" placeholder="Ketik pesan..." value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button rounded" onClick={sendPrivateValue}>Kirim</button>
                        </div>
                    </div>}
                </div>
                :
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-sm-6 col-lg-4'>
                        <div className="card text-center register" style={{width: '24rem'}}>
                            <div className="card-header">
                                <img src={'chat.png'} style={{width: "1rem"}} alt="..."/> Chat Room <img src={'chatreverse.png'} style={{width: "1rem"}} alt="..."/>
                            </div>
                            <div className="card-body">
                                <div className="input-group p-3">
                                    <input type="text" className="form-control"
                                           id="user-name"
                                           placeholder="Enter your name"
                                           name="userName"
                                           value={userData.username}
                                           onChange={handleUsername}
                                           margin="normal"/>
                                    <button type="button" className="rounded-end" onClick={() => connect()}>
                                        Masuk
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'></div>
                </div>
            }
        </div>
    )
}

export default ChatRoom