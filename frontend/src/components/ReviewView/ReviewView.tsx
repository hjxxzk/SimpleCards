import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard/ReviewCard";
import useStyles from "./ReviewView.styles";
import type { CardProps } from "../EditView/Card/CardProps.types";
import { useNavigate, useParams } from "react-router-dom";
import { addCardToRepeatInRandomPlace, findLastMatch, shuffleCards } from "../../services/CardReviewService";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

function ReviewView() {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const styles = useStyles();
    const params = useParams();
    const navigate = useNavigate();
    const [cards, setCards] = useState<CardProps[]>();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [areCongratulationsVisible, setAreCongratulationsVisible] = useState(false);
    const [isReviewCompleted, setIsReviewCompleated] = useState(false);
    const { width, height } = useWindowSize();
    const EDIT_DECK_SCREEN = `/edit/${params.id}`;

    useEffect(() => {
        fetchCards();
    }, [params.id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAreCongratulationsVisible(false);
        }, 10000);

        return () => clearTimeout(timeout);
    }, [areCongratulationsVisible]);

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

    function prepareCards(fetchedCards: CardProps[]) {
        const shuffledCards = shuffleCards(fetchedCards)
        setCards(shuffledCards);
    }

    function handleRememberedCard(_id: number) {
        if (cards && currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else if (cards && currentCardIndex === cards.length - 1) {
            setAreCongratulationsVisible(true);
            setIsReviewCompleated(true);
        }
    }


    function handleNotRememberedCard(_id: number) {
        if (cards) {
            const cardToBeRepeated = findLastMatch(_id, cards);
            if (cardToBeRepeated) {
                const updatedDeck = addCardToRepeatInRandomPlace(cardToBeRepeated, cards);
                setCards(updatedDeck);
                setCurrentCardIndex(currentCardIndex + 1);
            }
        }
    }

    return (
        <div className={styles.mainContainer}>
            {(cards?.length && !isReviewCompleted) ? <ReviewCard _id={cards[currentCardIndex]._id} word={cards[currentCardIndex].word} translation={cards[currentCardIndex].translation} handleYes={handleRememberedCard} handleNo={handleNotRememberedCard} /> : <div className={styles.noContentMessage}>Start by adding cards to your deck!<button className={styles.addCardsButton} onClick={() => { navigate(EDIT_DECK_SCREEN) }}>Add cards<button></button></button></div>}
            {areCongratulationsVisible && <>
                <Confetti
                    width={width}
                    height={height}
                />
                <div className="font-semibold text-xl">Congratulations!</div>
            </>
            }
        </div>
    )
}

export default ReviewView;