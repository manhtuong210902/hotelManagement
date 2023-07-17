import { Button, Card, Col, Container, Row, Spinner, Tab, Tabs, Modal, Form, FormControl } from "react-bootstrap";
import FormSearch from "../Rooms/FromSearch";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { createRentalCard, createBill } from "../../redux/bookingApi";
import PayPalPayment from "../Payment/PayPalPayment";
import Review from "./Review";
import getCurrentDate from "../../utils/getCurrentDate";
import config from "../../config";

function RoomDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState(null);
    const [payment, setPayment] = useState("later_money");
    const [initialDate, setInitialDate] = useState("");
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        description: "Booking at ÚKS",
        cost: 0,
    });

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [rentalCard, setRentalCard] = useState({
        user: user?._id || null,
        booker: user?._id || null,
        room: id,
        arrivalDate: getCurrentDate("-"),
        numDays: 1,
    });

    const [bill, setBill] = useState({
        rentalCard: "",
        unitPrice: 0,
        extraPrice: 0,
        totalPrice: 0,
        paymentMethod: payment,
        paymentResult: {},
        isPaid: false,
        paidAt: "",
    });

    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(`${API_URL}/rooms/${id}`);
            setLoading(false);
            setRoom(result.data.room);
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().substr(0, 10);
            setInitialDate(formattedDate);
            const total = result.data.room.price * rentalCard.numDays + result.data.room.price * 0.1;
            setRentalCard({
                ...rentalCard,
                arrivalDate: formattedDate,
            });
            setBill({
                ...bill,
                unitPrice: result.data.room.price,

                extraPrice: result.data.room.price * 0.1,
                totalPrice: result.data.room.price * rentalCard.numDays + result.data.room.price * 0.1,
            });
            setPaymentInfo({ ...paymentInfo, cost: total / 25000 });
        };
        fetchApi();
    }, [id]);

    useEffect(() => {
        const fetchApi = async () => {
            if (!rentalCard.arrivalDate || rentalCard.numDays <= 0) {
                return;
            }

            const response = await axios.post(`${API_URL}/book/check-booking`, {
                arrivalDate: rentalCard.arrivalDate,
                numDays: rentalCard.numDays,
                roomId: id,
            });

            setIsDuplicate(response.data.isDuplicate);
        };
        fetchApi();
    }, [id, rentalCard]);

    const calTotalPrice = (value, num) => value.extraPrice + num * value.unitPrice;

    const handleBooking = async () => {
        await createRentalCard(dispatch, rentalCard).then((newRental) => {
            setBill({ ...bill, rentalCard: newRental?._id });
            const Bill = { ...bill, number: room.number, rentalCard: newRental._id, bill_rental: [newRental] };

            createBill(dispatch, Bill).then((success) => {
                if (success) {
                    navigate("/profile");
                } else {
                    //xoa rental card + show error
                    console.log("err");
                }
            });
        });
        setShow(false);
    };

    const handlePayment = (e) => {
        setPayment(e.target.value);
        setBill({ ...bill, paymentMethod: e.target.value });
    };

    const handleChangeDate = (e) => {
        setInitialDate(e.target.value);
        setRentalCard({ ...rentalCard, arrivalDate: e.target.value });
    };

    const changeNumOfDay = (num) => {
        setRentalCard({ ...rentalCard, numDays: parseInt(num) });
        setBill({ ...bill, totalPrice: calTotalPrice(bill, num) });
        setPaymentInfo({ ...paymentInfo, cost: calTotalPrice(bill, num) / 25000 });
    };

    return (
        <>
            <Container className="p-5">
                <Row>
                    <h4>Thông tin phòng</h4>
                    <FormSearch />
                </Row>
                <Row className="mt-3">
                    <Col lg={8} className="mb-3">
                        {loading && (
                            <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                                <Spinner animation="border" size="sm" />
                                <span>Đang tải thông tin phòng...</span>
                            </div>
                        )}
                        {room && (
                            <div className="p-3 border border-1 rounded-2">
                                <Card>
                                    <Card.Img variant="top" src={room.image} />
                                </Card>
                                <h4 className="mt-3 text-primary">Phòng {room.number}</h4>
                                <Tabs defaultActiveKey="description" className="mb-3 mt-3">
                                    <Tab eventKey="description" title="Mô tả">
                                        <p>
                                            {"> "}
                                            <strong>Mã Phòng</strong>: {room.number}
                                        </p>
                                        <p>
                                            {"> "}
                                            <strong>Tên Phòng</strong>: {room.name}
                                        </p>
                                        <p>
                                            {"> "}
                                            <strong>Sức Chứa</strong>: Tối đa {room.capacity} người
                                        </p>
                                        <p>
                                            {"> "}
                                            <strong>Loại Phòng</strong>: {room.type}
                                        </p>
                                        <p>
                                            {"> "}
                                            <strong>Mô tả thêm</strong>: {room.description}
                                        </p>
                                    </Tab>
                                    <Tab eventKey="reviews" title="Đánh giá">
                                        <Review roomId={id} />
                                    </Tab>
                                </Tabs>
                            </div>
                        )}
                    </Col>
                    <Col lg={4} className="mb-3">
                        <div className="p-3 border border-1 rounded-2">
                            <div>
                                <h6 className="mb-4 text-primary">THÔNG TIN KHÁCH HÀNG</h6>
                                {user ? (
                                    <>
                                        <p>
                                            {"> "}
                                            <strong>Người đặt</strong>: {user.fullname}
                                        </p>
                                        <p>
                                            {"> "}
                                            <strong>Email</strong>: {user.email}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-danger">
                                        <Link to={config.routes.login} className="text-danger fw-bold">
                                            Đăng nhập
                                        </Link>{" "}
                                        để đặt phòng
                                    </p>
                                )}
                            </div>
                            <div className="mt-4">
                                <h6 className="mb-4 text-primary">CHI TIẾT</h6>
                                <div>
                                    <p>
                                        {"> "}
                                        <strong>Chọn ngày thuê</strong>:
                                        <input
                                            type="date"
                                            min={getCurrentDate("-")}
                                            value={initialDate}
                                            onChange={handleChangeDate}
                                        />
                                    </p>

                                    <p className="d-flex align-items-center">
                                        <label className="me-2">
                                            {"> "}
                                            <strong>Chọn Số ngày thuê</strong>:
                                        </label>
                                        <FormControl
                                            size="sm"
                                            type="number"
                                            min={1}
                                            style={{ width: 50 }}
                                            value={rentalCard.numDays}
                                            onChange={(e) => changeNumOfDay(parseInt(e.target.value))}
                                        ></FormControl>
                                    </p>

                                    <p>
                                        {"> "}
                                        <strong>Đơn giá phòng</strong>: {room && room.price.toLocaleString("vi-VN")}
                                        đ/ngày
                                    </p>
                                    <p>
                                        {"> "}
                                        <strong>Thuế 10%</strong>: {room && (room.price * 0.1).toLocaleString("vi-VN")}đ
                                    </p>

                                    <Form onChange={handlePayment}>
                                        <label className="me-2">
                                            {"> "}
                                            <strong>Chọn phương thức thanh toán</strong>
                                        </label>
                                        <div key={`inline-radio`} className="m-3">
                                            <Form.Check
                                                inline
                                                label="Thanh toán tiền mặt khi check-in"
                                                name="group1"
                                                type="radio"
                                                id={`inline-radio-1`}
                                                value="later_money"
                                                className="mb-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="Thanh toán online bằng paypal"
                                                name="group1"
                                                type="radio"
                                                id={`inline-radio-2`}
                                                value="paypal"
                                            />
                                        </div>
                                    </Form>

                                    {isDuplicate ? (
                                        <div className="border-top pt-3 pb-2">
                                            <p className="text-danger text-center">
                                                Khoảng thời gian này <br />
                                                phòng <b>{room?.number}</b> đã có người đặt !!
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="border-top pt-3 pb-2">
                                            {user ? (
                                                <>
                                                    {" "}
                                                    <p className="mb-3 text-danger">
                                                        <strong>
                                                            THÀNH TIỀN {bill.totalPrice.toLocaleString("vi-VN")}đ
                                                        </strong>
                                                    </p>
                                                    {payment === "paypal" ? (
                                                        <PayPalPayment
                                                            paymentInfo={paymentInfo}
                                                            bill={bill}
                                                            rentalCard={rentalCard}
                                                        />
                                                    ) : (
                                                        <Button onClick={() => setShow(true)} className="w-100">
                                                            ĐẶT PHÒNG
                                                        </Button>
                                                    )}
                                                </>
                                            ) : (
                                                <p className="text-danger">
                                                    <Link to={config.routes.login} className="text-danger fw-bold">
                                                        Đăng nhập
                                                    </Link>{" "}
                                                    để đặt phòng
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>ĐẶT PHÒNG</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn đặt phòng này</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleBooking}>
                        Đặt phòng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RoomDetails;
