import { Container, Row, Spinner } from "react-bootstrap";
import RoomItem from "../RoomItem/RoomItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFullRooms } from "../../redux/apiRequests";
import FormSearch from "./FromSearch";

function GridRoom() {
    const rooms = useSelector((state) => state.room.rooms);
    const roomLoading = useSelector((state) => state.room.roomLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        getFullRooms(dispatch);
    }, [dispatch]);

    return (
        <Container className="py-5">
            <Row>
                <h4>Danh sách phòng</h4>
                <FormSearch />
            </Row>
            <Row>
                {roomLoading && (
                    <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                        <Spinner animation="border" size="sm" />
                        <span>Đang tải danh sách phòng...</span>
                    </div>
                )}
                {rooms.length > 0 &&
                    rooms.map((item) => {
                        return <RoomItem data={item} key={item._id} />;
                    })}
            </Row>
        </Container>
    );
}

export default GridRoom;
