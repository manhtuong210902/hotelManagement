import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import roomSlice from "./roomSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        room: roomSlice,
    },
});

export default store;
