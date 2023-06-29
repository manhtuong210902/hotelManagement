import React from "react";
import { Container } from "react-bootstrap";
import BookingByHotel from "../../components/Booking/BookingByHotel";
const BookingManagement = () => {
    return (
        <Container className="p-5">
            <h3 className="mb-5">THÊM ĐƠN ĐẶT PHÒNG</h3>
            <BookingByHotel />
        </Container>
    );
};

export default BookingManagement;
