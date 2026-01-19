import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        order: orderReducer,
    },
});
