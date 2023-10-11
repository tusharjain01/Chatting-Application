import { React, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import "../styles/Chat.css";

const Chat = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");
  useEffect(() => {
    const queryMessage = query(messageRef, 
        where("room", "==", props.room),
        orderBy("createdAt"));
    const unscribe = onSnapshot(queryMessage, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      })
        setMessages(messages);
    });
    return () => {
      unscribe();
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    console.log(newMessage);
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: props.room,
    });
    setNewMessage("");
  };
  return (
    <div className="chat-app">
        <div className="header">
            <h1>Welcome to {props.room}</h1>
        </div>
        <div className="messages">
            {messages.map((message) => (
                <div className="message" key={message.id}>
                    <span className="user">{message.user}</span>
                    {message.text}
                </div>
            ))}
        </div>
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
export default Chat;
