import { useState, useEffect } from "react";
import type { ReviewCardProps } from "./ReviewCardProps.types";
import useStyles from "./ReviewCard.styles";
import { CircleCheck, Ban } from "lucide-react";

const ReviewCard = (props: ReviewCardProps) => {

    const styles = useStyles();
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const FLIP_CARD = "flipCard";

    function flipCard() {
        const card = document.getElementById(FLIP_CARD);
        if (card) {
            card.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
            setIsFlipped(!isFlipped);
        }
    }

    useEffect(() => {
        setVisible(false);
        const timeout = setTimeout(() => {
            setVisible(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, [props.word]);


    return (
        <div className={styles.card} onClick={() => flipCard()}>
            <div id={FLIP_CARD} className={styles.innerCard}>
                <div className={styles.front}>
                    <p className={`transition-opacity duration-200 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>{props.word}</p>
                </div>
                <div className={styles.back}>
                    <div className={`${visible ? 'opacity-100' : 'opacity-0'}`}>{props.translation}</div>
                    <div className={styles.buttonsContainer}>
                        <CircleCheck size={30} color="green" onClick={() => { setVisible(false), props.handleYes(props._id), flipCard() }} />
                        <Ban size={30} color="red" onClick={() => { setVisible(false), props.handleNo(props._id), flipCard() }} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ReviewCard;