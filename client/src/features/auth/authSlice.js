import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: { email: "", role: "" },
  isLoading: true,
  isError: false,
  errMsg: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth,email,password)
    return data.user.email
})

export const getUser = createAsyncThunk('auth/getUser', async (email) => {

  const res = await fetch(`${process.env.REACT_APP_API}user/${email}`)
  const data = await res.json()
 
  if(data.status){
   
    
    return data
  }
 else{
  return email
 }


})

const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {
    setUser : (state,{payload})=>{
        state.user.email = payload
        state.isLoading = false
    } ,
    loadingToggle : (state)=>{
        state.isLoading = false
    },

    logout : (state)=>{
      state.user.email = ''
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(createUser.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = action.error.message;
      })
    //   for login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.email = payload;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(loginUser.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = action.error.message;
      })

      //  for fetch user data from database

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      
        
        if(payload.status){
          state.user = payload.data;
         
      }else{
          state.user.email = payload;  
      }
        state.isError = false;
        state.errMsg = "";
      })
      .addCase(getUser.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.errMsg = action.error.message;
      })



  },
});

export const {setUser,loadingToggle,logout} = authSlice.actions

export default authSlice.reducer;
