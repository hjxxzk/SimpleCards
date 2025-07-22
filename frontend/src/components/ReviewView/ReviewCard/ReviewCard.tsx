import { useState } from "react";
import type { ReviewCardProps } from "./ReviewCardProps.types";
import useStyles from "./ReviewCard.styles";

const ReviewCard = (props: ReviewCardProps) => {

    const styles = useStyles();
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const FLIP_CARD = "flipCard"
    const ROTATE_CARD = 'rotateY(180deg)';

    function flipCard() {
        setIsFlipped(!isFlipped);
        const card = document.getElementById(FLIP_CARD);
        if (card) {
            card.style.transform = ROTATE_CARD;
        }
    }

    return (
        <div className={styles.card} onClick={() => flipCard()}>
            <div id={FLIP_CARD} className={styles.innerCard}>
                <div className={styles.front}>
                    <p className={styles.text}>{props.word}</p>
                </div>
                <div className={styles.back}>
                    <div className={styles.text}>{props.translation}</div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.yesButton} onClick={() => props.handleYes(props._id)}>I KNOW</button>
                        <button className={styles.noButton} onClick={() => props.handleNo(props._id)}>I DON'T KNOW</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ReviewCard;