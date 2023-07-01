import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import { Spinner, Table } from "react-bootstrap";

function StatusRoom() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_URL}/rooms/status`);
                setData(res.data.roomsWithVacantStatus);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <div>
                <p className="fst-italic">Danh sách trạng thái phòng</p>
            </div>

            {loading && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <Spinner animation="border" size="sm" />
                    <span>Đang tải danh sách phòng...</span>
                </div>
            )}
            {data.length > 0 && (
                <Table size="lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên phòng</th>
                            <th>Loại phòng</th>
                            <th>Sức chứa</th>
                            <th>Đơn giá</th>

                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr key={item.room._id}>
                                    <td>{item.room.number}</td>
                                    <td>{item.room.name}</td>
                                    <td>{item.room.type}</td>
                                    <td>{item.room.capacity} người</td>
                                    <td>{item.room.price.toLocaleString("vi-VN")}đ/ngày</td>

                                    <td>
                                        {item.vacant ? (
                                            <span className="text-success">Đang trống</span>
                                        ) : (
                                            <span className="text-danger">Đang được thuê</span>
                                        )}
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

export default StatusRoom;
