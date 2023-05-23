import axios from "axios";
import { useEffect, useState } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import { API_URL } from "../../utils/constants";
import useDebounce from "../../hooks/useDebounce";

function ListChatUser({ setIdChat }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        setLoading(true);

        const fetchApi = async () => {
            setLoading(true);
            let result = [];
            if (debounceValue.length > 0) {
                result = await axios.get(`${API_URL}/chats/search?q=${debounceValue}`);
                console.log("none");
                console.log(result);
            } else {
                result = await axios.get(`${API_URL}/chats`);
                console.log("no none");
                console.log(result);
            }
            setLoading(false);
            setSearchResult(result.data.chats);
        };
        fetchApi();
    }, [debounceValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
    };
    return (
        <div>
            <Form className="d-flex search-user mb-3">
                <Form.Control
                    type="search"
                    placeholder="Tìm kiếm khách hàng"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleChange}
                    value={searchValue}
                />
            </Form>

            {loading && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <Spinner animation="border" size="sm" />
                    <span>Đang tìm kiếm...</span>
                </div>
            )}
            {searchResult.length > 0 && (
                <ListGroup className="rounded-0 rounded-start">
                    {searchResult.map((item) => {
                        return (
                            <ListGroup.Item
                                key={item._id}
                                className="d-flex justify-content-between align-items-start"
                                onClick={() => {
                                    setIdChat(item.customer._id);
                                    setSearchValue("");
                                }}
                            >
                                <div className="ms-2 me-auto user-chat-item">
                                    <div className="fw-semibold">{item.customer.fullname}</div>
                                    <span className="fst-italic">{item.customer.email}</span>
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            )}
        </div>
    );
}

export default ListChatUser;
