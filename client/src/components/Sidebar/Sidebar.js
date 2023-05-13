import { Link } from "react-router-dom";
import config from "../../config";
import { Accordion, ListGroup } from "react-bootstrap";

function Sidebar() {
    return (
        <div
            className="flex-shrink-0 p-3 bg-light"
            style={{
                width: 280,
                height: "100vh",
            }}
        >
            <Link
                to={config.routes.manager}
                className="d-flex align-items-center pb-3 mb-3 text-decoration-none border-bottom"
            >
                <span className="fs-5 fw-semibold text-dark">Hotel HCMUS</span>
            </Link>
            <ul className="list-unstyled ps-0">
                <div className="text-center">
                    <h5>Mạnh Tường</h5>
                    <span>Quản lý khách sạn</span>
                </div>
                <li class="border-top my-3"></li>
                <Accordion defaultActiveKey={["0"]} alwaysOpen className="mb-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Quản lý đặt phòng</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item active>Thêm đặt phòng</ListGroup.Item>
                                <ListGroup.Item>Xem đơn đặt phòng</ListGroup.Item>
                                <ListGroup.Item>Chỉnh sửa đặt phòng</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Accordion defaultActiveKey={["0"]} alwaysOpen className="mb-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Quản lý phòng</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item active>Thêm phòng</ListGroup.Item>
                                <ListGroup.Item>Xem danh sách phòng</ListGroup.Item>
                                <ListGroup.Item>Chỉnh sửa phòng</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </ul>
        </div>
    );
}

export default Sidebar;
