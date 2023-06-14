import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
    name: "bill",
    initialState: {
        rentalCard: null,
        bills: [],
        rentals: [],
        cancelRentals: []
    },
    reducers: {
        loadBillSuccess: (state, action) => {
            state.bills = action.payload;
        },
        loadBillFail: (state) => {
            state.bills = [];
        },
        loadRentalSuccess: (state, action) => {
            state.rentals = action.payload;
        },
        loadRentalFail: (state) => {
            state.rentals = [];
        },
        loadCancelRentalsSuccess: (state, action) => {
            state.cancelRentals = action.payload;
        },
        loadCancelRentalFail: (state) => {
            state.cancelRentals = [];
        },
        addRentalCard: (state, action) => {
            state.rentalCard = action.payload;
            state.rentals.unshift(action.payload);
        },
        addBill: (state, action) => {
            state.bills.unshift(action.payload);
        },
    },
});

const { actions, reducer } = billSlice;
export const { 
    loadBillSuccess, 
    loadBillFail, 
    loadRentalSuccess, 
    loadRentalFail, 
    loadCancelRentalsSuccess, 
    loadCancelRentalFail, 
    addRentalCard,
    addBill,
} = actions;
export default reducer;
