import { Col, Container, Row } from "react-bootstrap";
import Profile from "../../components/Profile/Profile";

function Manage() {
    return (
        <div className="p-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Profile />
                    </Col>
                    <Col lg={8}>Chat</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Manage;
