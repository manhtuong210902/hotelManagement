import { Col, Container, Row } from "react-bootstrap";
import Profile from "../../components/Profile/Profile";
import TableAccounts from "./TableAccounts";

function Admin() {
    return (
        <div className="p-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Profile />
                    </Col>
                    <Col lg={8}>
                        <TableAccounts />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Admin;
