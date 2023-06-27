import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { API_URL } from "../../utils/constants";
import formatDate from "../../utils/formatDate";

function RevenueReportForm() {
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
    const [revenues, setRevenues] = useState([]);
    const [total, setTotal] = useState(-1);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/report/revenue`, {
                startDay,
                endDay,
            });

            console.log(response.data);

            setRevenues(response.data.result);

            const sum = response.data.result.reduce(
                (accumulator, currentValue) => accumulator + currentValue.totalRevenue,
                0
            );

            setTotal(sum);
            setLoading(false);
            // Xử lý dữ liệu báo cáo nhận về từ server (response.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={4}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Ngày bắt đầu:</Form.Label>
                            <Form.Control type="date" value={startDay} onChange={(e) => setStartDay(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Ngày kết thúc:</Form.Label>
                            <Form.Control type="date" value={endDay} onChange={(e) => setEndDay(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Button type="submit">Xem Báo Cáo</Button>
                    </Form>
                </Col>
                <Col sm={8}>
                    {loading && (
                        <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                            <Spinner animation="border" size="sm" />
                            <span>Đang tải dữ liệu...</span>
                        </div>
                    )}

                    {revenues.length > 0 && (
                        <div className="px-5">
                            <h4>Doanh thu khách sạn</h4>
                            <p>
                                Từ ngày <span className="text-primary">{formatDate(startDay)}</span> đến ngày{" "}
                                <span className="text-primary">{formatDate(endDay)}</span>
                            </p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Phòng</th>
                                        <th>Doanh thu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {revenues.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.room}</td>
                                                <td>{item.totalRevenue.toLocaleString("vi")} VNĐ</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <h3 className="mt-3 text-danger">Tổng doanh thu: {total.toLocaleString("vi")} VNĐ</h3>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default RevenueReportForm;
