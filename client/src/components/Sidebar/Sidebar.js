import { Link, useLocation } from "react-router-dom";
import config from "../../config";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequests";
import { BoxArrowRight } from "react-bootstrap-icons";

function Sidebar() {
    const dispatch = useDispatch();

    const bookingManagement = [
        {
            id: 1,
            name: "Thêm đơn đặt phòng",
            path: config.routes.bookingByNV,
        },
        {
            id: 2,
            name: "Xem đơn đặt phòng",
            path: config.routes.viewRental,
        },
        {
            id: 3,
            name: "Chỉnh đơn đặt phòng",
            path: config.routes.editRental,
        },
    ];

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

    const employeeManagamentList = [
        {
            id: 1,
            name: "Thêm nhân viên",
            path: config.routes.addemployee,
        },
        {
            id: 2,
            name: "Danh sách nhân viên",
            path: config.routes.listemployee,
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
                to={user.isAdmin ? config.routes.admin : config.routes.manager}
                className="d-flex align-items-center pb-3 mb-3 text-decoration-none border-bottom"
            >
                <span className="fs-5 fw-bold text-primary">ÚKS</span>
            </Link>
            <ul className="list-unstyled ps-0">
                <div className="d-flex align-items-center gap-1 flex-column">
                    <h5>{user.fullname}</h5>
                    <span>{user.isAdmin ? "Admin Hệ Thống" : `${user.position} Khách Sạn`}</span>
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
                <Accordion className="mb-2" defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Quản lý đặt phòng</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {bookingManagement.map((item) => {
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

                    <Accordion.Item eventKey="1">
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

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Quản lý báo cáo</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <Link to={config.routes.revenuereport} className="sidebar-item">
                                    <ListGroup.Item active={location.pathname === config.routes.revenuereport}>
                                        Báo cáo doanh thu
                                    </ListGroup.Item>
                                </Link>
                                <Link to={config.routes.densityreport} className="sidebar-item">
                                    <ListGroup.Item active={location.pathname === config.routes.densityreport}>
                                        Báo cáo mật độ
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>

                    {user.isAdmin && (
                        <>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Quản lý khách hàng</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <Link to={config.routes.listcus} className="sidebar-item">
                                            <ListGroup.Item active={location.pathname === config.routes.listcus}>
                                                Danh sách khách hàng
                                            </ListGroup.Item>
                                        </Link>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Quản lý nhân viên</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        {employeeManagamentList.map((item) => {
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
                        </>
                    )}
                </Accordion>
            </ul>
        </div>
    );
}

export default Sidebar;
