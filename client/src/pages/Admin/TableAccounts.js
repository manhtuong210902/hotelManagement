import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import { Spinner } from "react-bootstrap";

function TableAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState([]);

    const columnsAccount = [
        {
            title: "Họ tên",
            dataIndex: "fullname",
            key: "fullname",
            width: "30%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
        },
        {
            title: "CMND/CCCD",
            dataIndex: "cccd",
            key: "cccd",
            width: "20%",
        },
        {
            title: "Vai Trò",
            dataIndex: "roles",
            key: "roles",
            width: "20%",
        },
    ];

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const reponse = await axios.get(`${API_URL}/user/account`);
                setLoading(true);
                if (reponse.data.success) {
                    console.log(reponse.data.accounts);
                    setAccounts(reponse.data.accounts);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, []);

    return (
        <>
            <h5 className="text-primary mb-0 d-flex text-end gap-2 py-2 mb-3">DANH SÁCH TẤT CẢ TÀI KHOẢN</h5>

            {loading && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <Spinner animation="border" size="sm" />
                    <span>Đang tải dữ liệu...</span>
                </div>
            )}

            <Table
                pagination={{
                    pageSize: 6,
                    showSizeChanger: false,
                }}
                dataSource={accounts}
                columns={columnsAccount}
            />
        </>
    );
}

export default TableAccounts;
