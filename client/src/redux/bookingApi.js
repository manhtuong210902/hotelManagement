import axios from "axios";
import { API_URL } from "../utils/constants";
import { 
    loadBillSuccess, 
    loadBillFail, 
    loadRentalSuccess, 
    loadRentalFail, 
    loadCancelRentalsSuccess, 
    loadCancelRentalFail, 
    addRentalCard,
} from './billSlice'
//loader user

//booking
const storedValue = localStorage.getItem('hotel_token');
const config = {
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${storedValue}`,
    },
};

export const createRentalCard =  async (dispatch, rentalObj) => {
    try { 
        const {data} = await axios.post(
            `${API_URL}/book/create-rental-card`,
            rentalObj,
            config
        );

        if(data.success){
            dispatch(addRentalCard(data.newBill));
            return data.newBill
        }
    } catch (err) {
        console.log(err);
    }
};

export const createBill =  async (dispatch, billObj) => {
    try { 
        const {data} = await axios.post(
            `${API_URL}/book/create-bill`,
            billObj,
            config
        );

        // dispatch(addBill(billObj));
        return data.success
    } catch (err) {
        console.log(err);
    }
};

export const getRentalCard =  async (id) => {
    try { 
        const {data} = await axios.post(
            `${API_URL}/book/get-rental-card`,
            id,
            config
        );
        return data.rentalCard
        
    } catch (err) {
        console.log(err);
    }
};

export const getBills = async (dispatch, id) => {
    
    try {
        const res = await axios.post(
                                    `${API_URL}/book/bills`,
                                    { id: id },
                                    config,
                                );
        if (res.data.success) {
            const rentals =  await axios.post(
                                    `${API_URL}/book/rental-cards`,
                                    { id: id },
                                    config,
                                );
            var bls = res.data.bills.map(bill => {
                let tmp;
                for (const rental of rentals.data.rentalCards)
                {
                  if(rental._id === bill.rentalCard)
                  {
                    tmp = rental
                    break;
                  }
                }
                if(tmp)
                    return {...bill, number: tmp.number[0] || tmp.number}
                else return ''
              })
            bls = bls.filter(item => item !== '')
            console.log(bls);
            
            dispatch(loadBillSuccess(bls));
        }
    } catch (error) {
        console.log(error);
        dispatch(loadBillFail());
    }
};

export const getRentalCardsActive = async (dispatch, id) => {
    
    try {
        const res = await axios.post(
                                    `${API_URL}/book/rental-cards`,
                                    { id: id },
                                    config,
                                );
        if (res.data.success) {
            dispatch(loadRentalSuccess(res.data.rentalCards));
        }
    } catch (error) {
        console.log(error);
        dispatch(loadRentalFail());
    }
};

export const getRentalCardsCanceled = async (dispatch, id) => {
    try {
        axios.post(
            `${API_URL}/book/rental-cards-canceled`,
            { id: id },
            config,
        ).then( res => {
            if (res.data.success) {
                dispatch(loadCancelRentalsSuccess(res.data.rentalCards));
            }
            else dispatch(loadCancelRentalFail());
        })   
    } catch (error) {
        console.log(error);
        dispatch(loadCancelRentalFail());
    }
};

export const cancelRentalCard =  async (dispatch, obj) => {
    try { 
        const {data} = await axios.post(
            `${API_URL}/book/cancel-rental-card`,
            obj.rentalObj,
            config
        );

        if(data.success){
            const bills = obj.bills.filter(bill => bill.rentalCard !== obj.rentalObj._id)
            const rentalActive = obj.rentalCards.filter(rental => rental._id !== obj.rentalObj._id)
            const rentalCancel = [data.newRental, ...obj.rentalCardsCanceled]
            
            dispatch(loadRentalSuccess(rentalActive));
            dispatch(loadBillSuccess(bills));
            dispatch(loadCancelRentalsSuccess(rentalCancel));
            return data.newRental
        }
    } catch (err) {
        console.log(err);
    }
};

export const getUserName =  async (record) => {
    
    try { 
        const {data} = await axios.post(
            `${API_URL}/user/name`,
            {id: record.cancelBy},
            config
        );

        if(data.success){
            return data.name
        }
    } catch (err) {
        console.log(err);
    }
};
