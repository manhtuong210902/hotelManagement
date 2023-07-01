import Rating from "./Rating";
import moment from "moment";

function ReviewItem({ data }) {
    return (
        <div className="review-item">
            <div className="review-item_name">{data.author?.fullname}</div>
            <Rating numberOfStars={data.stars} />
            <div className="review-item_time">{moment(data.createdAt).format("DD/MM/YYYY HH:mm")}</div>
            <p className="review-item_content">{data.text}</p>
        </div>
    );
}

export default ReviewItem;
