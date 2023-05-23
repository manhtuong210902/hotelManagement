import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState: {
        room: null,
        rooms: [],
        roomLoading: true,
        rentalCard: []
    },
    reducers: {
        loadroomSuccess: (state, action) => {
            state.rooms = action.payload;
            state.roomLoading = false;
        },
        loadroomFail: (state) => {
            state.rooms = [];
            state.roomLoading = false;
        },
        addroom: (state, action) => {
            state.rooms.push(action.payload);
        },
        deleteroom: (state, action) => {
            state.rooms = state.rooms.filter((room) => room._id !== action.payload);
        },
        findroom: (state, action) => {
            state.room = action.payload;
        },
        updateroom: (state, action) => {
            state.rooms = state.rooms.map((room) => {
                if (room._id === action.payload._id) {
                    return action.payload;
                }
                return room;
            });
        },
        addRentalCard: (state, action) => {
            state.rentalCard.push(action.payload);
        },
    },
});

const { actions, reducer } = roomSlice;
export const { loadroomFail, loadroomSuccess, addroom, updateroom, deleteroom, findroom, addRentalCard } = actions;
export default reducer;
