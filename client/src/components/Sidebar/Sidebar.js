import { Link, useLocation } from "react-router-dom";
import config from "../../config";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequests";
import { BoxArrowRight } from "react-bootstrap-icons";

function Sidebar() {
    const dispatch = useDispatch();
    const roomManagamentList = [
        {
            id: 1,
            name: "Thêm phòng",
            path: config.routes.addroom,
        },
        {
            id: 2,
            name: "Danh sách phòng",
            path: config.routes.listroom,
        },
        {
            id: 3,
            name: "Chỉnh sửa phòng",
            path: config.routes.editroom,
        },
    ];

    const location = useLocation();
    const user = useSelector((state) => state.auth.user);

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
                <span className="fs-5 fw-bold text-primary">ÚKS</span>
            </Link>
            <ul className="list-unstyled ps-0">
                <div className="d-flex align-items-center gap-1 flex-column">
                    <h5>{user.fullname}</h5>
                    <span>Quản lý khách sạn</span>
                    <Button
                        className="d-flex align-items-center gap-2 justify-content-center mt-3 mb-2"
                        onClick={() => {
                            logoutUser(dispatch);
                        }}
                    >
                        <BoxArrowRight /> Đăng xuất
                    </Button>
                </div>
                <li className="border-top my-3"></li>
                <Accordion defaultActiveKey={["0"]} alwaysOpen className="mb-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Quản lý đặt phòng</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item>Thêm đặt phòng</ListGroup.Item>
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
                                {roomManagamentList.map((item) => {
                                    return (
                                        <Link to={item.path} key={item.id} className="sidebar-item">
                                            <ListGroup.Item active={location.pathname === item.path}>
                                                {item.name}
                                            </ListGroup.Item>
                                        </Link>
                                    );
                                })}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </ul>
        </div>
    );
}

export default Sidebar;
