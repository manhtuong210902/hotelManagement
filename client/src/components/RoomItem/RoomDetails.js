import { Button, Card, Col, Container, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import FormSearch from "../Rooms/FromSearch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useSelector } from "react-redux";

function RoomDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState(null);
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(`${API_URL}/rooms/${id}`);
            setLoading(false);
            setRoom(result.data.room);
        };
        fetchApi();
    }, [id]);

    return (
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
                                    <strong>Ngày thuê</strong>: <input type="date" />
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
                                        <strong>THÀNH TIỀN 100.000đ</strong>
                                    </p>
                                    <Button className="w-100">ĐẶT PHÒNG</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RoomDetails;
