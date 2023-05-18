import { Col, Container, Row } from "react-bootstrap";
import Profile from "../../components/Profile/Profile";
import ChatManager from "../../components/Chats/ChatManager";

function Manage() {
    return (
        <div className="p-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Profile />
                    </Col>
                    <Col lg={8}>
                        <ChatManager />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Manage;
