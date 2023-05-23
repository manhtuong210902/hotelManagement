import { Button, Card, Col, Container, Row, Spinner, Tab, Tabs, Modal } from "react-bootstrap";
import FormSearch from "../Rooms/FromSearch";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { createRentalCard } from "../../redux/apiRequests";

function RoomDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState(null);
    const [initialDate, setInitialDate] = useState('');
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const [bookingInfo, setBookingInfo] = useState({
        booker: user._id,
        unitPrice: 0,
        extraPrice: 0,
        totalPrice: 0,
        arrivalDate: '',
        numDays: 1,
        paymentMethod: null,
        paymentResult: null,
        isPaid: false,
        paidAt: null,
    })

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
            setBookingInfo({
                            ...bookingInfo, 
                            unitPrice: result.data.room.price,
                            extraPrice: result.data.room.price*0.1,
                            totalPrice: result.data.room.price*bookingInfo.numDays + result.data.room.price*0.1,
                            arrivalDate: formattedDate
                        })

        };
        fetchApi();
    }, [id]);

    const calTotalPrice = (value, num) =>  value.extraPrice + num*value.unitPrice
    const handleBooking = () => {
        const success = createRentalCard(dispatch, bookingInfo )
        if(success){
            navigate('/')
        }
        setShow(false);
    }
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
                            <h4 className="mt-3 text-primary">Phòng 101</h4>
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
                                    Mã Phòng: 101
                                    <br />
                                    Tên Phòng: Phòng 101
                                    <br />
                                    Sức Chứa: tối đa 3 người
                                    <br />
                                    Loại Phòng: Vip <br />
                                    Mô tả thêm: Phòng có tivi và tủ lạnh <br />
                                </Tab>
                            </Tabs>
                        </div>
                    )}
                </Col>
                <Col lg={4} className="mb-3">
                    <div className="p-3 border border-1 rounded-2">
                        <div>
                            <h6 className="mb-4 text-primary">THÔNG TIN KHÁCH HÀNG</h6>
                            <p>
                                {"> "}
                                <strong>Người đặt</strong>: {user.fullname}
                            </p>
                            <p>
                                {"> "}
                                <strong>Email</strong>: {user.email}
                            </p>
                        </div>
                        <div className="mt-4">
                            <h6 className="mb-4 text-primary">CHI TIẾT</h6>
                            <form>
                                <p>
                                    {"> "}
                                    <strong>Ngày thuê</strong>: 
                                    <input 
                                        type="date" 
                                        value={initialDate} 
                                        onChange={(e) => { 
                                            setInitialDate(e.target.value) 
                                            setBookingInfo({...bookingInfo, arrivalDate: e.target.value})
                                        }}/>
                                </p>
                                <p className="d-flex align-items-center">
                                    <label className="me-2" >
                                        {"> "}
                                        <strong>Số ngày thuê phòng</strong>
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={bookingInfo.numDays}
                                        className="form-control w-25"
                                        onChange={(e) => setBookingInfo(e.target.value ?{...bookingInfo, numDays: parseInt(e.target.value), totalPrice: calTotalPrice(bookingInfo, e.target.value)}:1)}
                                    ></input>
                                </p>
                                
                                <p>
                                    {"> "}
                                    <strong>Đơn giá phòng</strong>: {room && room.price.toLocaleString("vi-VN")}đ/ngày
                                </p>
                                <p>
                                    {"> "}
                                    <strong>Thuế 10%</strong>: {room && (room.price * 0.1).toLocaleString("vi-VN")}đ
                                </p>
                                <div className="border-top pt-3 pb-2">
                                    <p className="mb-3 text-danger">
                                        <strong>THÀNH TIỀN {bookingInfo.totalPrice}</strong>
                                    </p>
                                    <Button onClick={() => setShow(true)} className="w-100">ĐẶT PHÒNG</Button>
                                </div>
                            </form>
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
