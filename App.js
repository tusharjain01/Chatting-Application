import React, { useState,useRef } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import "./App.css";
import Chat from "./components/Chat.js";
import { signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const roomInput = useRef(null);
  const signUserOut = async() => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom("");
  }
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <div>{
        room ? (
            <Chat room={room}/>
        ) : (
        <div className="room">
            <label>Enter Room Name</label>
            <input ref={roomInput}/>
            <button onClick={() => {setRoom(roomInput.current.value)}}>Enter Chat</button>
        </div>
        )}
        <div className="sign-out">
          <button onClick={signUserOut}>Sign Out</button>
        </div>
    </div>
  );
}

export default App;
