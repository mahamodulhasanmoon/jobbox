import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({

    reducer: {
       [apiSlice.reducerPath] : apiSlice.reducer,
    auth : authSlice
    }
})

export default store
