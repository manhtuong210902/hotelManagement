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
            // state.rentals.unshift(action.payload);
            state.rentals =[action.payload,...state.rentals]
        },
        removeRentalCard: (state, action) => {
            state.rentalCard = action.payload;
            const new_rentalCard = state.rentalCard.filter(item => item._id !== action.payload.payload._id);
            state.rentals = new_rentalCard;
        },
        addCancelRentalCard: (state, action) => {
            state.cancelRentals =[action.payload,...state.cancelRentals]
        },
        removeCancelRentalCard: (state, action) => {
            const new_rentalCard = state.rentalCard.filter(item => item._id !== action.payload.payload._id);
            state.cancelRentals = new_rentalCard
        },
        addBill: (state, action) => {
            state.bills.unshift(action.payload);
        },
        updateBillSuccess: (state, action) => {
            const new_bills = state.bills.map(item => {
                if(item._id === action.payload._id)
                    return {...item, isPaid : true, paidAt: action.payload.paidAt, paymentResult: action.payload.paymentResult }
                return item
            });
            state.bills = new_bills;
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
    removeRentalCard,
    addCancelRentalCard,
    removeCancelRentalCard,
    updateBillSuccess
} = actions;
export default reducer;
