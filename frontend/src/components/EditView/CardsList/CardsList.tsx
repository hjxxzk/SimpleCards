import useStyles from './CardsList.styles';
import NewDeck from '../../Bars/NewDeck/NewDeck';
import Card from '../Card/Card';
import type { CardListProps } from './CardListProps.types';
import { useNavigate } from 'react-router-dom';

const CardsList = (props: CardListProps) => {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const styles = useStyles();
    const navigate = useNavigate()

    function handleDeleteCard(cardId: number) {
        if (props.cards) {
            props.deleteCard(cardId);
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

    return (
        <div className={styles.sidebar}>
            <strong>Cards in this deck: </strong>
            <hr className={styles.separator} />
            <div className={styles.cardsList}>
                <NewDeck />
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
                {!props.cards && <p className={styles.text}>Start by adding your first card!</p>}
            </div >
        </div >
    );
}

export default CardsList;