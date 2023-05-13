import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        roles: [],
    },
    reducers: {
        loadUserSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.roles = action.payload.roles;
        },
        loadUserFail: (state) => {
            console.log("faillle");
            state.isAuthenticated = false;
            state.user = null;
            state.roles = [];
        },
    },
});

const { actions, reducer } = authSlice;
export const { loadUserSuccess, loadUserFail } = actions;
export default reducer;
