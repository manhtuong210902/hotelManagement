import { Col, Container, Row } from "react-bootstrap";
import Profile from "../../components/Profile/Profile";

function ProfileCus() {
    return (
        <Container className="py-5">
            <Row>
                <Col lg={4}>
                    <Profile />
                </Col>
                <Col lg={8}>
                    <h3>Danh sách phòng đặt</h3>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileCus;
