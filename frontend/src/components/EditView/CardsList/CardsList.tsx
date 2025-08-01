import { useEffect, useState } from 'react';
import useStyles from './CardsList.styles';
import NewElement from '../../Bars/NewElement/NewElement';
import Card from '../Card/Card';
import type { CardListProps } from './CardListProps.types';
import { useNavigate } from 'react-router-dom';

const CardsList = (props: CardListProps) => {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const styles = useStyles();
    const navigate = useNavigate();

    const [isBigScreen, setIsBigScreen] = useState(true);
    const MEDIUM_OR_LARGER_SCREEN = "(width > 1024px)";
    const match = window.matchMedia(MEDIUM_OR_LARGER_SCREEN)
    match.addEventListener('change', (event) => {
        if (event.matches) {
            setIsBigScreen(true);
        } else {
            setIsBigScreen(false);
        }
    });

    useEffect(() => {
        if (match.matches) {
            setIsBigScreen(true);
        } else {
            setIsBigScreen(false);
        }
    }, [match.matches]);

    function handleDeleteCard(cardId: number) {
        if (props.cards) {
            props.deleteCard(cardId);
            requestDelete(cardId);
        }
    }

    async function requestDelete(cardId: number) {
        await fetch(`${DB_ADDRESS}${CARDS}/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(res => res.json())
            .catch(err => console.error('Error:', err));
    }

    return (
        <div className={styles.sidebar}>
            {isBigScreen && <strong>Cards in this deck: </strong>}
            {isBigScreen && <hr className={styles.separator} />}
            <div className={isBigScreen ? styles.cardsListFlex : styles.cardsListGrid}>
                <NewElement navigate={props.addCard} />
                {props.cards && props.cards.map((card) => (
                    <div onClick={() => navigate(`/edit/${card.deck_id}/${card._id}`)}>
                        <Card
                            key={card._id}
                            _id={card._id}
                            word={card.word}
                            translation={card.translation}
                            deleteCard={handleDeleteCard}
                        />
                    </div>
                ))}
                {props.cards.length === 0 && <p className={styles.text}>Start by adding your first card!</p>}
            </div >
        </div >
    );
}

export default CardsList;