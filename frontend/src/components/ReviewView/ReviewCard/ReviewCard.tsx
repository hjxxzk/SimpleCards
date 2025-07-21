import { useState } from "react";
import type { ReviewCardProps } from "./ReviewCardProps.types";
import useStyles from "./ReviewCard.styles";

const ReviewCard = (props: ReviewCardProps) => {

    const styles = useStyles();
    const [cardContent, setCardContent] = useState<string>(props.word)

    return (
        <div className={styles.card} onClick={() => setCardContent(props.translation)}>
            {cardContent}
            <div className={styles.buttonsContainer}>
                <button className={styles.yesButton} onClick={() => props.handleYes(props._id)}>I KNOW</button>
                <button className={styles.noButton} onClick={() => props.handleNo(props._id)}>I DON'T KNOW</button>
            </div>
        </div >
    );
}

export default ReviewCard;