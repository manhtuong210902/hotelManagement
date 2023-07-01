import React, { useState, useRef, useEffect } from "react";
import { PlusCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { Button, Input, Space, Table, notification, Segmented } from "antd";
import { Search } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";

function BookingHis() {
    const [rentals, setRentals] = useState([]);
    const [bills, setBills] = useState([]);
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [show, setShow] = useState(false);
    const [type, setType] = useState("Tất cả");
    const [api, contextHolder] = notification.useNotification();
    const title = ["Tất cả", "Nhận phòng hôm nay", "Đã nhận phòng"];
    const openNotification = () => {
        api.info({
            message: `Khách hàng chưa thanh toán`,
        });
    };

    const dispatch = useDispatch();
    const config = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer`,
        },
    };

    const CheckIn = async (id) => {
        axios.post(`${API_URL}/book/check-in`, { id }, config).then((res) => {
            const newrental = rentals.map((rental) => {
                if (rental._id === id) return { ...rental, isCheckIn: true };
                return rental;
            });
            setRentals(newrental);
        });
    };

    const CheckOut = async (id) => {
        axios.post(`${API_URL}/book/check-out`, { id }, config).then((res) => {
            const newrental = rentals.map((rental) => {
                if (rental._id === id) return { ...rental, isCheckOut: true };
                return rental;
            });
            setRentals(newrental);
        });
    };

    const updateBill = async (id, rentalId) => {
        axios.post(`${API_URL}/book/update-bill-by-emp`, { id }, config).then((res) => {
            const newBill = bills.map((rental) => {
                if (rental._id === id) return { ...rental, isPaid: true };
                return rental;
            });
            setBills(newBill);
            CheckIn(rentalId);
        });
    };

    useEffect(() => {
        const getRentalCard = async () => {
            const path = type === "Tất cả" ? "in" : type === "Nhận phòng hôm nay" ? "in-today" : "out";
            axios.post(`${API_URL}/book/get-rental-check-${path}`, config).then((res) => {
                if (res.data.success) {
                    setRentals(res.data.rentalCard);
                    setBills(res.data.bill);
                    setUsers(res.data.users);
                }
            });
        };

        axios.get(`${API_URL}/rooms/`, config).then((resp) => {
            setRooms(resp.data.rooms);
        });
        getRentalCard();
    }, [dispatch, type]);

    //search
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <Search
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => text,
        // searchedColumn === dataIndex ? (
        //   <Highlighter
        //     highlightStyle={{
        //       backgroundColor: '#ffc069',
        //       padding: 0,
        //     }}
        //     searchWords={[searchText]}
        //     autoEscape
        //     textToHighlight={text ? text.toString() : ''}
        //   />
        // ) : (
        //   text
        // ),
    });
    //end search

    const columnsRental = [
        {
            title: "Mã phiếu đặt phòng",
            dataIndex: "_id",
            key: "_id",
            width: "10%",
            ...getColumnSearchProps("_id"),
        },
        {
            title: "Phòng",
            key: "ph",
            width: "10%",
            render: (_, record) => {
                const room = rooms.filter((room) => room._id === record.room);
                return room[0].number;
            },
        },
        {
            title: "Khách hàng",
            key: "kh",
            width: "15%",
            render: (_, record) => {
                const user = users.filter((us) => us._id === record.user);
                const billUser = bills.filter((bill) => bill.rentalCard === record._id);
                return (user[0] && user[0].fullname) || (billUser[0] && billUser[0].paymentResult.name);
            },
        },
        {
            title: "Ngày nhận phòng",
            dataIndex: "checkInDate",
            key: "checkInDate",
            width: "15%",
            // ...getColumnSearchProps('checkInDate'),
            render: (_, record) => {
                return formatDate(record.arrivalDate);
            },
        },
        {
            title: "Check-in",
            dataIndex: "isCheckIn",
            key: "isCheckIn",
            width: "15%",
            render: (_, record) => {
                const billUser = bills.filter((bill) => bill.rentalCard === record._id);
                const user = users.filter((us) => us._id === record.user);
                const room = rooms.filter((room) => room._id === record.room);

                if (!record.isCheckIn)
                    return (
                        <>
                            {contextHolder}
                            <div className={record.isPaid ? "text-center" : ""} style={{ display: "inline" }}>
                                <Button
                                    variant="dark"
                                    type="primary"
                                    warning
                                    onClick={() => {
                                        setShow({ ["show_" + record._id]: true });
                                    }}
                                >
                                    Check-in
                                </Button>
                            </div>

                            <Modal
                                show={show["show_" + record._id]}
                                onHide={() => setShow({ ["show_" + record._id]: false })}
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Chi tiết hóa đơn</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4 style={{ fontSize: "20px" }}>Thông tin khách hàng:</h4>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Số căn cước công dân:</strong> {user[0].cccd}
                                    </p>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Họ tên khách hàng:</strong> {user[0].fullname}
                                    </p>
                                    <h4 style={{ fontSize: "20px" }}>Thông tin đặt phòng:</h4>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Ngày check-in:</strong> {formatDate(record.arrivalDate)}
                                    </p>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Số ngày thuê phòng:</strong> {record.numDays}
                                    </p>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Tổng tiền:</strong> {billUser[0].totalPrice}
                                    </p>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Tình trạng thanh toán:</strong>{" "}
                                        {billUser[0].isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                                    </p>
                                    <h4 style={{ fontSize: "20px" }}>Thông tin phòng:</h4>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Số phòng:</strong> {room[0] && room[0].number}
                                    </p>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Loại phòng:</strong> {room[0] && room[0].type}
                                    </p>
                                    <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                        <strong>Sức chứa:</strong> {room[0] && room[0].capacity}
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    {!billUser[0].isPaid && (
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                updateBill(billUser[0]._id, record._id);
                                            }}
                                        >
                                            Thanh toán
                                        </Button>
                                    )}
                                    <Button
                                        variant="dark"
                                        type="primary"
                                        warning
                                        onClick={() => {
                                            if (billUser[0].isPaid) CheckIn(record._id);
                                            else openNotification();
                                        }}
                                    >
                                        Check-in
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    );
                else return "Đã check-in";
            },
        },
        {
            title: "Check-out",
            dataIndex: "isCheckOut",
            key: "isCheckOut",
            width: "15%",
            render: (_, record) => {
                if (!record.isCheckOut && record.isCheckIn)
                    return (
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                CheckOut(record._id);
                            }}
                        >
                            <i className="fas fa-xmark me-2"></i>
                            Check-out
                        </Button>
                    );
                else if (!record.isCheckIn) return "";
                else return "Đã check-out";
            },
        },
        {
            title: "",
            dataIndex: "isCheckIn",
            key: "isCheckIn",
            width: "15%",
            render: (_, record) => {
                const billUser = bills.filter((bill) => bill.rentalCard === record._id);
                const user = users.filter((us) => us._id === record.user);
                const room = rooms.filter((room) => room._id === record.room);
                return (
                    <>
                        <div className={record.isPaid ? "text-center" : ""} style={{ display: "inline" }}>
                            <Button
                                onClick={() => {
                                    setShow({ ["show_" + record._id]: true });
                                }}
                            >
                                Thông tin chi tiết
                            </Button>
                        </div>

                        <Modal
                            show={show["show_" + record._id]}
                            onHide={() => setShow({ ["show_" + record._id]: false })}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết hóa đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h4 style={{ fontSize: "20px" }}>Thông tin khách hàng:</h4>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Số căn cước công dân:</strong>{" "}
                                    {(user[0] && user[0].cccd) || (billUser[0] && billUser[0].paymentResult.cccd)}
                                </p>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Họ tên khách hàng:</strong>{" "}
                                    {(user[0] && user[0].fullname) || (billUser[0] && billUser[0].paymentResult.name)}
                                </p>
                                <h4 style={{ fontSize: "20px" }}>Thông tin đặt phòng:</h4>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Ngày check-in:</strong> {formatDate(record.arrivalDate)}
                                </p>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Số ngày thuê phòng:</strong> {record.numDays}
                                </p>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Tổng tiền:</strong> {billUser[0].totalPrice}
                                </p>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Tình trạng thanh toán:</strong>{" "}
                                    {billUser[0].isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                                </p>
                                <h4 style={{ fontSize: "20px" }}>Thông tin phòng:</h4>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Số phòng:</strong> {room[0] && room[0].number}
                                </p>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Loại phòng:</strong> {room[0] && room[0].type}
                                </p>
                                <p style={{ fontSize: "15px", paddingLeft: "20px" }}>
                                    <strong>Sức chứa:</strong> {room[0] && room[0].capacity}
                                </p>
                            </Modal.Body>
                        </Modal>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <div>
                <p className="fst-italic">Danh sách có tổng cộng {rentals.length} đơn đặt phòng</p>
                <Link
                    size="sm"
                    className="btn btn-primary d-flex align-items-center gap-2 justify-content-center mb-4 btn-sm"
                    to={"/booking"}
                    style={{
                        width: 200,
                    }}
                >
                    <PlusCircle />
                    Thêm đơn đặt phòng
                </Link>
            </div>
            <Segmented options={title} value={type} onChange={setType} size="large" />

            {rentals.length < 0 && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <span>Đang tải danh sách phòng...</span>
                </div>
            )}
            <Table
                pagination={{ pageSize: 6, showSizeChanger: false }}
                dataSource={rentals}
                columns={columnsRental}
                key="rentals"
            />
        </div>
    );
}

export default BookingHis;
