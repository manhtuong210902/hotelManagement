import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { API_URL } from "../../utils/constants";
import formatDate from "../../utils/formatDate";

function DensityReportForm() {
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
    const [density, setDensity] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/report/density`, {
                startDay,
                endDay,
            });

            setDensity(response.data.report);
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

                    {density.length > 0 && (
                        <div className="px-5">
                            <h4>Mật độ sử dụng phòng khách sạn</h4>
                            <p>
                                Từ ngày <span className="text-primary">{formatDate(startDay)}</span> đến ngày{" "}
                                <span className="text-primary">{formatDate(endDay)}</span>
                            </p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Phòng</th>
                                        <th>Số lượt sử dụng phòng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {density.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.room}</td>
                                                <td>{item.totalUsage} Lần</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default DensityReportForm;
