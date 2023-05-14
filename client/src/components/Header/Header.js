import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequests";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import config from "../../config";

function Header() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="header">
            <Container>
                <Navbar.Brand href="#">HOTEL HCMUS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="text-decoration-none" to={config.routes.home}>
                            <div className="nav-link">Trang chủ</div>
                        </Link>
                        <Link className="text-decoration-none" to={config.routes.rooms}>
                            <div className="nav-link">Xem phòng</div>
                        </Link>
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav className="d-flex align-items-center gap-2">
                        <Nav.Link>Chào, {user.fullname}</Nav.Link>
                        <Button
                            className="d-flex align-items-center gap-2 justify-content-center"
                            onClick={() => {
                                logoutUser(dispatch);
                            }}
                        >
                            <BoxArrowRight /> Đăng xuất
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
