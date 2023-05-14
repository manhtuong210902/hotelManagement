import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormSearch() {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchValue("");
        navigate(`/search/${searchValue}`);
    };

    return (
        <Form className="d-flex mt-2 search-input mb-3" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                placeholder="Tìm kiếm phòng"
                className="me-2"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="outline-success" className="text-nowrap">
                Tìm kiếm
            </Button>
        </Form>
    );
}

export default FormSearch;
