import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading , setLoading] = useState(true)


//google login
const provider = new GoogleAuthProvider();

const googleLogin = ()=>{
    return signInWithPopup(auth , provider)
}


//signUp
  const signUpUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };



//signIn
  const signInUser = (email, password) => {
      setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };






  
//update
  const updateUser = (name, photo) => {
      setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };


  //signout

  const signOutUser = () =>{
    signOut(auth)
  }




//authState
  useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("authState", currentUser);
    setLoading(false);
    setUser(currentUser);

   
  });

  return () => unSubscribe(); 
}, []);

  const userInfo = {
    user,
    signUpUser,
    signInUser,
    updateUser,
    loading,
    googleLogin,
    signOutUser
  };

return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;;
};

export default AuthProvider;
