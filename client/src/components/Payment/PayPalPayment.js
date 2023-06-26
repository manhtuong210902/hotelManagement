import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { createRentalCard, createBill, updateBill } from "../../redux/bookingApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PayPalPayment = ({paymentInfo, bill, rentalCard, handleClose}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBooking = async (paymentRes) => {
      if(bill.rentalCard === "")
      createRentalCard(dispatch, rentalCard )
      .then((newRental) => 
      {
          const Bill = {
              ...bill, rentalCard: newRental._id, isPaid : true, paidAt: new Date(), paymentResult: {
              id: paymentRes.id,
              status: paymentRes.status,
              email_address: paymentRes.payer.email_address,
              name:paymentRes.payer.name.given_name +' '+ paymentRes.payer.name.surname,
              bill_rental: [newRental]
            }  
          }
          createBill(dispatch, Bill )
          .then((success) => {
              if(success){
                  navigate('/profile')
              }
              else {
                  //xoa rental card + show error
                  console.log('err');
              }
          })
      })

      else {
        const Bill = {
          ...bill, isPaid : true, paidAt: new Date(), paymentResult: {
            id: paymentRes.id,
            status: paymentRes.status,
            email_address: paymentRes.payer.email_address,
            name:paymentRes.payer.name.given_name +' '+ paymentRes.payer.name.surname,
          }  
        }
        updateBill(dispatch, Bill )
          .then((success) => {
              if(success){
                  navigate('/profile')
              }
              else {
                  //xoa rental card + show error
                  console.log('err');
              }
          })
      }
    }
    const createOrder = () => {
        return fetch(`${API_URL}//my-server/create-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rentalRoom: paymentInfo
          }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
    };

    const onApprove = async (order) => {
      const {data} = await axios.post(
        `${API_URL}/my-server/capture-paypal-order`,
        {orderID: order.orderID},
        {
          headers: {
          "Content-Type": "application/json",
          }
        }
      );
      if(data){
         await handleBooking(data)
         handleClose()
      }
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  )
}

export default PayPalPayment
