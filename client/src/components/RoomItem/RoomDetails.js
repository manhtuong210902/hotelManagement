import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import FormSearch from "../Rooms/FromSearch";

function RoomDetails() {
    return (
        <Container className="p-5">
            <Row>
                <h4>Thông tin phòng</h4>
                <FormSearch />
            </Row>
            <Row className="mt-3">
                <Col lg={8}>
                    <div className="p-3 border border-1 rounded-2">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="http://www.nicdarkthemes.com/themes/hotel-resort/wp/demo/hotel/wp-content/uploads/sites/2/2022/04/room01.jpg"
                            />
                        </Card>
                        <h4 className="mt-3 text-primary">Phòng 101</h4>
                        <Tabs defaultActiveKey="description" className="mb-3 mt-3">
                            <Tab eventKey="description" title="Mô tả">
                                <p>
                                    {"> "}
                                    <strong>Mã Phòng</strong>: 101
                                </p>
                                <p>
                                    {"> "}
                                    <strong>Tên Phòng</strong>: Phòng 101
                                </p>
                                <p>
                                    {"> "}
                                    <strong>Sức Chứa</strong>: tối đa 3 người
                                </p>
                                <p>
                                    {"> "}
                                    <strong>Loại Phòng</strong>: Vip
                                </p>
                                <p>
                                    {"> "}
                                    <strong>Mô tả thêm</strong>: Phòng có tivi và tủ lạnh
                                </p>
                            </Tab>
                            <Tab eventKey="reviews" title="Đánh giá">
                                Mã Phòng: 101
                                <br />
                                Tên Phòng: Phòng 101
                                <br />
                                Sức Chứa: tối đa 3 người
                                <br />
                                Loại Phòng: Vip <br />
                                Mô tả thêm: Phòng có tivi và tủ lạnh <br />
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="p-3 border border-1 rounded-2">
                        <div>
                            <h6 className="mb-4 text-primary">THÔNG TIN NGƯỜI ĐẶT</h6>
                            <p>
                                {"> "}
                                <strong>Người đặt</strong>: 101
                            </p>
                            <p>
                                {"> "}
                                <strong>Email</strong>: Phòng 101
                            </p>
                        </div>
                        <div className="mt-4">
                            <h6 className="mb-4 text-primary">THÔNG TIN ĐẶT</h6>
                            <form>
                                <p>
                                    {"> "}
                                    <strong>Ngày thuê</strong>: <input type="date" />
                                </p>
                                <p>
                                    {"> "}
                                    <strong>Đơn giá phòng</strong>: 100.000đ/ngày
                                </p>
                                <p>
                                    {"> "}
                                    <strong>Thuế 10%</strong>: 10.000đ
                                </p>
                                <div className="border-top pt-3 pb-2">
                                    <p className="mb-3 text-danger">
                                        <strong>THÀNH TIỀN 100.000đ</strong>
                                    </p>
                                    <Button className="w-100">ĐẶT PHÒNG</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RoomDetails;
