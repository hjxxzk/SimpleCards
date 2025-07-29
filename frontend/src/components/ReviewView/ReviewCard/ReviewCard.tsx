import { useState } from "react";
import type { ReviewCardProps } from "./ReviewCardProps.types";
import useStyles from "./ReviewCard.styles";
import { CircleCheck, Ban } from "lucide-react";

const ReviewCard = (props: ReviewCardProps) => {

    const styles = useStyles();
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [visible, setVisible] = useState(true);
    const FLIP_CARD = "flipCard";

    function flipCard() {
        const card = document.getElementById(FLIP_CARD);
        if (card) {
            card.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
            setIsFlipped(!isFlipped);
        }
    }

    return (
        <div className={styles.card} onClick={() => flipCard()}>
            <div id={FLIP_CARD} className={styles.innerCard}>
                <div className={styles.front}>
                    <p className={`${styles.transition} ${visible ? 'opacity-100' : 'opacity-0'}`}>{props.word}</p>
                </div>
                <div className={styles.back}>
                    <div className={`${visible ? 'opacity-100' : 'opacity-0'}`}>{props.translation}</div>
                    <div className={styles.buttonsContainer}>
                        <CircleCheck className={styles.yesButton} size={50} color="green" onClick={() => { props.handleYes(props._id), setVisible(false), setTimeout(() => { flipCard(), setVisible(true) }, 500) }} />
                        <Ban className={styles.noButton} size={50} color="red" onClick={() => { props.handleNo(props._id), setVisible(false), setTimeout(() => { flipCard(), setVisible(true) }, 500) }} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ReviewCard;