import { Button } from "react-bootstrap";

function Banner() {
    return (
        <div className="banner">
            <div className="overlay"></div>

            <div className="banner_details mt-5">
                <h1>HCMUS Hotel</h1>
                <p>Địa Chỉ: Đường 38, Nguyễn Thị Minh Khai, TP Dĩ An</p>
                <p>SĐT: 0890 023 093</p>
                <Button className="mt-3">ĐẶT PHÒNG NGAY</Button>
            </div>
        </div>
    );
}

export default Banner;
