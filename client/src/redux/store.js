import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import roomSlice from "./roomSlice";
import billSlice from "./billSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        room: roomSlice,
        bill: billSlice
    },
});

export default store;
