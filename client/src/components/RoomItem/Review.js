import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FloatingLabel, Spinner, Button, Alert } from "react-bootstrap";
import { API_URL } from "../../utils/constants";
import ReviewItem from "./ReviewItem";
import { Star, StarFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../config";

function Review({ roomId }) {
    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        setLoading(true);
        const fetchApi = async () => {
            setLoading(true);
            const result = await axios.get(`${API_URL}/reviews/${roomId}`);
            if (result.data.success) {
                console.log(result.data.reviews);
                setReviews(result.data.reviews);
            }
            //
            setLoading(false);
        };
        fetchApi();
    }, [roomId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Bạn chưa chọn số sao đánh giá !!!");
            return;
        }

        const res = await axios.post(`${API_URL}/reviews/add`, {
            roomId: roomId,
            text: reviewInput,
            stars: rating,
        });

        if (res.data.success) {
            setReviews((prevReviews) => [res.data.review, ...prevReviews]);
        }

        setReviewInput("");
    };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const starIcon = i <= rating ? <StarFill /> : <Star />;
            stars.push(
                <span key={i} onClick={() => handleStarClick(i)}>
                    {starIcon}
                </span>
            );
        }

        return stars;
    };

    return (
        <div>
            <div>
                <h5 className="text-primary">{reviews.length} Bài đánh giá</h5>
                <div>
                    {loading && (
                        <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                            <Spinner animation="border" size="sm" />
                            <span>Đang tải đánh giá phòng...</span>
                        </div>
                    )}

                    {reviews.length > 0 ? (
                        reviews.map((review) => {
                            return <ReviewItem key={review._id} data={review} />;
                        })
                    ) : (
                        <Alert key={"primary"} variant={"primary"} className="my-3 text-center">
                            Chưa có đánh giá nào cho phòng này{" "}
                            <p className="my-1">
                                <Alert.Link href="#review">Đi tới đánh giá</Alert.Link>
                            </p>
                        </Alert>
                    )}
                </div>
            </div>
            <div className="mt-3">
                <h5 className="text-primary">Để lại đánh giá của bạn</h5>
                {user ? (
                    <Form className="mt-3" onSubmit={handleSubmitReview}>
                        <div className="rating-input">{renderStars()}</div>
                        <FloatingLabel label="Viết đánh giá">
                            <Form.Control
                                id="review"
                                as="textarea"
                                style={{ height: "100px" }}
                                value={reviewInput}
                                onChange={(e) => {
                                    setReviewInput(e.target.value);
                                }}
                            />
                            <Button type="submit" className="mt-3">
                                Gửi đánh giá
                            </Button>
                        </FloatingLabel>
                    </Form>
                ) : (
                    <p className="text-danger">
                        <Link to={config.routes.login} className="text-danger fw-bold">
                            Đăng nhập
                        </Link>{" "}
                        để đánh giá phòng này
                    </p>
                )}
            </div>
        </div>
    );
}

export default Review;
