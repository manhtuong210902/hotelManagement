import React, {useState,useRef, useEffect} from 'react'
import { PencilSquare, PlusCircle } from "react-bootstrap-icons";
import { getFullRooms } from "../../redux/apiRequests";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import axios from 'axios'
import { API_URL } from "../../utils/constants";
import { Button, Input, Space, Table  } from "antd";
import { Search } from 'react-bootstrap-icons';



function BookingHis() {
    const [rentals, setRentals] = useState([])
    const [bills, setBills] = useState([])
    const [users, setUsers] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const config = {
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
        },
    };

    const CheckIn = async (id) => {
      axios.post(
          `${API_URL}/book/check-in`,
          {id},
          config
      )
      .then(res => {
          const newrental = rentals.map(rental =>{
            if(rental._id === id) 
              return {...rental, isCheckIn: true}
            return rental
          })
          setRentals(newrental)
      })
  }

  const CheckOut = async (id) => {
    axios.post(
        `${API_URL}/book/check-out`,
        {id},
        config
    )
    .then(res => {
        const newrental = rentals.map(rental =>{
          if(rental._id === id) 
            return {...rental, isCheckOut: true}
          return rental
        })
        setRentals(newrental)
    })
}

    useEffect( () => {
      const getRentalCard = async () => {
          axios.post(
              `${API_URL}/book/get-rental-check-in`,
              config
          )
          .then(res => {
            if(res.data.success){
              setRentals(res.data.rentalCard)
              setBills(res.data.bill)
              setUsers(res.data.users)
            }

          })
      }
      getRentalCard()
      
    }, [dispatch]);

    const newRentalCard = () => {
      const n = rentals.map(rental => {
        const user = users.filter(user => user._id === rental.booker)
        const bill = bills.filter(bill => bill.rentalCard === rental._id)
        return {...rental, user, bill}
      })
      setRentals(n)
      
    }

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

    const columnsRental = [
      {
        title: "#",
        dataIndex: "_id",
        key: "_id",
        width: "10%",
        ...getColumnSearchProps('_id')
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
        title: "Check-in",
        dataIndex: "isCheckIn",
        key: "isCheckIn",
        width: "15%",
        render: (_, record) => {
          if(!record.isCheckIn)
            return (
                <Button 
                  type="primary" warning
                  onClick={() => {
                    CheckIn(record._id)
                  }}  
                >
                  <i className="fas fa-xmark me-2"></i>
                  Check-in
                </Button>
            );
          else return ("Đã check-in")
        },
      },
      {
        title: "Check-out",
        dataIndex: "isCheckOut",
        key: "isCheckOut",
        width: "15%",
        render: (_, record) => {
          if(!record.isCheckOut && record.isCheckIn)
            return (
                <Button 
                  type="primary" danger
                  onClick={() => {
                    CheckOut(record._id)
                  }}  
                >
                  <i className="fas fa-xmark me-2"></i>
                  Check-out
                </Button>
            );
          else if(!record.isCheckIn)
              return ""
          else return "Đã check-out"
        },
      },
      {
        width: "10%",
        render: (_, record) => {
          if(!record.isCheckIn)
            return (
                <Button type="dark" danger>
                  <i className="fas fa-xmark me-2"></i>
                  Cập nhật thông tin
                </Button>
            );
          else if(!record.isCheckIn)
              return ""
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
                    to={'/booking'}
                    style={{
                        width: 200,
                    }}
                >
                    <PlusCircle />
                    Thêm đơn đặt phòng
                </Link>
            </div>

            {rentals.length < 0 && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <span>Đang tải danh sách phòng...</span>
                </div>
            )}
            <Table
            pagination={{ pageSize: 10, showSizeChanger: false }}
            dataSource={rentals}
            columns={columnsRental}
            key="rentals"
        />

        </div>
    );
}

export default BookingHis
