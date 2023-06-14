import { Col, Container, Row } from "react-bootstrap";
import Profile from "../../components/Profile/Profile";

function Admin() {
    return (
        <div className="p-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Profile />
                    </Col>
                    <Col lg={8}>{"admin"}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Admin;
