import { Container, Row, Spinner } from "react-bootstrap";
import RoomItem from "../RoomItem/RoomItem";
import FormSearch from "./FromSearch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { XOctagon } from "react-bootstrap-icons";

function SearchRoom() {
    const { query } = useParams();
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(`${API_URL}/rooms/search?q=${query}`);
            console.log(result);
            setLoading(false);
            setSearchResult(result.data.rooms);
        };
        fetchApi();
    }, [query]);

    console.log(query);
    return (
        <Container className="py-5">
            <Row>
                <h4>Danh sách phòng</h4>
                <p className="fst-italic text-success">
                    {searchResult.length} kết quả qua từ khóa "{query}"
                </p>
                <FormSearch />
            </Row>
            <Row>
                {loading && (
                    <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                        <Spinner animation="border" size="sm" />
                        <span>Đang tải danh sách phòng...</span>
                    </div>
                )}
                {searchResult.length > 0 ? (
                    searchResult.map((item) => {
                        return <RoomItem data={item} key={item._id} />;
                    })
                ) : (
                    <>
                        <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-danger">
                            <XOctagon />
                            <span>Không tìm thấy kết quả cần tìm</span>
                        </div>
                    </>
                )}
            </Row>
        </Container>
    );
}

export default SearchRoom;
