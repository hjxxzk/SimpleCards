import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard/ReviewCard";
import useStyles from "./ReviewView.styles";
import type { CardProps } from "../EditView/Card/CardProps.types";
import { useParams } from "react-router-dom";
import { shuffleCards } from "../../services/CardReviewService";

function ReviewView() {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const styles = useStyles();
    const params = useParams();
    const [cards, setCards] = useState<CardProps[]>();
    const [currentCardIndex, setcurrentCardIndex] = useState(0);

    useEffect(() => {
        if (params) {
            fetchCards();
        }
    }, [params]);

    const fetchCards = async () => {
        try {
            const res = await fetch(`${DB_ADDRESS}${CARDS}?search=${params.id}`);
            const fetchedCards = await res.json();
            if (fetchedCards) {
                prepareCards(fetchedCards)
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    function prepareCards(cards: CardProps[]) {
        const shuffledCards = shuffleCards(cards)
        setCards(shuffledCards)
    }

    function handleRememberedCard(_id: number) {
    }


    function handleNotRememberedCard(_id: number) {
    }

    return (
        <div className={styles.mainContainer}>
            {cards?.length ? <ReviewCard _id={cards[currentCardIndex]._id} word={cards[currentCardIndex].word} translation={cards[currentCardIndex].translation} handleYes={handleRememberedCard} handleNo={handleNotRememberedCard} /> : null}
        </div>
    )
}

export default ReviewView;