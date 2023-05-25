import React from 'react'
import { Container, Card, Form } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { Check2Circle } from "react-bootstrap-icons";

const Pay = () => {
  const newBill = useSelector((state) => state.room.rentalCard);
  return (
    <>
    <Container style={{ padding: "0 10rem" }}>
      <>
        <div
          className="text-success mt-5 d-flex justify-content-center align-items-center"
          style={{ fontSize: "2.25rem" }}
        >
          <Check2Circle className="m-4" style={{ fontSize: "3.5rem" }} />
          {" "}
          ĐẶT PHÒNG THÀNH CÔNG
        </div>
        
        <Card style={{ width: '100%', margin: '10px' }}>
          <Card.Body>
            <Card.Title>Phiếu đặt phòng</Card.Title>
            <div className="d-flex align-items-center">
                  <label className="me-4" style={{ fontSize: "1rem" }}>
                    <strong>Số ngày thuê phòng:</strong>{" "}
                    {newBill?.numDays}
                  </label>
                </div>
                <div
                  className="mt-3 mb-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>Ngày check-in: {newBill?.arrivalDate}</strong>
                </div>
                <div
                  className="mt-3 mb-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>Đơn giá phòng:</strong> {newBill?.unitPrice.toLocaleString("vi-VN")} đ/ngày
                </div>
                <div
                  className="mt-3 mb-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>VAT 10%: </strong> {newBill?.extraPrice.toLocaleString("vi-VN")}đ
                </div>
            <Card.Footer>
            <Form>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    inline
                    label="Thanh toán tiền mặt khi check-in"
                    name="group1"
                    type="radio"
                    id={`inline-radio-1`}
                  />
                  <Form.Check
                    inline
                    label="Thanh toán online bằng paypal"
                    name="group1"
                    type="radio"
                    id={`inline-radio-2`}
                  />
                </div>
            </Form>
            </Card.Footer>
          </Card.Body>
        </Card>
      </>
    </Container>
  </>
  )
}

export default Pay
