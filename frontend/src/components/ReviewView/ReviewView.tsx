import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard/ReviewCard";
import useStyles from "./ReviewView.styles";
import type { CardProps } from "../EditView/Card/CardProps.types";
import { useNavigate, useParams } from "react-router-dom";
import { addCardToRepeatInRandomPlace, findLastMatch, shuffleCards } from "../../services/CardReviewService";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { Repeat } from "lucide-react";
import type { DeckProps } from "../Bars/Deck/DeckProps.types";

function ReviewView() {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;
    const CARDS = import.meta.env.VITE_CARDS;
    const styles = useStyles();
    const params = useParams();
    const navigate = useNavigate();
    const [cards, setCards] = useState<CardProps[]>();
    const [deck, setDeck] = useState<DeckProps>();
    const [fetchedCards, setfetchedCards] = useState<CardProps[]>();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [areCongratulationsVisible, setAreCongratulationsVisible] = useState(false);
    const [isReviewCompleted, setIsReviewCompleated] = useState(false);
    const { width, height } = useWindowSize();
    const EDIT_DECK_SCREEN = `/edit/${params.id}`;

    useEffect(() => {
        fetchCards();
        setIsReviewCompleated(false);
        setAreCongratulationsVisible(false);
        setCurrentCardIndex(0);
        fetchNumberOfRepetitions();
    }, [params.id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAreCongratulationsVisible(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [areCongratulationsVisible]);

    const fetchCards = async () => {
        try {
            const res = await fetch(`${DB_ADDRESS}${CARDS}?search=${params.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } });
            const fetchedCards = await res.json();
            if (fetchedCards) {
                setfetchedCards(fetchedCards);
                prepareCards(fetchedCards);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    function prepareCards(fetchedCards: CardProps[]) {
        const shuffledCards = shuffleCards(fetchedCards)
        setCards(shuffledCards);
    }

    async function handleRememberedCard(_id: string) {
        if (cards && currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else if (cards && currentCardIndex === cards.length - 1) {
            await completeReview();
        }
    }

    async function completeReview() {
        setAreCongratulationsVisible(true);
        setIsReviewCompleated(true);
        await increaseNumberOfRepetitions();
        await saveRememberedCards();
    }

    function findCardToUpdate(id: string): CardProps | undefined {
        return cards?.find((card) => card._id === id);
    }

    function groupCardsByCount() {
        return cards?.reduce<Record<string, number>>((accumulator, currentCard) => {
            const key = currentCard._id;
            accumulator[key] = (accumulator[key] || 0) + 1;
            return accumulator;
        }, {});
    }

    async function saveRememberedCards() {
        const groupedByCardId = groupCardsByCount();
        if (groupedByCardId) {
            Object.entries(groupedByCardId).forEach(([cardId, count]) => {
                const card = findCardToUpdate(cardId);
                if (card) {
                    count > 1 ? saveAsNotRemembered(card) : saveAsRemembered(card);
                }
            });
        }
    }

    async function saveAsRemembered(updatedCard: CardProps) {
        if (!updatedCard.isRemembered) {
            updatedCard.isRemembered = true;
            await fetch(`${DB_ADDRESS}${CARDS}/${updatedCard._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updatedCard }),
            })
                .then(res => res.json())
                .catch(err => console.error('Error:', err));
        }
    }

    async function saveAsNotRemembered(updatedCard: CardProps) {
        if (updatedCard.isRemembered) {
            updatedCard.isRemembered = false;
            await fetch(`${DB_ADDRESS}${CARDS}/${updatedCard._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updatedCard }),
            })
                .then(res => res.json())
                .catch(err => console.error('Error:', err));
        }
    }

    async function increaseNumberOfRepetitions() {
        if (deck) {
            const updatedDeck = {
                name: deck?.name,
                description: deck?.description,
                sourceLanguage: deck?.sourceLanguage,
                translationLanguage: deck?.translationLanguage,
                numberOfRepetitions: Number(deck?.numberOfRepetitions) + 1,
            };

            await fetch(`${DB_ADDRESS}${DECKS}${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ updatedDeck })
            })
                .then(response => { response.json() })
                .catch(err => console.error('Error:', err));
        }
    }

    async function fetchNumberOfRepetitions() {
        await fetch(`${DB_ADDRESS}${DECKS}${params.id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } })
            .then(res => res.json())
            .then(dane => {
                setDeck({
                    _id: dane._id,
                    user_id: dane.user_id,
                    name: dane.name,
                    description: dane.description,
                    sourceLanguage: dane.sourceLanguage,
                    translationLanguage: dane.translationLanguage,
                    numberOfRepetitions: dane.numberOfRepetitions
                })
            }
            )
            .catch(err => console.error('Error:', err));
    }

    function handleNotRememberedCard(_id: string) {
        if (cards) {
            const cardToBeRepeated = findLastMatch(_id, cards);
            if (cardToBeRepeated) {
                const updatedDeck = addCardToRepeatInRandomPlace(cardToBeRepeated, cards);
                setCards(updatedDeck);
                setCurrentCardIndex(currentCardIndex + 1);
            }
        }
    }

    function repeatReview() {
        if (fetchedCards) {
            prepareCards(fetchedCards);
            setCurrentCardIndex(0);
            setIsReviewCompleated(false);
        }
    }

    return (
        <div className={styles.mainContainer}>
            {(cards?.length && !isReviewCompleted) ? <ReviewCard _id={cards[currentCardIndex]._id} word={cards[currentCardIndex].word} translation={cards[currentCardIndex].translation} handleYes={handleRememberedCard} handleNo={handleNotRememberedCard} /> : null}
            {isReviewCompleted && !areCongratulationsVisible && <div className={styles.repeatButton} onClick={() => repeatReview()}>
                <Repeat color="gray" size={35} />
            </div>}
            {(params.id && cards?.length === 0) && <div className={styles.noContentMessage}>Start by adding cards to your deck!<button className={styles.addCardsButton} onClick={() => { navigate(EDIT_DECK_SCREEN) }}>Add cards</button></div>}
            {!params.id && <div className={styles.noContentMessage}>Start by choosing a deck or creating a new one!</div>}

            {areCongratulationsVisible && <>
                <Confetti
                    width={width}
                    height={height}
                />
                <div className={styles.congratulations}>Congratulations!</div>
            </>
            }
        </div>
    )
}

export default ReviewView;