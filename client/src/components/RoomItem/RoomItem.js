import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function RoomItem({ data }) {
    return (
        <Col sm={6} md={4} lg={3} className="my-3">
            <Card>
                <Card.Img variant="top" src={data.image} className="room-item-image" />
                <Card.Body>
                    <Card.Title className="text-primary">Phòng số {data.number}</Card.Title>
                    <p className="mb-2">
                        {">"} Loại phòng: {data.type}
                    </p>
                    <p className="mb-2">
                        {">"} Sức chứa: {data.capacity}
                    </p>

                    <div className="text-center mt-3">
                        <h5 className="mb-3 text-danger">Giá: {data.price.toLocaleString("vi-VN")}đ/đêm</h5>
                        <Link className="btn btn-primary text-decoration-none" to={"/details"}>
                            Xem thông tin
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RoomItem;
