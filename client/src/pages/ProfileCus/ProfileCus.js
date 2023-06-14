import { Col, Container, Row } from "react-bootstrap";
import Profile from "../../components/Profile/Profile";
import BookingHistory from "../../components/Profile/BookingHistory";
function ProfileCus() {
    return (
        <Container className="py-5">
            <Row>
                <Col lg={4}>
                    <Profile />
                </Col>
                <Col lg={8}>
                    {/* <h3>Danh sách phòng đặt</h3> */}
                    <BookingHistory />
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileCus;
