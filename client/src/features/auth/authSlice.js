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

const authSlice = createSlice({
  initialState,
  name: "auth",

  reducers: {},
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
  },
});


export default authSlice.reducer;
