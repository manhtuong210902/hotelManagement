import React, {useState,useRef, useEffect} from 'react'
// import { Col  } from "react-bootstrap";
import {  Popconfirm, Button, Input, Space, Table  } from "antd";
import { Search } from 'react-bootstrap-icons';
import { getBills, getRentalCardsActive, getRentalCardsCanceled } from "../../redux/bookingApi";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'react-bootstrap';
import formatDate from '../../utils/formatDate'
const BookingHistory = () => {
    // const [rentals, setRentals] = useState([{
    //     number: 444,
    //     checkInDate: "2023-05-25",
    //     checkOutDate: "2023-05-28",
    // },{
    //     number: 555,
    //     checkInDate: "2023-05-29",
    //     checkOutDate: "2023-05-30",
    // },{
    //     number: 666,
    //     checkInDate: "2023-05-30",
    //     checkOutDate: "2023-06-1",
    // },{
    //     number: 777,
    //     checkInDate: "2023-05-15",
    //     checkOutDate: "2023-05-25",
    // }])
    const [show, setShow] = useState({});
    const user = useSelector((state) => state.auth.user);
    const rentalCards = useSelector((state) => state.bill.rentals);
    const bills = useSelector((state) => state.bill.bills);
    const rentalCardsCanceled = useSelector((state) => state.bill.cancelRentals);
    // console.log(bills);
    
    const dispatch = useDispatch();

    useEffect(() => {
      getBills(dispatch, user._id);
      getRentalCardsActive(dispatch, user._id)
      getRentalCardsCanceled(dispatch, user._id);
    }, [dispatch, user]);

    //add room-number
    useEffect(()=>{
      
    })
    const handleClose = () => setShow(false);
    

    //search
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
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
              display: 'block',
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
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) => text
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

    function decreaseDate(days, date) {
      const modifiedDate = new Date(date);
      modifiedDate.setDate(modifiedDate.getDate() - days);
      const day = String(modifiedDate.getDate()).padStart(2, '0');
      const month = String(modifiedDate.getMonth() + 1).padStart(2, '0');
      const year = modifiedDate.getFullYear();
      return `${year}-${month}-${day}`;
    }

    function formatD(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
    
      return `${day}/${month}/${year}`;
    }
    const cancelRental = (id) => {
      
      console.log(id);
      
    }
    const columnsRental = [
        {
          title: "Số phòng",
          dataIndex: "number",
          key: "number",
          width: "15%",
          ...getColumnSearchProps('number')
        },
        {
          title: "Ngày nhận phòng",
          dataIndex: "checkInDate",
          key: "checkInDate",
          width: "20%",
          ...getColumnSearchProps('checkInDate'),
          render: (_, record) => {
            return formatDate(record.arrivalDate);
          },
        },
        {
          title: "Ngày trả phòng",
          dataIndex: "checkOutDate",
          key: "checkInDate",
          width: "15%",
          render: (_, record) => {
            const dateCheckIn = formatD(new Date(decreaseDate(-(record.numDays), record.arrivalDate)));
            return dateCheckIn
          },
        },
        {
          title: "Hủy phòng",
          dataIndex: "action",
          key: "action",
          width: "15%",
          render: (_, record) => {
            const dateCheckIn = decreaseDate(2,new Date(record.arrivalDate));
            const dateCheck = new Date(dateCheckIn)
            const curDate = new Date();
            
            if (curDate <= dateCheck)
              return (
                <Popconfirm
                  title="Bạn có chắc chắn muốn hủy đặt phòng này không?"
                  onConfirm={() => cancelRental(record.number)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button type="primary" danger>
                    <i className="fas fa-xmark me-2"></i>
                    Hủy phòng
                  </Button>
                </Popconfirm>
              );
            else return "";
          },
        },
    ];
    
    const columnsBill = [
        {
          title: "Số phòng",
          dataIndex: "number",
          key: "number",
          width: "15%",
        },
        {
          title: "Ngày đặt phòng",
          dataIndex: "createdAt",
          key: "createdAt",
          width: "25%",
          render: (_, record) => {
            return formatDate(record.createdAt);
          },
        },
        {
          title: "Tổng tiền",
          dataIndex: "totalPrice",
          key: "totalPrice",
          width: "15%",
          render: (text, record, index) => {
            return  text +"VND";
          },
        },
        {
          title: "Thanh toán",
          dataIndex: "payment",
          key: "payment",
          width: "20%",
          render: (_, record) => {
            const dateCheckIn = decreaseDate(2,new Date(record.bill_rental[0].arrivalDate));
            const curDate = new Date();
            if (curDate <= dateCheckIn && !record.isPaid)
              return (
                <Popconfirm
                  title="Bạn có chắc chắn muốn thanh toán phiếu đặt phòng phòng này không?"
                  onConfirm={() => cancelRental(record.number)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button type="primary">
                    <i className="fas fa-xmark me-2"></i>
                    Thanh toán
                  </Button>
                </Popconfirm>
              );
            else return "";
          },
        },
        {
          title: "Xem chi tiết",
          dataIndex: "action",
          key: "action",
          width: "20%",
          render: (text, record, index) => {
            return (
              <>    
                <div
                  className={record.isPaid ? "text-center" : ""}
                  style={{ display: "inline" }}
                >
                  <Button
                    variant="dark"
                    onClick={() => {
                      setShow({ ["show_" + record._id]: true });
                    }}
                  >
                    Chi tiết
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
                    <p style={{ fontSize: "1rem" }}>
                      <strong>Mã hóa đơn:</strong> {record._id}
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      <strong>Ngày tạo:</strong> {record.createDate}
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      <strong>Số phòng:</strong> {record.number}
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      <strong>Đơn giá phòng:</strong> ${record.unitPrice}/ngày
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      <strong>Số ngày thuê:</strong> {record.numOfDates}
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      <strong>VAT 10%:</strong> ${record.extraPrice}
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      <strong>TỔNG TIỀN:</strong> ${record.totalPrice}
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      <strong>Tình trạng:</strong>{" "}
                      {record.isPaid
                        ? `Đã thanh toán vào ${record.paidAt}`
                        : "Chưa thanh toán"}
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            );
          },
        },
      ];
    
    const columnsCancel = [
        {
          title: "Số phòng",
          dataIndex: "number",
          key: "number",
          width: "15%",
        },
        {
          title: "Ngày đặt phòng",
          dataIndex: "createdAt",
          key: "createdAt",
          width: "25%",
          render: (_, record) => {
            return formatDate(record.createdAt);
          },
        },
        {
          title: "Ngày nhận phòng",
          dataIndex: "checkInDate",
          key: "checkInDate",
          width: "25%",
          render: (_, record) => {
            return formatDate(record.arrivalDate);
          },
        },
        {
          title: "Ngày hủy",
          dataIndex: "cancelAt",
          key: "cancelAt",
          render: (_, record) => {
            return formatDate(record.cancelAt);
          },
        },
        {
          title: "Người hủy",
          dataIndex: "cancelBy",
          key: "cancelBy",
        }
      ];

    
  return (
    <>
        <h2 className="my-0">Danh sách phiếu đặt phòng</h2>
        <Table
            pagination={{ pageSize: 3, showSizeChanger: false }}
            dataSource={rentalCards}
            columns={columnsRental}
            key="rentals"
        />

        <h2 className="my-0">Danh sách hóa đơn</h2>
        <Table
            pagination={{ pageSize: 3, showSizeChanger: false }}
            dataSource={bills}
            columns={columnsBill}
            key="bill"
        />

        <h2 className="my-0">Danh sách phiếu hủy</h2>
        <Table
            pagination={{ pageSize: 3, showSizeChanger: false }}
            dataSource={rentalCardsCanceled}
            columns={columnsCancel}
            key="cancel"
        />
    </>
  )
}

export default BookingHistory
