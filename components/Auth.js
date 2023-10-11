import React from 'react'
import {auth,provider} from "../FirebaseConfig.js"
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function Auth(props) {

    const {setIsAuth} = props;
    const signInWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token',result.user.refreshToken);
            setIsAuth(true);
        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div className='auth'>
        <h1>Welcome to Chat Room Application</h1>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default Auth