import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import auth from "./firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadingToggle } from "./features/auth/authSlice";
import Loading from "./components/reusable/Loading";


function App() {

  const {isLoading} = useSelector(state=> state.auth)

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
if(isLoading){
  return <Loading/>
}

  return (
    <>
    <Toaster/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
