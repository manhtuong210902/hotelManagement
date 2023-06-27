import React from 'react'
import {  Container } from "react-bootstrap";
import BookingByHotel from '../../components/Booking/BookingByHotel';
const BookingManagement = () => {
  return (
    <Container className="py-5">
        <BookingByHotel />
    </Container>
  )
}

export default BookingManagement
