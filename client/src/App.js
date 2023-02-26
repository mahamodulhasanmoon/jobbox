import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import auth from "./firebase/firebase.config";
import { useDispatch } from "react-redux";
import { getUser, loadingToggle, setUser } from "./features/auth/authSlice";


function App() {

  // to keep user login percestency
  const dispatch = useDispatch()

useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){

      dispatch(getUser(user.email))
    }else{
      dispatch(loadingToggle())
    }
   

  })

},[dispatch])

  return (
    <>
    <Toaster/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
