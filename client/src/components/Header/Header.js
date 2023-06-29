import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequests";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";

function Header() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const naviagte = useNavigate();

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="header">
            <Container>
                <Navbar.Brand className="fw-bold text-primary">ÚKS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="text-decoration-none" to={config.routes.home}>
                            <div className="nav-link">Trang chủ</div>
                        </Link>
                        <Link className="text-decoration-none" to={config.routes.rooms}>
                            <div className="nav-link">Xem phòng</div>
                        </Link>
                    </Nav>
                    <Nav className="d-flex align-items-center gap-2">
                        {user ? (
                            <>
                                <div className="nav-link">
                                    Chào, <Link to={config.routes.profile}>{user.fullname}</Link>
                                </div>
                                <Button
                                    className="d-flex align-items-center gap-2 justify-content-center"
                                    onClick={() => {
                                        logoutUser(dispatch);
                                        naviagte(config.routes.login);
                                    }}
                                >
                                    <BoxArrowRight /> Đăng xuất
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="d-flex align-items-center gap-2 justify-content-center"
                                variant="danger"
                                onClick={() => {
                                    naviagte(config.routes.login);
                                }}
                            >
                                <BoxArrowRight /> Đăng nhập
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
