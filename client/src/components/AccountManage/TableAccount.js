import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { PencilSquare, PlusCircle, Trash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import formatDate from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import { findUser } from "../../redux/authSlice";

function TableAccount({ type }) {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            let result = [];

            if (type === "Employee") {
                result = await axios.get(`${API_URL}/user/employee`);
            } else {
                result = await axios.get(`${API_URL}/user/customer`);
            }
            setAccounts(result.data.customers);
            setLoading(false);
        };
        fetchApi();
    }, [type]);

    const handleDeleteAccount = async (id) => {
        const confirmed = window.confirm("Bạn có chắc sẽ xóa tài khoản này ?");
        if (confirmed) {
            try {
                await axios.delete(`${API_URL}/user/delete/${id}`);
                setAccounts((prev) => {
                    return prev.filter((user) => user._id !== id);
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleUpdateAccount = (account) => {
        dispatch(findUser(account));
        navigate(`/employee/edit/${account._id}`);
    };

    return (
        <div>
            <div>
                <p className="fst-italic">Danh sách có tổng cộng {accounts.length} User</p>
                {type === "Employee" && (
                    <Link
                        size="sm"
                        className="btn btn-primary d-flex align-items-center gap-2 justify-content-center mb-4 btn-sm"
                        style={{
                            width: 150,
                        }}
                    >
                        <PlusCircle />
                        Thêm Nhân Viên
                    </Link>
                )}
            </div>

            {loading && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <Spinner animation="border" size="sm" />
                    <span>Đang tải danh sách...</span>
                </div>
            )}

            {accounts.length > 0 && (
                <Table size="lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>CCCD/CMND</th>
                            <th>Vai trò</th>
                            <th>Ngày tạo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, index) => {
                            return (
                                <tr key={account._id}>
                                    <td>{index + 1}</td>
                                    <td>{account.fullname}</td>
                                    <td>{account.email}</td>

                                    <td>{account.cccd}</td>
                                    <td>{account?.position || "Khách hàng"}</td>
                                    <td>{formatDate(account.createdAt)}</td>

                                    <td className="d-flex gap-2">
                                        {type === "Employee" && (
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="d-flex align-items-center gap-2 justify-content-center"
                                                onClick={() => handleUpdateAccount(account)}
                                            >
                                                <PencilSquare /> Chỉnh sửa
                                            </Button>
                                        )}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="d-flex align-items-center gap-2 justify-content-center"
                                            onClick={() => handleDeleteAccount(account._id)}
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

export default TableAccount;
