import { Button, Spinner, Table } from "react-bootstrap";
import { PencilSquare, PlusCircle, Trash } from "react-bootstrap-icons";
import { useEffect } from "react";
import { deleteRoom, getFullRooms } from "../../redux/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import config from "../../config";
import { findroom } from "../../redux/roomSlice";

function TableRoom() {
    const rooms = useSelector((state) => state.room.rooms);
    const roomLoading = useSelector((state) => state.room.roomLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getFullRooms(dispatch);
    }, [dispatch]);

    const handleDeleteRoom = async (id) => {
        try {
            await deleteRoom(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateRoom = (room) => {
        dispatch(findroom(room));
        navigate(config.routes.editroom);
    };

    return (
        <div>
            <div>
                <p className="fst-italic">Danh sách có tổng cộng 10 phòng</p>
                <Link
                    size="sm"
                    className="btn btn-primary d-flex align-items-center gap-2 justify-content-center mb-4 btn-sm"
                    to={config.routes.addroom}
                    style={{
                        width: 150,
                    }}
                >
                    <PlusCircle />
                    Thêm phòng
                </Link>
            </div>

            {roomLoading && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <Spinner animation="border" size="sm" />
                    <span>Đang tải danh sách phòng...</span>
                </div>
            )}
            {rooms.length > 0 && (
                <Table size="lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên phòng</th>
                            <th>Loại phòng</th>
                            <th>Sức chứa</th>
                            <th>Đơn giá</th>
                            <th>Ngày tạo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => {
                            return (
                                <tr key={room._id}>
                                    <td>{room.number}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.capacity}</td>
                                    <td>{room.price}</td>
                                    <td>{formatDate(room.createdAt)}</td>
                                    <td className="d-flex gap-2">
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="d-flex align-items-center gap-2 justify-content-center"
                                            onClick={() => handleUpdateRoom(room)}
                                        >
                                            <PencilSquare /> Chỉnh sửa
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="d-flex align-items-center gap-2 justify-content-center"
                                            onClick={() => handleDeleteRoom(room._id)}
                                        >
                                            <Trash /> Xóa
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default TableRoom;
