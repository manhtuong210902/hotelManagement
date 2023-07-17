import React, { useState } from "react";
import { Button, Form, Input, InputNumber, notification } from "antd";
import { Card, Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRentalCard, createBill } from "../../redux/bookingApi";

const BookingByHotel = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDuplicate, setIsDuplicate] = useState(false);

    const [search, setSearch] = useState("");
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [rentalCard, setRentalCard] = useState({
        user: null,
        booker: user._id,
        room: "",
        arrivalDate: "",
        numDays: 1,
        isCheckIn: true,
        isCheckOut: false,
        status: true,
        cancelBy: null,
        cancelAt: null,
    });

    const [bill, setBill] = useState({
        rentalCard: "",
        unitPrice: 0,
        extraPrice: 0,
        totalPrice: 0,
        paymentMethod: "direct_money",
        paymentResult: {},
        isPaid: true,
        paidAt: new Date(),
    });
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message) => {
        api.info({
            message,
        });
    };

    const handleBooking = async () => {
        if (searchResult.number === "" && search === "") {
            openNotification("Chưa chọn phòng");
            return;
        } else {
            await createRentalCard(dispatch, rentalCard).then((newRental) => {
                setBill({ ...bill, rentalCard: newRental?._id });
                const Bill = {
                    ...bill,
                    number: rentalCard.numDays,
                    rentalCard: newRental._id,
                    bill_rental: [newRental],
                };

                createBill(dispatch, Bill).then((success) => {
                    if (success) {
                        navigate("/view-rental");
                    } else {
                        //xoa rental card + show error
                        console.log("err");
                    }
                });
            });
        }
    };

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    const formRef = React.useRef(null);
    const searchRef = React.useRef(null);
    const [searchResult, setSearchResult] = useState({
        number: "",
        type: "",
        capacity: "",
        price: "",
    });

    const onFinish = (values) => {
        setRentalCard({
            ...rentalCard,
            room: searchResult._id,
            arrivalDate: new Date(),
            numDays: values.numDays,
        });
        setIsCheckOut(searchResult.price * values.numDays + (searchResult.price * 10) / 100);
        setBill({
            ...bill,
            totalPrice: searchResult.price * values.numDays + (searchResult.price * 10) / 100,
            unitPrice: searchResult.price,
            extraPrice: (searchResult.price * 10) / 100,
            paymentResult: {
                email_address: values.Email,
                name: values.name,
                cccd: values.cccd,
            },
        });
    };

    const searchRoom = async (id) => {
        const result = await axios.post(`${API_URL}/rooms/get-room-info`, { id });

        if (result.data.success) setSearchResult(result.data.room[0]);
        else setSearchResult({ number: "", type: "", capacity: "", price: "" });
    };
    const onSearch = async (values) => {
        await searchRoom(values.note).then(async (res) => {
            const response = await axios.post(`${API_URL}/book/check-booking`, {
                arrivalDate: new Date(),
                numDays: 1,
                roomId: searchResult._id,
            });

            setIsDuplicate(response.data.isDuplicate);
        });
        setSearch(values.note);
    };

    return (
        <div>
            {contextHolder}
            <div className="search">
                <Form
                    {...layout}
                    ref={searchRef}
                    name="search-ref"
                    onFinish={onSearch}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        name="note"
                        label="Tìm kiếm phòng:"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {searchResult ? (
                <Col className="my-3">
                    <Card>
                        <Card.Header className="text-primary">Phiếu đặt phòng</Card.Header>
                        <Card.Body>
                            <p className="mb-2">
                                {">"} Số phòng: {searchResult.number}
                            </p>
                            <p className="mb-2">
                                {">"} Loại phòng: {searchResult.type}
                            </p>
                            <p className="mb-2">
                                {">"} Sức chứa: {searchResult.capacity}
                            </p>
                            <p className="mb-2">
                                {">"} Giá: {searchResult.price.toLocaleString("vi")} VNĐ
                            </p>
                            <Form
                                {...layout}
                                ref={formRef}
                                name="control-ref"
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 600,
                                }}
                            >
                                <Form.Item
                                    name="name"
                                    label="Họ tên:"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="Email"
                                    label="Email:"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="cccd"
                                    label="Căn cước công dân:"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                {/* <Form.Item
                                name="arrivalDay"
                                label="Ngày check-in:"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item> */}
                                <Form.Item
                                    name="numDays"
                                    label="Số ngày ở:"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                {isCheckOut && (
                                    <>
                                        <p className="mb-2">
                                            {">"} Tổng hóa đơn: {isCheckOut.toLocaleString("vi")} VNĐ
                                        </p>
                                    </>
                                )}
                                {isDuplicate ? (
                                    <div className="border-top pt-3 pb-2">
                                        <p className="text-danger text-center">
                                            Khoảng thời gian này <br />
                                            phòng <b>{searchResult?.number}</b> đã có người đặt !!
                                        </p>
                                    </div>
                                ) : (
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Tính tiền
                                        </Button>
                                        <span style={{ padding: "12px" }}></span>
                                        <Button
                                            type="primary"
                                            onClick={async () => {
                                                await handleBooking();
                                            }}
                                        >
                                            Đặt phòng
                                        </Button>
                                    </Form.Item>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            ) : (
                <span>Sai mã phòng</span>
            )}
        </div>
    );
};

export default BookingByHotel;
