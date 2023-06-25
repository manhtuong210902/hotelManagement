import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { API_URL } from "../../utils/constants";
const PayPalPayment = () => {
    const createOrder = (data) => {
      
        return fetch(`${API_URL}//my-server/create-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rentalRoom: {
                description: "Booking at ÚKS",
                cost: "9.00"
            }
          }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
    };

    const onApprove = (data) => {
         return fetch(`${API_URL}//my-server/capture-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        })
        .then((response) => response.json());
    };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  )
}

export default PayPalPayment
