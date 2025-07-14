import { useState, useEffect } from 'react';
import useStyles from './CardsList.styles';
import NewDeck from '../../Bars/NewDeck/NewDeck';
import Card from '../Card/Card';
import type { CardProps } from '../Card/CardProps.types';
import { useParams } from 'react-router-dom';

const CardsList = () => {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const [cards, setCards] = useState<CardProps[]>();
    const params = useParams();
    const styles = useStyles();

    function handleDeleteCard(cardId: number) {
        if (cards) {
            setCards(cards.filter(card => card._id !== cardId));
            requestDelete(cardId);
        }
    }

    function requestDelete(cardId: number) {
        fetch(`${DB_ADDRESS}${CARDS}/${cardId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(err => console.error('Error:', err));

    }

    useEffect(() => {
        fetch(`${DB_ADDRESS}${CARDS}?search=${params.id}`)
            .then(res => res.json())
            .then(data => { console.log(data), setCards(data.reverse()) })
            .catch(err => console.error('Error:', err));
    }, []);


    return (
        <div className={styles.sidebar}>
            <strong>Cards in this deck: </strong>
            <hr className={styles.separator} />
            <div className={styles.cardsList}>
                <NewDeck />
                {cards && cards.map((card) => (
                    <Card
                        key={card._id}
                        _id={card._id}
                        word={card.word}
                        translation={card.translation}
                        deleteCard={handleDeleteCard}
                    />
                ))}
                {!cards && <p className={styles.text}>Start by adding your first card!</p>}
            </div >
        </div >
    );
}

export default CardsList;