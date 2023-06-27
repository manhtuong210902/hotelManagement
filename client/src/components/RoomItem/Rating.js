import { StarFill } from "react-bootstrap-icons";

const Rating = ({ numberOfStars }) => {
    const stars = [];

    for (let i = 0; i < numberOfStars; i++) {
        stars.push(<StarFill key={i} />);
    }

    return <div className="review-item_stars">{stars}</div>;
};

export default Rating;
