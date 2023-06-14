import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        roles: [],
        userSelected: null,
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
        findUser: (state, action) => {
            state.userSelected = action.payload;
        },
    },
});

const { actions, reducer } = authSlice;
export const { loadUserSuccess, loadUserFail, findUser } = actions;
export default reducer;
